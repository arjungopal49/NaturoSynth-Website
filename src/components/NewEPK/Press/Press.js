import React from 'react';
import {
  Stack,
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
  Box,
} from '@mui/material';
import Section from '../Section';

export default function Press({ press }) {
  return (
    <Section title="Press, Radio & Sync" compact>
      <Stack spacing={2}>
        {press.slice(0, 10).map((p, index) => (
          <Card
            key={index}
            elevation={0}
            sx={{
              borderRadius: 3,
              bgcolor: 'rgba(15,23,42,0.95)',
              border: '1px solid rgba(55,65,81,0.9)',
              px: 2,
              py: 1.4,
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
              <Typography variant="body1">
                {p.company && (
                  <Typography
                    component="span"
                    fontWeight={600}
                    sx={{ mr: 0.5, color: 'white' }}
                  >
                    {p.company}:
                  </Typography>
                )}
                {p.link ? (
                  <MuiLink
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    underline="hover"
                    sx={{ color: 'rgb(96,165,250)' }}
                  >
                    {p.title}
                  </MuiLink>
                ) : (
                  p.title
                )}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Section>
  );
}
