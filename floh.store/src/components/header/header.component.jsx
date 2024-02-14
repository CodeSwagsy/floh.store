import {useData} from "../../context/signin.context.jsx";
import {PLZinRadiusComponent} from "./PLZinRadiusComponent.jsx";
import {SearchfieldComponent} from "./searchfield.component.jsx";
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
        postalCode,
        radius,
        searchCategory,
        updateQueryError,
        updateSearchQuery,
        updateSearchCategory,
        fetchZips
    } = useData();


    const handleSearchOnSubmit = async (e) => {
        e.preventDefault();
        console.log("handler clicked")
        try {
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
            const data = await response.json();
            if (data.code === 200) {
                if (searchQuery !== "") {
                    console.log("QUERY ROUTE")
                    const filteredProducts = data.products.filter((product) =>
                        product.title.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    if (postalCode !== null && postalCode.length > 0) {
                        try {
                            console.log("QUERY ROUTE");
                            const zipResult = await fetchZips(postalCode, radius);
                            console.log("Zipresult:", zipResult);
                            const zipFilteredProducts = filteredProducts.filter((product) =>
                                zipResult && zipResult.includes(product.location.zip)
                            );
                            console.log("SubmitHandler: Gesuchter Postalcode:", postalCode);
                            console.log("SubmitHandler: Gesuchter Radius:", radius);
                            console.log("SubmitHandler: Gefilterte Produkte:", filteredProducts);
                            console.log("SubmitHandler: Zip Gefilterte Produkte:", zipFilteredProducts);
                            updateSearchedProducts(zipFilteredProducts);
                            updateSearchCategory("");
                            navigate(`/products/gallery/`);
                        } catch (error) {
                            console.error("Fehler beim Fetchen der ZIP-Codes:", error);
                        }
                    } else {
                        updateSearchedProducts(filteredProducts);
                        updateSearchCategory("");
                        if (searchedProducts.length === 0) {
                            updateQueryError("Keine Produkte gefunden");
                        }
                        navigate(`/products/gallery/`);
                    }
                } else if (searchCategory === "" || searchCategory === "Alle Produkte") {
                    if (postalCode !== null && postalCode.length > 0) {
                        try {
                            const zipResult = await fetchZips(postalCode, radius);
                            console.log("Zipresult:", zipResult);
                            const zipFilteredProducts = data.products.filter((product) =>
                                zipResult && zipResult.includes(product.location.zip)
                            );
                            console.log("SubmitHandler: Gesuchter Postalcode:", postalCode);
                            console.log("SubmitHandler: Gesuchter Radius:", radius);
                            console.log("SubmitHandler: Zip Gefilterte Produkte:", zipFilteredProducts);
                            updateSearchedProducts(zipFilteredProducts);
                            updateSearchCategory("");
                            navigate(`/products/gallery/`);
                        } catch (error) {
                            console.error("Fehler beim Fetchen der ZIP-Codes:", error);
                        }
                    } else {
                        console.log("ALLE PRODUKTE ELSE", data)
                        updateSearchedProducts(data.products);
                    }
                    updateSearchQuery("");
                    updateSearchCategory("");


                    navigate(`/products/gallery/`);
                } else if (searchCategory !== 'kategorien') {
                    console.log("CATEGORY ROUTE")
                    if (postalCode !== null && postalCode.length > 0) {
                        try {
                            const zipResult = await fetchZips(postalCode, radius);
                            console.log("Zipresult:", zipResult);
                            const zipFilteredProducts = data.products.filter((product) =>
                                zipResult && zipResult.includes(product.location.zip)
                            );
                            console.log("SubmitHandler: Gesuchter Postalcode:", postalCode);
                            console.log("SubmitHandler: Gesuchter Radius:", radius);
                            console.log("SubmitHandler: Zip Gefilterte Produkte:", zipFilteredProducts);
                            updateSearchedProducts(zipFilteredProducts);
                            updateSearchCategory("");
                            navigate(`/products/gallery/category/${searchCategory}`);
                        } catch (error) {
                            console.error("Fehler beim Fetchen der ZIP-Codes:", error);
                        }
                    } else {
                        console.log("CATEGORY ELSE", data)
                        updateSearchedProducts(data.products);
                        updateSearchQuery("");
                        if (searchedProducts.length === 0) {
                            updateQueryError("Keine Produkte gefunden");
                        }
                        navigate(`/products/gallery/category/${searchCategory}`);
                    }
                }
            }
        } catch
            (error) {
            console.log(error)
        }
    }

    //

    return (
        <header>
            <div className="container mx-auto bg-whitesmoke mb-2 lg:mb-4">
                <div className="flex flex-row items-center justify-between lg:gap-8 2xl:gap-16 mt-2 lg:mt-4 max-lg:gap-4">
                    <Link to="/">
                        <img src="/LOGO.svg" alt="Floh.store" className="mt-2"/>
                    </Link>
                    <form onSubmit={handleSearchOnSubmit} className="flex items-center justify-end lg:justify-between w-full max-lg:gap-4">
                        <div className="flex items-center h-full max-lg:hidden">
                            <SearchfieldComponent
                            />

                            <PLZinRadiusComponent
                            />
                        </div>
                        <button
                            className="mx-4 2xl:-ml-16 w-40 h-[44px] max-lg:hidden flex items-center justify-center px-4 flex shadow-sm flex-row items-center justify-center max-lg:text-sm text-center text-whitesmoke rounded-lg bg-emerald hover:bg-springgreen transition-all"
                            type="submit">Floh finden!
                        </button>
                        <div className="flex lg:gap-4 max-lg:justify-center max-lg:mx-auto max-lg:w-full">
                            <LinkButtonComponent
                                text="Floh erstellen"
                                additionalClasses={
                                    login
                                        ? "bg-jet max-lg:h-[40px] h-[44px] px-2 lg:w-80 mr-4 max-lg:w-full"
                                        : "bg-jet max-lg:h-[40px] h-[44px] px-2 lg:w-40 max-lg:w-full"
                                }
                                link="/products/add"
                            />
                            <LinkButtonComponent
                                text={login ? "Angemeldet " : "Login / Registrieren"}
                                additionalClasses={
                                    login
                                        ? "hidden"
                                        : "max-lg:hidden bg-jet h-[44px] px-2 lg:w-40 lg:mr-4"
                                }
                                link="/profile/signin"
                            />
                        </div>
                        <NavComponent/>
                    </form>
                </div>
                <div className="lg:hidden flex mt-2">
                    <SearchfieldComponent
                    />
                    <button
                        className="ml-4 h-[44px] flex items-center justify-center px-4 flex shadow-sm flex-row items-center justify-center max-lg:text-sm text-center text-whitesmoke rounded-lg max-lg:w-4/12 bg-emerald hover:bg-springgreen transition-all"
                        type="submit">Floh finden!
                    </button>
                </div>
            </div>
        </header>
    );
}
