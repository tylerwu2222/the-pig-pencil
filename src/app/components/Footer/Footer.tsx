// import './Footer.css'

import EmailIcon from "../buttons/iconButtons/EmailIcon";
import GithubIcon from "../buttons/iconButtons/GithubIcon";
import YoutubeIcon from "../buttons/iconButtons/YoutubeIcon";
import InstagramIcon from "../buttons/iconButtons/InstagramIcon";

const Footer = () => {
  // position absolute on each page
  return (
    <div className="fixed bottom-1 right-2">
      <footer className="flex flex-row gap-1">
        <InstagramIcon />
        <YoutubeIcon />
        <GithubIcon />
        <EmailIcon />
      </footer>
    </div>
  );
};

export default Footer;
