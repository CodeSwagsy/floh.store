import {useEffect, useState} from "react";
import {useParams} from "react-router";

export function SingleProductComponent() {
    const { id } = useParams();
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
            <div className="container mx-auto">
                <div className="flex py-4">
                    <h2 className="font-semibold underline">{product.category}</h2>
                    <h2 className="no-underline">&nbsp; / {product.title}</h2>
                </div>
                <div className="flex flex-col lg:flex-row justify-between">
                    <div className="max-lg:px-2 lg:w-5/12 pb-4 lg:mb-4 flex justify-center items-center">
                        <img src={product.images ? product.images[0] : " "} alt="TESTBILD"/>
                    </div>
                    <div className="max-lg:w-full w-5/12 max-lg:mb-4 max-lg:px-2">
                        <h1 className="text-lg font-bold">{product.title}</h1>
                        <p className="text-lg font-bold">{product.price} €</p>
                        <div className="flex flex-row gap-2">
                            <h2 className="">{product.location ? product.location.zip : " "}</h2>
                            <p className="">{product.location ? product.location.city : " "}</p>
                        </div>
                    </div>


                </div>
                <div className="border-y border-gray-300 py-4 max-lg:px-2">
                    <h2 className="font-bold mb-2">Produktdetails:</h2>
                    <div className="flex gap-4">
                        <h3 className="font-semibold max-lg:w-3/12 w-2/12">Preis</h3>
                        <p>{product.price} €</p>
                    </div>
                    <div className="flex gap-4">
                        <h3 className="font-semibold max-lg:w-3/12 w-2/12">Zustand</h3>
                        <p>{product.condition}</p>
                    </div>
                    <div className="flex gap-4">
                        <h3 className="font-semibold max-lg:w-3/12 w-2/12">Inseriert seit:</h3>
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