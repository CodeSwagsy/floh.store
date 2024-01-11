export function SearchfieldComponent({additionalClasses}) {
    const classes = `relative rounded-lg shadow-sm ${additionalClasses}`
    return (
        <div className={classes}>
            <div
                className="pointer-events-none absolute inset-y-0 left-[10px] top-[2px] flex items-center">
                <img src="/lupe.png" alt="Suchfeld"/>
            </div>
            <input
                type="text"
                name="searchfield"
                id="searchfield"
                className="block w-full max-lg:bg-jet/0 bg-jet/20 rounded-lg border-0 py-0.5 xl:py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-transparent placeholder:text-gray-600 focus:ring-2 focus:ring-inset hover:ring-emerald hover:ring-2 focus:ring-emerald focus:outline-emerald sm:text-sm sm:leading-6"
                placeholder="Was suchst du?"
            />
        </div>
    )
}