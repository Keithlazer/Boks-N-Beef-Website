import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaPlay, FaPause } from 'react-icons/fa';

interface HeroSectionProps {
  season?: 'summer' | 'winter' | 'spring' | 'autumn';
}

const HeroSection: React.FC<HeroSectionProps> = ({ season = 'summer' }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; type: string }>>([]);
  const [showVideo, setShowVideo] = useState(false);

  // Initialize GSAP animations
  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Staggered title animation
    const titleSpans = titleRef.current?.querySelectorAll('span');
    if (titleSpans) {
      tl.fromTo(titleSpans, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }
      );
    }

    // Subtitle animation
    tl.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    );

    // CTA buttons animation
    tl.fromTo(ctaRef.current?.children,
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
      '-=0.3'
    );

    // Stats cards animation
    tl.fromTo(statsRef.current?.children,
      { y: 50, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 },
      '-=0.4'
    );

    return () => tl.kill();
  }, []);

  // Particle system
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: season === 'winter' ? 'snowflake' : 'grass'
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 8000);

    return () => clearInterval(interval);
  }, [season]);

  useEffect(() => {
    setTimeout(() => setShowVideo(true), 1000); // Defer video load by 1s
  }, []);

  // Video controls
  const toggleVideo = () => {
    const video = heroRef.current?.querySelector('video') as HTMLVideoElement;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const stats = [
    { label: 'Years Experience', value: '25+', icon: '🏆' },
    { label: 'Premium Cattle', value: '500+', icon: '🐄' },
    { label: 'Happy Clients', value: '1000+', icon: '👥' },
    { label: 'Quality Rating', value: '5★', icon: '⭐' }
  ];

  return (
    <section 
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden season-${season}`}
    >
      {/* Video Background */}
      {showVideo && (
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        >
          <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Particle System */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle ${particle.type}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }}
        />
      ))}

      {/* Video Control Button */}
      <button
        onClick={toggleVideo}
        className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-accent"
        aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
      >
        {isVideoPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>

      {/* Hero Content */}
      <div className="hero-content text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Animated Title */}
        <h1 
          ref={titleRef}
          className="font-ranch text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-shadow"
        >
          <span>P</span>
          <span>r</span>
          <span>e</span>
          <span>m</span>
          <span>i</span>
          <span>u</span>
          <span>m</span>
          <span>&nbsp;</span>
          <span>C</span>
          <span>a</span>
          <span>t</span>
          <span>t</span>
          <span>l</span>
          <span>e</span>
          <span>&nbsp;</span>
          <span>&</span>
          <span>&nbsp;</span>
          <span>E</span>
          <span>x</span>
          <span>c</span>
          <span>e</span>
          <span>p</span>
          <span>t</span>
          <span>i</span>
          <span>o</span>
          <span>n</span>
          <span>a</span>
          <span>l</span>
          <span>&nbsp;</span>
          <span>B</span>
          <span>e</span>
          <span>e</span>
          <span>f</span>
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-xl sm:text-2xl mb-8 text-shadow max-w-3xl mx-auto"
        >
          Breeding excellence in livestock and crafting the finest beef products with generations of ranching expertise
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="btn-primary group relative overflow-hidden">
            <span className="relative z-10">Explore Our Cattle</span>
            <div className="absolute inset-0 bg-gradient-to-r from-grass-green to-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button className="btn-secondary sizzle-effect group relative overflow-hidden">
            <span className="relative z-10">Discover Our Beef</span>
            <div className="absolute inset-0 bg-gradient-to-r from-beef-red to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Interactive Stats Cards */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="interactive-card glass-effect rounded-lg p-6 text-center group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold mb-1 group-hover:text-gold-accent transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                {stat.label}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                {stat.label}: {stat.value}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 