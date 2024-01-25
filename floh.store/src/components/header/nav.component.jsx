import {Fragment, useEffect, useRef, useState} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {UserIcon} from '@heroicons/react/20/solid'
import {Link} from "react-router-dom";
import {useData} from "../../context/signin.context.jsx";


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export function NavComponent() {
    const [isActive, setIsActive] = useState(false);
    const menuRef = useRef(null);
    const {userData, updateUserData} = useData();

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
                    className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-lg bg-white  max-lg:p-2.5 lg:max-xl:p-0.5 lg:max-xl:mt-[4px] p-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-jet"
                    onClick={() => setIsActive(!isActive)}
                >
                    <UserIcon
                        className={classNames(
                            "h-5 w-5",
                            isActive ? "text-emerald" : "text-jet"
                        )}
                        aria-hidden="true"
                    />
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
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3">
                        <p className="text-sm">Angemeldet als:</p>
                   
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            {({active}) => (
                                <Link
                                    to="/profile/favoriteproducts"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Meine Merkliste
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({active}) => (
                                <Link
                                    to="/profile/ownproducts"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Meine Verkäufe
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({active}) => (
                                <Link
                                    to="/"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Meine Benachrichtigungen
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <form method="POST" action="#">
                            <Menu.Item>
                                {({active}) => (
                                    <Link
                                        to={`/profile/settings/${userData.uid}`}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Profileinstellungen
                                    </Link>
                                )}
                            </Menu.Item>
                        </form>
                    </div>
                    <div className="py-1">
                        <form method="POST" action="#">
                            <Menu.Item>
                                {({active}) => (
                                    <button
                                        type="submit"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            '' +
                                            'block w-full px-4 py-2 text-left text-sm'
                                        )}
                                    >
                                        Abmelden
                                    </button>
                                )}
                            </Menu.Item>
                        </form>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )

}
