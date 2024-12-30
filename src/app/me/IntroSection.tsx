import React from "react";
import Link from "next/link";
// import Image from 'next/image';

const portfolio_image_folder = "/img/people/portfolio/";

export default function IntroSection() {
  return (
    <>
      {/* return to blog */}
      <Link href="/" title="go to blog">
        <div className="fixed left-0 top-2 z-20 transform opacity-80 transition ease-in-out hover:translate-x-1 hover:scale-110 hover:opacity-100 lg:w-[4vw] lg:max-w-[80px]">
          <img
            className="ml-[-10px] h-[50px] sm:h-auto rounded-md"
            src="/img/pigpencil.png"
            loading="lazy"
          />
          {/* <img className='' src={portfolio_image_folder + 'icons/go_to_blog.png'}> */}
          <p className="h-auto text-xs">go to blog</p>
        </div>
      </Link>
      {/* <img id='hover-reminder-icon' src={portfolio_image_folder + 'icons/hover_reminder.png'}></img> */}
      {/* STARTING faucet */}
      {/* <div className='relative h-[100vh] ml-[25vw]'> */}
      <div className="flex flex-col justify-center items-center h-[95vh] sm:h-[100vh]">
        {/* <ScrollGrowShrinkElement
                            type="img"
                            startSize={isMobile ? 50 : 100}
                            startVertical={isMobile ? 15 : 15}
                            startHorizontal={isMobile ? -5 : 0}
                            maxScroll={isMobile ? window.innerHeight / 4 : window.innerHeight / 2}
                            src={portfolio_image_folder + "icons/faucet_animation.gif"}
                            position="relative"
                            title={"When I think of inspiration, I think of a faucet."}
                            loading='lazy'
                        /> */}
        <img
          className="h-[100vw] w-auto sm:h-[100%] sm:pt-10"
          src={portfolio_image_folder + "icons/faucet_animation.gif"}
          alt="me-faucet"
        />
        <h1
          id="title-header"
          className='sm:absolute right-[10vw] text-center top-[65vh] z-10 pl-0 font-["Baskerville"] text-2xl font-bold text-[#676464] 2xl:text-6xl'
        >
          HOW I FOUND DATA VISUALIZATION ♱
        </h1>
      </div>
    </>
  );
}
