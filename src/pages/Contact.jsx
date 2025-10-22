import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MailIcon, MessageSquare, HelpCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // 模拟API调用
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      // 重置表单
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // 这里可以设置错误状态
    } finally {
      setIsSubmitting(false);
    }
  };

  // FAQ 数据
  const faqs = [
    {
      question: "How can I submit an article to AI Tech Nexus?",
      answer: "You can submit articles through our 'Write for Us' portal. Simply create an account, navigate to the submission page, and follow the guidelines provided."
    },
    {
      question: "What topics do you cover?",
      answer: "We cover a wide range of topics including artificial intelligence, machine learning, data science, emerging technologies, tech industry trends, and software development."
    },
    {
      question: "How often do you publish new content?",
      answer: "We publish new articles 3-5 times per week. You can subscribe to our newsletter to get notified about new publications."
    },
    {
      question: "Can I republish content from AI Tech Nexus?",
      answer: "All content is copyrighted. For republishing rights, please contact our editorial team with your request and intended use."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-dark pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20">
      {/* 添加渐变背景层 */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-magenta-500/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 py-12 relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have questions, suggestions, or want to contribute? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl border border-cyan-500/20 p-8 backdrop-blur-sm relative">
            {/* 添加网格图案覆盖层 */}
            <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                <Send className="mr-3 h-6 w-6" />
                Send us a Message
              </h2>
              
              {isSubmitted ? (
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 text-center backdrop-blur-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-3 bg-gray-800/50 border ${
                          errors.name ? 'border-red-500/50' : 'border-cyan-500/20'
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm`}
                        placeholder="Your full name"
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MailIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-3 bg-gray-800/50 border ${
                          errors.email ? 'border-red-500/50' : 'border-cyan-500/20'
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`block w-full px-3 py-3 bg-gray-800/50 border ${
                        errors.subject ? 'border-red-500/50' : 'border-cyan-500/20'
                      } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm`}
                      placeholder="What is this regarding?"
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3">
                        <MessageSquare className="h-5 w-5 text-gray-500" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-3 bg-gray-800/50 border ${
                          errors.message ? 'border-red-500/50' : 'border-cyan-500/20'
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm`}
                        placeholder="Your message here..."
                      ></textarea>
                    </div>
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center disabled:opacity-50 backdrop-blur-sm border border-cyan-500/30"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information and FAQ */}
          <div>
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl border border-cyan-500/20 p-8 mb-8 backdrop-blur-sm relative">
              {/* 添加网格图案覆盖层 */}
              <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 p-3 rounded-lg border border-cyan-500/30">
                      <Mail className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-white">Email</h3>
                      <p className="text-gray-400">contact@aitotechnexus.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 p-3 rounded-lg border border-cyan-500/30">
                      <Phone className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-white">Phone</h3>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 p-3 rounded-lg border border-cyan-500/30">
                      <MapPin className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-white">Office</h3>
                      <p className="text-gray-400">123 Tech Street, San Francisco, CA 94103</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl border border-cyan-500/20 p-8 backdrop-blur-sm relative">
              {/* 添加网格图案覆盖层 */}
              <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                  <HelpCircle className="mr-3 h-6 w-6" />
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={`${index}-${faq.question}`} className="border-b border-cyan-500/20 pb-6 last:border-0 last:pb-0">
                      <h3 className="text-lg font-medium text-white mb-2">{faq.question}</h3>
                      <p className="text-gray-400">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact