import React from "react";
import image from "../../assets/e-ticketing.jpg";

const Hero = () => {
  return (
    <>
      <section className="!bg-color1 !text-color2 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium !text-color2">
              Experience the Thrill Live!
              <br className="hidden lg:inline-block" />
              Your Gateway to Unforgettable Events.
            </h1>
            <p className="mb-8 leading-relaxed text-color5">
              Welcome to our ticketing platform, where excitement knows no
              bounds. Discover a world of live entertainment and secure your
              tickets to the hottest concerts, sports events, theater
              performances, and more. We're your go-to destination for creating
              memories that last a lifetime.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Explore
              </button>
              {/* <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Button
              </button> */}
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={image}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
