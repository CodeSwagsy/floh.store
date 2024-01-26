import {Link, useNavigate} from "react-router-dom";
import {ButtonComponent} from "../hero/button.component";
import {useEffect, useState} from "react";
import {useData} from "../../context/signin.context.jsx";

export function SigninComponent() {
    const {userData, updateUserData} = useData();
    const {login, updateLogin} = useData()
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const uid = localStorage.getItem("responseData");


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/user/login`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            if (response.status === 200) {
                updateLogin(true)
                localStorage.setItem("responseData", data.uid);
            } else {
                setError(error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

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
                    updateUserData(data);
                    if (login) {
                        navigate("/")
                    }
                } else {
                    console.error("Error fetching users:", data.message);
                }
            } catch (error) {
                console.error("Error fetching users:", error.message);
            }
        };
        fetchUser();
    }, [login]);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 pb-10">
                        Mit deinem Konto Anmelden
                    </h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Deine Email
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleInputChange}
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
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Passwort
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleInputChange}
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder=" ••••••••"
                                    autoComplete="current-password"
                                    required
                                    className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-0 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-3 block text-sm leading-6 text-gray-900"
                                >
                                    Speichern
                                </label>
                            </div>
                            <div className="text-sm leading-6">
                                <Link
                                    to="/profile/forgotpassword"
                                    className="font-semibold  hover:text-black text-emerald hover:text-black underline underline-offset-4 ease-in duration-300"
                                >
                                    Passwort vergessen?
                                </Link>
                            </div>
                        </div>
                        <div className="pb-8  flex w-full justify-center rounded-md">
                            <ButtonComponent
                                text="Anmelden"
                                size="large"
                                buttonType="submit"
                                height="height"
                            />
                        </div>
                    </form>
                    <div>
                        <div className=" pb-0 w-full border-t border-gray-200"></div>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Noch kein mitglied?{" "}
                            <Link
                                to="/profile/register"
                                className="font-semibold  hover:text-black text-emerald hover:text-black underline underline-offset-4 ease-in duration-300"
                            >
                                Jetzt Registrieren!
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
