import React from 'react';
import {
  Stack,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import Section from '../Section';

export default function Streaming({ streamingInfo }) {
  return (
    <Section title="Streaming Performance" compact>
      <Stack spacing={2}>
        {streamingInfo.map((item, index) => (
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
              <Typography
                variant="body1"
                sx={{ color: 'rgba(226,232,240,0.95)' }}
              >
                {item}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Section>
  );
}
