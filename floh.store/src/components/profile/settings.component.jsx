import {useEffect, useState} from "react";

export function SettingsComponent() {
    const options = [
        {value: "keine Angabe", label: "keine Angabe"},
        {value: "male", label: "männlich"},
        {value: "female", label: "weiblich"},
        {value: "divers", label: "divers"},
    ];

    const [selectedGender, setSelectedGender] = useState(options[0].value);
    const [isFormEnabled, setIsFormEnabled] = useState(false);
    const [formState, setFormState] = useState(true)
    const [cancelButtonClass, setCancelButtonClass] = useState("bg-jet/20");
    const [saveButtonText, setSaveButtonText] = useState("Ändern")

    const toggleForm = () => {
        setIsFormEnabled(!isFormEnabled);

        if (isFormEnabled) {
            setCancelButtonClass("bg-jet/20");
            setSaveButtonText("Ändern")
            setFormState(true)
        } else {
            setCancelButtonClass("bg-red-700");
            setSaveButtonText("Speichern")
            setFormState(false)
        }
    };

    const abortHandler = () =>{
        toggleForm()
    }

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://api.floh.store/user/about/65ae73ec4da60910ca7d43e6`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                if (data.code === 200) {
                    setUser(data.user);
                    console.log(data.user)
                } else {
                    console.error("Error fetching users:", data.message);
                }
            } catch (error) {
                console.error("Error fetching users:", error.message);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold  lg:mt-12 mb-4 lg:mb-8">Profileinstellungen</h1>
                <form className="">
                    <div className="flex flex-wrap gap-y-2 justify-between border-y py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="username" className="w-4/12">Benutzername</label>
                            <input disabled={formState} type="text" name="username"
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="name" className="w-4/12">Email</label>
                            <input disabled={formState} type="email" name="email"
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="password" className="w-4/12">Password</label>
                            <input disabled={formState} type="password" name="password"
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-y-2 justify-between border-b py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="street" className="w-4/12">Straße</label>
                            <input disabled={formState} type="text" name="street"
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="house" className="w-4/12">Hausnummer</label>
                            <input disabled={formState} type="text" name="house"
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="zip" className="w-4/12">Postleitzahl</label>
                            <input disabled={formState} type="text" name="zip"
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="city" className="w-4/12">Wohnort</label>
                            <input disabled={formState} type="text" name="city"
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-y-2 justify-between border-b py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="gender" className="w-4/12">Geschlecht</label>
                            <select disabled={formState}
                                    name="gender"
                                    className="block placeholder:bg-emerald w-full lg:w-6/12"
                                    value={selectedGender}
                                    onChange={(e) => setSelectedGender(e.target.value)}
                            >
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="birthday" className="w-4/12">Geburtstag</label>
                            <input disabled={formState} type="date" name="birthday"
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-y-2 justify-between border-b py-4">
                        <div className="flex w-full lg:justify-between">
                            <label htmlFor="tel" className="w-4/12">Telefonnummer</label>
                            <input disabled type="tel" name="tel"
                                   className="block placeholder:bg-emerald w-full lg:w-6/12"/>
                        </div>
                    </div>
                </form>
                <div className="flex flex-row justify-end gap-2 lg:gap-4 mt-4 lg:mt-8">
                    <button disabled={formState}
                            onClick={abortHandler}
                        className={`flex shadow-sm flex-row items-center justify-center text-whitesmoke rounded-lg ${cancelButtonClass} px-2 py-1 w-2/12 lg:w-1/12`}
                    >
                        Abbrechen
                    </button>
                    <button
                        type="submit"
                        className="flex shadow-sm flex-row items-center justify-center text-whitesmoke rounded-lg bg-emerald px-2 py-1 w-2/12 lg:w-1/12"
                        onClick={toggleForm}
                    >
                        {saveButtonText}
                    </button>
                </div>
            </div>
        </>
    )
}