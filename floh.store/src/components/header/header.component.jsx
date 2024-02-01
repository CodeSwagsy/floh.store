import {NavComponent} from "./nav.component.jsx";
import {CategoryComponent} from "./category.component.jsx";
import {SearchfieldComponent} from "./searchfield.component.jsx";
import {LinkButtonComponent} from "./button.component.jsx";
import {Link} from "react-router-dom";
import {useData} from "../../context/signin.context.jsx";


export function HeaderComponent() {

    const { userData, login, updateUserData, updateLogin } = useData()
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
                        additionalClasses={login ? "w-1/4 bg-jet lg:px-2 xl:px-4 xl:py-2" : "max-lg:w-4/12 max-lg:py-2 bg-jet lg:px-2 xl:px-4 xl:py-2"}
                        link="/products/add"
                    />
                    <LinkButtonComponent
                        text={login ? "Angemeldet " : "Login / Registrieren"}
                        additionalClasses={login ? "hidden" : "max-lg:hidden bg-jet lg:px-2 xl:px-4 xl:py-2"}
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