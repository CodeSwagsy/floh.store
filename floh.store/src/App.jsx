import './App.css'

function App() {
    return (
        <>
            <header>
                <div className="container mx-auto">
                    <div className="flex flex-row items-center gap-4">
                        <h1 className="uppercase text-xl font-semibold">floh.store</h1>
                        <div>
                            <select name="categorys" id="categorys">
                                <option className="disabled" value="kategorien">Kategorien</option>
                                <option value="elektronik">Elektronik</option>
                                <option value="kleidung">Kleidung & Accessoires</option>
                                <option value="haushalt">Haushalt & Möbel</option>
                                <option value="sport">Sport & Freizeit</option>
                                <option value="fahrzeuge">Fahrzeuge</option>
                                <option value="buecher">Bücher & Medien</option>
                                <option value="hobby">Hobby & Sammeln</option>
                                <option value="garten">Garten & Pflanzen</option>
                            </select>
                        </div>
                        <div className="flex flex-row bg-slate-200 p-1 lg:p-3 rounded-lg overflow-hidden">
                            <img src="./public/lupe.svg" alt="lupe"/>
                            <label htmlFor=""></label>
                            <input className="bg-slate-200 " placeholder="Was suchst du?" type="text"/>
                        </div>
                        <a className="flex max-h-[70px] flex-row items-center justify-center gap-2 bg-slate-700 lg:px-4 lg:py-1.5 text-white max-lg:rounded-full rounded-lg">
                            <p className="text-sm lg:text-xl lg:mb-1 max-lg:px-3 max-lg:py-1.5">+</p>
                            <p className="max-lg:hidden lg:text-xl">Anzeige erstellen</p>
                        </a>
                        <a className="flex max-h-[70px] flex-row items-center justify-center gap-2 bg-slate-700 py-1.5 px-1 lg:px-4 lg:py-2 text-white rounded-lg">
                            <p className="text-sm lg:text-xl">Login / Registrieren</p>
                        </a>
                        <button>
                            <img src="./public/darkmode.svg" alt="Darkmode Lightmode Button"/>
                        </button>
                    </div>

                </div>
            </header>
            
        </>
    )
}

export default App
