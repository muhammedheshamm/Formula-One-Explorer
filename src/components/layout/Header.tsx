import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/img/logo.webp';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 py-4 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white' : 'bg-transparent'
      }`}
    >
      <div className="container">
        <Link to="/" className="mx-auto block w-fit">
          <img src={logo} alt="logo" className="w-30" />
        </Link>
      </div>
    </header>
  );
};
