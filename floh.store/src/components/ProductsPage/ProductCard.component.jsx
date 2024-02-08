import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/signin.context.jsx";
import { Tooltip } from "./Tooltip.component.jsx";
import PropTypes from "prop-types";

export const ProductCard = ({ product }) => {
  const { title, category, condition, price, location, images, type, _id } =
    product;
  const [favoriteText, setFavoriteText] = useState("Zur Merkliste hinzufügen");
  const { login } = useData();
  const [disableButton, setDisableButton] = useState(false);
  const [disabledClasses, setDisabledClasses] = useState(
    "bg-gray-400 cursor-default"
  );
  const [productType, setProductType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      setDisableButton(false);
      setDisabledClasses("bg-emerald cursor-pointer hover:bg-springgreen");
    } else {
      setDisableButton(true);
      setDisabledClasses("bg-gray-400 cursor-default");
    }
    if (type === "need") {
      setProductType("Gesuch");
    } else if (type === "offer") {
      setProductType("Angebot");
    }
  }, []);

  const handleAddToFavorites = async (product, event) => {
    if (event) {
      event.stopPropagation();
    }

    try {
      if (!product) {
        console.error("Product is undefined or null.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API}/user/update/favorites/${_id}`,
        {
          method: "PUT",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.code === 200) {
        setFavoriteText("Zu Favoriten hinzugefügt");
        console.log("FAVORITE HINZUGEFÜGT");
      } else {
        console.error("Error adding to favorites: ELSE", data.message);
        console.log("ELSE");
      }
    } catch (error) {
      console.error("Error adding to favorites: CATCH", error);
      console.log("CATCH");
      console.log(error);
    }
  };

  const handleLinkClick = (event) => {
    event.preventDefault();
    navigate(`/products/${product._id}`);
  };

  return (
    <div
      className="bg-gray-100 p-2 lg:p-4 h-[550px] lg:h-[600px] border rounded-lg hover:shadow-md mb-4 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer"
      onClick={handleLinkClick}
    >
      <div className="flex justify-center mb-2 h-[300px]">
        <img
          src={
            images.length > 0
              ? images[0]
              : "https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=Kein%20Bild%20vorhanden%20%3C%3Apepw%3A989410572514758676%3E"
          }
          alt={title}
          className="object-cover rounded h-full"
        />
      </div>
      <div className="text-center flex flex-col items-center lg:h-3/5 justify-between">
        <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2 text-emerald font-semibold">{`${productType}`}</p>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`Kategorie: ${category}`}</p>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`Zustand: ${condition}`}</p>
        <p className="font-bold text-base md:text-lg lg:text-xl xl:text-2xl mb-2">{`Preis: ${price} €`}</p>
        {/*<p className="text-justify text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2 line-clamp-2 ">{`${description}`}</p>*/}
        <p className="text-justify text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`PLZ / Ort: ${location.city}, ${location.zip}`}</p>
        {login ? (
          <>
            <button
              onClick={(event) => handleAddToFavorites(product, event)}
              disabled={disableButton}
              className={`bg-blue-500 w-full text-white px-5 py-2 rounded mt-2 lg:mt-4 transition-all ${disabledClasses}`}
            >
              {favoriteText}
            </button>
          </>
        ) : (
          <>
            <Tooltip text="Anmeldung notwendig um Produkte zur Merkliste hinzuzufügen">
              <button
                disabled={disableButton}
                className={`bg-blue-500 w-full text-white px-5 py-2 rounded mt-2 lg:mt-4 transition-all ${disabledClasses}`}
              >
                {favoriteText}
              </button>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};
