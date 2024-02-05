import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export function CategoryComponent({additionalClasses, selectClasses}) {
    const classes = additionalClasses || ''
    const moreClasses = selectClasses || ''
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState('');

    const currentCategory = location.pathname.split('/').pop();

    const handleCategoryChange = (event) => {
        const selectedValue = event.target.value;

        if (selectedValue === 'Alle Produkte') {
            navigate(`/products/gallery/`)
        } else if (selectedValue !== 'kategorien') {
            navigate(`/products/gallery/category/${selectedValue}`);
        }
    };
    return (
        <div className={`flex ${classes}`}>
            <select
                id="category"
                name="category"
                className={`block rounded-md border-0 text-gray-900 pr-1 sm:text-sm bg-transparent font-semibold lg:font-bold ${moreClasses}`}
                defaultValue={currentCategory || 'kategorien'}
                onChange={handleCategoryChange}
            >
                <option className="text-right pr-1" disabled value="kategorien">Kategorien</option>
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
    )
}