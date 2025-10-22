import React from 'react';
import { Mail, Phone, MapPin, HelpCircle } from 'lucide-react';

const Contact = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent animate-fade-in">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in">
            Have questions, suggestions, or want to contribute? We'd love to hear from you.
          </p>
        </div>

        

          {/* Contact Information and FAQ */}
          <div className="grid grid-cols-1 gap-12">
            {/* Contact Information */}
            <div className="bg-brand-dark border border-cyan-500/20 rounded-lg p-8 text-center article-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:border-cyan-500/50 hover:bg-cyan-900/10 relative">
              {/* 添加网格图案覆盖层 */}
              <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent animate-fade-in">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start animate-fade-in">
                    <div className="flex-shrink-0 bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 p-3 rounded-lg border border-cyan-500/30 transition-all duration-300 group-hover:scale-110">
                      <Mail className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-white">Email</h3>
                      <p className="text-gray-400">1140467720@qq.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start animate-fade-in">
                    <div className="flex-shrink-0 bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 p-3 rounded-lg border border-cyan-500/30 transition-all duration-300 group-hover:scale-110">
                      <Phone className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-white">Phone</h3>
                      <p className="text-gray-400">(+86)15013698930</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start animate-fade-in">
                    <div className="flex-shrink-0 bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 p-3 rounded-lg border border-cyan-500/30 transition-all duration-300 group-hover:scale-110">
                      <MapPin className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-white">Office</h3>
                      <p className="text-gray-400">chaoyang district, beijing, china</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-brand-dark border border-cyan-500/20 rounded-lg p-8 article-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:border-cyan-500/50 hover:bg-cyan-900/10 relative">
              {/* 添加网格图案覆盖层 */}
              <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent animate-fade-in">
                  <HelpCircle className="mr-3 h-6 w-6" />
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={`${index}-${faq.question}`} className="border-b border-cyan-500/20 pb-6 last:border-0 last:pb-0 animate-fade-in">
                      <h3 className="text-lg font-medium text-white mb-2 transition-colors duration-300 group-hover:text-cyan-400">{faq.question}</h3>
                      <p className="text-gray-400">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Contact