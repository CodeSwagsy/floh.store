import {useData} from "../../context/signin.context.jsx";
import {PLZinRadiusComponent} from "../header/PLZinRadiusComponent.jsx";
import {SearchfieldComponent} from "../header/searchfield.component.jsx";
import {LinkButtonComponent} from "./button.component.jsx";
import {NavComponent} from "./nav.component.jsx";
import {Link, useNavigate} from "react-router-dom";


export function HeaderComponent() {
    const navigate = useNavigate()
    const {
        login,
        updateSearchedProducts,
        searchedProducts,
        searchQuery,
        zipCodes,
        searchCategory,
        updateQueryError,
        updateSearchQuery,
        updateSearchCategory
    } = useData();


    const handleSearchOnSubmit = async (e) => {
        e.preventDefault()
        if (searchQuery !== null || "") {
            try {
                console.log("SearchQuery")
                let url;
                if (searchCategory && searchCategory !== "Alle Produkte") {
                    url = `${import.meta.env.VITE_API}/product/category/${searchCategory}`;
                } else {
                    url = `${import.meta.env.VITE_API}/product/all`;
                }

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                // if (!response.ok) {
                //     throw new Error(`HTTP error: ${response.status}`);
                // }
                const data = await response.json();
                console.log("API Response:", data);
                if (data.code === 200) {
                    const filteredProducts = data.products.filter(product =>
                        product.title.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    updateSearchedProducts(filteredProducts);
                    if (searchCategory === null || searchCategory === "Alle Produkte") {
                        updateSearchQuery(null)
                        updateSearchCategory(null)
                        console.log(searchedProducts)
                        if (searchedProducts === null) {
                            updateQueryError("Keine Produkte gefunden")
                        }
                        navigate(`/products/gallery/`)
                    } else if (searchCategory !== 'kategorien') {
                        updateSearchQuery(null)
                        updateSearchCategory(null)
                        console.log(searchedProducts)
                        if (searchedProducts === null) {
                            updateQueryError("Keine Produkte gefunden")
                        }
                        navigate(`/products/gallery/category/${searchCategory}`)
                    }
                } else if (data.code === 400) {
                    updateSearchQuery(null)
                    updateSearchedProducts(null)
                    updateSearchCategory(null)
                    updateQueryError("Keine Produkte gefunden")
                } else {
                    updateQueryError("Keine Produkte gefunden!")
                    console.error(data.error.message);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        } else if (searchCategory === null || searchCategory === "Alle Produkte") {
            console.log("else if")
            updateSearchQuery(null)
            updateSearchedProducts(null)
            navigate(`/products/gallery/`)
        } else if (searchCategory !== 'kategorien') {
            console.log("else if 2")
            updateSearchQuery(null)
            updateSearchedProducts(null)
            navigate(`/products/gallery/category/${searchCategory}`);
        }
    };

    return (
        <header>
            <div className="container mx-auto bg-whitesmoke mb-2 lg:mb-4">
                <div className="flex flex-row items-center justify-between mt-2 lg:mt-4">
                    <Link to="/">
                        <img src="/logo.svg" alt="Floh.store" className="mt-2"/>
                    </Link>
                    <form onSubmit={handleSearchOnSubmit}>
                        <div className="flex items-center justify-between h-full max-lg:hidden gap-8">

                            <div className="flex flex-row items-center">
                                <SearchfieldComponent

                                />

                            </div>
                            <PLZinRadiusComponent
                            />
                            <button type="submit">SUBMIT</button>
                        </div>
                    </form>
                    <LinkButtonComponent
                        text="Anzeige erstellen"
                        additionalClasses={
                            login
                                ? "w-1/3 lg:w-1/4 bg-jet max-lg:py-2 lg:px-2 xl:px-4 xl:py-2"
                                : "max-lg:w-4/12 max-lg:py-2 bg-jet lg:px-2 xl:px-4 xl:py-2"
                        }
                        link="/products/add"
                    />
                    <LinkButtonComponent
                        text={login ? "Angemeldet " : "Login / Registrieren"}
                        additionalClasses={
                            login
                                ? "hidden"
                                : "max-lg:hidden bg-jet lg:px-2 xl:px-4 xl:py-2"
                        }
                        link="/profile/signin"
                    />
                    <NavComponent/>
                </div>
            </div>
        </header>
    );
}
