import React, {useRef} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useData} from "../../context/signin.context.jsx";

export function SearchfieldComponent() {
    const {updateSearchCategory, updateSearchQuery, updateStartSearch} = useData()
    const location = useLocation();
    const inputRef = useRef(null);

    const currentCategory = location.pathname.split('/').pop();

    const handleCategoryChange = (event) => {
        event.preventDefault()
        updateSearchCategory(event.target.value)
    };

    const handleSearchQueryChange = (event) => {
        event.preventDefault()
        updateSearchQuery(event.target.value)
    };


    return (
        <>
            <div className="rounded-lg flex w-full">
                <input
                    ref={inputRef}
                    type="text"
                    name="search"
                    id="search"
                    onChange={handleSearchQueryChange}
                    className="block w-2/3 rounded-l-md py-2.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                    placeholder="Was suchst du ?"
                />
                <select
                    id="category"
                    name="category"
                    className="w-1/3 h-[44px] max-lg:rounded-r-md pl-1 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald  text-left"
                    defaultValue={currentCategory || 'kategorien'}
                    onChange={handleCategoryChange}>
                    <option className="text-left pr-1" disabled value="kategorien">Kategorien</option>
                    <option className="text-left pr-1" value="Alle Produkte">Alle Produkte</option>
                    <option className="text-left pr-1" value="Elektronik">Elektronik</option>
                    <option className="text-left pr-1" value="Kleidung & Accessoires">Kleidung & Accessoires</option>
                    <option className="text-left pr-1" value="Haushalt & Möbel">Haushalt & Möbel</option>
                    <option className="text-left pr-1" value="Sport & Freizeit">Sport & Freizeit</option>
                    <option className="text-left pr-1" value="Fahrzeuge">Fahrzeuge</option>
                    <option className="text-left pr-1" value="Bücher & Medien">Bücher & Medien</option>
                    <option className="text-left pr-1" value="Hobby & Sammeln">Hobby & Sammeln</option>
                    <option className="text-left pr-1" value="Garten & Pflanzen">Garten & Pflanzen</option>
                    <option className="text-left pr-1" value="Tierbedarf">Tierbedarf</option>
                    <option className="text-left pr-1" value="Dienstleistungen">Dienstleistungen</option>
                    <option className="text-left pr-1" value="Sonstiges">Sonstiges</option>
                </select>
            </div>


        </>
    )
        ;
}
