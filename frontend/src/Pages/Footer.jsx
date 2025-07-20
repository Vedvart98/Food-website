import React from 'react';
import { assets } from '../assets/assets'
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer">
        <div className="about">
          <h4>About Foody</h4>
          <p>
            Foody brings delicious meals right to your doorstep. Our mission is to make your dining experience
            effortless, enjoyable, and unforgettable.
          </p>
          <h4>Connect With Us:</h4>
          <div className="icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img
                src={assets.instagram}
                alt="Instagram"
              />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img
                src={assets.twitter}
                alt="GitHub"
              />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn-icons-png.freepik.com/256/1383/1383259.png"
                alt="Facebook"
              />
            </a>
          </div>
        </div>

        <div className="contact">
          <h3>Contact Us</h3>
          <p>📞 +91 89999 99999</p>
          <p>📧 support@foody.com</p>
        </div>
      </div>
      <div className="bottom">
        <p>© {new Date().getFullYear()} Foody. All rights reserved.</p>
      </div>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #111;
  color: #f1f1f1;
  padding: 40px 20px 20px;
  width: 100%;

  .footer {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .about {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .about p {
    max-width: 500px;
    line-height: 1.6;
    color: #ccc;
  }

  .icons {
    display: flex;
    gap: 15px;
    margin-top: 10px;

    a {
      display: inline-block;
      transition: transform 0.3s ease, filter 0.3s ease;

      &:hover {
        transform: scale(1.2);
        filter: brightness(1.3);
      }

      img {
        width: 30px;
        height: 30px;
        filter: grayscale(100%);
      }

      &:hover img {
        filter: grayscale(0%);
      }
    }
  }

  .contact {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .contact p {
    color: #ddd;
  }

  .bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #333;
    margin-top: 20px;

    p {
      font-size: 0.9rem;
      color: #888;
    }
  }

  @media (max-width: 768px) {
    .footer {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .about p {
      max-width: 100%;
    }
  }
`;
