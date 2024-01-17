import { Link } from "react-router-dom";
import { ButtonComponent } from "../../hero/button.component";

export function RegisterComponent() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 pb-10">
            Registrieren
          </h2>
          <div className="w-24 py-4">
            <label
              htmlFor="gender"
              className="block  text-sm font-medium leading-6 text-gray-900"
            >
              Anrede
            </label>
            <select
              id="gender"
              name="gender"
              placeholder="Anrede"
              className="  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald  focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6 "
            >
              <option value="Herr">Herr</option>
              <option value="Frau">Frau</option>
              <option value="KeineAngabe">Transformer</option>
            </select>
          </div>
          <form className="space-y-6" action="#" method="POST">
            <div className="flex space-x-6">
              <div className="w-1/2">
                <label
                  htmlFor="grid-username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <input
                  id="grid-username"
                  name="grid-username"
                  type="text"
                  placeholder="Username"
                  className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="grid-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <input
                  id="grid-name"
                  name="grid-name"
                  type="text"
                  placeholder="name"
                  className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Telefon Nummer
              </label>
              <input
                id="number"
                name="number"
                type="number"
                placeholder="Telefon Nummer"
                className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label
                htmlFor="grid-street"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email@adresse.com"
                className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex space-x-6">
              <div className="w-1/2">
                <label
                  htmlFor="grid-zip"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Postleitzahl
                </label>
                <input
                  id="grid-zip"
                  name="grid-zip"
                  type="text"
                  placeholder="Postleitzahl"
                  className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="grid-city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stadt
                </label>
                <input
                  id="grid-city"
                  name="grid-city"
                  type="text"
                  placeholder="Stadt"
                  className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex space-x-6">
              <div className="w-1/2">
                <label
                  htmlFor="grid-street"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Straße
                </label>
                <input
                  id="grid-street"
                  name="grid-street"
                  type="text"
                  placeholder="Straße"
                  className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="grid-housenumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Hausnummer
                </label>
                <input
                  id="grid-housenumber"
                  name="grid-housenumber"
                  type="text"
                  placeholder="Hausnummer"
                  className="p-2.5  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
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
                className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex items-center">
              <input
                id="AGB"
                name="AGB"
                type="checkbox"
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
              <ButtonComponent text="Registrieren" />
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
