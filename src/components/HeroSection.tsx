import { ArrowDown } from 'lucide-react';
import bgImage from '@/assets/img/hero-bg.webp';
import { Button } from './ui/button';

export const HeroSection = () => {
  const scrollToSeasons = () => {
    const seasonsSection = document.getElementById('seasons-list');
    if (seasonsSection) {
      seasonsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen w-full flex items-end">
      <img
        src={bgImage}
        role="presentation"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'brightness(0.7)',
        }}
      />

      <div className="relative z-10 text-white container mb-40">
        <p className="text-5xl md:text-7xl font-bold">
          FEEL THE <span className="text-primary-200">SPEED</span>
        </p>
        <p className="text-5xl md:text-7xl font-bold mt-4">
          LIVE THE <span className="text-primary-200">PASSION</span>
        </p>
        <p className="text-primary-100 mt-10 max-w-[500px]">
          Dive into decades of races, legendary drivers, and thrilling circuits. Your journey through Formula 1 history
          starts here.
        </p>
        <Button
          variant="outline"
          className="text-white border-white bg-transparent rounded-full hover:bg-primary-200 hover:text-white mt-10 px-10 py-6 text-base"
          size="lg"
          aria-label="Explore Seasons"
          onClick={scrollToSeasons}
        >
          <span className="flex items-center">
            Explore Seasons
            <ArrowDown className="ml-2" />
          </span>
        </Button>
      </div>
    </div>
  );
};
