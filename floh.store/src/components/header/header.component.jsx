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
        zipCodes,
        postalCode,
        radius,
        searchCategory,
        updateQueryError,
        updateSearchQuery,
        updateSearchCategory,
        updatePostalCode,
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
                <div className="flex flex-row items-center justify-between mt-2 lg:mt-4">
                    <Link to="/">
                        <img src="/logo.svg" alt="Floh.store" className="mt-2"/>
                    </Link>
                    <form onSubmit={handleSearchOnSubmit}>
                        <div className="flex items-center justify-between h-full max-lg:hidden">
                            <SearchfieldComponent
                            />

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
