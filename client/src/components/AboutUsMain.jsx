import React from "react";
import "../../src/pages/AboutUs/AboutUs.css"



const AboutUsMain = () => {
    return (
      <div className="about-us">
        <h1 className="about-us__heading">О нас</h1>
        <p className="about-us__description">
          Добро пожаловать на наш сайт! Мы здесь, чтобы предоставить вам
          лучший сервис и качественный контент. Мы стремимся создавать
          красивые и интуитивно понятные веб-приложения для наших
          пользователей.
        </p>
        <img
          className="about-us__image"
          src="/images/about-us.jpg"
          alt="О нас"
        />
      </div>
    );
  };
  
  export default AboutUsMain;