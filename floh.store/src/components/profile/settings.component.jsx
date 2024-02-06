import {useEffect, useState} from "react";
import {useData} from "../../context/signin.context.jsx";
import {DeleteAccountModalComponent} from "./DeleteAccountModal.component.jsx";
import {SuccessModalComponent} from "./SuccessModal.component.jsx";
import {useNavigate} from "react-router-dom";

export function SettingsComponent() {
    const navigate = useNavigate()
    const {login, updateLogin} = useData()
    const {userData, updateUserData} = useData();
    const [passwords, setPasswords] = useState({
        currentPass: "",
        password: "",
    });
    const [email, setEmail] = useState(userData ? userData.doc.email : "");
    const [about, setAbout] = useState({
        username: userData ? userData.doc.info.about.username : "",
        street: userData ? userData.doc.info.about.location.street : "",
        house: userData ? userData.doc.info.about.location.house : "",
        zip: userData ? userData.doc.info.about.location.zip : "",
        tel: userData ? userData.doc.info.about.tel : "",
        city: userData ? userData.doc.info.about.location.city : "",
        gender: userData ? userData.doc.info.about.gender : "",
        birthday: userData ? userData.doc.info.about.birthday : "",
    });

    const options = [
        {value: "keine Angabe", label: "keine Angabe"},
        {value: "male", label: "männlich"},
        {value: "female", label: "weiblich"},
        {value: "other", label: "divers"},
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        if (!isModalOpen) {
            setIsModalOpen(true);
        }
    };

    const closeModal = (e) => {
        if (e) {
            e.preventDefault();
        }
        setIsModalOpen(false);
    };

    const openSuccess = (e) => {
        if (e) {
            e.preventDefault();
        }
        if (!showSuccessModal) {
            setShowSuccessModal(true);
        }
    };

    const closeSuccess = (e) => {
        if (e) {
            e.preventDefault();
        }
        setShowSuccessModal(false);
    };

    const handlePasswordChange = (e) => {
        const {name, value} = e.target;
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [name]: value,
        }));
    };

    const handleAboutChange = (e) => {
        const {name, value} = e.target;

        const updatedAbout = {...about};

        updatedAbout[name] = value;

        setAbout(updatedAbout);
        console.log(updatedAbout)
    };


    const handleUpdatePassword = async (e) => {
        e.preventDefault()
        if (passwords.currentPass !== passwords.password) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API}/user/update/password`, {
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
                    openSuccess()
                } else {
                    console.error("Fehler beim Aktualisieren des Passwort:", data.message);
                }
            } catch (error) {
                console.error("Fehler beim Aktualisieren des Passwort:", error);
            }
        }
    };
    useEffect(() => {

        if (!login) {
            navigate("/")
        }
    }, []);


    const handleUpdateEmail = async (e) => {
        e.preventDefault()
        if (email !== userData.doc.email) {
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
                    openSuccess()
                } else {
                    console.error("Fehler beim Aktualisieren der Emailadresse:", data.message);
                }
            } catch (error) {
                console.error("Fehler beim Aktualisieren der Emailadresse:", error);
            }
        }
    };


    const handleUpdateUser = async (e) => {
        if (e) {
            e.preventDefault()
        }
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
                openSuccess()
            } else {
                console.error("Error fetching users:", data.message);
            }
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    };


    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold  lg:mt-12 max-lg:my-2 my-4 lg:mb-8">Profileinstellungen</h1>
                <form className="flex flex-col flex-wrap gap-y-2 justify-between border-t pt-4 pb-8"
                      onSubmit={handleUpdateUser}>
                    <div>
                        <h2 className="text-2xl font-semibold max-lg:my-2 my-4">Benutzerdaten</h2>
                        <div className="flex w-full lg:justify-between border-b py-4">
                            <label htmlFor="username" className="max-lg:w-7/12 w-4/12">Benutzername</label>
                            <input type="text" name="username"
                                   defaultValue={userData ? userData.doc.info.about.username : ""}
                                   onChange={handleAboutChange}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-y-2 justify-between border-b py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="street" className="max-lg:w-7/12 w-4/12">Straße</label>
                            <input type="text" name="street"
                                   onChange={handleAboutChange}
                                   defaultValue={userData ? userData.doc.info.about.location.street : ""}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="house" className="max-lg:w-7/12 w-4/12">Hausnummer</label>
                            <input type="text" name="house"
                                   onChange={handleAboutChange}
                                   defaultValue={userData ? userData.doc.info.about.location.house : ""}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="zip" className="max-lg:w-7/12 w-4/12">Postleitzahl</label>
                            <input type="text" name="zip"
                                   onChange={handleAboutChange}
                                   defaultValue={userData ? userData.doc.info.about.location.zip : ""}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="city" className="max-lg:w-7/12 w-4/12">Wohnort</label>
                            <input type="text" name="city"
                                   onChange={handleAboutChange}
                                   defaultValue={userData ? userData.doc.info.about.location.city : ""}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-y-2 justify-between border-b py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="gender" className="max-lg:w-7/12 w-4/12">Geschlecht</label>
                            <select
                                name="gender"
                                onChange={handleAboutChange}
                                className="block placeholder:bg-emerald w-full lg:w-6/12"
                                defaultValue={userData ? userData.doc.info.about.gender : ""}
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
                            <input type="date" name="birthday"
                                   onChange={handleAboutChange}
                                   defaultValue={userData ? userData.doc.info.about.birthday.slice(0, 10) : ""}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-y-2 justify-between py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="tel" className="max-lg:w-7/12 w-4/12">Telefonnummer</label>
                            <input type="tel" name="tel"
                                   onChange={handleAboutChange}
                                   defaultValue={userData ? userData.doc.info.about.tel : ""}
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end gap-2 lg:gap-4">
                        <button
                            type="submit"
                            className="flex shadow-sm flex-row items-center justify-center text-whitesmoke rounded-lg bg-emerald px-2 py-1 w-3/12 lg:w-1/12 hover:bg-springgreen transition-all"

                        >
                            Speichern
                        </button>
                    </div>
                </form>
                <form className="flex flex-col flex-wrap gap-y-2 justify-between border-t pt-4 pb-8"
                      onSubmit={handleUpdateEmail}>
                    <h2 className="text-2xl font-semibold max-lg:my-2 my-4">E-Mail Adresse</h2>
                    <div className="flex w-full lg:justify-between">
                        <label htmlFor="name" className="max-lg:w-7/12 w-4/12">E-Mail Adresse</label>
                        <input type="email" name="email"
                               onChange={(e) => setEmail(e.target.value)}
                               defaultValue={userData ? userData.doc.email : ""}
                               className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                    </div>
                    <div className="flex flex-row justify-end gap-2 lg:gap-4 mt-4 ">
                        <button
                            type="submit"
                            className="flex shadow-sm flex-row items-center justify-center text-whitesmoke rounded-lg bg-emerald px-2 py-1 w-3/12 lg:w-1/12 hover:bg-springgreen transition-all"

                        >
                            Speichern
                        </button>
                    </div>
                </form>

                <form className="flex flex-col flex-wrap gap-y-2 justify-between border-y pt-4
                pb-8" onSubmit={handleUpdatePassword}>
                    <h2 className="text-2xl font-semibold max-lg:my-2 my-4">Passwort</h2>

                    <div className="flex w-full lg:justify-between">
                        <label htmlFor="password" className="max-lg:w-7/12 w-4/12">Altes Passwort</label>
                        <input type="password" name="currentPass"
                               onChange={handlePasswordChange}
                               value={passwords.currentPass}
                               className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                    </div>
                    <div className="flex w-full lg:justify-between">
                        <label htmlFor="confirmpassword" className="max-lg:w-7/12 w-4/12">Neues Passwort
                        </label>
                        <input type="password" name="password"
                               onChange={handlePasswordChange}
                               value={passwords.password}
                               className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                    </div>
                    <div className="flex flex-row justify-end gap-2 lg:gap-4 mt-4">
                        <button
                            type="submit"
                            className="flex shadow-sm flex-row items-center justify-center text-whitesmoke rounded-lg bg-emerald px-2 py-1 w-3/12 lg:w-1/12 hover:bg-springgreen transition-all"

                        >
                            Speichern
                        </button>
                    </div>
                </form>
                <form action="">
                    <h1 className="text-2xl font-semibold max-lg:my-2 my-4">Account löschen</h1>
                    <div className="flex flex-row max-lg:flex-col justify-between lg:items-center mt-4">
                        <p className="text-justify lg:w-11/12">Wenn sie ihren Account löschen ist das unwiderruflich!
                            Nach einem Klick auf den Button werden Sie nochmals gefragt ob Sie dies wirklich tun
                            möchten.</p>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                openModal(e);
                            }}
                            className="flex shadow-sm flex-row items-center max-lg:self-end justify-center text-whitesmoke rounded-lg bg-red-700 px-2 py-1 w-3/12 lg:w-1/12 max-lg:mt-4 hover:bg-red-500 transition-all"

                        >
                            Löschen
                        </button>
                        {isModalOpen && (
                            <DeleteAccountModalComponent closeModal={closeModal} modalOpen={setIsModalOpen}/>
                        )}
                        {showSuccessModal &&
                            <SuccessModalComponent closeSuccess={closeSuccess} successOpen={setShowSuccessModal}/>}
                    </div>
                </form>
            </div>
        </>
    )
}