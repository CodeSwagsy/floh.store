import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Conversation({ pid, text, uid, notRead, clickHandler }) {
  const [productData, setProductData] = useState(null);
  const [partnerName, setPartnerName] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/product/id/${pid}`)
      .then((res) => res.json())
      .then((data) => setProductData(data.product));

    uid.length === 24
      ? fetch(`${import.meta.env.VITE_API}/user/about/${uid}`)
          .then((res) => res.json())
          .then((data) => setPartnerName(data.doc.info.about.username))
      : setPartnerName("Anonymous " + Math.floor(Math.random() * 1000));
  }, [pid, uid]);

  return (
    <>
      <div
        onClick={clickHandler}
        className="max-w-sm w-full lg:max-w-full lg:flex mb-2 hover:cursor-pointer"
      >
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{
            backgroundImage: `url(${productData?.images[0]})`,
            backgroundPositionY: "center",
          }}
        ></div>
        <div
          className="flex flex-row items-center border border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 justify-between leading-normal"
          style={{ width: "inherit" }}
        >
          <div>
            <div className="text-gray-900 font-bold text-xl mb-2">
              {partnerName}
            </div>
            <p className="text-gray-700 text-base">{text}</p>
          </div>
          {notRead && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="green"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          )}
        </div>
      </div>
    </>
  );
}

export default Conversation;

Conversation.propTypes = {
  pid: PropTypes.string,
  text: PropTypes.string,
  uid: PropTypes.string,
  clickHandler: PropTypes.func,
};
