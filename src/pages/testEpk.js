import React from 'react';
import {
  Box,
} from '@mui/material';
import { EPKProvider, useEPK } from '../contexts/EPKContext';
import EPKPageContent from '../components/NewEPK/EPKPageContent';

const EPKInner = () => {
  const {
    songs,
    tiktoks,
    press,
    shows,
    selectedShow,
    setSelectedShow,
    bio,
    contact,
    streamingInfo,
    tiktokInfo,
  } = useEPK();

  return (
    <EPKPageContent
      songs={songs}
      tiktoks={tiktoks}
      press={press}
      shows={shows}
      selectedShow={selectedShow}
      setSelectedShow={setSelectedShow}
      bio={bio}
      contact={contact}
      streamingInfo={streamingInfo}
      tiktokInfo={tiktokInfo}
    />
  );
};

const EPKPage = () => (
  <Box
    sx={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top, #0f172a 0, #020617 45%, #000 100%)',
      color: 'rgba(255,255,255,0.9)',
      py: { xs: 3, md: 6 },
    }}
  >
    <EPKProvider>
      <EPKInner />
    </EPKProvider>
  </Box>
);



export default EPKPage;
