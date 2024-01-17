import {NavComponent} from "./nav.component.jsx";
import {CategoryComponent} from "./category.component.jsx";
import {SearchfieldComponent} from "./searchfield.component.jsx";
import {LinkButtonComponent} from "./button.component.jsx";
import {Link} from "react-router-dom";

export function HeaderComponent() {
    return (
        <header>
            <div className="container mx-auto bg-whitesmoke mb-2 lg:mb-4">  {/*whitesmoke im css als body!*/}
                <div className="flex flex-row items-center justify-around mt-2 lg:mt-4">
                    <Link to="/">
                        <img src="/logo.svg" alt="Floh.store" className="mt-2"/>
                    </Link>
                    <div className="flex flex-row xl:w-6/12 justify-center gap-8 max-lg:hidden">
                        <CategoryComponent additionalClasses=""/>
                        <SearchfieldComponent additionalClasses="grow"/>
                    </div>
                    <LinkButtonComponent
                        text="+ Anzeige erstellen"
                        additionalClasses="max-lg:w-4/12 max-lg:py-2"
                        link="/products/add"
                    />
                    <LinkButtonComponent
                        text="Login / Registrieren"
                        additionalClasses="max-lg:hidden"
                        link="/profile/signin"
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