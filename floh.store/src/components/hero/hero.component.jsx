import { ButtonComponent } from "./button.component.jsx";
import { Link } from "react-router-dom";

export function HeroComponent() {
  function getRandomImage() {
    const arr = [
      "https://i.ibb.co/hYJsf2L/flea-market-13.webp",
      "https://i.ibb.co/bP5xjd8/flea-market-9.webp",
      "https://i.ibb.co/93s7dmM/flea-market-6.webp",
      "https://i.ibb.co/803Sfjk/flea-market-14.webp",
      "https://i.ibb.co/KWrQR3Z/flea-market-7.webp",
      "https://i.ibb.co/31HrsGs/flea-market-12.webp",
      "https://i.ibb.co/GkpR3GR/flea-market-5.webp",
      "https://i.ibb.co/CWTx5xd/flea-market-2.webp",
      "https://i.ibb.co/mbkLhc2/flea-market-11.webp",
      "https://i.ibb.co/hcHnxgv/flea-market-3.webp",
      "https://i.ibb.co/q7kxwZn/flea-market-4.webp",
      "https://i.ibb.co/gZKcqVG/flea-market-8.webp",
    ];
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }

  return (
    <div
      className="rounded-lg bg-center bg-cover w-full h-[330px] lg:max-w-[1920px] lg:h-[600px] 2xl:h-[700px] flex  justify-center items-end mx-auto max-lg:items-center"
      style={{ backgroundImage: `url(${getRandomImage()})` }}
    >
      <div className="container flex max-lg:items-center max-lg:justify-center  ">
        <div className="flex flex-col justify-evenly w-96 h-48 lg:h-56 bg-emerald/70 rounded-lg p-4 lg:mb-16">
          <Link to="/products/gallery" className="w-full flex justify-center">
            <ButtonComponent
              text="Finde deinen "
              spantxt="FLOH"
              size="large"
              height="height"
              additionalclasses=""
            />
          </Link>
          <p className="text-whitesmoke text-center">
            Entdecke einen der größten lokalen Marktplätze für Käufer und
            Verkäufer in deiner Nähe
          </p>
        </div>
      </div>
    </div>
  );
}
