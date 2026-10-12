import React, { useState } from 'react';

interface PlantImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
}

export const PlantImage: React.FC<PlantImageProps> = ({
  src,
  alt,
  className = '',
  category = 'Indoor'
}) => {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Reliable, high-resolution botanical fallbacks based on category
  const getFallbackUrl = () => {
    if (category.includes('Succulent') || category.includes('Cacti')) {
      return 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80';
    }
    if (category.includes('Herb')) {
      return 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=800&q=80';
    }
    if (category.includes('Tropical')) {
      return 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80';
    }
    return 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=800&q=80';
  };

  const imageSrc = hasError ? getFallbackUrl() : src;

  return (
    <div className={`plant-img-wrapper ${loaded ? 'loaded' : 'loading'}`}>
      {!loaded && <div className="plant-img-skeleton"></div>}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${loaded ? 'visible' : 'hidden'}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!hasError) {
            setHasError(true);
          }
        }}
      />
    </div>
  );
};
