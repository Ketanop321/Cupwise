import React from 'react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1624456735729-03594a40c5fb',
    title: 'Saraswati Idol',
    description: 'Traditional Saraswati idol with veena'
  },
  {
    url: 'https://images.unsplash.com/photo-1623244307563-f9ade3df8383',
    title: 'Puja Ceremony',
    description: 'Traditional puja rituals'
  },
  {
    url: 'https://images.unsplash.com/photo-1621506821957-1b50ab7787a4',
    title: 'Cultural Program',
    description: 'Students performing cultural activities'
  }
];

export function Gallery() {
  return (
    <section className="min-h-screen bg-yellow-50/90 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-sanskrit text-yellow-800 mb-12">Gallery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">{image.title}</h3>
                  <p className="text-sm">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}