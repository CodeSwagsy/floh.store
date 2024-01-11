import {NavComponent} from "./nav.component.jsx";
import {CategoryComponent} from "./category.component.jsx";
import {SearchfieldComponent} from "./searchfield.component.jsx";
import {ButtonComponent} from "./button.component.jsx";

export function HeaderComponent() {
    return (
        <header>
            <div className="container mx-auto bg-whitesmoke">  {/*whitesmoke im css als body!*/}
                <div className="flex flex-row items-center justify-around mt-2 lg:mt-8">
                    <img src="/logo.svg" alt="Floh.store" className=""/>
                    <div className="flex flex-row justify-center gap-8 max-lg:hidden">
                        <CategoryComponent additionalClasses=""/>
                        <SearchfieldComponent additionalClasses="grow"/>
                    </div>

                    <ButtonComponent
                        text="+ Anzeige erstellen"
                        additionalClasses="max-lg:w-4/12 max-lg:py-2"
                    />
                    <ButtonComponent
                        text="Login / Registrieren"
                        additionalClasses="max-lg:hidden"
                    />
                    <NavComponent/>
                </div>
                <div className="flex flex-row justify-between w-full lg:hidden bg-jet/25 p-2 mt-2">
                    <SearchfieldComponent additionalClasses="placeholder:text-white w-7/12"/>
                    <CategoryComponent additionalClasses="" selectClasses="text-right"/>
                </div>
            </div>
        </header>
    )
}