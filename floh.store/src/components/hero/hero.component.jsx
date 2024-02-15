import { ButtonComponent } from "./button.component.jsx";
import { Link } from "react-router-dom";

export function HeroComponent() {

  function getRandomImage() {
    const mainLink = "https://res.cloudinary.com/djoadytrq/image/upload/";
    const arr = [
      "v1707815618/flea-market-8_a333pb.webp",
      "v1707815618/flea-market-4_alopdy.webp",
      "v1707815618/flea-market-3_retwjo.webp",
      "v1707815618/flea-market-11_kzqnho.webp",
      "v1707815617/flea-market-7_wqguph.webp",
      "v1707815617/flea-market-2_o70k2z.webp",
      "v1707815616/flea-market-5_cyeaj9.webp",
      "v1707815616/flea-market-9_yekxup.webp",
      "v1707815615/flea-market-12_zbsgil.webp",
      "v1707815615/flea-market-13_mfs84r.webp",
      "v1707815614/flea-market-6_qfdk8f.webp",
      "v1707815614/flea-market-14_myuvwy.webp",
    ];
    const index = Math.floor(Math.random() * arr.length);
    return mainLink + arr[index];
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
