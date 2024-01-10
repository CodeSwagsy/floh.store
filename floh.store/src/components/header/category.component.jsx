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
                <option className="text-left pr-3" value="elektronik">Elektronik</option>
                <option className="text-left pr-3" value="kleidung">Kleidung & Accessoires</option>
                <option className="text-left pr-3" value="haushalt">Haushalt & Möbel</option>
                <option className="text-left pr-3" value="sport">Sport & Freizeit</option>
                <option className="text-left pr-3" value="fahrzeuge">Fahrzeuge</option>
                <option className="text-left pr-3" value="buecher">Bücher & Medien</option>
                <option className="text-left pr-3" value="hobby">Hobby & Sammeln</option>
                <option className="text-left pr-3" value="garten">Garten & Pflanzen</option>
            </select>
        </div>
    )
}