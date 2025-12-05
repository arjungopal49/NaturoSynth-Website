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
import RadioIcon from '@mui/icons-material/Radio';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArticleIcon from '@mui/icons-material/Article';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LaunchIcon from '@mui/icons-material/Launch';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Section from '../Section';

function getPressIcon(type) {
  switch (type) {
    case 'Radio':
      return <RadioIcon sx={{ fontSize: 22 }} />;
    case 'Instagram':
      return <InstagramIcon sx={{ fontSize: 22 }} />;
    case 'Sync':
      return <SyncAltIcon sx={{ fontSize: 22 }} />;
    case 'Channel':
      return <YouTubeIcon sx={{ fontSize: 22 }} />;
    case 'Article':
    default:
      return <ArticleIcon sx={{ fontSize: 22 }} />;
  }
}

export default function Press({ press }) {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = press.slice(0, 10);

  // Center the active card (same pattern as Streaming)
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

  // Scroll when active changes
  useEffect(() => {
    if (!items.length) return;
    scrollToIndex(activeIndex);
  }, [activeIndex, items.length, scrollToIndex]);

  // Auto-advance (same as Streaming)
  useEffect(() => {
    if (!items || items.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [items]);

  const handleArrow = (dir) => {
    if (!items?.length) return;

    setActiveIndex((prev) => {
      if (dir === 'left') {
        return (prev - 1 + items.length) % items.length;
      }
      return (prev + 1) % items.length;
    });
  };

  return (
    <Section title="Press, Radio & Sync" compact>
      <Box
        sx={{
          position: 'relative',
          py: 2,
          minHeight: 190,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Scroll Strip */}
        <Box
          ref={containerRef}
          sx={{
            display: 'flex',
            alignItems: 'stretch',
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
          {items.map((p, index) => {
            const isActive = index === activeIndex;
            const hasLink = Boolean(p.link);
            const icon = getPressIcon(p.type);

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
                    : '1px solid rgba(51,65,85,0.95)',
                  position: 'relative',
                  // overlap, similar to Streaming
                  mx: index === 0 ? 0 : -10,
                  cursor: 'pointer',

                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: 140,
                  px: 2.4,
                  py: 2,

                  // later cards above earlier → left-to-right overlap
                  zIndex: isActive ? 200 : 40 + index,
                  boxShadow: isActive
                    ? '0 24px 70px rgba(15,23,42,1)'
                    : '0 14px 32px rgba(15,23,42,0.7)',

                  transform: isActive ? 'scale(1)' : 'scale(0.9)',
                  transition:
                    'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',

                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    borderRadius: '24px 0 0 24px',
                    background: isActive
                      ? 'linear-gradient(180deg, rgba(59,130,246,1), rgba(129,140,248,1), rgba(45,212,191,1))'
                      : 'linear-gradient(180deg, rgba(59,130,246,0.7), rgba(129,140,248,0.7), rgba(45,212,191,0.7))',
                    opacity: 0.9,
                  },

                  '&:hover': {
                    boxShadow: '0 28px 80px rgba(15,23,42,1)',
                    borderColor: 'rgba(56,189,248,0.95)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  {/* Icon bubble */}
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 40,
                      height: 40,
                      borderRadius: '999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background:
                        'radial-gradient(circle at 30% 0%, rgba(59,130,246,0.9), rgba(56,189,248,0.45))',
                      border: '1px solid rgba(148,163,184,0.8)',
                    }}
                  >
                    {icon}
                  </Box>

                  {/* Text content */}
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{
                        maxWidth: '100%',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(209,213,219,0.9)',
                        mb: 0.5,
                      }}
                    >
                      {p.company || 'Feature'}
                    </Typography>

                    {/* Title row + link arrow */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '0.95rem',
                          lineHeight: 1.4,
                          flex: 1,
                          backgroundImage:
                            'linear-gradient(135deg, #e5e7eb, #a5b4fc, #5eead4)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }}
                        title={p.title}
                      >
                        {p.title}
                      </Typography>

                      {hasLink && (
                        <IconButton
                          size="small"
                          sx={{
                            ml: 0.5,
                            flexShrink: 0,
                            color: 'rgba(148,163,184,0.95)',
                            '&:hover': {
                              color: 'rgba(56,189,248,1)',
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation(); // don’t change focus, just open link
                            window.open(
                              p.link,
                              '_blank',
                              'noopener,noreferrer'
                            );
                          }}
                        >
                          <LaunchIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Chevrons – same style/position as Streaming */}
        {items.length > 1 && (
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
                zIndex: 300,
              }}
              size="small"
            >
              <ChevronLeft fontSize="small" />
            </IconButton>

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
                zIndex: 300,
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
