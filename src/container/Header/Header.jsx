import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { images } from "../../constants";
import { AppWrap } from '../../wrapper';
import "./Header.scss";

const scaleVariants = {
  whileInView:{
    scale:[0,1],
    opacity: [0,1],
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
}


  

const Header = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["Full Stack Web Developer"];
  // const toRotate2 = ["Welcome to My Portfolio"];
  const [text, setText] = useState("");
  // const [text2, setText2] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
      // tick2();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);
    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <div id="home" className="app__header app__flex">
    {/* <h1 className="welcome-text" style={{color:'#6b7688'}}>{text2}</h1> */}
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 2 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, I am</p>
              <h1 className="head-text">Vaibhav Gaur</h1>
            </div>
          </div>
          <div className="tag-cmp app__flex">
            <p className="p-text">{text}</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        <img src={images.profile} alt="profile_bg" />

        <motion.img
          whileInView={{ scale: [0,1] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          src={images.circle}
          alt="profile-bg"
          className="overlay_circle"
        />
      </motion.div>

      <motion.div
      variants={scaleVariants}
      whileInView={scaleVariants.whileInView}
      className="app__header-circles"
      >
      {[images.html,images.js,images.sass].map((circle,index) => (
        <div className="circle-cmp app__flex" key={`circle-${index}`}>
          <img src={circle} alt="circle" />
        </div>
      ))}
      </motion.div>
    </div>
  );
};

export default AppWrap(Header,'home');


// const tick2 = () => {
//   let i = loopNum % toRotate2.length;
//   let fullText = toRotate2[i];
//   let updatedText = isDeleting
//     ? fullText.substring(0, text.length - 1)
//     : fullText.substring(0, text.length + 1);

//   setText2(updatedText);
//   if (isDeleting) {
//     setDelta((prevDelta) => prevDelta / 2);
//   }

//   if (!isDeleting && updatedText === fullText) {
//     setIsDeleting(true);
//     setDelta(period);
//   } else if (isDeleting && updatedText === "") {
//     setIsDeleting(false);
//     setLoopNum(loopNum + 1);
//     setDelta(500);
//   }
// };