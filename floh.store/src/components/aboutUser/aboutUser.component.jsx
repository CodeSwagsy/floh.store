import PropTypes from "prop-types";

function AboutUser({ user }) {
  return (
    <>
      <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden mt-8 border border-gray-300 m-auto flex flex-col">
        <div className="flex items-center">
          <img
            className="w-5/12 h-40 object-center"
            src="/user-icon.svg"
            alt="avatar"
            style={{
              filter:
                "invert(73%) sepia(71%) saturate(5238%) hue-rotate(112deg) brightness(93%) contrast(101%)",
            }}
          />

          <div className="py-4 px-6 w-7/12">
            <div className="flex items-center mb-2 text-gray-700">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                <path d="M239.208 343.937c-17.78 10.103-38.342 15.876-60.255 15.876-21.909 0-42.467-5.771-60.246-15.87C71.544 358.331 42.643 406 32 448h293.912c-10.639-42-39.537-89.683-86.704-104.063zM178.953 120.035c-58.479 0-105.886 47.394-105.886 105.858 0 58.464 47.407 105.857 105.886 105.857s105.886-47.394 105.886-105.857c0-58.464-47.408-105.858-105.886-105.858zm0 186.488c-33.671 0-62.445-22.513-73.997-50.523H252.95c-11.554 28.011-40.326 50.523-73.997 50.523z" />
                <g>
                  <path d="M322.602 384H480c-10.638-42-39.537-81.691-86.703-96.072-17.781 10.104-38.343 15.873-60.256 15.873-14.823 0-29.024-2.654-42.168-7.49-7.445 12.47-16.927 25.592-27.974 34.906C289.245 341.354 309.146 364 322.602 384zM306.545 200h100.493c-11.554 28-40.327 50.293-73.997 50.293-8.875 0-17.404-1.692-25.375-4.51a128.411 128.411 0 0 1-6.52 25.118c10.066 3.174 20.779 4.862 31.895 4.862 58.479 0 105.886-47.41 105.886-105.872 0-58.465-47.407-105.866-105.886-105.866-37.49 0-70.427 19.703-89.243 49.09C275.607 131.383 298.961 163 306.545 200z" />
                </g>
              </svg>
              <p className="px-2 text-sm">
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center mt-4 text-gray-700">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
              </svg>
              <p className="px-2 text-sm">
                {user?.info?.about?.location?.zip +
                  " / " +
                  user?.info?.about?.location?.city}
              </p>
            </div>
            <div className="flex items-center mt-4 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="px-2 text-sm">
                {user?.info?.rating.reduce((a, b) => a + b) /
                  user?.info?.rating.length +
                  " / 5"}
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex items-center px-6 py-3"
          style={{ backgroundColor: "#333333" }}
        >
          <h2 className="mx-3 text-white font-semibold text-lg">
            {user?.info?.about?.username}
          </h2>
        </div>
      </div>
    </>
  );
}

export default AboutUser;

AboutUser.propTypes = {
  user: PropTypes.object,
};
