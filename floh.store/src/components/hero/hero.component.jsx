import { ButtonComponent } from "./button.component.jsx";

export function HeroComponent() {
  return (
    <div className="bg-[url('/floh2.png')] bg-cover h-128 pb-16">
      <div className="pt-12 container mx-auto">
        <div className="p-4 w-3/6 h-96 bg-emerald/70 rounded-lg pt-5 flex flex-col justify-end">
          <ButtonComponent text="Finde dein " spantxt="FLOH" additionalclasses="w-1/3"/>
          <p className="pt-3 text-white">
            Entdecke einen der größten lokalen Marktplätze für Käufer und
            Verkäufer in deiner Nähe
          </p>
        </div>
      </div>
    </div>
  );
}
