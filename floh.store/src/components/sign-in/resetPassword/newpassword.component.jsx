import {Link, useNavigate} from "react-router-dom";
import {ButtonComponent} from "../../hero/button.component";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export function NewPasswordComponent() {
    const [error, setError] = useState("")
    const token = useParams()
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        password: "",
        passwordConfirm: "",
    })
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const validatePassword = () => {
        // Password validation logic
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validatePassword()) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API}/user/password/apply`,
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({token: token.token, password: credentials.password}),
                    }
                );

                const data = await response.json();

                if (response.status === 200) {
                    console.log("Passwort erfolgreich geändert:", data);
                    setSuccess(true)
                } else {
                    console.error("Passwortänderung fehlgeschlagen:", data);
                }
            } catch (error) {
                console.error("Fehler bei der Passwortänderung:", error);

            }
        }
    }


    useEffect(() => {
        if (success) {
            const timeoutId = setTimeout(() => {
                navigate('/');
            }, 3000);

            return () => clearTimeout(timeoutId);
        }
    }, [success, navigate]);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    {success ? (<>
                            <h2 className="text-center text-2xl text-emerald font-bold leading-9 tracking-tight">
                                Passwort erfolgreich zurückgesetzt!
                            </h2>

                            <p className="text-center pt-4">Du wirst in wenigen Sekunden auf die Startseite
                                weitergeleitet</p>
                        </>

                    ) : (
                        <>
                            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 pb-10">
                                Gib dein neues Passwort ein!
                            </h2>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Neues Passwort
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="password"
                                            required
                                            placeholder=" ••••••••"
                                            onChange={handleChange}
                                            className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Neues Passwort wiederholen
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="passwordConfirm"
                                            name="passwordConfirm"
                                            type="password"
                                            placeholder=" ••••••••"
                                            autoComplete="current-password"
                                            onChange={handleChange}
                                            required
                                            className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="pb-4 flex flex-col gap-4 w-full justify-center rounded-md">
                                    <ButtonComponent
                                        spantxt="Bestätigen"
                                        size="large"
                                        height="height"
                                    />
                                    <p className="text-red-600 text-center">{error}</p>
                                </div>

                            </form>
                            <div>
                                <div className=" pb-0 w-full border-t border-gray-200"></div>
                                <p className="mt-4 text-center text-sm text-gray-500">
                                    Noch kein mitglied?{" "}
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
