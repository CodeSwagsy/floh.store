import { Link } from "react-router-dom";
import { ButtonComponent } from "../../hero/button.component";
import {useState} from "react";

export function RegisterComponent() {
    const [credentials, setCredentials] = useState({
        username: '',
        name: '',
        password: '',
        number: '',
        email: '',
        street: '',
        house: '',
        zip: '',
        city: '',
        gender: 'other', // Standardwert
        AGB: false, // Standardwert
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const expectedObject = {
            email: credentials.email,
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
                    birthday: "2000-01-01", // Beispielwert, den du eventuell dynamisch setzen möchtest
                },
            },
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API}/user/register`, {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "same-origin",
                body: JSON.stringify(expectedObject),
            });

            const data = await response.json();

            if (response.status === 200) {
                // Erfolgreiche Registrierung
                console.log('Registrierung erfolgreich:', data);
            } else {
                // Registrierung fehlgeschlagen
                console.error('Registrierung fehlgeschlagen:', data);
            }
        } catch (error) {
            console.error('Fehler bei der Registrierung:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 pb-10">
                        Registrieren
                    </h2>

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
                                className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:emerald sm:text-sm sm:leading-6"
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
                                className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
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
                                className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password-confirm"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Passwort bestätigen
                            </label>
                            <input
                                id="password-confirm"
                                name="password-confirm"
                                type="password"
                                placeholder=" ••••••••"
                                className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
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
                                className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
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
                                    className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
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
                                    className="p-2.5  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
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
                                    className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
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
                                    className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex space-x-6 mr-6">
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
                                    className="p-2.5 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald  focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                                >
                                    <option value="male">männlich</option>
                                    <option value="female">weiblich</option>
                                    <option value="other">divers</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="AGB"
                                name="AGB"
                                type="checkbox"
                                checked={credentials.AGB}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-0 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                                htmlFor="AGB"
                                className="ml-3 block text-sm leading-6 text-gray-900"
                            >
                                Ich akzeptiere die{" "}
                                <Link
                                    to="#"
                                    className="font-semibold  hover:black text-emerald hover:text-black underline underline-offset-4 ease-in duration-300"
                                >
                                    (AGB's)!
                                </Link>
                            </label>
                        </div>
                        <div className="pb-8 flex justify-center pt-6">
                            <ButtonComponent spantxt="Registrieren" size="large" buttonType="submit"/>
                        </div>
                    </form>

          <div>
            <div className="w-full border-t border-gray-200"> </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              Du bist schon mitglied?{" "}
              <Link
                to="/profile/signin"
                className="font-semibold  hover:text-black text-emerald hover:text-black underline underline-offset-4 ease-in duration-300"
              >
                Jetzt mit deinem Konto Anmelden!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
