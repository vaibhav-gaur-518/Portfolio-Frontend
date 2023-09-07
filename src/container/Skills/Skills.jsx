import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Skills.scss";

const Skills = () => {
  const [experience, setExperience] = useState([]);

  const [skills, setSkills] = useState([]);
  const [filterSkills, setFilterSkills] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
        const sortedData = data.sort((a, b) => {
          const startDateA = new Date(a.year.split(" - ")[0]);
          const startDateB = new Date(b.year.split(" - ")[0]);
          return startDateB - startDateA;
        });
  
        setExperience(sortedData);
    });

    client.fetch(skillsQuery).then((data) => {
      const frontEndSkills = data.filter((item) =>
        item.tag.includes("Front-End")
      );
      const backEndSkills = data.filter((item) =>
        item.tag.includes("Back-End")
      );
      const otherSkills = data.filter(
        (item) =>
          !item.tag.includes("Front-End") && !item.tag.includes("Back-End")
      );
      const newData = [...frontEndSkills, ...backEndSkills, ...otherSkills];

      setSkills(newData);
      setFilterSkills(newData);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      if (item === "All") {
        setFilterSkills(skills);
      } else {
        setFilterSkills(skills.filter((skill) => skill.tag.includes(item)));
      }
    }, 500);
  };

  return (
    <>
      <h2 className="head-text">
        Skills & <span>Experience</span>
      </h2>

      <div className="app__skill-filter app__flex">
        {["Front-End", "Back-End", "Languages", "Others", "All"].map(
          (item, index) => (
            <div
              key={index}
              onClick={() => handleWorkFilter(item)}
              className={`app__skill-filter-item app__flex p-text ${
                activeFilter === item ? "item-active" : ""
              }`}
            >
              {item}
            </div>
          )
        )}
      </div>

      <div className="app__skills-container">
        <motion.div
          animate={animateCard}
          transition={{ duration: 0.5, delayChildren: 0.5 }}
          className="app__skills-list app__flex"
        >
          {filterSkills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="app__skills-exp">
          {experience.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>

              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      // data-tip
                      // data-for={work.name}
                      key={work.name}
                      data-tooltip-id={work.name}
                      data-tooltip-content={work.desc}
                    >
                      <h4 className="bold-text skills-tooltip">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <ReactTooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
