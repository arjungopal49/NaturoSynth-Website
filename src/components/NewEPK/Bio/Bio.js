import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Stack,
} from '@mui/material';
import newBioPic from '../../../data/Pictures/Profile/newBioPic.jpg';
import NewSocialLogos from '../../Socials/NewSocialLogos';

export default function Bio({ bio }) {
  return (
    <Box
      sx={{
        mb: { xs: 4, md: 6 },
        p: { xs: 2.5, md: 3.5 },
        borderRadius: 3,
        bgcolor: 'rgba(15,23,42,0.85)',
        border: '1px solid rgba(148,163,184,0.4)',
        boxShadow: '0 18px 45px rgba(15,23,42,0.9)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item size={{ xs: 12, md: 3 }}>
          <Box
            component="img"
            src={newBioPic}
            alt="Band hero"
            sx={{
              width: '100%',
              borderRadius: 3,
              display: 'block',
              mx: 'auto',
              objectFit: 'cover',
              maxHeight: { xs: 260, md: 320 },
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              letterSpacing: '0.06em',
              mb: 1,
            }}
          >
            NaturoSynth
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              color: 'rgb(94,234,212)',
              fontWeight: 500,
            }}
          >
            Indie / Alternative / Neo-Psych Pop • Chicago, U.S.A
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(226,232,240,0.92)',
              lineHeight: 1.7,
              fontSize: { xs: '0.95rem', md: '1rem' },
            }}
          >
            {bio}
          </Typography>
        </Grid>

        <Grid item size={{ xs: 12, md: 3 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: 'rgba(15,23,42,0.9)',
              border: '1px solid rgba(148,163,184,0.5)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{ color: 'rgb(148,163,184)', letterSpacing: 1 }}
              >
                Quick stats
              </Typography>
              <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                <Typography variant="body2">3M+ TikTok views</Typography>
                <Typography variant="body2">1.7M+ Spotify streams</Typography>
                <Typography variant="body2">Sold-out 300-cap rooms</Typography>
              </Stack>
            </Box>

            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: 'rgb(148,163,184)',
                  letterSpacing: 1,
                  mb: 1,
                  display: 'block',
                }}
              >
                Socials
              </Typography>
              <NewSocialLogos />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
