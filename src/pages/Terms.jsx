import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-brand-dark pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20 py-12 px-4 sm:px-6 lg:px-8">
      {/* 添加渐变背景层 */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-magenta-500/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 border border-cyan-500/20 rounded-xl p-8 backdrop-blur-sm relative">
          {/* 添加网格图案覆盖层 */}
          <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none rounded-xl"></div>
          
          <div className="relative z-10">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300">
                By accessing or using the AI Tech Nexus website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">2. Use License</h2>
              <p className="text-gray-300 mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on AI Tech Nexus for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">3. Disclaimer</h2>
              <p className="text-gray-300">
                The materials on AI Tech Nexus are provided on an 'as is' basis. AI Tech Nexus makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">4. Limitations</h2>
              <p className="text-gray-300">
                In no event shall AI Tech Nexus or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AI Tech Nexus, even if AI Tech Nexus or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">5. User Responsibilities</h2>
              <p className="text-gray-300">
                Users are responsible for maintaining the confidentiality of their account and password and for restricting access to their computer. Users agree to accept responsibility for all activities that occur under their account or password.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">6. Governing Law</h2>
              <p className="text-gray-300">
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction where the service provider is located and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">7. Changes to Terms</h2>
              <p className="text-gray-300">
                AI Tech Nexus may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
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

export default Terms;