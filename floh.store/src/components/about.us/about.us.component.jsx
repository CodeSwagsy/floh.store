export function AboutUsComponent() {
  return (
    <>
      <div className="flex flex-col justify-center max-lg:py-6 py-12">
        <div className="container mx-auto">
          <h1 className="text-2xl lg:text-4xl my-4 lg:mb-8 font-semibold group group-hover:bg-emerald">
            Über <span className="text-emerald">FLOH</span>.STORE
          </h1>
          <p className="my-4 text-lg text-justify">
            Nach intensivem Lernen und Zusammenarbeiten präsentieren wir stolz
            unser Ergebnis – ein voll funktionsfähiges Flohmarkt Portal, das die
            Essenz unserer seit Februar 2023 laufenden Schulung beim Digital
            Career Institute im Bereich{" "}
            <span className="font-bold">Webentwicklung</span> widerspiegelt.
          </p>

          <p className="my-4 text-lg text-justify">
            Unser Team, bestehend aus{" "}
            <span className="font-bold">
              Ihor, Manuel, Ezzuldin, Alper und Albert
            </span>
            , hat ein Projekt geschaffen, das unser erworbenes Wissen,
            individuelle Fähigkeiten und kreative Ideen vereint.
          </p>

          <p className="my-4 text-lg text-justify">
            Unser Technologie-Stack mit{" "}
            <span className="font-bold">
              MongoDB, Express.js, React, Node.js, WebSocket, Cloud storage,
              SMTP, HTML und Tailwind CSS
            </span>{" "}
            repräsentiert den breiten Horizont, den wir während des Kurses
            abgedeckt haben.
          </p>

          <p className="my-4 text-lg text-justify">
            Das Flohmarkt Portal ist nicht nur ein Ergebnis unserer technischen
            Fähigkeiten, sondern auch eine Hommage an unsere Teamarbeit und
            Entschlossenheit, die Grenzen der Webentwicklung zu erkunden.
          </p>

          <p className="my-4 text-lg text-justify">
            Wir danken allen, die uns unterstützt haben – Kursleiter,
            Kommilitonen, Freunde und Familie. Dieses Abschlussprojekt markiert
            nicht nur einen Meilenstein, sondern auch den Beginn unserer Reise
            in die Welt der Softwareentwicklung.
          </p>

          <p className="my-4 text-lg text-justify">
            Schaut euch gerne um, stöbert auf unserem Flohmarkt Portal und
            erlebt das Ergebnis unserer gemeinsamen Anstrengungen.
          </p>
          <p className="my-8 text-lg text-justify font-bold">
            {" "}
            Vielen Dank für eure Unterstützung und viel Spaß beim Entdecken!
          </p>
        </div>
        <div className="container mx-auto ">
          <h1 className="text-2xl lg:text-4xl my-4 lg:mb-8 font-semibold group group-hover:bg-emerald">
            Unser Team
          </h1>
          <div className="mt-10 flex flex-wrap justify-center xl:justify-between">
            <div className="flex items-center bg-white border border-gray-200 rounded-lg drop-shadow md:max-w-xl border-emerald p-4 lg:p-8 mb-4 lg:mb-8">
              <img
                className="object-cover object-top w-full rounded-lg max-lg:max-h-96 max-lg:w-1/2 h-full md:w-48 "
                src="/alper.png"
                alt="Alper"
              />
              <div className="flex flex-col max-lgjustify-between items-start leading-normal h-full w-full px-2 lg:px-0 lg:pl-4">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-black h-1/4 lg:h-1/3">
                  Frontend Dev
                </h2>
                <p className="h-full font-normal text-gray-700 dark:text-gray-400 text-justify">
                  Hallo ich bin Alper, 37 Jahre alt und Frontend Dev der seite
                  Floh.Store.
                </p>
              </div>
            </div>

            <div className="flex items-center bg-white border border-gray-200 rounded-lg drop-shadow md:max-w-xl border-emerald p-4 lg:p-8 mb-4 lg:mb-8">
              <img
                className="object-cover object-top w-full rounded-lg max-lg:max-h-96 max-lg:w-1/2 h-full md:w-48 "
                src="/manuel.webp"
                alt="Manuel"
              />
              <div className="flex flex-col max-lgjustify-between items-start leading-normal h-full w-full px-2 lg:px-0 lg:pl-4">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-black h-1/4 lg:h-1/3">
                  Fullstack Developer
                </h2>
                <p className="h-full font-normal text-gray-700 dark:text-gray-400 text-justify">
                  Hello zusammen! Ich bin Manuel und meine Hauptaufgaben für
                  Floh.Store sind das Frontend & die Funktionalität der Seiten.
                </p>
              </div>
            </div>

            <div className="flex items-center bg-white border border-gray-200 rounded-lg drop-shadow md:max-w-xl border-emerald p-4 lg:p-8 mb-4 lg:mb-8">
              <img
                className="object-cover object-top w-full rounded-lg max-lg:max-h-96 max-lg:w-1/2 h-full md:w-48 "
                src="/Albertimage.JPG"
                alt="Albert"
              />
              <div className="flex flex-col max-lgjustify-between items-start leading-normal h-full w-full px-2 lg:px-0 lg:pl-4">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-black h-1/4 lg:h-1/3">
                  Fullstack Developer
                </h2>
                <p className="h-full font-normal text-gray-700 dark:text-gray-400 text-justify">
                  Moin, Ich bin der Albert und bei Floh.Store lag der
                  Schwerpunkt meiner Aufgaben auf Frontend-Lösungen, von
                  Designgestaltung der Landingpage bis zur Produktansicht, oder
                  E-Mail-Kommunikation.
                </p>
              </div>
            </div>

            <div className="flex items-center bg-white border border-gray-200 rounded-lg drop-shadow md:max-w-xl border-emerald p-4 lg:p-8 mb-4 lg:mb-8">
              <img
                className="object-cover object-top w-full rounded-lg max-lg:max-h-96 max-lg:w-1/2 h-full md:w-48 "
                src="/i-profile.png"
                alt="Alper"
              />
              <div className="flex flex-col max-lgjustify-between items-start leading-normal h-full w-full px-2 lg:px-0 lg:pl-4">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-black h-1/4 lg:h-1/3">
                  Fullstack Developer
                </h2>
                <p className="h-full font-normal text-gray-700 dark:text-gray-400 text-justify">
                  Hallo zusammen. Ich bin Ihor - ein kreativer Frontend- und
                  zuverlässiger Backend-Entwickler. In unserem Projekt bin ich
                  sowohl für das Backend als auch für einen Teil der
                  Frontend-Funktionalität (wie Chat, Anzeigenverwaltung etc.)
                  zuständig.
                </p>
              </div>
            </div>

            <div className="flex items-center bg-white border border-gray-200 rounded-lg drop-shadow md:max-w-xl border-emerald p-4 lg:p-8 mb-4 lg:mb-8">
              <img
                className="object-cover object-top w-full rounded-lg max-lg:max-h-96 max-lg:w-1/2 h-full md:w-48 "
                src="/alper.png"
                alt="Alper"
              />
              <div className="flex flex-col max-lgjustify-between items-start leading-normal h-full w-full px-2 lg:px-0 lg:pl-4">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-black h-1/4 lg:h-1/3">
                  Frontend Dev
                </h2>
                <p className="h-full font-normal text-gray-700 dark:text-gray-400 text-justify">
                  Hallo ich bin Alper, 37 Jahre alt und Frontend Dev der seite
                  Floh.Store.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
