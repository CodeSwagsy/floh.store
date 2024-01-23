import { ButtonComponent } from "./button.component.jsx";

export function HeroComponent() {
  return (
    <div className="bg-[url('/public/floh2.png')] bg-cover w-screen border-2 border-black pb-48 pt-12">
      <div className="pt-8 pb-8 py-0 container mx-auto pl-36">
        <div className="flex flex-col items-center justify-around  w-96 h-56 bg-emerald/70 rounded-lg px-8 pt-6 ">
          <ButtonComponent
            text="Finde deinen "
            spantxt="FLOH"
            size="large"
            height="height"
          />
          <p className="text-white text-center">
            Entdecke einen der größten lokalen Marktplätze für Käufer und
            Verkäufer in deiner Nähe
          </p>
        </div>
      </div>
    </div>
  );
}
