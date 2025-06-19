import React, { useState, useEffect, useRef } from 'react';

const Navbar = ({ setCategory }) => {
  const categories = ["technology", "business", "sports", "entertainment", "science", "health"];
  const [activeCategory, setActiveCategory] = useState("general");
  const navRef = useRef(null);
  const [underlineStyle, setUnderlineStyle] = useState({});

  useEffect(() => {
    const activeItem = document.querySelector(".nav-link.active");
    if (activeItem) {
      const { offsetLeft, offsetWidth } = activeItem;
      setUnderlineStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeCategory]);

  const handleClick = (category) => {
    setCategory(category);
    setActiveCategory(category);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid position-relative" ref={navRef}>
        <a className="navbar-brand" href="#">
          <span className="badge bg-dark text-light fs-5">GetNews</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
          <div className="navbar-nav d-flex justify-content-center align-items-center position-relative">
            {categories.map((category) => (
              <div
                key={category}
                className={`nav-link mx-3 ${activeCategory === category ? 'active' : ''}`}
                style={{
                  cursor: 'pointer',
                  color: '#D1D8BE',
                  fontWeight: 500,
                  position: 'relative'
                }}
                onClick={() => handleClick(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
            ))}

            {/* The red underline */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                height: '3px',
                backgroundColor: 'red',
                transition: 'all 0.3s ease',
                ...underlineStyle
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
