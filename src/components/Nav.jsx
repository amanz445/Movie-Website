import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const handleLinkClick = (to) => {
    setActiveLink(to);
    closeMobileMenu();
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      setIsScrolled(scrollPosition > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 py-3 px-4 lg:px-8 xl:px-16 2xl:px-32 flex items-center justify-between ${isScrolled ? 'bg-white text-black drop-shadow-md' : 'bg-black text-white'}`}>
      <NavLink to="/Movie-Website/home">
        <h1 className="text-xl lg:text-2xl font-bold">
          <span className='text-red text-2xl lg:text-3xl'>A </span>flix
        </h1>
      </NavLink>

      

      <div className={`flex items-center justify-center ${isMobileMenuOpen ? 'flex-col items-end' : '' }`}>

      <div className="lg:hidden">
        {isMobileMenuOpen ? (
          <button onClick={closeMobileMenu} className="text-white" aria-label="Close Menu">
            <i className="fas fa-times text-xl"></i>
          </button>
        ) : (
          <button onClick={openMobileMenu} className="text-white" aria-label="Toggle Menu">
            <i className="fas fa-bars text-xl"></i>
          </button>
        )}
      </div>



      <ul className={`flex items-center justify-between gap-4 lg:gap-8 mr-5 ${isMobileMenuOpen ? 'flex-col items-start' : 'hidden lg:flex'}`}>
        <li>
          <NavLink
            to="/Movie-Website/home"
            onClick={() => handleLinkClick('/home')}
            className={`text-sm lg:text-base ${activeLink === '/home' ? 'text-red' : isScrolled ? 'text-black' : ''}`}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Movie-Website/movies"
            onClick={() => handleLinkClick('/movies')}
            className={`text-sm lg:text-base ${activeLink === '/movies' ? 'text-red' : isScrolled ? 'text-black' : ''}`}
          >
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Movie-Website/series"
            onClick={() => handleLinkClick('/series')}
            className={`text-sm lg:text-base ${activeLink === '/series' ? 'text-red' : isScrolled ? 'text-black' : ''}`}
          >
            Series
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Movie-Website/genre"
            onClick={() => handleLinkClick('/genre')}
            className={`text-sm lg:text-base ${activeLink === '/genre' ? 'text-red' : isScrolled ? 'text-black' : ''}`}
          >
            Genre
          </NavLink>
        </li>
        {/* Add similar NavLink elements for other menu items */}
      </ul>


      <div className={`flex items-center gap-3 lg:gap-6 hidden lg:flex ${isScrolled ? 'text-black' : ''}`}>
        {/* Search button and form */}
        <div className="flex items-center gap-2">
          {isSearchActive && (
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 border-t-0 border-l-0 border-r-0 border-b border-black outline-none text-black text-sm"
              />
              <button type="button" onClick={toggleSearch} className="py-2 px-3 bg-gray-100">
                <i className={`fas ${isSearchActive ? 'fa-times' : 'fa-search'}`}></i>
              </button>
            </form>
          )}
          {!isSearchActive && (
            <button onClick={toggleSearch} className="py-2 px-3">
              <i className="fas fa-search"></i>
            </button>
          )}
        </div>

        {/* Sign Up button */}
        <button className={`bg-red text-white px-4 py-2 text-sm lg:text-base ${isScrolled ? 'text-black' : ''}`}>
          Sign Up
        </button>
      </div>


      </div>

      
    </header>
  );
};

export default Nav;