import React from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";

function Footer() {
  return (
    <FooterDesign>
      <footer>
        <p>© Created by Boris Kalev</p>

        <nav>
          <div className="links">
            <h5>
              <FaGithub />
              <StyledLink
                href="https://github.com/BorisKalev"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </StyledLink>
            </h5>
            <h5>
              <MdOutlineMailOutline />
              <StyledLink href="mailto:boris_kalev_14@hotmail.com">
                Email
              </StyledLink>
            </h5>
            <h5>
              <FaLinkedin />
              <StyledLink
                href="https://www.linkedin.com/in/boris-kalev-977972278/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </StyledLink>
            </h5>
          </div>
        </nav>
      </footer>
    </FooterDesign>
  );
}

const FooterDesign = styled.div`
  text-align: center;
  background: linear-gradient(
    to right,
    rgb(252, 222, 177) 0%,
    whitesmoke 50%,
    rgb(252, 222, 177) 100%
  );
  width: 100%;
  position: relative;
  bottom: 0;
  left: 0;
  padding: 1rem 0;

  .links {
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 20px;
    padding-bottom: 10px;
    h5 {
      &:hover {
        cursor: pointer;
        transform: translateY(4px);
        transition: transform 0.3s ease-out;
      }
    }
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

export default Footer;
