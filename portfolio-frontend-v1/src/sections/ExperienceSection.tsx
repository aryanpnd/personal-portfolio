import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import SectionTitle from '../components/SectionTitle';
import { Smartphone, Code, Layout } from 'lucide-react';

const ExperienceSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const renderTimelineElement = (
    title: string, 
    company: string, 
    date: string, 
    description: string[], 
    icon: React.ReactNode,
    skills: string[]
  ) => (
    <VerticalTimelineElement
      contentStyle={{ 
        background: 'rgba(23, 23, 23, 0.6)', 
        color: '#fff',
        border: '1px solid rgba(75, 85, 99, 0.3)',
        backdropFilter: 'blur(8px)',
        boxShadow: 'none',
        borderRadius: '0.75rem'
      }}
      contentArrowStyle={{ borderRight: '7px solid rgba(75, 85, 99, 0.5)' }}
      date={date}
      dateClassName="text-gray-400 md:text-gray-400"
      iconStyle={{ 
        background: 'linear-gradient(45deg, rgba(124, 58, 237, 0.8), rgba(99, 102, 241, 0.8))',
        color: '#fff',
        boxShadow: '0 0 0 4px rgba(124, 58, 237, 0.2)'
      }}
      icon={icon}
    >
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <h4 className="text-primary mb-2">{company}</h4>
        <ul className="text-gray-300 mb-4 space-y-2">
          {description.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </VerticalTimelineElement>
  );

  return (
    <section id="experience" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Work Experience" 
          subtitle="My professional journey and the roles I've taken on to build my expertise."
          centered
        />
        
        <motion.div 
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VerticalTimeline lineColor="rgba(75, 85, 99, 0.2)">
            {renderTimelineElement(
              "Mobile App Developer Intern",
              "Webcube Infotech",
              "Jan 2023 - Apr 2023",
              [
                "Built \"Bean\" app, optimizing pantry + recipe experience using AI.",
                "Achieved 30% reduction in prep time & resource consumption.",
                "Collaborated with UX team to create an intuitive mobile interface."
              ],
              <Smartphone />,
              ["React Native", "AI", "UX Design", "Mobile Development"]
            )}
            
            {renderTimelineElement(
              "Full-stack Developer",
              "PiCode Solutions",
              "May 2023 - Sep 2023",
              [
                "Built \"LOADEZ\" logistics app backend using Node.js, AWS Lambda.",
                "Created vendor-matching logic, reduced ops effort by 60%.",
                "Designed and implemented scalable API architecture.",
                "Integrated payment gateway for seamless transactions."
              ],
              <Code />,
              ["Node.js", "AWS Lambda", "API Design", "Payment Integration"]
            )}
            
            {renderTimelineElement(
              "Frontend Developer",
              "Greenbhumi",
              "Oct 2023 - Jan 2024",
              [
                "Built student dashboard with React + Material UI.",
                "Improved engagement & tracking metrics.",
                "Collaborated with backend team for data integration.",
                "Implemented responsive design for all device types."
              ],
              <Layout />,
              ["React", "Material UI", "Data Visualization", "Responsive Design"]
            )}
          </VerticalTimeline>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;