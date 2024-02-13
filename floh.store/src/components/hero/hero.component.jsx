import {ButtonComponent} from "./button.component.jsx";
import {Link} from "react-router-dom";

export function HeroComponent() {
    return (
        <div
            className="bg-[url('/floh2.png')] rounded-lg bg-center bg-cover w-full h-[330px] lg:max-w-[1920px] lg:h-[600px] flex justify-center items-end mx-auto max-lg:items-center">
            <div
                className="container flex max-lg:items-center max-lg:justify-center">
                <div className="flex flex-col justify-evenly w-96 h-48 lg:h-56 bg-emerald/80 rounded-lg p-4 lg:mb-16">
                    <Link to="/products/random" className="w-full">
                        <ButtonComponent
                            text="Finde deinen "
                            spantxt="FLOH"
                            size="large"
                            height="height"
                        />
                    </Link>
                    <p className="text-white text-center">
                        Entdecke einen der größten lokalen Marktplätze für Käufer und
                        Verkäufer in deiner Nähe
                    </p>
                </div>
            </div>
        </div>
    );
}

