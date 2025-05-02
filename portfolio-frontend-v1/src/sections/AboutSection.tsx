import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../components/SectionTitle';
import { GraduationCap, Award, Code, Users } from 'lucide-react';

const AboutSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cards = [
    {
      icon: <GraduationCap className="w-6 h-6 text-primary" />,
      title: 'Education',
      content: 'B.Tech in CSE @ Lovely Professional University (2022–Present)',
      footer: 'GPA: 7.34',
    },
    {
      icon: <Code className="w-6 h-6 text-primary" />,
      title: 'Development',
      content: 'Full-stack developer building high-impact, real-world projects',
      footer: 'Performance-first mindset',
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: 'Focus Areas',
      content: 'Efficient systems, real-time features, and scalable backends',
      footer: 'System design & architecture',
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: 'Collaboration',
      content: 'Team player with strong communication skills',
      footer: 'Project management experience',
    },
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="About Me" 
          subtitle="Get to know more about my background, skills, and what drives me as a developer."
        />
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              variants={variants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="bg-gray-800/50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-400 mb-4">{card.content}</p>
              <p className="text-gray-500 text-sm">{card.footer}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div>
            <h3 className="text-2xl font-bold mb-4">My Journey</h3>
            <p className="text-gray-400 mb-4">
              As a passionate full-stack developer currently pursuing a B.Tech in Computer Science, 
              I've been building high-impact, real-world projects with a performance-first mindset.
            </p>
            <p className="text-gray-400 mb-4">
              My academic journey at Lovely Professional University has equipped me with strong 
              theoretical foundations, while my hands-on experience has allowed me to develop 
              practical skills in building efficient systems, implementing real-time features, 
              and designing scalable backends.
            </p>
            <p className="text-gray-400">
              I'm constantly exploring new technologies and methodologies to enhance my 
              skills and deliver better solutions to complex problems.
            </p>
          </div>
          
          <div className="h-full flex justify-center">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-accent rounded-xl blur opacity-30"></div>
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Quick Facts</h3>
                  <div className="h-1 w-16 bg-gradient-to-r from-secondary to-accent rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="font-medium">Aryan Pandey</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Degree:</span>
                    <span className="font-medium">B.Tech in CSE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">University:</span>
                    <span className="font-medium">Lovely Professional University</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expected Graduation:</span>
                    <span className="font-medium">2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location:</span>
                    <span className="font-medium">Punjab, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;