import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareFacebook, faSquareInstagram} from "@fortawesome/free-brands-svg-icons";
import {Link} from "react-router-dom";

export function FooterComponent() {
    return (
        <>
            <footer>
                <div
                    className="container mx-auto mt-6 lg:mt-12 mb-4 lg:mb-12
                     flex justify-between max-lg:items-center max-lg:flex-col">
                    <div className="flex flex-col max-lg:items-center max-lg:justify-center">
                        <h1 className="font-bold">FLOH.STORE</h1>
                        <ul className="flex flex-col max-lg:items-center mt-2">
                            <li className="hover:text-emerald transition-all"><Link to="/about">Über uns</Link></li>
                            <li className="hover:text-emerald transition-all"><a href="#"></a></li>
                            <li className="hover:text-emerald transition-all"></li>
                        </ul>
                    </div>
                    <div className="flex flex-col max-lg:items-center max-lg:justify-center max-lg:mt-4">
                        <h1 className="font-bold">Marktplatz</h1>
                        <ul className="flex flex-col max-lg:items-center mt-2">
                            <li className="hover:text-emerald transition-all"><Link to="/products/add">Verkaufen</Link></li>
                            <li className="hover:text-emerald transition-all"><Link to="/products/gallery">Alle Anzeigen</Link></li>
                            <li className="hover:text-emerald transition-all"><Link to="/products/random">Zufällige Anzeige</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col max-lg:items-center max-lg:justify-center max-lg:mt-4">
                        <h1 className="font-bold">Hilfe</h1>
                        <ul className="flex flex-col max-lg:items-center mt-2">
                            <li className="hover:text-emerald transition-all"><Link to="/datenschutz">Datenschutz</Link></li>
                            <li className="hover:text-emerald transition-all"><Link to="/impressum">Impressum</Link></li>
                            <li className="hover:text-emerald transition-all"><Link to="/kontakt">Kontakt</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="container mx-auto border-t border-gray-300 w-11/12 flex gap-4 mb-4 lg:mb-12">
                    <a href=""><FontAwesomeIcon icon={faSquareFacebook} className="mt-4 lg:mt-12 fa-2xl text-emerald hover:text-jet transition-all" /></a>
                    <a href=""><FontAwesomeIcon icon={faSquareInstagram} className="mt-4 lg:mt-12 fa-2xl text-emerald hover:text-jet transition-all" /></a>
                </div>
            </footer>
        </>
    )
}