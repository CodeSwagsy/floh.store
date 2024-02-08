import { Carousel, IconButton } from "@material-tailwind/react";

export function ImageComponent({ images, status }) {
  return (
    <>
      <div className="i-own-product-status">
        {status !== "active" ? status.toUpperCase() : ""}
      </div>
      {images.length > 0 ? (
        <Carousel
          className="overflow-hidden rounded-lg"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handlePrev}
              className="!absolute top-2/4 -left-4 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handleNext}
              className="!absolute top-2/4 !right-2 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </IconButton>
          )}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`image ${index + 1}`}
              className={`h-full w-full object-cover ${
                status !== "active" ? "i-own-product-status-img" : ""
              }`}
            />
          ))}
        </Carousel>
      ) : (
        <>
          <img
            src="https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=Kein%20Bild%20vorhanden%20%3C%3Apepw%3A989410572514758676%3E"
            alt="Kein Bild vorhanden"
          />
        </>
      )}
    </>
  );
}
