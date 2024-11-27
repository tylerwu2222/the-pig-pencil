import './Footer.css'
import { FaYoutube, FaInstagram, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {

    // position absolute on each page
    return (
        <div>
            <footer className="fixed bottom-1 left-1 flex flex-row gap-1">
                <a className="footer-link" href="http://www.instagram.com/pigpencil/" target="_blank" rel="noreferrer">
                    <FaInstagram size={25} />
                </a>
                <a className="footer-link" href="https://www.youtube.com/@ThePigPencil" target="_blank" rel="noreferrer">
                    <FaYoutube size={25} />
                </a>
                <a className="footer-link" href="https://github.com/tylerwu2222" target="_blank" rel="noreferrer">
                    <FaGithub size={25} />
                </a>
                <a className="footer-link footer-link-right" href="mailto:thepigpencil@gmail.com">
                    <MdEmail size={25} />
                </a>

            </footer>
        </div>
    )
}

export default Footer;