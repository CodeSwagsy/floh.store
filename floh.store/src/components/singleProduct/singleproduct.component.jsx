import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {LinkButtonComponent} from "../header/button.component.jsx";

export function SingleProductComponent() {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [formattedDate, setFormattedDate] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://api.floh.store/product/id/${id}`, {
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
    }, []);

    useEffect(() => {
        // Wenn das Produkt geladen wurde, formatiere das Datum
        if (product) {
            const createdAtDate = new Date(product.createdAt);
            setFormattedDate(createdAtDate.toLocaleString());
        }
    }, [product]);


    return (
        <>
            <div className="container mx-auto lg:mt-12">
                <div className="flex pb-4">
                    <h2 className="lg:text-2xl font-semibold underline">{product.category}</h2>
                    <h2 className="lg:text-2xl no-underline">&nbsp; / {product.title}</h2>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:pb-4">
                    <div className="max-lg:px-2 lg:w-5/12 flex ">
                        <img src={product.images ? product.images[0] : " "} alt={product.title} className="max-h-96"/>
                    </div>
                    <div className="max-lg:mb-2 max-lg:px-2 flex flex-col lg:justify-center lg:w-5/12 max-lg:mt-4">
                        <div className="w-1/2">
                            <h1 className="text-lg font-bold">{product.title}</h1>
                            <p className="text-lg font-bold">{product.price} €</p>
                            <div className="flex flex-row gap-2">
                                <h2 className="">{product.location ? product.location.zip : " "}</h2>
                                <p className="">{product.location ? product.location.city : " "}</p>
                            </div>
                        </div>

                        <div className="flex flex-col max-lg:flex-row gap-2 grow items-center md:items-start justify-center my-2">
                            <LinkButtonComponent text="Angebot machen"
                                                 additionalClasses="bg-emerald hover:bg-jet transition-all w-1/2 lg:px-2 py-1 lg:py-1.5 xl:text-xl"/>
                            <LinkButtonComponent text="Zur Merkliste hinzufügen"
                                                 additionalClasses="bg-emerald hover:bg-jet transition-all w-1/2 lg:px-2 py-1 lg:py-1.5 xl:text-xl"/>

                        </div>

                        <div className="">
                            <h2 className="font-bold mb-2">Verkäufer:</h2>
                            <div className="flex flex-col">
                                <div className="flex gap-4">
                                    <h3 className="font-semibold w-6/12 lg:w-5/12">Nutzername</h3>
                                    <p>NUTZERNAME LOGIK</p>
                                </div>
                                <div className="flex gap-4">
                                    <h3 className="font-semibold w-6/12 lg:w-5/12">Durchschnittliche Bewertung</h3>
                                    <p>BEWERTUNG LOGIK</p>
                                </div>
                                <div className="flex gap-4">
                                    <h3 className="font-semibold w-6/12 lg:w-5/12">Mitglied seit</h3>
                                    <p>CREATED LOGIK</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="border-y border-gray-300 py-4 max-lg:px-2">
                    <h2 className="font-bold mb-2">Produktdetails:</h2>
                    <div className="flex gap-4">
                        <h3 className="font-semibold w-6/12 lg:w-3/12">Preis</h3>
                        <p>{product.price} €</p>
                    </div>
                    <div className="flex gap-4">
                        <h3 className="font-semibold w-6/12 lg:w-3/12">Zustand</h3>
                        <p>{product.condition}</p>
                    </div>
                    <div className="flex gap-4">
                        <h3 className="font-semibold w-6/12 lg:w-3/12">Inseriert seit:</h3>
                        <p>{formattedDate}</p>
                    </div>
                </div>
                <div className="max-lg:px-2">
                    <h2 className="font-bold mt-4 mb-2">Beschreibung:</h2>
                    <div className="flex gap-4">
                        <p>{product.description}</p>
                    </div>

                </div>
            </div>

        </>
    )
}