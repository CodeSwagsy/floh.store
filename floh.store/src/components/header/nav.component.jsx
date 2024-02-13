import {Fragment, useEffect, useRef, useState} from "react";
import {Menu, Transition} from "@headlessui/react";
import {UserIcon} from "@heroicons/react/20/solid";
import {Link, useNavigate} from "react-router-dom";
import {useData} from "../../context/signin.context.jsx";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export function NavComponent() {
    const [isActive, setIsActive] = useState(false);
    const menuRef = useRef(null);
    const {userData, updateUserData, counter} = useData();
    const {login, updateLogin} = useData();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/user/logout`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            if (data.code === 200) {
                updateLogin(false); // Aktualisieren Sie den Anmeldestatus
                updateUserData(null); // Setzen Sie Benutzerdaten auf null
                localStorage.removeItem("uid"); // Entfernen Sie die UID aus dem Local Storage
                localStorage.removeItem("loginData"); // Optional: Entfernen Sie auch die Anmeldedaten mit dem Zeitstempel
                console.log("Logged out");
                navigate("/");
            } else {
                console.log("Logout failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsActive(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <Menu
            as="div"
            className="relative inline-block text-left group"
            ref={menuRef}
        >
            <div>
                <Menu.Button
                    className={
                        "lg:h-[44px] lg:w-[44px] inline-flex w-full items-center justify-center gap-x-1.5 rounded-lg bg-white  max-lg:p-2.5 lg:max-xl:p-0.5  p-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-jet group-hover:ring-springgreen transition-all" +
                        (isActive ? " ring-springgreen" : " ring-jet")
                    }
                    onClick={() => setIsActive(!isActive)}
                >
                    <UserIcon
                        className={classNames(
                            "h-5 w-5",
                            isActive ? "text-springgreen ring-springgreen" : "group-hover:text-springgreen text-jet transition-all"
                        )}
                        aria-hidden="true"
                    />
                    {counter ? (
                        <span
                            // style={{
                            //   // TODO: Styling with Tailwind
                            //   position: "absolute",
                            //   top: "-5px",
                            //   right: "-5px",
                            //   backgroundColor: "red",
                            //   color: "whitesmoke",
                            //   width: "15px",
                            //   height: "15px",
                            //   display: "flex",
                            //   alignItems: "center",
                            //   justifyContent: "center",
                            //   fontSize: "xx-small",
                            //   borderRadius: "50%",
                            // }}
                            className="absolute -top-[5px] -right-[5px] bg-red-600 text-whitesmoke w-[15px] h-[15px] flex items-center justify-center text-xs rounded-full"
                        >
              {counter}
            </span>
                    ) : (
                        ""
                    )}
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3">
                        <p className="text-sm">
                            {login && userData ? "Angemeldet als:" : "Nicht angemeldet"}
                        </p>
                        <p className="truncate text-sm font-bold text-gray-900 mt-2">
                            {" "}
                            {login && userData && userData.doc && userData.doc.info ? (
                                userData.doc.info.about.username
                            ) : (
                                <Link to="/profile/signin">Anmelden / Registrieren</Link>
                            )}
                        </p>
                    </div>
                    {login && userData ? (
                        <>
                            <div className="py-1">
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            to="/profile/favoriteproducts"
                                            className={classNames(
                                                active ? "bg-springgreen text-gray-900" : "text-gray-700",
                                                "block px-4 py-2 text-sm"
                                            )}
                                        >
                                            Meine Merkliste
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            to="/profile/user-products/"
                                            className={classNames(
                                                active ? "bg-springgreen text-gray-900" : "text-gray-700",
                                                "block px-4 py-2 text-sm"
                                            )}
                                        >
                                            Meine Verkäufe
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            to="/profile/messages"
                                            className={classNames(
                                                active ? "bg-springgreen text-gray-900" : "text-gray-700",
                                                "block px-4 py-2 text-sm"
                                            )}
                                        >
                                            Meine Benachrichtigungen
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="py-1">
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            to={`/profile/settings/`}
                                            className={classNames(
                                                active ? "bg-springgreen text-gray-900" : "text-gray-700",
                                                "block px-4 py-2 text-sm"
                                            )}
                                        >
                                            Profileinstellungen
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="py-1">
                                <Menu.Item>
                                    {({active}) => (
                                        <button
                                            type="submit"
                                            className={classNames(
                                                active ? "bg-springgreen text-gray-900" : "text-gray-700",
                                                "" + "block w-full px-4 py-2 text-left text-sm"
                                            )}
                                            onClick={handleLogout}
                                        >
                                            Abmelden
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </>
                    ) : null}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
