import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Link, useNavigate} from "react-router-dom";
import {LoaderComponent} from "../loader/loader.component.jsx";
import SendMessage from "../sendMessage/sendMessage.component.jsx";
import {Tooltip} from "./Tooltip.component.jsx";
import {useParams} from "react-router-dom";
import {ImageComponent} from "./Image.component.jsx";
import {useData} from "../../context/signin.context.jsx";

export function SingleProductComponent({socket, users, setMessages}) {
    const {id} = useParams();
    const login = localStorage.getItem("login");
    const [product, setProduct] = useState(null);
    const [type, setType] = useState("");
    const [formattedDate, setFormattedDate] = useState(null);
    const [owner, setOwner] = useState(null);
    const [durchschnittsRating, setDurchschnittsRating] = useState(0);
    const [isConnected, setIsConnected] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [favoriteText, setFavoriteText] = useState("Zur Merkliste hinzufügen");
    const [disableButton, setDisableButton] = useState(false);
    const [disabledClasses, setDisabledClasses] = useState(
        "bg-gray-400 cursor-default hover:bg-gray-400"
    );
    const {updateSearchedProducts, updateStartSearch} = useData()
    const navigate = useNavigate()

    const handleAddToFavorites = async () => {
        if (login === "true") {
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
                    console.log("FAVORITE HINZUGEFÜGT");
                    setFavoriteText("Zur Merkliste hinzugefügt");
                } else {
                    console.log(data);
                    console.log(product);
                    console.error("Error adding to favorites:", data.message);
                }
            } catch (error) {
                console.error("Error adding to favorites:", error);
            }
        } else {
            console.log("NICHT EINGELOGGT!");
        }
    };

    const breadCrumbHandler = async () => {
        try {
            let url = `${import.meta.env.VITE_API}/product/category/${product.category}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            if (data.code === 200) {
                updateStartSearch(true)
                updateSearchedProducts(data.products)
                navigate(`/products/gallery/category/${product.category}`);
            }
        } catch (error) {

            console.error("Fehler beim Abrufen der Daten:", error);
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API}/product/id/${id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
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
        if (login === "true") {
            setDisableButton(false);
            setDisabledClasses(
                "bg-emerald cursor-pointer hover:text-jet hover:bg-springgreen"
            );
        } else {
            setDisableButton(true);
            setDisabledClasses("hover:bg-gray-400 cursor-default bg-red");
        }
    }, []);

    useEffect(() => {
        if (product) {
            const createdAtDate = new Date(product.createdAt);
            setFormattedDate(createdAtDate.toLocaleString());
            const fetchOwner = async () => {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_API}/user/about/${product.owner}`,
                        {
                            method: "GET",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const data = await response.json();
                    if (data.code === 200) {
                        setOwner(data.doc);
                        if (product.type === "need") {
                            setType("Gesuch");
                        } else if (product.type === "offer") {
                            setType("Angebot");
                        }
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
    }, [owner]);

    useEffect(() => {
        if (users?.find((u) => u.userID === owner?._id)) {
            setIsConnected(true);
        } else {
            setIsConnected(false);
        }
    }, [users, owner]);

    return (
        <>
            {product !== null && product !== undefined ? (
                <>
                    <div className="container mx-auto lg:mt-12">
                        <div className="flex pb-4">
                            <p className="lg:text-2xl font-semibold underline hover:cursor-pointer" onClick={breadCrumbHandler}>{product?.category}
                            </p>
                            <h2 className="lg:text-2xl no-underline">
                                &nbsp; / {product ? product.title : " "}
                            </h2>
                        </div>
                        <div className="flex flex-col lg:flex-row justify-between lg:pb-4">
                            <div className="lg:w-6/12 relative overflow-hidden">
                                <ImageComponent
                                    images={product.images}
                                    status={product?.status}
                                />
                            </div>
                            <div
                                className="max-lg:mb-2 max-lg:px-2 flex flex-col lg:justify-center lg:w-5/12 max-lg:mt-4">
                                <div className="w-1/2 leading-10">
                                    <h2 className="text-2xl lg:text-3xl font-bold text-emerald lg:mb-4 lg:leading-10">
                                        {type}
                                    </h2>
                                    <h1 className="text-lg lg:text-3xl font-bold ">
                                        {product ? product.title : " "}
                                    </h1>
                                    <p className="text-lg lg:text-2xl font-bold ">
                                        {product ? product.price : " "} €
                                    </p>
                                    <div className="text-lg flex my-4 flex-row gap-2 ">
                                        <h2 className="">{product ? product.location.zip : " "}</h2>
                                        <p className="">{product ? product.location.city : " "}</p>
                                    </div>
                                </div>

                                <div
                                    className="flex flex-col grow items-center lg:items-start justify-center my-2 w-full">
                                    {/* code from Ihor */}
                                    <div
                                        className="flex flex-col gap-4  items-center lg:items-start justify-center max-lg:my-2 max-lg:flex-row w-full">
                                        <button
                                            onClick={() => setShowPopup(true)}
                                            className="flex shadow-sm flex-row items-center justify-center text-whitesmoke rounded-lg bg-emerald hover:bg-springgreen hover:text-jet transition-all w-1/2 lg:px-2 py-1 py-2.5 max-md:text-sm xl:text-xl"
                                        >
                                            Nachricht senden
                                        </button>
                                        {login === "true" ? (
                                            <>
                                                <button
                                                    onClick={handleAddToFavorites}
                                                    disabled={disableButton}
                                                    className={`flex shadow-sm flex-row items-center justify-center text-whitesmoke rounded-lg w-1/2 lg:px-2 py-2.5 max-md:text-sm xl:text-xl text-white transition-all ${disabledClasses}`}
                                                >
                                                    {favoriteText}
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Tooltip
                                                    text="Anmeldung notwendig um Produkte zur Merkliste hinzuzufügen">
                                                    <button
                                                        disabled={disableButton}
                                                        className={`flex shadow-sm bg-gray-400 cursor-default flex-row items-center justify-center text-whitesmoke rounded-lg w-full lg:px-2 py-2.5 max-md:text-sm xl:text-xl text-white transition-all ${disabledClasses}`}
                                                    >
                                                        {favoriteText}
                                                    </button>
                                                </Tooltip>
                                            </>
                                        )}
                                    </div>
                                    <button
                                        className="lg:my-2 flex shadow-sm flex-row items-center justify-center text-whitesmoke rounded-lg bg-jet hover:bg-springgreen hover:text-jet transition-all w-full lg:w-1/2 lg:px-2 py-1 py-2.5 max-md:text-sm xl:text-xl">
                                        <Link to={`/profile/user-products/${product.owner}`}>
                                            Alle Anzeigen des Verkäufers
                                        </Link>
                                    </button>
                                </div>

                                <div className="">
                                    <div className="flex gap-4">
                                        {/* code from Ihor */}
                                        <h2 className="font-bold mb-2 w-6/12 lg:w-5/12">
                                            Verkäufer:
                                        </h2>
                                        <p
                                            style={
                                                isConnected ? {color: "green"} : {color: "red"}
                                            }
                                        >
                                            {isConnected ? "ONLINE ⦿" : "OFFLINE ⦿"}
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex gap-4">
                                            <h3 className="font-semibold w-6/12 lg:w-5/12">
                                                Nutzername
                                            </h3>
                                            <p>{owner ? owner.info.about.username : ""}</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <h3 className="font-semibold w-6/12 lg:w-5/12">
                                                Bewertung &Oslash;
                                            </h3>
                                            <p className="font-semibold">
                        <span>
                          {owner ? berechneDurchschnitt(owner.info.rating) : ""}
                        </span>{" "}
                                                / 5
                                            </p>
                                        </div>
                                        <div className="flex gap-4">
                                            <h3 className="font-semibold w-6/12 lg:w-5/12">
                                                Mitglied seit
                                            </h3>
                                            <p>
                                                {owner && owner.createdAt
                                                    ? new Date(owner.createdAt).toLocaleDateString()
                                                    : ""}
                                            </p>
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
                                <h3 className="font-semibold w-6/12 lg:w-3/12">
                                    Inseriert seit:
                                </h3>
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
                    {/* code von ihor */}
                    {showPopup ? (
                        <SendMessage
                            product={product}
                            setShowPopup={setShowPopup}
                            socket={socket}
                            users={users}
                            setMessages={setMessages}
                        />
                    ) : (
                        ""
                    )}
                </>
            ) : (
                <LoaderComponent/>
            )}
        </>
    );
}

SingleProductComponent.propTypes = {
    socket: PropTypes.object,
    users: PropTypes.array,
    setMessages: PropTypes.func,
};
