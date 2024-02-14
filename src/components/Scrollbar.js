// import PropTypes from 'prop-types';
// import SimpleBar from 'simplebar-react';

// // @mui
// import { alpha, styled } from '@mui/material/styles';
// import { Box } from '@mui/material';

// // ----------------------------------------------------------------------


// const SimpleBarStyle = styled(SimpleBar)(({ theme }) => ({
//   // maxHeight: '100%',
//   '& .simplebar-scrollbar': {
//     '&:before': {
//       backgroundColor: alpha(theme.palette.grey[600], 0.48),
//     },
//     '&.simplebar-visible:before': {
//       opacity: 1,
//     },
//   },
//   '& .simplebar-track.simplebar-vertical': {
//     width: 10,
//   },
//   '& .simplebar-track .simplebar-horizontal .simplebar-scrollbar': {
//     height: 6,
//   },
//   '& .simplebar-mask': {
//     zIndex: 'inherit',
//   },
//   "& .simplebar-placeholder": {
//     height: '0 !important',
//   }
// }));

// // ----------------------------------------------------------------------

// Scrollbar.propTypes = {
//   children: PropTypes.node.isRequired,
//   sx: PropTypes.object,
// };

// export default function Scrollbar({ children, sx, ...other }) {
//   const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

//   const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

//   if (isMobile) {
//     return (
//       <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
//         {children}
//       </Box>
//     );
//   }

//   return (
//       <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
//         {children}
//       </SimpleBarStyle>
//   );
// }

// export {SimpleBarStyle};

import PropTypes from 'prop-types';
import SimpleBar from 'simplebar-react';

// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const CustomSimpleBar = styled(SimpleBar)(({ theme }) => ({
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10,
  },
  '& .simplebar-track .simplebar-horizontal .simplebar-scrollbar': {
    height: 6,
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
  "& .simplebar-placeholder": {
    height: '0 !important',
  }
}));

// ----------------------------------------------------------------------

CustomSimpleBar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function Scrollbar({ children, sx, ...other }) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <CustomSimpleBar timeout={500} clickOnTrack={false} sx={sx} {...other}>
      {children}
    </CustomSimpleBar>
  );
}
