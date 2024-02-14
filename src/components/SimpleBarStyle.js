import { styled, alpha } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const SimpleBarStyle = styled('div')(({ theme }) => {
  const [isScrollbarVisible, setScrollbarVisible] = useState(true);

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      setScrollbarVisible(true);
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setScrollbarVisible(false);
      }, 500);
    };

    const container = document.querySelector('.custom-scrollbar-container');
    container.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    position: 'relative',
    overflow: 'auto',
    height: '100%',
    '& .custom-scrollbar': {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '10px',
      height: '100%',
      background: alpha(theme.palette.grey[600], 0.48),
      display: isScrollbarVisible ? 'block' : 'none',
      '&:hover': {
        background: theme.palette.grey[600],
      },
    },
    '& .custom-scrollbar-thumb': {
      width: '10px',
      background: theme.palette.grey[800],
      borderRadius: '5px',
      cursor: 'pointer',
      '&:hover': {
        background: theme.palette.grey[900],
      },
    },
  };
});

export default SimpleBarStyle;




