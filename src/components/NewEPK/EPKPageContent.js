import React from 'react';
import { Container } from '@mui/material';
import Bio from './Bio/Bio';
import RecentShows from './RecentShows/RecentShows';
import TikTokHighlights from './TiktokHighlights/TiktokHighlights';
import Streaming from './Streaming/Streaming';
import Press from './Press/Press';
import Contact from './Contact/Contact';

export default function EPKPageContent({
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
}) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <Bio bio={bio} />
      <RecentShows 
        shows={shows} 
        selectedShow={selectedShow} 
        setSelectedShow={setSelectedShow} 
      />
      <TikTokHighlights 
        tiktoks={tiktoks} 
        tiktokInfo={tiktokInfo} 
      />
      <Streaming streamingInfo={streamingInfo} />
      <Press press={press} />
      <Contact contact={contact} />
    </Container>
  );
}
