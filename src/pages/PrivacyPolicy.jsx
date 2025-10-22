import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-brand-dark pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20 py-12 px-4 sm:px-6 lg:px-8">
      {/* 添加渐变背景层 */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-magenta-500/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last updated: December 1, 2024</p>
        </div>
        
        <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 border border-cyan-500/20 rounded-xl p-8 backdrop-blur-sm relative">
          {/* 添加网格图案覆盖层 */}
          <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none rounded-xl"></div>
          
          <div className="relative z-10">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">1. Information We Collect</h2>
              <p className="text-gray-300 mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                subscribe to our newsletter, or contact us for support. This may include your name, 
                email address, and any other information you choose to provide.
              </p>
              <p className="text-gray-300">
                We also automatically collect certain information about your device and usage, 
                including your IP address, browser type, operating system, and browsing behavior.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-300 mb-4">
                We use the information we collect to provide, maintain, and improve our services, 
                including to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Create and manage your account</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Detect and prevent fraudulent activity</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">3. Information Sharing and Disclosure</h2>
              <p className="text-gray-300 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent. However, we may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>With service providers who assist us in operating our website</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a merger or acquisition</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">4. Data Security</h2>
              <p className="text-gray-300">
                We implement reasonable security measures to protect your information from unauthorized 
                access, alteration, disclosure, or destruction. However, no method of transmission over 
                the internet is 100% secure.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">5. Your Rights</h2>
              <p className="text-gray-300 mb-4">
                You have the right to access, update, or delete your personal information. 
                You may also object to or restrict certain processing activities.
              </p>
              <p className="text-gray-300">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-300">
                We use cookies and similar tracking technologies to enhance your experience 
                and analyze website usage. You can control cookies through your browser settings.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">7. Third-Party Services</h2>
              <p className="text-gray-300">
                Our website may contain links to third-party websites or services that are 
                not operated by us. We have no control over and assume no responsibility 
                for the content or privacy practices of these sites.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-300">
                Our services are not intended for individuals under the age of 13. 
                We do not knowingly collect personal information from children under 13.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-300">
                Your information may be transferred to and maintained on computers located 
                outside of your state, province, country or other governmental jurisdiction.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">10. Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-300">
                Email: privacy@aitotechnexus.com
              </p>
            </section>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;