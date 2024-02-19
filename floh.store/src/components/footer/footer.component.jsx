import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../context/signin.context.jsx";
import AppDownload from "../app.download/appDownload.jsx";

export function FooterComponent() {
  const { updateSearchedProducts } = useData();
  const navigate = useNavigate();
  const fetchGallery = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/product/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.code === 200) {
        updateSearchedProducts(data.products);
        navigate(`/products/gallery/`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <footer className="flex flex-col my-4 lg:my-8 text-jet">
        <div
          className="container mx-auto border-t border-gray-300 pt-4
                     flex justify-between max-lg:items-center max-lg:flex-col"
        >
          <div className="flex flex-col max-lg:items-center max-lg:justify-center">
            <h1 className="font-semibold">FLOH.STORE</h1>
            <ul className="flex flex-col max-lg:items-center mt-2">
              <li className="hover:text-emerald transition-all">
                <Link to="/about">Über uns</Link>
              </li>
              <li className="hover:text-emerald transition-all">
                <a href="#"></a>
              </li>
              <li className="hover:text-emerald transition-all"></li>
            </ul>
          </div>
          <div className="flex flex-col max-lg:items-center max-lg:justify-center max-lg:mt-4">
            <h1 className="font-bold">Marktplatz</h1>
            <ul className="flex flex-col max-lg:items-center mt-2">
              <li className="hover:text-emerald transition-all">
                <Link to="/products/add">Verkaufen</Link>
              </li>
              <li className="hover:text-emerald hover:cursor-pointer transition-all">
                <p onClick={fetchGallery}>Alle Anzeigen</p>
              </li>
              <li className="hover:text-emerald transition-all">
                <Link to="/products/random">Zufällige Anzeige</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col max-lg:items-center max-lg:justify-center max-lg:mt-4">
            <h1 className="font-bold">Hilfe</h1>
            <ul className="flex flex-col max-lg:items-center mt-2">
              <li className="hover:text-emerald transition-all">
                <Link to="/datenschutz">Datenschutz</Link>
              </li>
              <li className="hover:text-emerald transition-all">
                <Link to="/impressum">Impressum</Link>
              </li>
              <li className="hover:text-emerald transition-all">
                <Link to="/kontakt">Kontakt</Link>
              </li>
            </ul>
          </div>
          <AppDownload />
        </div>
        <div className="container mx-auto border-t border-gray-300 mt-4 flex gap-4">
          <a href="">
            <FontAwesomeIcon
              icon={faSquareFacebook}
              className="mt-4  fa-2xl text-emerald hover:text-jet transition-all"
            />
          </a>
          <a href="">
            <FontAwesomeIcon
              icon={faSquareInstagram}
              className="mt-4  fa-2xl text-emerald hover:text-jet transition-all"
            />
          </a>
        </div>
      </footer>
    </>
  );
}
