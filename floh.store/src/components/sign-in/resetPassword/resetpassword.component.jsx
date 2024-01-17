import { Link } from "react-router-dom";
import { ButtonComponent } from "../hero/button.component";

export function ResetPassword() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 pb-10">
            Password Wiederherstellen
            <p>
              Gib die Email adresse von deinem Konto ein für Passwort
              wiederherstellung
            </p>
          </h2>
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Deine Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email@adresse.com"
                  className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex w-full justify-center rounded-md">
              <ButtonComponent text="Absenden" spantxt="" />
            </div>
          </form>

          <div>
            <div className="relative mt-10 pt-1">
              <p className="mt-10 text-center text-sm text-gray-500">
                Noch kein mitglied?{" "}
                <Link
                  to="/profile/resetPassword"
                  className="font-semibold  hover:text-indigo-500 text-emerald hover:text-black underline underline-offset-4 ease-in duration-300"
                >
                  Jetzt Registrieren!
                </Link>
              </p>
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
