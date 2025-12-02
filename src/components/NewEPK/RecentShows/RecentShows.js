import React from 'react';
import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { formatShowDate } from '../epkUtils';
import Section from '../Section';

export default function RecentShows({ shows, selectedShow, setSelectedShow }) {
  const [showAllShows, setShowAllShows] = React.useState(false);

  const displayedShows = React.useMemo(
    () => (showAllShows ? shows : shows.slice(0, 4)),
    [shows, showAllShows]
  );

  return (
    <Section title="Recent Shows" subtitle="Select a show to preview photos">
      <Grid container spacing={3} alignItems="flex-start">
        {/* Shows list */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: 'rgba(15,23,42,0.95)',
              border: '1px solid rgba(75,85,99,0.8)',
            }}
          >
            <List dense disablePadding>
              {displayedShows.map((show, index) => (
                <React.Fragment key={`${show.venue}-${show.date}-${index}`}>
                  {index > 0 && (
                    <Divider
                      component="li"
                      sx={{ borderColor: 'rgba(55,65,81,0.7)' }}
                    />
                  )}
                  <ListItemButton
                    onClick={() => setSelectedShow(show)}
                    sx={{
                      alignItems: 'flex-start',
                      py: 1.4,
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: 'rgba(30,64,175,0.65)',
                        transform: 'translateY(-1px)',
                        transition:
                          'background-color 150ms ease, transform 150ms ease',
                      },
                      bgcolor:
                        selectedShow === show
                          ? 'rgba(46, 56, 89, 0.75)'
                          : 'transparent',
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', color: 'white' }}
                        >
                          <Box component="span">
                            {formatShowDate(show.date)}
                          </Box>
                          <Box component="span">— {show.venue}</Box>
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ color: 'rgb(148,163,184)' }}
                          >
                            {show.location}
                          </Typography>
                          {show.sold && (
                            <Typography
                              variant="body2"
                              sx={{
                                mt: 0.5,
                                fontStyle: 'italic',
                                color: 'rgb(94,234,212)',
                              }}
                            >
                              {show.sold}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                  </ListItemButton>
                </React.Fragment>
              ))}
            </List>

            {shows.length > 4 && (
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setShowAllShows((prev) => !prev)}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 999,
                    borderColor: 'rgba(148,163,184,0.7)',
                    color: 'rgba(226,232,240,0.9)',
                    px: 2.5,
                    '&:hover': {
                      borderColor: 'rgb(94,234,212)',
                      bgcolor: 'rgba(15,23,42,0.9)',
                    },
                  }}
                >
                  {showAllShows ? 'Show fewer shows' : 'Show more shows'}
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Selected show images */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: 'rgba(15,23,42,0.95)',
              border: '1px solid rgba(75,85,99,0.8)',
              minHeight: '14rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {selectedShow ? (
              <>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ mb: 1.5, color: 'white' }}
                >
                  Photos: {selectedShow.venue} (
                  {formatShowDate(selectedShow.date)})
                </Typography>
                <Grid container spacing={1.5} sx={{ flexGrow: 1 }}>
                  {(selectedShow.pictures || [])
                    .slice(0, 5)
                    .map((src, idx) => (
                      <Grid item key={idx} size={6}>
                        <Box
                          component="img"
                          src={require(`../../../data/Pictures/Performances${src}`)}
                          alt={`Show ${idx + 1}`}
                          sx={{
                            width: '100%',
                            objectFit: 'cover',
                            borderRadius: 2,
                            height: 130,
                          }}
                        />
                      </Grid>
                    ))}
                </Grid>
              </>
            ) : (
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: 'rgb(148,163,184)', fontStyle: 'italic' }}
                >
                  Click on a show to see live photos.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Section>
  );
}
