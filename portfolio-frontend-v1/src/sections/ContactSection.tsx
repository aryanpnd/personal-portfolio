import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../components/SectionTitle';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Get the base URL for API calls
      const baseUrl = import.meta.env.PROD
        ? window.location.origin  // In production, use the same origin
        : 'http://localhost:5000'; // In development, use localhost

      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success case
        const emailProvided = formData.email ? true : false;

        setSubmitStatus({
          type: 'success',
          message: `✅ Thank you! Your message has been successfully sent. I will get back to you as soon as possible!${emailProvided ? ' A confirmation has been sent to your email address.' : ''
            }`
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // Clear success message after 6 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
        }, 6000);
      } else {
        // Error from server
        setSubmitStatus({
          type: 'error',
          message: `❌ ${data.message || 'Something went wrong. Please try again.'}`
        });
      }
    } catch (error) {
      // Network error or other exceptions
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: '❌ Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: 'Email',
      content: 'aryanpnd3@gmail.com',
      link: 'mailto:aryanpnd3@gmail.com'
    },
    {
      icon: <Phone className="h-5 w-5 text-primary" />,
      title: 'Phone',
      content: '+91 8910486736',
      link: 'tel:+918910486736'
    },
    {
      icon: <MapPin className="h-5 w-5 text-primary" />,
      title: 'Location',
      content: 'Punjab, India',
      link: null
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a project in mind or want to collaborate? Feel free to reach out!"
          centered
        />

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12"
        >
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-gray-800/50 p-3 rounded-lg mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">{item.title}</h4>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-lg font-medium">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
              <h4 className="text-xl font-bold mb-4">Connect On Social Media</h4>
              <p className="text-gray-400 mb-4">
                Follow me on LinkedIn and GitHub to stay updated with my latest projects and professional journey.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com/in/aryanpnd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#0A66C2] text-white rounded-md hover:bg-[#0A66C2]/80 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/aryanpnd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3 bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Send Me a Message (It works!!)</h3>

            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'
                  }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                    Your Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    If provided, you'll receive a confirmation email.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-white resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-md transition-colors inline-flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                <Send size={18} className="mr-2" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;