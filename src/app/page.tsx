'use client'
// import Image from "next/image";

// react
import { useState, useEffect, createContext, Dispatch, SetStateAction } from "react";

// components
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import images_json from '@/site_data/home_mosaic_images.json';

// helpers
import { getRandomNumber, getRandomNumberAvoiding } from "./lib/randomNumbers";

interface homeContextProps {
  hoveredTab: string;
  setHoveredTab: Dispatch<SetStateAction<string>>;
}

export const HomeContext = createContext({} as homeContextProps);

export default function Home() {

  const minSize = 10;
  const maxSize = 17;
  const home_mosaic_images: Record<string, any> = images_json;
  const [hoveredTab, setHoveredTab] = useState<string>('___');
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [imageGeneratingProcess, setImageGeneratingProcess] = useState(0);

  // update home mosaic images based on hoveredTab
  useEffect(() => {
    if (hoveredTab == 'pigs!') {
      setDisplayedImages(Array.from({ length: 20 }, () => home_mosaic_images['pig']).flat());
    }
    else {
      setDisplayedImages(home_mosaic_images[hoveredTab]);
    }
    // setCurrentImageGeneratingProcess(get_random_int(0, 5)); // 0 to 4

  }, [hoveredTab]);

  return (
    <HomeContext.Provider
      value={{
        hoveredTab,
        setHoveredTab
      }}
    >
      {/* navbar navigation */}
      <NavBar />
      {/* dynamic text/images */}
      <div className="relative h-[90vh]">
        <p className="absolute top-1/2 left-1/2 w-[30vw] -translate-x-[5vw] text-left">
          A blog about <span className="font-semibold text-hoverDeepPink transition-all duration-200">{hoveredTab}</span>
        </p>
      </div>
      {displayedImages && displayedImages.sort((a, b) => 0.5 - Math.random()).map((img, index) => {
        return (
          <img
            key={index}
            src={hoveredTab == 'pigs!' ? '/img/home_mosaic/pig/' + img : '/img/home_mosaic/' + hoveredTab + '/' + img}
            className='home-img'
            alt={img}
            style={{
              position: 'absolute',
              top: getRandomNumberAvoiding() + 'vh',
              left: getRandomNumberAvoiding(5, 81, 30, 60) + 'vw',
              maxHeight: getRandomNumber(minSize, maxSize) + 'vh',
              maxWidth: getRandomNumber(minSize, maxSize) + 'vw'
            }}>

          </img>
        );
      })}

      {/* footer links */}
      <Footer />
      {/* buy me a coffee */}

    </HomeContext.Provider>
  );
}
