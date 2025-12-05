import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Section from '../Section';

export default function Streaming({ streamingInfo }) {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Center the active card
  const scrollToIndex = useCallback((index) => {
    const container = containerRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    const containerWidth = container.offsetWidth;
    const cardWidth = card.offsetWidth;

    const offset =
      card.offsetLeft - (containerWidth / 2 - cardWidth / 2);

    container.scrollTo({
      left: offset,
      behavior: 'smooth',
    });
  }, []);

  // Auto-advance
  useEffect(() => {
    if (!streamingInfo || streamingInfo.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        (prev + 1) % streamingInfo.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [streamingInfo]);

  // Scroll on active change
  useEffect(() => {
    scrollToIndex(activeIndex);
  }, [activeIndex, scrollToIndex]);

  const handleArrow = (dir) => {
    if (!streamingInfo?.length) return;

    setActiveIndex((prev) => {
      if (dir === 'left') {
        return (prev - 1 + streamingInfo.length) % streamingInfo.length;
      }
      return (prev + 1) % streamingInfo.length;
    });
  };

  return (
    <Section title="Streaming Performance" compact>
      <Box
        sx={{
          position: 'relative',
          py: 3,
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Scroll Strip */}
        <Box
          ref={containerRef}
          sx={{
            display: 'flex',
            alignItems: 'center',
            overflowX: 'auto',
            overflowY: 'hidden',
            px: 0.5,
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',

            '&::-webkit-scrollbar': { height: 0 },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': { background: 'transparent' },
          }}
        >
          {streamingInfo.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <Card
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                elevation={0}
                onClick={() => setActiveIndex(index)}
                sx={{
                  flex: '0 0 260px',
                  scrollSnapAlign: 'center',
                  borderRadius: 3,
                  bgcolor: 'rgba(15,23,42,0.96)',
                  border: isActive
                    ? '1px solid rgba(56,189,248,0.95)'
                    : '1px solid rgba(51,65,85,0.9)',
                  position: 'relative',
                  // 🔹 stronger overlap
                  mx: index === 0 ? 0 : -6,
                  cursor: 'pointer',

                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: 150,
                  px: 2.6,
                  py: 2.4,

                  zIndex: isActive ? 120 : 40 - index,
                  boxShadow: isActive
                    ? '0 26px 80px rgba(15,23,42,1)'
                    : '0 14px 32px rgba(15,23,42,0.7)',

                  // ✅ active = 1, inactive noticeably smaller
                  transform: isActive
                    ? 'scale(1)'
                    : 'scale(0.8)',

                  transition:
                    'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',

                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: '-1px',
                    borderRadius: 'inherit',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(56,189,248,0.7), rgba(129,140,248,0.8), rgba(45,212,191,0.9))'
                      : 'linear-gradient(135deg, rgba(30,64,175,0.25), rgba(15,118,110,0.2))',
                    opacity: isActive ? 0.95 : 0,
                    zIndex: -1,
                    transition: 'opacity 220ms ease',
                  },

                  '&:hover': {
                    transform: isActive
                      ? 'scale(1)'
                      : 'scale(0.85)', // 🔹 hover inactive up a bit, still < 1
                    boxShadow: '0 30px 95px rgba(15,23,42,1)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 0,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: 0.75,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      lineHeight: 1.25,
                      fontSize: '1.05rem',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      backgroundImage:
                        'linear-gradient(135deg, #e5e7eb, #a5b4fc, #5eead4)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    {item}
                  </Typography>

                  <Box
                    sx={{
                      mt: 0.5,
                      height: 3,
                      borderRadius: 999,
                      alignSelf: 'stretch',
                      background: isActive
                        ? 'linear-gradient(90deg, rgba(56,189,248,0.4), rgba(129,140,248,0.95), rgba(45,212,191,0.95))'
                        : 'linear-gradient(90deg, rgba(31,41,55,0.7), rgba(30,64,175,0.6))',
                    }}
                  />
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Left Arrow */}
        {streamingInfo.length > 1 && (
          <>
            <IconButton
              onClick={() => handleArrow('left')}
              sx={{
                color: 'white',
                position: 'absolute',
                left: -6,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(15,23,42,0.95)',
                border: '1px solid rgba(148,163,184,0.7)',
                boxShadow: '0 12px 30px rgba(15,23,42,0.9)',
                '&:hover': {
                  bgcolor: 'rgba(15,23,42,1)',
                  borderColor: 'rgba(56,189,248,1)',
                },
                display: { xs: 'none', md: 'flex' },
                zIndex: 200,
              }}
              size="small"
            >
              <ChevronLeft fontSize="small" />
            </IconButton>

            {/* Right Arrow */}
            <IconButton
              onClick={() => handleArrow('right')}
              sx={{
                color: 'white',
                position: 'absolute',
                right: -6,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(15,23,42,0.95)',
                border: '1px solid rgba(148,163,184,0.7)',
                boxShadow: '0 12px 30px rgba(15,23,42,0.9)',
                '&:hover': {
                  bgcolor: 'rgba(15,23,42,1)',
                  borderColor: 'rgba(56,189,248,1)',
                },
                display: { xs: 'none', md: 'flex' },
                zIndex: 200,
              }}
              size="small"
            >
              <ChevronRight fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>
    </Section>
  );
}
