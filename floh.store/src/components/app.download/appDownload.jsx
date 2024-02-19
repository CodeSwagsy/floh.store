function AppDownload() {
  return (
    <>
      <div className="flex flex-col max-lg:my-4 max-lg:items-center max-lg:justify-center">
        <h1
          className="font-semibold"
          style={{ display: "flex", alignItems: "baseline" }}
        >
          <span
            style={{
              color: "#00bd5e",
              marginRight: "0.25rem",
            }}
          >
            ANDROID
          </span>
          APP
        </h1>
        <ul className="flex flex-col max-lg:items-center mt-2">
          <li className="hover:text-emerald transition-all">
            <a
              href="/apk/FlohStore.apk"
              className="max-lg:mt-2 flex items-center h-16 overflow-hidden p-2 rounded-lg bg-jet text-whitesmoke"
            >
              <img
                src="/android-icon.png"
                alt="android icon"
                style={{
                  width: "4rem",
                  height: "2.75rem",
                  objectFit: "cover",
                  marginRight: "0.5rem",
                  objectPosition: "bottom",
                }}
              />
              <div style={{ textTransform: "uppercase" }}>
                <p>
                  Floh.Store <span className="text-emerald">App</span>
                </p>
                <p>herunterladen</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AppDownload;
