import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { getTikTokPostId, TikTokSlideShowIframe } from '../epkUtils';
import Section from '../Section';

export default function TikTokHighlights({ tiktoks, tiktokInfo }) {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = (tiktokInfo || []).slice(0, 10);

  // Center the active stat card (vertical version of scrollToIndex)
  const scrollToIndex = useCallback((index) => {
    const container = containerRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    const containerHeight = container.offsetHeight;
    const cardHeight = card.offsetHeight;

    const offset =
      card.offsetTop - (containerHeight / 2 - cardHeight / 2);

    container.scrollTo({
      top: offset,
      behavior: 'smooth',
    });
  }, []);

  // Scroll when active changes
  useEffect(() => {
    if (!items.length) return;
    scrollToIndex(activeIndex);
  }, [activeIndex, items.length, scrollToIndex]);

  // Auto-advance through stats
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
      if (dir === 'up') {
        return (prev - 1 + items.length) % items.length;
      }
      return (prev + 1) % items.length;
    });
  };

  return (
    <Section
      title="TikTok Highlights"
      subtitle="Featuring our high-performing clips"
    >
      <Grid container spacing={3}>
        {/* LEFT: Vertical stat carousel */}
        <Grid
          item
          size={{ xs: 12, md: 4 }}
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            ref={containerRef}
            sx={{
              position: 'relative',
              flex: 1,
              maxHeight: 350,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              overflowY: 'auto',
              overflowX: 'hidden',
              py: 1,
              pr: 1,
              scrollSnapType: 'y mandatory',
              WebkitOverflowScrolling: 'touch',

              '&::-webkit-scrollbar': { width: 0 },
              '&::-webkit-scrollbar-track': { background: 'transparent' },
              '&::-webkit-scrollbar-thumb': { background: 'transparent' },
            }}
          >
            {items.map((stat, index) => {
              const isActive = index === activeIndex;

              return (
                <Card
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  elevation={0}
                  onClick={() => setActiveIndex(index)}
                  sx={{
                    flex: '0 0 auto',
                    scrollSnapAlign: 'center',
                    borderRadius: 3,
                    bgcolor: 'rgba(15,23,42,0.97)',
                    border: isActive
                      ? '1px solid rgba(56,189,248,0.95)'
                      : '1px solid rgba(55,65,81,0.9)',
                    position: 'relative',
                    mt: index === 0 ? 0 : -3,
                    cursor: 'pointer',

                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: 70,
                    px: 2.2,
                    py: 1.6,

                    zIndex: isActive ? 120 : 40 + index,
                    boxShadow: isActive
                      ? '0 22px 55px rgba(15,23,42,1)'
                      : '0 12px 30px rgba(15,23,42,0.75)',

                    transform: isActive ? 'scale(1)' : 'scale(0.9)',
                    transition:
                      'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',

                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: '-1px',
                      borderRadius: 'inherit',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(56,189,248,0.7), rgba(129,140,248,0.85), rgba(45,212,191,0.9))'
                        : 'linear-gradient(135deg, rgba(30,64,175,0.35), rgba(15,118,110,0.3))',
                      opacity: isActive ? 0.9 : 0,
                      zIndex: -1,
                      transition: 'opacity 200ms ease',
                    },

                    '&:hover': {
                      boxShadow: '0 26px 70px rgba(15,23,42,1)',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 0,
                      flex: 1,                 // ✅ fill full card height
                      display: 'flex',
                      alignItems: 'center',    // ✅ vertical centering
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.98rem',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        backgroundImage:
                          'linear-gradient(135deg, #e5e7eb, #a5b4fc, #5eead4)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',

                        // ✅ allow wrapping instead of truncating
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        lineHeight: 1.3,
                        px: 0.5,
                      }}
                    >
                      {stat}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Grid>

        {/* RIGHT: TikTok embeds strip – unchanged structure, still horizontal scroll */}
        <Grid
          item
          size={{ xs: 12, md: 8 }}
          sx={{
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              overflowX: 'auto',
              overflowY: 'hidden',
              px: 1,
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',

              '&::-webkit-scrollbar': {
                height: 6,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(148,163,184,0.35)',
                borderRadius: 999,
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
            }}
          >
            {tiktoks.map((tt) => {
              const postId = getTikTokPostId(tt.link);
              return (
                <Box
                  key={tt.rank || tt.link}
                  sx={{
                    flex: '0 0 auto',
                    scrollSnapAlign: 'start',
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid rgba(55,65,81,0.9)',
                    bgcolor: 'black',
                    transition:
                      'transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 18px 40px rgba(15,23,42,0.9)',
                      borderColor: 'rgb(94,234,212)',
                    },
                  }}
                >
                  <TikTokSlideShowIframe postId={postId} />
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
}
