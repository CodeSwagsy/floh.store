export function CategoryComponent({additionalClasses, selectClasses}) {
    const classes = additionalClasses || ''
    const moreClasses = selectClasses || ''
    return (
        <div className={`flex justify-center ${classes}`}>
            <select
                id="location"
                name="location"
                className={`block rounded-md border-0 text-gray-900 sm:text-sm sm:leading-6 bg-transparent font-bold ${moreClasses}`}
                defaultValue="kategorien"
            >
                <option className="text-left pr-3" disabled value="kategorien">Kategorien</option>
                <option className="text-left pr-3" value="Elektronik">Elektronik</option>
                <option className="text-left pr-3" value="Kleidung & Accessoires">Kleidung & Accessoires</option>
                <option className="text-left pr-3" value="Haushalt & Möbel">Haushalt & Möbel</option>
                <option className="text-left pr-3" value="Sport & Freizeit">Sport & Freizeit</option>
                <option className="text-left pr-3" value="Fahrzeuge">Fahrzeuge</option>
                <option className="text-left pr-3" value="Bücher & Medien">Bücher & Medien</option>
                <option className="text-left pr-3" value="Hobby & Sammeln">Hobby & Sammeln</option>
                <option className="text-left pr-3" value="Garten & Pflanzen">Garten & Pflanzen</option>
                <option className="text-left pr-3" value="Tierbedarf">Tierbedarf</option>
                <option className="text-left pr-3" value="Dienstleistungen">Dienstleistungen</option>
                <option className="text-left pr-3" value="Sonstiges">Sonstiges</option>
            </select>
        </div>
    )
}