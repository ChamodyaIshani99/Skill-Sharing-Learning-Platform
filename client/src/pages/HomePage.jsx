import { useState, useEffect } from 'react';

function HomePage() {
  const [hovered, setHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
    'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-1 bg-cover bg-center transition-opacity duration-1000 ${index === currentImage ?  'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-between py-12 px-6 text-white">
        {/* Animated logo */}
        <div className="flex flex-col items-center space-y-4 animate-fade-in-down">
          <div className="text-6xl animate-bounce">📸</div>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
              PhotoHub
            </h1>
            <p className="text-xl md:text-2xl mt-2 font-light tracking-wider">
              Capture. Share. Inspire.
            </p>
          </div>
        </div>
        
        {/* Rotating photo frames */}
        <div className="relative w-full max-w-3xl h-64 my-8">
          <div className="absolute top-0 left-1/4 w-48 h-48 bg-white rounded-lg shadow-2xl rotate-6 transition-all duration-500 hover:rotate-0 hover:scale-110 hover:z-10">
            <div 
              className="w-full h-full bg-cover bg-center rounded-lg" 
              style={{ backgroundImage: `url(https://images.unsplash.com/photo-1506744038136-46273834b3fb)` }}
            />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-56 bg-white rounded-lg shadow-2xl -rotate-3 transition-all duration-500 hover:rotate-0 hover:scale-110 hover:z-10">
            <div 
              className="w-full h-full bg-cover bg-center rounded-lg" 
              style={{ backgroundImage: `url(https://images.unsplash.com/photo-1519125323398-675f0ddb6308)` }}
            />
          </div>
          <div className="absolute top-0 right-1/4 w-48 h-48 bg-white rounded-lg shadow-2xl -rotate-12 transition-all duration-500 hover:rotate-0 hover:scale-110 hover:z-10">
            <div 
              className="w-full h-full bg-cover bg-center rounded-lg" 
              style={{ backgroundImage: `url(https://images.unsplash.com/photo-1501785888041-af3ef285b470)` }}
            />
          </div>
        </div>
        
        {/* Animated call to action */}
        <div className="flex flex-col items-center space-y-6 animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-medium text-center text-shadow">
            Join our community of photographers
          </h2>
          <a 
            href="http://localhost:8080/oauth2/authorization/google"
            className={`relative flex items-center px-6 py-3 rounded-full bg-white text-gray-800 font-medium overflow-hidden transition-all duration-300 ${hovered ? 'shadow-lg transform scale-105' : 'shadow-md'}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
            <span className="text-xl font-bold mr-3 z-10">G</span>
            <span className="z-10">Sign in with Google</span>
            <span className={`ml-3 z-10 transition-transform duration-300 ${hovered ? 'transform translate-x-2' : ''}`}>→</span>
          </a>
        </div>
        
        {/* Footer with animated elements */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex space-x-4">
            {['📷', '🌄', '🖼️', '🌟'].map((icon, i) => (
              <span 
                key={i}
                className="text-2xl hover:text-yellow-300 transform hover:scale-125 transition-transform duration-200 cursor-pointer"
              >
                {icon}
              </span>
            ))}
          </div>
          <p className="text-sm opacity-80">
            Share your moments with the world
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;