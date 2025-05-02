import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../components/SectionTitle';
import { X, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  githubUrl?: string[];
  liveUrl?: string;
}

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = [
    {
      id: 1,
      title: "Find My Verto",
      description: "Cross-platform app for LPU students with 100+ MAUs",
      fullDescription: "A cross-platform mobile application designed specifically for LPU students to help them find and connect with their Verto peers. The app has garnered over 100+ monthly active users and continues to grow in popularity within the campus community.",
      image: "https://raw.githubusercontent.com/aryanpnd/findMyVerto/refs/heads/main/logo.png",
      technologies: ["React Native", "NodeJS", "MongoDB", "Golang", "Azure"],
      features: [
        "Real-time push notifications via FCM",
        "OTA updates for seamless app upgrades",
        "In-app analytics tracking",
        "Scalable API architecture",
        "Used reverse-engineered APIs instead of crawling for efficiency"
      ],
      githubUrl: ["https://github.com/aryanpnd/findmyverto"],
      liveUrl: "https://aryanpnd.github.io/findMyVerto/index.html"
    },
    {
      id: 2,
      title: "Clipy",
      description: "Real-time clipboard sync between Android and PC via WebSockets",
      fullDescription: "A real-time clipboard synchronization tool that enables seamless sharing of text and data between Android devices and PCs. Utilizing WebSockets for instant communication, Clipy makes cross-device copy-paste operations effortless.",
      image: "https://raw.githubusercontent.com/aryanpnd/clipy-client-pc/refs/heads/main/clipylogo.png",
      technologies: ["Go", "Kotlin", "WebSockets", "Android XML"],
      features: [
        "Real-time event stream for instant updates",
        "End-to-end encryption for secure data transfer",
        "Low latency clipboard syncing",
        "Multi-device support",
        "Offline queue for pending transfers"
      ],
      githubUrl: [
        "https://github.com/aryanpnd/clipy-client-android",
        "https://github.com/aryanpnd/clipy-client-pc"
      ]
    },
    {
      id: 3,
      title: "Retro-Bazaar",
      description: "College buy/sell platform using MERN stack + OAuth",
      fullDescription: "A comprehensive marketplace platform designed specifically for college students to buy, sell, or exchange items within their campus community. Built on the MERN stack with OAuth authentication for secure user access.",
      image: "https://raw.githubusercontent.com/aryanpnd/Retro-Bazaar/main/logo.png",
      technologies: ["MongoDB", "Express", "React", "Node.js", "OAuth"],
      features: [
        "User authentication with OAuth",
        "Real-time chat between buyers and sellers",
        "Advanced search and filtering options",
        "Rating and review system",
        "Responsive UI for all device types"
      ],
      githubUrl: ["https://github.com/aryanpnd/retro-bazaar"],
      liveUrl: "https://retro-bazaar.onrender.com/"
    },
  ];

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Featured Projects"
          subtitle="Here are some of my notable projects that showcase my skills and expertise."
          centered
        />

        
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="card-project group cursor-pointer"
              onClick={() => openProjectModal(project)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
              </div> */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProjectModal}
            >
              <motion.div
                className="bg-gray-900 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left side - Image */}
                  {selectedProject.image && <div className="relative md:w-2/5 h-64 md:h-auto">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover object-center md:rounded-l-xl md:rounded-tr-none rounded-t-xl"
                    />
                    <button
                      className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/80 transition-colors"
                      onClick={closeProjectModal}
                      aria-label="Close modal"
                    >
                      <X size={20} className="text-white" />
                    </button>
                  </div>}

                  {/* Right side - Content */}
                  <div className="p-6 md:w-3/5 md:overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-300 mb-6">{selectedProject.fullDescription}</p>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-gray-400">
                            <span className="text-primary mr-2">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {selectedProject.githubUrl &&
                        selectedProject.githubUrl.map((url, index) => (
                          <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-white inline-flex items-center transition-colors"
                          >
                            <Github size={18} className="mr-2" />
                            {index > 0 ? `${index + 1}. GitHub` : "GitHub"}
                          </a>
                        ))}
                      {selectedProject.githubUrl && selectedProject.githubUrl.length === 0 && (
                        <span className="text-gray-400">No GitHub link available</span>
                      )}

                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-md text-white inline-flex items-center transition-colors"
                        >
                          <ExternalLink size={18} className="mr-2" />
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;