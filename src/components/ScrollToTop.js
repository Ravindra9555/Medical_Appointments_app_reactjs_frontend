// scroll to the top of the screen
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);
  return null;
}

export default ScrollToTop
