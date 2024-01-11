import { ButtonComponent } from "../button.component.jsx";

export function HeroComponent() {
  return (
    <div>
      <div className=" bg-[url('/public/floh2.png')] bg-cover   w-screen">
        <div className="pt-12  container mx-auto">
          <div className="pl-20 pt-12 w-5/5 h-96  ">
            <div className="bg-emerald/70 w-2/6 h-40 rounded-lg pt-5">
              <ButtonComponent text="Finde dein " spantxt="FLOH" />
              <p className="pt-3 text-white">
                Entdecke einen der größten lokalen Marktplätze für Käufer und
                Verkäufer in deiner Nähe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}