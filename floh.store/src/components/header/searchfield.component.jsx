export function SearchfieldComponent({additionalClasses}) {
    const classes = `relative rounded-lg shadow-sm ${additionalClasses}`
    return (
        <div className={classes}>
            <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Was suchst du?"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button type="submit">
                    <img src="/lupe.png" alt="Suchfeld"/>
                </button>
            </div>
        </div>

    )
}

