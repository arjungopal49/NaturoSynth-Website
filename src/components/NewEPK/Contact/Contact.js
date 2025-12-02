import React from 'react';
import {
  Box,
  Typography,
  Link as MuiLink,
} from '@mui/material';

export default function Contact({ contact }) {
  return (
    <Box
      component="footer"
      sx={{
        mt: { xs: 5, md: 7 },
        pt: 3,
        borderTop: '1px solid rgba(55,65,81,0.9)',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 1.5,
          fontWeight: 600,
        }}
      >
        Contact / Booking
      </Typography>
      <Typography variant="body1" sx={{ mb: 0.5 }}>
        <strong>Email:</strong>{' '}
        <MuiLink
          href={`mailto:${contact.email}`}
          underline="hover"
          sx={{ color: 'rgb(96,165,250)' }}
        >
          {contact.email}
        </MuiLink>
      </Typography>
      {contact.instagram && (
        <Typography variant="body1">
          <strong>Instagram:</strong>{' '}
          <MuiLink
            href={"https://www.instagram.com/" + contact.instagram.slice(1)}
            target="_blank"
            rel="noreferrer"
            underline="hover"
            sx={{ color: 'rgb(96,165,250)' }}
          >
            {contact.instagram} 
          </MuiLink>
          {' (DM us)'}
        </Typography>
      )}
    </Box>
  );
}
