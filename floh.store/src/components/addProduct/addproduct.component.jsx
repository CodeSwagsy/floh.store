import { CategoryComponent } from "../header/category.component";
import { ButtonComponent } from "../hero/button.component";
export function AddProductComponent() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[700px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <h1 className="flex justify-center font-bold">
            Erstelle deine Anzeige!
          </h1>
          <div className="flex items-center mb-4">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800 "
            />
            <label
              for="default-radio-1"
              class="ms-2 text-sm font-medium text-black text-black"
            >
              Ich biete
            </label>
          </div>
          <div className="flex items-center ">
            <input
              checked
              id="default-radio-2"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800"
            />
            <label
              for="default-radio-2"
              class="ms-2 text-sm font-medium text-black text-black"
            >
              Ich suche
            </label>
          </div>
          <form className="space-y-6">
            <div className="py-8 flex items-center">
              <label
                htmlFor="titel"
                className="block text-sm font-medium leading-6 text-gray-900 mr-4"
              >
                Titel
              </label>
              <div className="mt-2 pl-48">
                <input
                  id="title"
                  name="title"
                  type="title"
                  autoComplete=""
                  required
                  placeholder="Titel"
                  className="p-2.5 block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </form>
          <div className="flex justify-start">
            <label
              htmlFor="ctgy"
              className="block text-sm font-medium leading-6 text-gray-900 mr-4"
            >
              Kategorie
            </label>

            <CategoryComponent />
          </div>
          <form className="space-y-6">
            <div className="py-8 flex items-center">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900 mr-4 pr-32"
              >
                Preis
              </label>

              <div className="mt-2 flex justify-start">
                <input
                  id="price"
                  name="price"
                  type="price"
                  autoComplete=""
                  required
                  placeholder="Euro"
                  className="p-2.5 pr-24 block w-2/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="">
                <div className="relative inline-flex self-center flex ">
                  <svg
                    className="text-white bg-emerald absolute top-0 right-0 m-1 pointer-events-none p-2 rounded"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="30px"
                    height="30px"
                    viewBox="0 0 38 22"
                    version="1.1"
                  >
                    <title>F09B337F-81F6-41AC-8924-EC55BA135736</title>
                    <g
                      id="ZahnhelferDE—Design"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="ZahnhelferDE–Icon&amp;Asset-Download"
                        transform="translate(-539.000000, -199.000000)"
                        fill="#ffffff"
                        fill-rule="nonzero"
                      >
                        <g
                          id="Icon-/-ArrowRight-Copy-2"
                          transform="translate(538.000000, 183.521208)"
                        >
                          <polygon
                            id="Path-Copy"
                            transform="translate(20.000000, 18.384776) rotate(135.000000) translate(-20.000000, -18.384776) "
                            points="33 5.38477631 33 31.3847763 29 31.3847763 28.999 9.38379168 7 9.38477631 7 5.38477631"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <select className="  rounded border border-emerald text-gray-600 h-10 w-60 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                    <option>Neu</option>
                    <option>Sehr gut</option>
                    <option>Gut</option>
                    <option>Akzeptabel</option>
                    <option>Defekt</option>
                  </select>
                </div>
              </div>
            </div>
          </form>

          <form className="space-y-6">
            <div className="py-8 flex justify-end">
              <label
                htmlFor="beschreibung"
                className="block text-sm font-medium leading-6 text-gray-900 mr-4 pr-32"
              >
                Beschreibung
              </label>
              <div className="mt-2 ">
                <textarea
                  id="beschreibung"
                  name="beschreibung"
                  autoComplete=""
                  required
                  maxLength={400}
                  placeholder="Beschreibung"
                  className=" p-2.5 block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm  ring-1 ring-inset ring-emerald placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none"
                />
              </div>
            </div>
          </form>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="upload"
              className="block text-sm font-medium leading-6 text-gray-900 mr-4"
            >
              Bilder
            </label>

            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-58 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-emerald  hover:border-white hover:bg-emerald"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-black"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-black text-black">
                  <span className="font-semibold ">Uploade deine Bilder</span>{" "}
                  drag and drop
                </p>
                <p className="text-xs text-black">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

          <div className="py-8 flex flex-row-reverse space-x-4 space-x-reverse">
            <ButtonComponent size="large" spantxt="Abbrechen" height="height" />
            <ButtonComponent size="large" spantxt="Erstellen" height="height" />
          </div>

          <div className=" pb-0 w-full border-t border-gray-200"></div>
        </div>
      </div>
    </div>
  );
}