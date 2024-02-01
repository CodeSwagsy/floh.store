import {useEffect, useState} from "react";
import {useData} from "../../context/signin.context.jsx";

export function SettingsComponent() {
    const {userData, updateUserData} = useData();
    const [passwords, setPasswords] = useState({
        currentPass: "",
        password: "",
    });
    const [email, setEmail] = useState(userData.doc.email);
    const [about, setAbout] = useState({
        username: userData.doc.info.username,
        street: userData.doc.info.about.location.street,
        house: userData.doc.info.about.location.house,
        zip: userData.doc.info.about.location.zip,
        tel: userData.doc.info.about.tel,
        city: userData.doc.info.about.location.city,
        gender: userData.doc.info.about.gender,
        birthday: userData.doc.info.about.birthday,
    });


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

    useEffect(() => {
        setEmail(userData.doc ? userData.doc.email : "");
    }, [userData]);

    const toggleForm = () => {
        const hasPasswordChanges = passwords.currentPass !== "" || passwords.password !== "";
        const hasEmailChanges = email !== userData.doc.email;
        const hasAboutChanges =
            about.username !== userData.doc.info.username ||
            about.street !== userData.doc.info.about.location.street ||
            about.house !== userData.doc.info.about.location.house ||
            about.zip !== userData.doc.info.about.location.zip ||
            about.tel !== userData.doc.info.about.tel ||
            about.city !== userData.doc.info.about.location.city ||
            about.gender !== userData.doc.info.about.gender ||
            about.birthday !== userData.doc.info.about.birthday;

        setIsFormEnabled(!isFormEnabled);

        if (isFormEnabled) {
            setCancelButtonClass("bg-jet/20");
            setSaveButtonText("Ändern");
            setFormState(true);

            // Überprüfe den Änderungsstatus und rufe entsprechende Update-Funktionen auf
            if (hasPasswordChanges) {
                handleUpdatePassword();
            }

            if (hasEmailChanges) {
                handleUpdateEmail();
            }

            if (hasAboutChanges) {
                handleUpdateUser();
            }

            // Rufe hier weitere Update-Funktionen auf, wenn sich weitere Dinge geändert haben

        } else {
            setCancelButtonClass("bg-red-700");
            setSaveButtonText("Speichern");
            setFormState(false);
        }
    };


    const abortHandler = () => {
        setIsFormEnabled(false);
        setCancelButtonClass("bg-jet/20");
        setSaveButtonText("Ändern");
        setFormState(true);
        fetchUser()
    }

    const handlePasswordChange = (e) => {
        const {name, value} = e.target;
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [name]: value,
        }));
    };

    const handleUpdatePassword = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/user/update/email`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(passwords),
            });

            const data = await response.json();
            if (data.code === 200) {
                console.log("Passwort erfolgreich aktualisiert");

            } else {
                console.error("Fehler beim Aktualisieren des Passwort:", data.message);
            }
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Passwort:", error);
        }
    };

    const handleUpdateEmail = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/user/update/email`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({newEmail: email}),
            });

            const data = await response.json();
            if (data.code === 200) {
                console.log("Emailadresse erfolgreich aktualisiert");

            } else {
                console.error("Fehler beim Aktualisieren der Emailadresse:", data.message);
            }
        } catch (error) {
            console.error("Fehler beim Aktualisieren der Emailadresse:", error);
        }
    };

    const handleAboutChange = (e) => {
        const {name, value} = e.target;

        const updatedAbout = {...about};

            updatedAbout[name] = value;

        setAbout(updatedAbout);
    };

    const uid = localStorage.getItem("uid");
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
                updateUserData(data);
            } else {
                console.error("Error fetching users:", data.message);
            }
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    };

    const handleUpdateUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/user/update/about`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    about: {
                        username: about.username,
                        location: {
                            zip: about.zip,
                            city: about.city,
                            street: about.street,
                            house: about.house,
                        },
                        gender: about.gender,
                        tel: about.tel,
                        birthday: about.birthday,
                    },
                }),
            });
            const data = await response.json();
            if (data.code === 200) {
                updateUserData(data);
            } else {
                console.error("Error fetching users:", data.message);
            }
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    };

    console.log(userData)
    console.log(about)

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold  lg:mt-12 my-4 lg:mb-8">Profileinstellungen</h1>
                <form className="">
                    <div className="flex flex-wrap gap-y-2 justify-between border-y py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="username" className="max-lg:w-7/12 w-4/12">Benutzername</label>
                            <input disabled={formState} type="text" name="username"
                                   defaultValue={about.doc ? about.doc.info.about.username : userData.doc.info.about.username}
                                   onChange={handleAboutChange}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="name" className="max-lg:w-7/12 w-4/12">Email</label>
                            <input disabled={formState} type="email" name="email"
                                   onChange={(e) => setEmail(e.target.value)}
                                   defaultValue={userData.doc ? userData.doc.email : ""}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-y-2 justify-between border-b py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="street" className="max-lg:w-7/12 w-4/12">Straße</label>
                            <input disabled={formState} type="text" name="street"
                                   onChange={handleAboutChange}
                                   defaultValue={userData.doc ? userData.doc.info.about.location.street : " "}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="house" className="max-lg:w-7/12 w-4/12">Hausnummer</label>
                            <input disabled={formState} type="text" name="house"
                                   onChange={handleAboutChange}
                                   defaultValue={userData.doc ? userData.doc.info.about.location.house : " "}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="zip" className="max-lg:w-7/12 w-4/12">Postleitzahl</label>
                            <input disabled={formState} type="text" name="zip"
                                   onChange={handleAboutChange}
                                   defaultValue={userData.doc ? userData.doc.info.about.location.zip : " "}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="city" className="max-lg:w-7/12 w-4/12">Wohnort</label>
                            <input disabled={formState} type="text" name="city"
                                   onChange={handleAboutChange}
                                   defaultValue={userData.doc ? userData.doc.info.about.location.city : " "}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-y-2 justify-between border-b py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="gender" className="max-lg:w-7/12 w-4/12">Geschlecht</label>
                            <select disabled={formState}
                                    name="gender"
                                    onChange={handleAboutChange}
                                    className="block placeholder:bg-emerald w-full lg:w-6/12"
                                    defaultValue={userData.doc ? userData.doc.info.about.gender : " "}
                            >
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="birthday" className="max-lg:w-7/12 w-4/12">Geburtstag</label>
                            <input disabled={formState} type="date" name="birthday"
                                   onChange={handleAboutChange}
                                   defaultValue={userData.doc ? userData.doc.info.about.birthday.slice(0, 10) : ""}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-y-2 justify-between border-b py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="tel" className="max-lg:w-7/12 w-4/12">Telefonnummer</label>
                            <input disabled={formState} type="tel" name="tel"
                                   onChange={handleAboutChange}
                                   defaultValue={userData.doc ? userData.doc.info.about.tel : ""}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                </form>
                <form action="">
                    <h1 className="text-3xl font-bold my-4 lg:my-8">Passwort ändern</h1>
                    <div className="flex flex-wrap gap-y-2 justify-between border-y py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="password" className="max-lg:w-7/12 w-4/12">Altes Passwort</label>
                            <input disabled={formState} type="password" name="currentPass"
                                   onChange={handlePasswordChange}
                                   value={passwords.currentPass}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="confirmpassword" className="max-lg:w-7/12 w-4/12">Neues Passwort
                            </label>
                            <input disabled={formState} type="password" name="password"
                                   onChange={handlePasswordChange}
                                   value={passwords.password}
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
                <form action="">
                    <h1 className="text-3xl font-bold my-4 lg:my-8">Account löschen</h1>
                </form>

            </div>
        </>
    )
}