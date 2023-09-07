import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./About.scss";
import { urlFor, client } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";
import resume from '../../assets/Vaibhav Gaur.pdf';

// const abouts = [
//   { title: 'Frontend development',imgUrl: images.frontend},
//   { title: 'Backend development',imgUrl: images.backend},
//   { title: 'Web Animation',imgUrl: images.about4},
// ];

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const quert = '*[_type == "abouts"]';

    client.fetch(quert).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text" style={{ marginBottom: 15 }}>
        Roses are <span style={{ color: "red" }}>Red</span> Violets are{" "}
        <span>Blue</span>,
        <br />
        Unexcepted <span style={{ color: "red" }}> {"'{'"} on Line 32</span>
      </h2>

      <motion.div
        whileInView={{ x: [-250, 0], opacity: [0, 1] }}
        transition={{ duration: 2 }}
        className="app__about-info"
      >
        <div className="app__about-badge">
          <div className="badge-cmp app__flex">
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p>
                Welcome to my portfolio! I'm a Passionate Full Stack Web
                Developer who loves his work.
              </p>
              <p>
                When I'm not working, you can find me doing some blender,
                playing some sports.
                <br />I believe that these activities help me stay creative and
                energized.
              </p>
              <p>
                Thank you for taking the time to visit my portfolio.
                <br />
                If you're interested in working with me, please don't hesitate
                to reach out.
              </p>
              <p>For More Information you can download my resume.</p>
              <a href={resume} alt="resume" target="_blank"><button type="button">Resume</button></a>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
