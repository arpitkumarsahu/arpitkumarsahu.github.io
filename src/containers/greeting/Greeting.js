import React, {useContext} from "react";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import "./Greeting.css";
import landingPerson from "../../assets/lottie/landingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";

import {illustration, greeting} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import arpit from '../../assets/images/Arpit.png'




export default function Greeting() {
  

  const {isDark} = useContext(StyleContext);
  if (!greeting.displayGreeting) {
    return null;
  }

  const handleClick = ()=>{
    window.open("https://drive.google.com/file/d/1CTVIrO6Zrdu-FQJbVob93QevwWAP6l0U/view?usp=sharing")
    const url = "https://drive.google.com/u/0/uc?id=1CTVIrO6Zrdu-FQJbVob93QevwWAP6l0U&export=download";
      const link = document.createElement('a');
      link.href = url;
      link.download = 'file.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }
  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h2
                className={isDark ? "dark-mode greeting-text" : "greeting-text"}
              >
                {" "}
                {greeting.title}{" "}
                {/* <span className="wave-emoji">{emoji("👋")}</span> */}
              </h2>
              <p
                className={
                  isDark
                    ? "dark-mode greeting-text-p"
                    : "greeting-text-p subTitle"
                }
              >
                {greeting.subTitle}
              </p>
              <SocialMedia />
              <div className="button-greeting-div">
                <Button text="Contact me" href="#contact" />
                
                <Button
                  text="See my resume"
                  newTab={true}
                  href={greeting.resumeLink}
                  onClick={handleClick}
                />
                
                
              </div>
            </div>
          </div>
          <div className="greeting-image-div">
            {illustration.animated ? (
              <div>
                  <img style={{borderRadius:"50%"}} width="90%" height="100%" src={arpit} alt=""/>
             </div>

            ) : (
              <img
                alt="man sitting on table"
                src={require("../../assets/images/manOnTable.svg")}
              ></img>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
