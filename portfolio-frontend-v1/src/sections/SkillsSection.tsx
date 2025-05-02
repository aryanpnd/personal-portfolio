import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../components/SectionTitle';

interface Skill {
  name: string;
  level: number; // 1-5
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const SkillsSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories: SkillCategory[] = [
    {
      name: "Languages",
      skills: [
        { name: "JavaScript/TypeScript", level: 5 },
        { name: "Java", level: 4 },
        { name: "Go", level: 4 },
        { name: "Kotlin", level: 3 },
        { name: "Python", level: 4 },
        { name: "C/C++", level: 3 },
        { name: "SQL", level: 4 },
      ]
    },
    {
      name: "Frameworks",
      skills: [
        { name: "React Native", level: 4 },
        { name: "Expo", level: 4 },
        { name: "ReactJS", level: 5 },
        { name: "ExpressJS", level: 5 },
        { name: "Go-Fiber", level: 4 },
        { name: "Go-gorilla", level: 4 },
        { name: "Jetpack Compose", level: 3 },
      ]
    },
    {
      name: "Databases",
      skills: [
        { name: "MongoDB", level: 5 },
        { name: "PostgreSQL", level: 4 },
        { name: "MySQL", level: 4 },
        { name: "Redis", level: 3 },
        { name: "DynamoDB", level: 3 },
      ]
    },
    {
      name: "Cloud & Tools",
      skills: [
        { name: "Azure", level: 4 },
        { name: "AWS", level: 3 },
        { name: "Dcoker", level: 3 },
        { name: "FCM", level: 4 },
        { name: "OTA updates", level: 4 },
        { name: "Selenium", level: 3 },
        { name: "Puppeteer", level: 3 },
      ]
    },
  ];

  const renderSkillBar = (skill: Skill, index: number) => {
    const variants = {
      hidden: { width: 0 },
      visible: { width: `${skill.level * 20}%` }
    };

    return (
      <motion.div
        key={index}
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <div className="flex justify-between mb-1">
          <span className="text-gray-300">{skill.name}</span>
          <span className="text-gray-400">{skill.level}/5</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Skills & Expertise" 
          subtitle="A comprehensive overview of my technical skills and proficiency levels."
          centered
        />
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6"
              initial={{ opacity: 0, x: catIndex % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: catIndex % 2 === 0 ? -20 : 20 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gradient">{category.name}</h3>
              <div>
                {category.skills.map((skill, skillIndex) => 
                  renderSkillBar(skill, skillIndex)
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4">Other Skills</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Strong DSA", "System Design", "App development", "Full-stack development", "DevOps", "CI/CD", "Agile Methodology", 
              "Git & Version Control", "UI/UX Fundamentals", "Technical Documentation", 
              "Performance Optimization", "API Integration"
            ].map((skill, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-gray-800/60 border border-gray-700/50 rounded-full text-gray-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.7 + (index * 0.05) }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;