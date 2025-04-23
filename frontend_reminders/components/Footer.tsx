"use client";

import { Containe, SocialLinks } from "../styles/footerStyles";
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <Containe>
      <h1>
        <p>Tales Lima © 2025 All rights reserved.</p>
      </h1>

      <SocialLinks>
  <a
    href="https://github.com/tales1982"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub"
  >
    <FaGithub />
  </a>
  <a
    href="https://www.linkedin.com/in/tales-lima-de-paula/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <FaLinkedin />
  </a>
  <a
    href="https://instagram.com/taleslimadepaula"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <FaInstagram />
  </a>
  <a
    href="https://tales-snowy.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Portfólio"
  >
    <FaGlobe />
  </a>
</SocialLinks>
    </Containe>
  );
};

export default Footer;