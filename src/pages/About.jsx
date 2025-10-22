import React from 'react'
import { Gem, FileText, Code2, MessageCircle, FlaskConical, Sprout, Users } from 'lucide-react'

const About = () => {
  return (
    <div className="pt-2 sm:pt-4">
      {/* Hero Section with background image */}
      <section className="relative h-[50vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('https://r2.flowith.net/files/png/ZGRJC-tech_blog_hero_banner_index_0@1024x1024.png')", filter: "blur(4px) brightness(0.7)" }}></div>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 px-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter">About AI Tech Nexus</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">Connecting minds at the intersection of AI, software engineering, and product innovation.</p>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-brand-dark-secondary/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-in mb-20">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Gem className="text-cyan-400" />
              Our Mission
            </h2>
            <p className="text-lg text-gray-300">
              Our mission is to demystify complex topics in artificial intelligence and software engineering. We provide clear, actionable insights for software developers, product managers, and tech enthusiasts to build the future of digital products. We believe in the power of shared knowledge to foster innovation and growth.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-brand-dark border border-cyan-500/20 rounded-lg p-8 text-center article-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:border-cyan-500/50 hover:bg-cyan-900/10">
                
                <div className="flex justify-center mb-4">
                    <div className="bg-cyan-900/50 text-cyan-400 rounded-full p-4 transition-all duration-300 group-hover:scale-110">
                        <FileText className="w-8 h-8" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-cyan-400">In-Depth Articles</h3>
                <p className="text-gray-400">Deep dives into the latest AI models, software architecture patterns, and development best practices.</p>
              </div>
              <div className="bg-brand-dark border border-cyan-500/20 rounded-lg p-8 text-center article-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:border-cyan-500/50 hover:bg-cyan-900/10">
                <div className="flex justify-center mb-4">
                    <div className="bg-cyan-900/50 text-cyan-400 rounded-full p-4 transition-all duration-300 group-hover:scale-110">
                        <Code2 className="w-8 h-8" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-cyan-400">Practical Tutorials</h3>
                <p className="text-gray-400">Hands-on guides and code walkthroughs that you can directly apply to your projects.</p>
              </div>
              <div className="bg-brand-dark border border-cyan-500/20 rounded-lg p-8 text-center article-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:border-cyan-500/50 hover:bg-cyan-900/10">
                <div className="flex justify-center mb-4">
                    <div className="bg-cyan-900/50 text-cyan-400 rounded-full p-4 transition-all duration-300 group-hover:scale-110">
                        <MessageCircle className="w-8 h-8" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-cyan-400">Community Discussion</h3>
                <p className="text-gray-400">A vibrant space for readers to share thoughts, ask questions, and connect with peers.</p>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="max-w-4xl mx-auto mt-24">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-brand-dark border border-cyan-500/20 rounded-lg p-8 text-center article-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:border-cyan-500/50 hover:bg-cyan-900/10">
                <div className="flex justify-center mb-4">
                  <div className="bg-cyan-900/50 text-cyan-400 rounded-full p-4 transition-all duration-300 group-hover:scale-110">
                    <FlaskConical className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-cyan-400">Technical Excellence</h3>
                <p className="text-gray-400">
                  Deep dives into complex technical concepts with practical examples
                </p>
              </div>
              <div className="bg-brand-dark border border-cyan-500/20 rounded-lg p-8 text-center article-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:border-cyan-500/50 hover:bg-cyan-900/10">
                <div className="flex justify-center mb-4">
                  <div className="bg-cyan-900/50 text-cyan-400 rounded-full p-4 transition-all duration-300 group-hover:scale-110">
                    <Sprout className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-cyan-400">Continuous Learning</h3>
                <p className="text-gray-400">
                  Staying current with the latest trends and technologies
                </p>
              </div>
              <div className="bg-brand-dark border border-cyan-500/20 rounded-lg p-8 text-center article-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:border-cyan-500/50 hover:bg-cyan-900/10">
                <div className="flex justify-center mb-4">
                  <div className="bg-cyan-900/50 text-cyan-400 rounded-full p-4 transition-all duration-300 group-hover:scale-110">
                    <Users className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-cyan-400">Community Focus</h3>
                <p className="text-gray-400">
                  Building a community of passionate technologists and learners
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About