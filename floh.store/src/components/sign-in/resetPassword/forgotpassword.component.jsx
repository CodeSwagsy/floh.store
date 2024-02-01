import {Link} from "react-router-dom";
import {ButtonComponent} from "../../hero/button.component";
import {useState} from "react";

export function ForgotPasswordComponent() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("")
    const [recovered, setRecovered] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API}/user/password/recover`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({email: email}),
                    }
                );

                const data = await response.json();

                if (response.status === 200) {
                    setRecovered(true)
                } else {
                    console.error("Zurücksetzen des Passworts fehlgeschlagen:", data);
                    if (data.error.message === "User not found") {
                        setError("Diese E-Mail Adresse ist nicht vorhanden.")
                        console.log(error)
                    }
                }
            } catch (error) {
                console.error("Fehler beim zurücksetzen des Passworts:", error);
            }
        }
    }

    const handleChange = (e) => {
        setEmail(e.target.value)
    }


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    {recovered ? (<>
                            <h2 className="text-center text-2xl text-jet font-bold leading-9 tracking-tight">
                                Passwortwiederherstellung erfolgreich!
                            </h2>
                            <p className="text-center text-emerald py-4 ">Checke jetzt deine E-Mails und klicke auf den Link.</p>
                            <Link to="/"><ButtonComponent text="Zurück zur Startseite"
                                                          additionalclasses="flex items-center justify-center"
                                                          size="large" height="height"/></Link>
                        </>
                    ) : (
                        <>
                            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 pt-2 pb-2">
                                Passwort Wiederherstellen
                            </h2>
                            <p className="mt-6 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-600 py-8">
                                Gib die E-Mail-Adresse von deinem Konto ein für, Passwort
                                wiederherstellung
                            </p>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Deine E-Mail-Adresse
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            onChange={handleChange}
                                            placeholder="Email@adresse.com"
                                            className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <ButtonComponent
                                        spantxt="Absenden"
                                        size="large"
                                        height="height"
                                        buttonType="submit"
                                    />
                                </div>
                                <p className="text-red-600 text-center pb-4">{error}</p>
                            </form>

                            <div>
                                <div className=" pb-0 w-full border-t border-gray-200"></div>
                                <p className="mt-10 text-center text-sm text-gray-500">
                                    Noch kein Mitglied?{" "}
                                    <Link
                                        to="/profile/register"
                                        className="font-semibold  hover:text-black text-emerald hover:text-black underline underline-offset-4 ease-in duration-300"
                                    >
                                        Jetzt Registrieren!
                                    </Link>
                                </p>
                            </div>
                        </>)}
                </div>
            </div>
        </div>
    );
}
