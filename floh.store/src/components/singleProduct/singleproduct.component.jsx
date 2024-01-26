import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {LinkButtonComponent} from "../header/button.component.jsx";
import {Link} from "react-router-dom";

export function SingleProductComponent() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [formattedDate, setFormattedDate] = useState(null);
    const [owner, setOwner] = useState(null)
    const [durchschnittsRating, setDurchschnittsRating] = useState(0);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const handleAddToFavorites = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API}/user/update/favorites/${product._id}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();
            if (data.code === 200) {
                console.log("FAVORITE HINZUGEFÜGT")
            } else {
                console.log(data)
                console.log(product)
                console.error("Error adding to favorites: ELSE", data.message);
            }
        } catch (error) {
            console.error("Error adding to favorites: CATCH", error);
        }
    };

    useEffect(() => {
            const fetchProduct = async () => {

                try {
                    const response = await fetch(`${import.meta.env.VITE_API}/product/id/${id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const data = await response.json();
                    if (data.code === 200) {
                        setProduct(data.product);
                    } else {
                        console.error("Error fetching products:", data.message);
                    }
                } catch (error) {
                    console.error("Error fetching products:", error.message);
                }
            };
            fetchProduct();
        }, []
    )
    ;

    useEffect(() => {
        // Wenn das Produkt geladen wurde, formatiere das Datum
        if (product) {
            const createdAtDate = new Date(product.createdAt);
            setFormattedDate(createdAtDate.toLocaleString());
            const fetchOwner = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API}/user/about/${product.owner}`, {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    });
                    const data = await response.json();
                    if (data.code === 200) {
                        setOwner(data.doc);
                    } else {
                        console.error("Error fetching owner:", data.message);
                    }
                } catch (error) {
                    console.error("Error fetching owner:", error.message);
                }
            };
            fetchOwner();
        }
    }, [product]);

    function berechneDurchschnitt(ratings) {
        if (!ratings || ratings.length === 0) {
            return 0;
        }

        const summe = ratings.reduce((acc, rating) => acc + rating, 0);
        const durchschnitt = summe / ratings.length;

        return durchschnitt;
    }

    useEffect(() => {
        if (owner && owner.info && owner.info.rating) {
            const durchschnitt = berechneDurchschnitt(owner.info.rating);
            setDurchschnittsRating(durchschnitt);
        } else {
            setDurchschnittsRating(0);
        }
    }, [owner])

    return (
        <>
            <div className="container mx-auto lg:mt-12">
                <div className="flex pb-4">
                    <Link to={product ? `/products/gallery/category/${product.category}` : "/"}
                          className="lg:text-2xl font-semibold underline">{product ? product.category : " "}</Link>
                    <h2 className="lg:text-2xl no-underline">&nbsp; / {product ? product.title : " "}</h2>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:pb-4">
                    <div className="max-lg:px-2 lg:w-5/12 flex ">
                        <img src={product ? product.images[0] : " "} alt={product ? product.title : " "}
                             className="max-h-96"/>
                    </div>
                    <div className="max-lg:mb-2 max-lg:px-2 flex flex-col lg:justify-center lg:w-5/12 max-lg:mt-4">
                        <div className="w-1/2">
                            <h1 className="text-lg font-bold">{product ? product.title : " "}</h1>
                            <p className="text-lg font-bold">{product ? product.price : " "} €</p>
                            <div className="flex flex-row gap-2">
                                <h2 className="">{product ? product.location.zip : " "}</h2>
                                <p className="">{product ? product.location.city : " "}</p>
                            </div>
                        </div>

                        <div
                            className="flex flex-col max-lg:flex-row gap-2 grow items-center md:items-start justify-center my-2">
                            <LinkButtonComponent text="Angebot machen"
                                                 additionalClasses="bg-emerald hover:bg-jet transition-all w-1/2 lg:px-2 py-1 lg:py-1.5 xl:text-xl"/>
                            <button
                                className="flex shadow-sm flex-row items-center justify-center text-whitesmoke rounded-lg bg-emerald hover:bg-jet transition-all w-1/2 lg:px-2 py-1 lg:py-1.5 xl:text-xl"
                                onClick={handleAddToFavorites}>Zur
                                Merkliste hinzufügen
                            </button>
                        </div>

                        <div className="">
                            <h2 className="font-bold mb-2">Verkäufer:</h2>
                            <div className="flex flex-col">
                                <div className="flex gap-4">
                                    <h3 className="font-semibold w-6/12 lg:w-5/12">Nutzername</h3>
                                    <p>{owner ? owner.info.about.username : ""}</p>
                                </div>
                                <div className="flex gap-4">
                                    <h3 className="font-semibold w-6/12 lg:w-5/12">Durchschnittliche Bewertung</h3>
                                    <p className="font-semibold">
                                        <span>{owner ? berechneDurchschnitt(owner.info.rating) : ""}</span> / 5</p>
                                </div>
                                <div className="flex gap-4">
                                    <h3 className="font-semibold w-6/12 lg:w-5/12">Mitglied seit</h3>
                                    <p>{owner && owner.createdAt ? new Date(owner.createdAt).toLocaleDateString() : ""}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="border-y border-gray-300 py-4 max-lg:px-2">
                    <h2 className="font-bold mb-2">Produktdetails:</h2>
                    <div className="flex gap-4">
                        <h3 className="font-semibold w-6/12 lg:w-3/12">Preis</h3>
                        <p>{product ? product.price : " "} €</p>
                    </div>
                    <div className="flex gap-4">
                        <h3 className="font-semibold w-6/12 lg:w-3/12">Zustand</h3>
                        <p>{product ? product.condition : " "}</p>
                    </div>
                    <div className="flex gap-4">
                        <h3 className="font-semibold w-6/12 lg:w-3/12">Inseriert seit:</h3>
                        <p>{formattedDate}</p>
                    </div>
                </div>
                <div className="max-lg:px-2">
                    <h2 className="font-bold mt-4 mb-2">Beschreibung:</h2>
                    <div className="flex gap-4">
                        <p>{product ? product.description : " "}</p>
                    </div>

                </div>
            </div>

        </>
    )
}