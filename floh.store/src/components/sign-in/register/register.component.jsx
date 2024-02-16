import {Link} from "react-router-dom";
import {ButtonComponent} from "../../hero/button.component";
import {useEffect, useState} from "react";

export function RegisterComponent() {
    const [credentials, setCredentials] = useState({
        username: "",
        name: "",
        password: "",
        passwordConfirm: "",
        number: "",
        email: "",
        street: "",
        house: "",
        zip: "",
        city: "",
        gender: "male",
        birthday: "",
        datenschutz: false,
    });

    const [register, setRegister] = useState(false)
    const [error, setError] = useState("")

    const validatePassword = () => {

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (credentials.password !== credentials.passwordConfirm) {
            setError('Die Passwörter stimmen nicht überein');
            console.log(false)
            return false;
        } else if (!passwordRegex.test(credentials.password)) {
            setError('Password muss 8 oder mehr Zeichen, mindestens einen Klein-/Großbuchstaben, eine Ziffer und ein Sonderzeichen enthalten.');
            return false;
        }
        setError('');
        return true;
    };
    const fakeEmail = Math.random() + "@you.de"

    const handleSubmit = async (e) => {
        e.preventDefault();


        const expectedObject = {
            email: credentials.email.toLowerCase(),
            newEmail: fakeEmail.slice(2),
            password: credentials.password,
            info: {
                about: {
                    username: credentials.username,
                    location: {
                        zip: credentials.zip,
                        city: credentials.city,
                        street: credentials.street,
                        house: credentials.house,
                    },
                    gender: credentials.gender,
                    tel: credentials.number,
                    birthday: credentials.birthday,
                },
            },
        };

        if (validatePassword()) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API}/user/register`,
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "same-origin",
                        body: JSON.stringify(expectedObject),
                    }
                );

                const data = await response.json();

                if (response.status === 201) {
                    setRegister(true)
                } else {
                    console.error("Registrierung fehlgeschlagen:", data);
                    if (data.error.code === 401) {
                        setError("Dieser Benutzer ist bereits vorhanden")
                        console.log(error)
                    }
                }
            } catch (error) {
                console.error("Fehler bei der Registrierung:", error);
            }
        }
    }

    const handleChange = (e) => {
        const {name, type, checked, value} = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center max-lg:py-6 py-12 sm:px-6 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div
                    className="bg-white px-6 max-lg:py-6 py-12 shadow sm:rounded-lg sm:px-12 flex flex-col items-center justify-center">
                    {register ? (<>
                            <h2 className="text-center text-2xl text-jet font-bold leading-9 tracking-tight">
                                Erfolgreich registriert!
                            </h2>
                            <p className="text-center text-emerald py-4">Checke jetzt deine E-Mails und bestätige deine
                                Registrierung.</p>
                            <Link to="/"><ButtonComponent text="Zurück zur Startseite"
                                                          additionalclasses="flex items-center justify-center w-full"
                                                          size="large" height="height"/></Link>
                        </>
                    ) : (<>
                        < h2
                            className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 pb-10">
                            Registrieren
                        < /h2>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Benutzername
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Benutzername"
                                    required
                                    onChange={handleChange}
                                    className="focus:outline-none p-2.5 block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:emerald sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    E-Mail Adresse
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="E-Mail Adresse"
                                    required
                                    onChange={handleChange}
                                    className="focus:outline-none p-2.5 block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Passwort
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder=" ••••••••"
                                    required
                                    onChange={handleChange}
                                    className="focus:outline-none p-2.5 block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="passwordConfirm"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Passwort bestätigen
                                </label>
                                <input
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    type="password"
                                    placeholder=" ••••••••"
                                    onChange={handleChange}
                                    className="focus:outline-none p-2.5 block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="number"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Telefonnummer
                                </label>
                                <input
                                    id="number"
                                    name="number"
                                    type="tel"
                                    placeholder="Telefon Nummer"
                                    onChange={handleChange}
                                    className="focus:outline-none p-2.5 block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="flex space-x-6">
                                <div className="w-1/2">
                                    <label
                                        htmlFor="street"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Straße
                                    </label>
                                    <input
                                        id="street"
                                        name="street"
                                        type="text"
                                        placeholder="Straße"
                                        onChange={handleChange}
                                        className="focus:outline-none p-2.5 block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label
                                        htmlFor="house"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Hausnummer
                                    </label>
                                    <input
                                        id="house"
                                        name="house"
                                        type="text"
                                        placeholder="Hausnummer"
                                        onChange={handleChange}
                                        className="focus:outline-none p-2.5  w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-6">
                                <div className="w-1/2">
                                    <label
                                        htmlFor="zip"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Postleitzahl
                                    </label>
                                    <input
                                        id="zip"
                                        name="zip"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                        pattern="^[0-9]{5}$"
                                        placeholder="Postleitzahl"
                                        className="focus:outline-none p-2.5 block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label
                                        htmlFor="city"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Stadt
                                    </label>
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        placeholder="Stadt"
                                        required
                                        onChange={handleChange}
                                        className="focus:outline-none p-2.5 block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-6">
                                <div className="w-1/2">
                                    <label
                                        htmlFor="gender"
                                        className="block  text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Geschlecht
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        onChange={handleChange}
                                        className="focus:outline-none p-2.5 block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald  focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                                    >
                                        <option value="male">männlich</option>
                                        <option value="female">weiblich</option>
                                        <option value="other">divers</option>
                                    </select>
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="birthday" className="block  text-sm font-medium leading-6 text-gray-900">Geburtstag</label>
                                    <input type="date" name="birthday"
                                           onChange={handleChange}
                                           className="focus:outline-none block w-full rounded-lg border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald  focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="datenschutz"
                                    name="datenschutz"
                                    type="checkbox"
                                    required
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-0 text-indigo-600 focus:ring-emerald"
                                />
                                <label
                                    htmlFor="datenschutz"
                                    className="ml-3 block text-sm leading-6 text-gray-900"
                                >
                                    Hiermit akzeptiere ich die{" "}
                                    <Link
                                        to="/datenschutz" target="_blank"
                                        className="font-semibold  hover:black text-emerald hover:text-black underline underline-offset-4 transition-all"
                                    >
                                        Datenschutzerklärung!
                                    </Link>
                                </label>
                            </div>
                            <div className="py-4 flex flex-col gap-4 justify-center items-center">
                                <ButtonComponent
                                    text="Registrieren"
                                    size="large"
                                    buttonType="submit"
                                    height="height"
                                    additionalclasses=""
                                />
                                <p className="text-red-600 text-center">{error}</p>
                            </div>

                        </form>

                        <div>
                            <div className="w-full border-t border-gray-200"></div>
                            <p className="mt-8 text-center text-sm text-gray-500">
                                Du bist schon mitglied?{" "}
                                <Link
                                    to="/profile/signin"
                                    className="font-semibold  hover:text-black text-emerald hover:text-black underline underline-offset-4 transition-all"
                                >
                                    Jetzt mit deinem Konto Anmelden!
                                </Link>
                            </p>
                        </div>
                    </>)}
                </div>
            </div>
        </div>
    )
        ;
}
