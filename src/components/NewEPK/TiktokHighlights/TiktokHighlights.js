import React from 'react';
import {
  Box,
  Grid,
  Stack,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { getTikTokPostId, TikTokSlideShowIframe } from '../epkUtils';
import Section from '../Section';

export default function TikTokHighlights({ tiktoks, tiktokInfo }) {
  return (
    <Section title="TikTok Highlights" subtitle="High-performing clips promoters can feature">
      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, md: 4 }}>
          <Stack spacing={2}>
            {tiktokInfo.map((stat, index) => (
              <Card
                key={index}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  bgcolor: 'rgba(15,23,42,0.95)',
                  border: '1px solid rgba(55,65,81,0.9)',
                  px: 2,
                  py: 1.5,
                  transition:
                    'transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 18px 40px rgba(15,23,42,0.9)',
                    borderColor: 'rgb(94,234,212)',
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: 'rgba(226,232,240,0.95)' }}
                  >
                    {stat}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

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
