import { ButtonComponent } from "./button.component.jsx";
import {Link} from "react-router-dom";

export function HeroComponent() {
  return (
    <div className="bg-[url('/floh2.png')] bg-cover w-screen border-2 border-black pb-48 pt-12">
      <div className="pt-8 pb-8 py-0 container max-lg:flex max-lg:items-center max-lg:justify-center mx-auto lg:pl-36">
        <div className="flex flex-col items-center justify-around  w-96 h-56 bg-emerald/70 rounded-lg px-8 pt-6 ">
            <Link to="/products/gallery" className="w-full">
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
