import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Typewriter.css'; // Import CSS file for styling

interface TypewriterProps {
  text: string;
  delay: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger fade-in effect

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className={`typewriter-text ${isVisible ? 'fade-in' : ''}`}>{currentText}</span>
  );
};

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

export default Typewriter;