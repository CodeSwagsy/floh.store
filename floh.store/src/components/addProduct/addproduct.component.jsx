import {useState} from "react";
import {ButtonComponent} from "../hero/button.component";
import "./addproduct.component.css";
import {useData} from "../../context/signin.context.jsx";
import {Link} from "react-router-dom";

export function AddProductComponent() {
    const [loader, setLoader] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const uid = localStorage.getItem("uid");
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const onChangeHandlerImages = async (e) => {
        e.preventDefault();
        setLoader(true);
        const images = e.target.files;
        const prevImages = credentials.images || [];

        if (images && images.length !== prevImages.length) {
            try {
                const imageUrls = [];
                for (let i = 0; i < images.length; i++) {
                    const url = await uploadToCloud(images[i]);
                    imageUrls.push(url);
                }

                setCredentials((prevCredentials) => ({
                    ...prevCredentials,
                    images: [...prevCredentials.images, ...imageUrls],
                }));
                setLoader(false);
                setUploadError(null); // Reset upload error state

            } catch (error) {
                console.error(error);
                setLoader(false);
                setUploadError("Error uploading images. Please try again."); // Set upload error state
            }
        }
    }

    const [credentials, setCredentials] = useState({
        location: {
            zip: "",
            city: "",
        },
        type: "",
        title: "",
        category: "",
        condition: "",
        price: "",
        description: "",
        images: [],
    });


    async function uploadToCloud(file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${
                import.meta.env.VITE_CLOUD_NAME
            }/image/upload`,
            {method: "POST", body: formData}
        );
        const data = await res.json();
        return data.secure_url;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!credentials.type) {
            setError("Bitte wählen Sie aus, ob Sie einen Artikel suchen oder anbieten möchten.");
            return;
        }
        if (credentials.title.length <= 10) {
            setError("Der Titel der Anzeige muss mindestens 10 Zeichen lang sein.")
        }
        if (!credentials.zip) {
            setError("Bitte geben Sie ihre Postleitzahl ein.");
            return;
        }
        if (!credentials.city) {
            setError("Bitte geben Sie ihren Wohnort ein.");
            return;
        }
        if (credentials.images.length === 0 && credentials.type === "offer") {
            setError("Bitte laden Sie Bilder von Ihrem Artikel hoch");
            return;
        }
        const expectedObject = {
            location: {
                zip: credentials.zip,
                city: credentials.city
            },
            type: credentials.type,
            title: credentials.title,
            category: credentials.category,
            condition: credentials.condition,
            price: credentials.price,
            description: credentials.description,
            images: credentials.images,
            owner: uid,


        };
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API}/product/create`,
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(expectedObject),
                }
            );

            const data = await response.json();

            if (response.status === 201) {
                setSuccess(true)
                console.log("Produktupload erfolgreich:", data);
            } else {
                console.error("Produktupload fehlgeschlagen:", data);
            }
        } catch
            (error) {
            console.error("Fehler beim Produktupload:", error);
        }
    }

    const onChangeHandler = (e) => {
        const {name, value} = e.target;

        // If the input has a nested name (e.g., "location.zip"), split it and update the state accordingly
        if (name.includes(".")) {
            const [parentKey, childKey] = name.split(".");
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                [parentKey]: {
                    ...prevCredentials[parentKey],
                    [childKey]: value,
                },
            }));
        } else {
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                [name]: value,
            }));
        }
        console.log(credentials)
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center md:py-12 sm:px-1.5 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-[700px]">
                <div className="md:bg-white px-2 py-4 md:py-8 md:drop-shadow sm:rounded-lg md:px-12">
                    {success ? (<>
                            <h2 className="text-center text-2xl text-jet font-bold leading-9 tracking-tight mb-12">
                                Deine Anzeige wurde erstellt!
                            </h2>
                            <Link to="/"><ButtonComponent text="Zurück zur Startseite"
                                                          additionalclasses="flex items-center justify-center"
                                                          size="large" height="height"/></Link>
                        </>
                    ) : (<>
                        <h1 className="text-3xl font-bold mb-4 lg:mb-8 text-center border-b pb-4 lg:pb-8">
                            Erstelle deine Anzeige!
                        </h1>
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="flex max-md:flex-col justify-end gap-4 lg:mb-8 border-b pb-4 lg:pb-8">
                                <div className="flex max-md:flex-col gap-5 md:justify-between">
                                    <label className="md:w-44 md:-mr-[1px]">
                                        <input type="radio" value="need" className="peer hidden" name="type"
                                               onChange={onChangeHandler}/>
                                        <div
                                            className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 ring-1 ring-inset focus:outline-none ring-emerald rounded-lg cursor-pointer text-sm border-emerald group peer-checked:border-emerald">
                                            <h2 className="font-medium text-gray-700 mx-2">Ich suche</h2>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="currentColor"
                                                 className="w-4 lg:w-8 w-4 lg:h-8 text-emerald invisible group-[.peer:checked+&]:visible">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                    </label>
                                    <label className="md:w-44">
                                        <input type="radio" value="offer" className="peer hidden" name="type"
                                               onChange={onChangeHandler}/>
                                        <div
                                            className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 ring-1 ring-inset focus:outline-none ring-emerald rounded-lg cursor-pointer text-sm border-emerald group peer-checked:border-emerald">
                                            <h2 className="font-medium text-gray-700 mx-2">Ich biete</h2>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="currentColor"
                                                 className="w-4 lg:w-8 w-4 lg:h-8 text-emerald invisible group-[.peer:checked+&]:visible">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="flex max-md:items-center justify-between">
                                <label
                                    htmlFor="titel"
                                    className="block font-medium w-2/5 leading-6 text-gray-900 "
                                >
                                    Titel
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    autoComplete=""
                                    required
                                    onChange={onChangeHandler}
                                    placeholder="Geben Sie hier den Titel ihrer Anzeige ein..."
                                    className="p-2.5 block max-md:w-full w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none ring-emerald placehoder:text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald focus:outline-none sm:text-sm sm:leading-6"
                                />

                            </div>
                            <div className="flex max-md:items-center justify-between">
                                <label
                                    htmlFor="category"
                                    className="w-2/5 block font-medium leading-6 text-gray-900 "
                                >
                                    Kategorie
                                </label>
                                <div className="flex w-48 max-md:w-full justify-end">
                                    <select
                                        id="category"
                                        name="category"
                                        className="p-2.5 w-48 max-md:w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6 focus:outline-none appearance-none text-center"
                                        defaultValue="na"
                                        onChange={onChangeHandler}
                                    >
                                        <option className="pr-1" value="na" disabled>Wählen sie aus...</option>
                                        <option className="text-left pr-1" value="Elektronik">Elektronik</option>
                                        <option className="text-left pr-1" value="Kleidung & Accessoires">Kleidung &
                                            Accessoires
                                        </option>
                                        <option className="text-left pr-1" value="Haushalt & Möbel">Haushalt & Möbel
                                        </option>
                                        <option className="text-left pr-1" value="Sport & Freizeit">Sport & Freizeit
                                        </option>
                                        <option className="text-left pr-1" value="Fahrzeuge">Fahrzeuge</option>
                                        <option className="text-left pr-1" value="Bücher & Medien">Bücher & Medien
                                        </option>
                                        <option className="text-left pr-1" value="Hobby & Sammeln">Hobby & Sammeln
                                        </option>
                                        <option className="text-left pr-1" value="Garten & Pflanzen">Garten & Pflanzen
                                        </option>
                                        <option className="text-left pr-1" value="Tierbedarf">Tierbedarf</option>
                                        <option className="text-left pr-1" value="Dienstleistungen">Dienstleistungen
                                        </option>
                                        <option className="text-left pr-1" value="Sonstiges">Sonstiges</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-between max-md:items-center">
                                <label
                                    htmlFor="price"
                                    className="block font-medium leading-6 text-gray-900 max-md:w-2/5"
                                >
                                    Preis
                                </label>
                                <input
                                    id="price"
                                    name="price"
                                    type="text"
                                    required
                                    pattern="^[0-9]+(\.[0-9]{1,2})?$"
                                    placeholder="Euro"
                                    onChange={onChangeHandler}
                                    className="p-2.5 w-48 max-md:w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald focus:outline-none sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="flex justify-between max-md:items-center">
                                <label
                                    htmlFor="condition"
                                    className="block font-medium leading-6 text-gray-900 max-md:w-2/5"
                                >
                                    Zustand
                                </label>
                                <select id="condition" name="condition" required
                                        className="p-2.5 w-48 max-md:w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6 focus:outline-none appearance-none text-center"
                                        defaultValue="na"
                                        onChange={onChangeHandler}
                                >
                                    <option className="pr-1" value="na" disabled>Wählen sie aus...</option>
                                    <option className="text-left pr-1" value="Neu">Neu</option>
                                    <option className="text-left pr-1" value="Sehr gut">Sehr gut</option>
                                    <option className="text-left pr-1" value="Gut">Gut</option>
                                    <option className="text-left pr-1" value="Akzeptabel">Akzeptabel</option>
                                    <option className="text-left pr-1" value="Defekt">Defekt</option>
                                </select>
                            </div>
                            <div className="flex justify-between max-md:items-center">
                                <label
                                    htmlFor="price"
                                    className="block font-medium leading-6 text-gray-900 max-md:w-2/5"
                                >
                                    Postleitzahl
                                </label>
                                <input
                                    id="zip"
                                    name="zip"
                                    type="text"
                                    required
                                    pattern="^[0-9]{5}$"
                                    placeholder="Postleitzahl"
                                    onChange={onChangeHandler}
                                    className="p-2.5 w-48 max-md:w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald focus:outline-none sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="flex justify-between max-md:items-center">
                                <label
                                    htmlFor="price"
                                    className="block font-medium leading-6 text-gray-900 max-md:w-2/5"
                                >
                                    Ort
                                </label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    required
                                    placeholder="Ort"
                                    onChange={onChangeHandler}
                                    className="p-2.5 w-48 max-md:w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald focus:outline-none sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="flex justify-between max-md:items-center">
                                <label
                                    htmlFor="description"
                                    className="w-2/5 font-medium leading-6 text-gray-900"
                                >
                                    Beschreibung
                                </label>

                                <textarea
                                    id="description"
                                    name="description"
                                    rows="5"
                                    placeholder="Geben Sie hier die Beschreibung ihrer Anzeige ein..."
                                    onChange={onChangeHandler}
                                    className="p-2.5  max-md:w-full w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm  ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald focus:outline-none sm:text-sm sm:leading-6 resize-none"
                                />
                            </div>
                            <div className="flex items-center justify-center w-full flex-col border-b pb-4 lg:pb-8">
                                <label
                                    htmlFor="upload"
                                    className="font-medium leading-6 text-gray-900 mb-2"
                                >
                                    Bilder
                                </label>

                                <label
                                    htmlFor="dropzone-file"
                                    className={`flex flex-col items-center justify-center w-full h-58 border-2 border-emerald border-dashed rounded-lg cursor-pointer bg-white hover:bg-emerald  hover:border-white transition-all relative group ${
                                        loader ? "pointer-events-none" : ""
                                    }`}
                                >
                                    {loader && (
                                        <div
                                            className="flex justify-center items-center bg-black bg-opacity-50 rounded-lg w-full h-full absolute">
                                            <div
                                                className="animate-spin w-10 h-10 border-t-4 border-green-500 border-solid rounded-full"></div>
                                        </div>
                                    )}
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-black group-hover:text-whitesmoke "
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm  group-hover:text-whitesmoke">
                                        <span
                                            className="font-semibold group-hover:text-whitesmoke">Uploade deine Bilder</span>{" "}
                                            drag and drop
                                        </p>
                                        <p className="text-xs group-hover:text-whitesmoke">
                                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                                        </p>
                                    </div>
                                    <input
                                        id="dropzone-file"
                                        className="hidden"
                                        type="file"
                                        accept="image/*"
                                        multiple={true}
                                        onChange={onChangeHandlerImages}
                                    />
                                </label>
                                <div className="flex flex-wrap gap-2 w-full">
                                    {credentials.images && credentials.images.map((link, index) => (
                                        <div className="relative mt-2" key={index}>
                                            <img
                                                src={link}
                                                alt={"uploaded image" + index}
                                                className="w-[100px] h-[100px] object-contain mt-2.5 border border-emerald rounded-lg"

                                            />
                                            <p
                                                className="absolute i-own-add-product-image-delete hover:bg-emerald hover:text-white bg-gray-300 bg-opacity-50 hover:cursor-pointer transition-all"
                                                onClick={() => {
                                                    setCredentials(prevCredentials => {
                                                        const updatedImages = [...prevCredentials.images];
                                                        updatedImages.splice(index, 1);
                                                        return {...prevCredentials, images: updatedImages};
                                                    });
                                                }}
                                            >
                                                ×
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                                <ButtonComponent size="large" spantxt="Jetzt Anzeige erstellen" height="height"/>
                            </div>
                            <p className="text-red-600 text-center mt-4">{error}</p>
                        </form>
                        <div className="max-md:hidden pb-0 w-full border-t border-gray-200"></div>
                    </>)}

                </div>
            </div>
        </div>
    );
}
