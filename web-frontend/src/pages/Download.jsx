import React from "react";
import Header from "../component/Header";
import homeBg from "../assets/home-bg.png"; 
import { FaApple, FaGooglePlay } from "react-icons/fa";
import AppStoreButton from "../component/Button/AppStoreButton";
import GooglePlayButton from "../component/Button/GooglePlayButton";

const PlatformSupportItem = ({ platform, minVersion }) => (
  <li className="text-gray-700 dark:text-gray-300 text-sm">
    <span className="font-semibold">{platform}</span>: {minVersion}
  </li>
);

const Download = () => {
  return (
    <div className="min-h-screen flex flex-col text-gray-900 dark:text-white bg-gradient-to-r from-[#ff8a4f] to-[#8f4fbc]">
      <Header />

      <section className="flex flex-col lg:flex-row justify-between items-center px-8 py-20 gap-12">
        {/* Left Section */}
        <div className="lg:w-1/2 space-y-8">
          <div>
            <h3 className="text-3xl font-bold mb-4">
              Supported Platforms & Devices
            </h3>
            <p className="text-white-100 dark:text-white-300 mb-4">
              Luvsi is available on <strong>iOS</strong>, <strong>Android</strong>, and{" "}
              <strong>Web</strong>.
            </p>
            <ul className="space-y-2">
              <PlatformSupportItem platform="iOS" minVersion="16.0 and up" />
              <PlatformSupportItem platform="Android" minVersion="9.0 and up" />
              <PlatformSupportItem
                platform="Web Browsers"
                minVersion="Latest Chrome, Firefox, Safari, Edge"
              />
            </ul>
          </div>

          <div>
            <h3 className="text-white-3xl font-bold mb-6">About Luvsi</h3>
            <p className="mb-4">
              Single people, listen up: If you're looking for love, want to start dating, or
              just keep it casual, you need to be on <strong>Luvsi</strong>.
            </p>
            <p className="mb-4">
              With billions of matches made, it's the best place to meet your next best match.
            </p>
            <p className="mb-4">
              Whether you're straight or in the LGBTQIA+ community, Luvsi is here to bring you
              all the sparks.
            </p>
            <p>
              It's not just another dating site — it's the most inclusive app for connections,
              memories, and more.
            </p>
          </div>
        </div>


        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-64 h-[500px] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-4 border-gray-200 dark:border-gray-700 overflow-hidden">
       
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black rounded-b-2xl w-32 h-6 z-10"></div>

       
            <div
              className="relative p-6 h-full flex flex-col justify-end items-center text-center space-y-4 bg-cover bg-center"
              style={{
                backgroundImage: `url(${homeBg})`,
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>

              <div className="relative z-10 pb-8">
                <h2 className="text-2xl font-bold text-white drop-shadow-md">Luvsi App</h2>
                <p className="text-gray-200 text-sm mt-2">
                  Cross paths. Date local.
                  Download the app now!
                </p>



<div className="flex flex-col gap-3 mt-4">
  <AppStoreButton />
  <GooglePlayButton />
</div>

                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Download;
