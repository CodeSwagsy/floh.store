import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareFacebook, faSquareInstagram} from "@fortawesome/free-brands-svg-icons";

export function FooterComponent() {
    return (
        <>
            <footer>
                <div
                    className="container mx-auto mt-6 lg:mt-12 mb-4 lg:mb-12
                     flex justify-around max-lg:items-center max-lg:flex-col">
                    <div className="flex flex-col max-lg:items-center max-lg:justify-center">
                        <h1 className="font-bold">FLOH.STORE</h1>
                        <ul className="flex flex-col max-lg:items-center mt-2">
                            <li className="hover:text-emerald transition-all"><a href="#">Über uns</a></li>
                            <li className="hover:text-emerald transition-all"><a href="#"></a></li>
                            <li className="hover:text-emerald transition-all"></li>
                        </ul>
                    </div>
                    <div className="flex flex-col max-lg:items-center max-lg:justify-center max-lg:mt-4">
                        <h1 className="font-bold">Marktplatz</h1>
                        <ul className="flex flex-col max-lg:items-center mt-2">
                            <li className="hover:text-emerald transition-all"><a href="#">Verkaufen</a></li>
                            <li className="hover:text-emerald transition-all"><a href="#">Alle Anzeigen</a></li>
                            <li className="hover:text-emerald transition-all"><a href="#">Zufällige Anzeige</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col max-lg:items-center max-lg:justify-center max-lg:mt-4">
                        <h1 className="font-bold">Hilfe</h1>
                        <ul className="flex flex-col max-lg:items-center mt-2">
                            <li className="hover:text-emerald transition-all"><a href="#">Datenschutz</a></li>
                            <li className="hover:text-emerald transition-all"><a href="#">Impressum</a></li>
                            <li className="hover:text-emerald transition-all"><a href="#">Kontakt</a></li>
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