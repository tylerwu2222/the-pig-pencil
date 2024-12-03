// import Image from "next/image";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
export default function Home() {
  return (
    <>
      {/* navbar navigation */}
      <NavBar />
      {/* dynamic text/images */}
      <div className='w-full h-full justify-center items-center'>
        <p className="hover:text-hoverDeepPink transition duration-200 ease-in-out">I'll be honest, building and updating this site has felt a little like iteratively fitting a square peg into a round hole.</p>
        <p className="hover:text-hoverDeepPink transition duration-200 ease-in-out">At it's early stages, it was me trying to make a website to sell art.</p>
        <p className="hover:text-hoverDeepPink transition duration-200 ease-in-out">I followed a YouTube tutorial and built it with mostly with HTML and PHP, something called Apache for local testing, and hosting it on Heroku for free.</p>
        <p className="hover:text-hoverDeepPink transition duration-200 ease-in-out">I wanted it to be from scratch so I could "fully customize" it.</p>
        <p className="hover:text-hoverDeepPink transition duration-200 ease-in-out">Then I went to school for data science.</p>
        <p className="hover:text-hoverDeepPink transition duration-200 ease-in-out">And I decided why not make some data visualizations and share some of my writings on this site.</p>
        <p className="hover:text-hoverDeepPink transition duration-200 ease-in-out">So I learned Javascript and D3.js (and many other plotting packages).</p>
        <p className="hover:text-hoverDeepPink transition duration-200 ease-in-out">Then I go to more school to learn web development and learn about React!</p>
        <p className="hover:text-hoverDeepPink transition duration-200 ease-in-out">So I convert my humble vanilla JS blog to a React-based site.</p>
        <p className="hover:text-hoverDeepPink transition duration-200 ease-in-out">Then, as I look for work in data/software development I learn about Next.js</p>
        <p className="hover:text-hoverDeepPink transition duration-200 ease-in-out">It seems like it's the next big thing. (I mean it's in the name.) And it does have pretty cool features, like its file-based routing and other server/client stuff.</p>
        <p className="hover:text-hoverDeepPink transition duration-200 ease-in-out">So that's where we are today.</p>
        <p className="hover:text-hoverDeepPink transition duration-200 ease-in-out">Anyways, if you're reading this, I've successfully converted my site 3 whole times. From HTML + PHP to JS, from JS to React, and finally from React to Next.</p>
        <p className="hover:text-hoverDeepPink transition duration-200 ease-in-out">It's been a good 5 years, on and off, working on this thing.</p>
        <p className="hover:text-hoverDeepPink transition duration-200 ease-in-out">But finally, the groundwork is set, so stay tuned for some writing/data/art work that will (hopefully) knock your socks off 💥🧦</p>
      </div>
      {/* footer links */}
      <Footer />
      {/* buy me a coffee */}

    </>
  );
}
