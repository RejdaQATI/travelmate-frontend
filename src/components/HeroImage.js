import React from 'react';

const HeroImage = () => {
  return (
    <div className="relative h-[500px]">
      {/* Hero background image */}
      <img
        src="images/webp.webp"
        alt="Hero"
        className="w-full h-full object-cover"
      />

      {/* Overlay with shadow effect */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Optional overlay text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white">Faites vos valises, l'aventure commence !</h1>
      </div>
    </div>
  );
};

export default HeroImage;
