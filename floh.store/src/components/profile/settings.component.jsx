import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useData} from "../../context/signin.context.jsx";

export function SettingsComponent() {
    const {id} = useParams()
    const {userData, updateUserData} = useData();


    const options = [
        {value: "keine Angabe", label: "keine Angabe"},
        {value: "male", label: "männlich"},
        {value: "female", label: "weiblich"},
        {value: "other", label: "divers"},
    ];

    const [selectedGender, setSelectedGender] = useState(options[0].value);
    const [isFormEnabled, setIsFormEnabled] = useState(false);
    const [formState, setFormState] = useState(true)
    const [cancelButtonClass, setCancelButtonClass] = useState("bg-jet/20");
    const [saveButtonText, setSaveButtonText] = useState("Ändern")

    const uid = localStorage.getItem("responseData");
    console.log(uid)

    const toggleForm = () => {
        setIsFormEnabled(!isFormEnabled);

        if (isFormEnabled) {
            setCancelButtonClass("bg-jet/20");
            setSaveButtonText("Ändern")
            setFormState(true)
        } else {
            setCancelButtonClass("bg-red-700");
            setSaveButtonText("Speichern")
            setFormState(false)
        }
    };

    const abortHandler = () => {
        toggleForm()
    }

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API}/user/about/${uid}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                if (data.code === 200) {
                    setUser(data);
                } else {
                    console.error("Error fetching users:", data.message);
                    console.log(uid)
                }
            } catch (error) {
                console.error("Error fetching users:", error.message);
            }
        };
        fetchUser();
    }, []);


    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold  lg:mt-12 mb-4 lg:mb-8">Profileinstellungen</h1>
                <form className="">
                    <div className="flex flex-wrap gap-y-2 justify-between border-y py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="username" className="w-4/12">Benutzername</label>
                            <input disabled={formState} type="text" name="username"
                                   value={user.doc ? user.doc.info.about.username : " "}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="name" className="w-4/12">Email</label>
                            <input disabled={formState} type="email" name="email"
                                   value={user.doc ? user.doc.email : " "}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="password" className="w-4/12">Password</label>
                            <input disabled={formState} type="password" name="password"
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-y-2 justify-between border-b py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="street" className="w-4/12">Straße</label>
                            <input disabled={formState} type="text" name="street"
                                   value={user.doc ? user.doc.info.about.location.street : " "}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="house" className="w-4/12">Hausnummer</label>
                            <input disabled={formState} type="text" name="house"
                                   value={user.doc ? user.doc.info.about.location.house : " "}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="zip" className="w-4/12">Postleitzahl</label>
                            <input disabled={formState} type="text" name="zip"
                                   value={user.doc ? user.doc.info.about.location.zip : " "}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="city" className="w-4/12">Wohnort</label>
                            <input disabled={formState} type="text" name="city"
                                   value={user.doc ? user.doc.info.about.location.city : " "}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-y-2 justify-between border-b py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="gender" className="w-4/12">Geschlecht</label>
                            <select disabled={formState}
                                    name="gender"
                                    className="block placeholder:bg-emerald w-full lg:w-6/12"
                                    value={user.doc ? user.doc.info.about.gender : " "}
                                    onChange={(e) => setSelectedGender(e.target.value)}
                            >
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="birthday" className="w-4/12">Geburtstag</label>
                            <input disabled={formState} type="date" name="birthday"
                                   value={user.doc ? user.doc.info.about.birthday : " "}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-y-2 justify-between border-b py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="tel" className="w-4/12">Telefonnummer</label>
                            <input disabled type="tel" name="tel" value={user.doc ? user.doc.info.about.tel : " "}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                </form>
                <div className="flex flex-row justify-end gap-2 lg:gap-4 mt-4 lg:mt-8">
                    <button disabled={formState}
                            onClick={abortHandler}
                            className={`flex shadow-sm flex-row items-center justify-center text-whitesmoke rounded-lg ${cancelButtonClass} px-2 py-1 w-2/12 lg:w-1/12`}
                    >
                        Abbrechen
                    </button>
                    <button
                        type="submit"
                        className="flex shadow-sm flex-row items-center justify-center text-whitesmoke rounded-lg bg-emerald px-2 py-1 w-2/12 lg:w-1/12"
                        onClick={toggleForm}
                    >
                        {saveButtonText}
                    </button>
                </div>
            </div>
        </>
    )
}