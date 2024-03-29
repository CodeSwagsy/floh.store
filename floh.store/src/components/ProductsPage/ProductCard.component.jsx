import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/signin.context.jsx";
import { Tooltip } from "./Tooltip.component.jsx";
import PropTypes from "prop-types";
import "./ProductCard.component.css";

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
  const [status, setStatus] = useState(product.status);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (login) {
      setDisableButton(false);
      setDisabledClasses("bg-emerald cursor-pointer hover:bg-springgreen hover:text-jet");
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
      } else {
        console.error("Error adding to favorites:", data.message);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      console.log(error);
    }
  };

  const handleLinkClick = (event) => {
    event.preventDefault();
    navigate(`/products/${product._id}`);
  };

  async function changeStatus(event, status) {
    event.stopPropagation();
    const res = await fetch(
      `${import.meta.env.VITE_API}/product/update/${_id}`,
      {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...product, status }),
      }
    );
    await res.json();
    setStatus(status);
  }

  async function deleteProduct(event) {
    event.stopPropagation();
    const res = await fetch(
      `${import.meta.env.VITE_API}/product/delete/${_id}`,
      {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      }
    );
    await res.json();
    if (res.status === 200) {
      console.log("Item deleted");
      setDeleted(true);
    }
  }

  return (
    <>
      {deleted ? (
        <></>
      ) : (
        <div
          className="bg-gray-100 p-2 lg:p-4 border border-gray-300 rounded-lg hover:shadow-md flex flex-col justify-between hover:shadow-md transition-all cursor-pointer"
          onClick={handleLinkClick}
        >
          <div className="flex justify-center relative mb-2 h-[225px] overflow-hidden">
            <div className="i-own-product-status">
              {status !== "active" ? status.toUpperCase() : ""}
            </div>
            <img
              src={
                images.length > 0
                  ? images[0]
                  : "https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=Kein%20Bild%20vorhanden%20%3C%3Apepw%3A989410572514758676%3E"
              }
              alt={title}
              className={`object-cover rounded h-full ${
                status !== "active" ? "opacity-50" : ""
              }`}
            />
          </div>
          <div className="text-center flex flex-col items-center grow justify-between">
            <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2 line-clamp-1">
              {title}
            </h3>
            <p className="md:text-base lg:text-lg xl:text-xl mb-2 text-emerald font-semibold">{`${productType}`}</p>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`Kategorie: ${category}`}</p>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`Zustand: ${condition}`}</p>

            {product?.owner === localStorage.getItem("uid") ? (
              <>
                <button
                  onClick={(e) =>
                    changeStatus(
                      e,
                      status === "active" || status === "sold"
                        ? "reserved"
                        : "active"
                    )
                  }
                  className={`bg-blue-600 w-full text-white px-5 py-2 rounded mt-2 lg:mt-2 transition-all hover:bg-blue-400 ${
                    status === "reserved"
                      ? "bg-gray-600 hover:bg-gray-400"
                      : "bg-blue-600  hover:bg-blue-400"
                  }`}
                >
                  {status === "reserved"
                    ? "Verkauf fortsetzen"
                    : "Als reserviert markieren"}
                </button>
                <button
                  onClick={(e) =>
                    changeStatus(
                      e,
                      status === "active" || status === "reserved"
                        ? "sold"
                        : "active"
                    )
                  }
                  className={`bg-blue-600 w-full text-white px-5 py-2 rounded mt-2 lg:mt-2 transition-all hover:bg-blue-400 ${
                    status === "sold"
                      ? "bg-gray-600 hover:bg-gray-400"
                      : "bg-blue-600  hover:bg-blue-400"
                  }`}
                >
                  {status === "sold"
                    ? "Verkauf fortsetzen"
                    : "Als verkauft markieren"}
                </button>
                <button
                  onClick={(e) => deleteProduct(e)}
                  className={`bg-red-600 w-full text-white px-5 py-2 rounded mt-2 lg:mt-2 transition-all hover:bg-red-400`}
                >
                  Anzeige löschen
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};
