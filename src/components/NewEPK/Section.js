import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Section({ title, subtitle, compact = false, children }) {
  return (
    <Box sx={{ mb: compact ? 3 : { xs: 4, md: 5 } }}>
      <Box sx={{ mb: 1.5 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: subtitle ? 0.3 : 0.8,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            sx={{ color: 'rgb(148,163,184)' }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          borderRadius: 3,
          p: compact ? 0 : 2,
          ...(compact
            ? {}
            : {
                bgcolor: 'transparent',
              }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
