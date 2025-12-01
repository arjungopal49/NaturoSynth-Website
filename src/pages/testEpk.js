import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Link as MuiLink,
  Stack,
  Paper,
} from '@mui/material';
import { EPKProvider, useEPK } from '../contexts/EPKContext';
import SocialLogos from "../components/Socials/SocialLogos";
import newBioPic from '../data/Pictures/Profile/newBioPic.jpg';

function formatShowDate(date) {
  if (!date) return '';
  if (typeof date.toDate === 'function') {
    return date.toDate().toLocaleDateString('en-US');
  }
  if (typeof date.seconds === 'number') {
    return new Date(date.seconds * 1000).toLocaleDateString('en-US');
  }
  return String(date);
}

function getTikTokPostId(link) {
  if (!link) return '';
  try {
    const url = new URL(link);
    const parts = url.pathname.split('/').filter(Boolean);
    const last = parts[parts.length - 1] || '';
    return last.split('?')[0];
  } catch (e) {
    const parts = link.split('/').filter(Boolean);
    const last = parts[parts.length - 1] || '';
    return last.split('?')[0];
  }
}

const performancePicPath = '../data/Pictures/Performances'


const EPKInner = () => {
  const {
    songs,
    tiktoks,
    press,
    shows,
    selectedShow,
    setSelectedShow,
    bio,
    contact,
    streamingInfo,
    tiktokInfo,
  } = useEPK();

  return <EPKPageContent
    songs={songs}
    tiktoks={tiktoks}
    press={press}
    shows={shows}
    selectedShow={selectedShow}
    setSelectedShow={setSelectedShow}
    bio={bio}
    contact={contact}
    streamingInfo={streamingInfo}
    tiktokInfo={tiktokInfo}
  />;
};

const EPKPage = () => (
  <EPKProvider>
    <EPKInner />
  </EPKProvider>
);

function EPKPageContent({
  songs,
  tiktoks,
  press,
  shows,
  selectedShow,
  setSelectedShow,
  bio,
  contact,
  streamingInfo,
  tiktokInfo,
}) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        py: { xs: 3, md: 5 },
      }}
    >
      {/* BIO / PIC */}
      <Section title="Biography">
        <Grid container spacing={4}>
          <Grid item size={{ xs: 12, md: 3 }}>
            <Box
              component="img"
              src={newBioPic}
              alt="Band hero"
              sx={{
                width: '100%',
                borderRadius: 1,
                display: 'block',
                mx: 'auto',   
              }}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 5 }}>
            <Typography
              variant="body1"
            >
              {bio}
            </Typography>
          </Grid>
          <Grid item size={{ xs: 12, md: 4 }}>
            <SocialLogos floating={true} />
          </Grid>
        </Grid>
      </Section>

      {/* RECENT SHOWS */}
      <Section title="Recent Shows">
        <Grid
          container
          spacing={3}
          alignItems="flex-start"
        >
          {/* Shows list */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={1}
              sx={{ p: 2, borderRadius: 2 }}
            >
              <List dense disablePadding>
                {shows.map((show, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Divider component="li" />}
                    <ListItemButton
                      onClick={() => setSelectedShow(show)}
                      sx={{ alignItems: 'flex-start', py: 1.5 }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight={600}>
                            {formatShowDate(show.date)} &mdash; {show.venue}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: 'text.secondary' }}
                            >
                              {show.location}
                            </Typography>
                            {show.sold && (
                              <Typography
                                variant="body2"
                                sx={{ fontStyle: 'italic', mt: 0.5 }}
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
            </Paper>
          </Grid>

          {/* Selected show images */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 2,
                minHeight: '12rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {selectedShow ? (
                <>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ mb: 1.5 }}
                  >
                    Photos: {selectedShow.venue} (
                    {formatShowDate(selectedShow.date)})
                  </Typography>
                  <Grid container spacing={1.5} sx={{ flexGrow: 1 }}>
                    {(selectedShow.pictures || []).slice(0, 5).map((src, idx) => (
                      <Grid item key={idx} size={6}>
                        <Box
                          key={idx}
                          component="img"
                          src={require(`../data/Pictures/Performances${src}`)}
                          alt={`Show ${idx + 1}`}
                          sx={{
                            width: '100%',
                            objectFit: 'cover',
                            borderRadius: 1,
                            flexGrow: 1,
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', fontStyle: 'italic' }}
                >
                  Click on a show to see pictures.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Section>

      {/* TIKTOK */}
      <Section title="TikTok Highlights">
        <Grid container spacing={1}>
          <Grid item size={{ xs: 12, md: 3 }}>
            <Box component="ul" sx={{ pl: 3, m: 0 }}>
              {tiktokInfo.map((stat, index) => (
                <Typography
                  key={index}
                  component="li"
                  variant="body1"
                  sx={{ mb: 0.5 }}
                >
                  {stat}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid item size={{ xs: 12, md: 9 }}>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              {tiktoks.slice(0, 4).map((tt) => {
                const postId = getTikTokPostId(tt.link);
                return (
                  <Box key={tt.rank || tt.link} sx={{}}>
                    <TikTokSlideShowIframe postId={postId} />
                  </Box>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Section>

      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 6 }}> 
          {/* STREAMING */}
          <Section title="Spotify / Streaming">
            <Box component="ul" sx={{ pl: 3, m: 0 }}>
              {streamingInfo.map((item, index) => (
                <Typography
                  key={index}
                  component="li"
                  variant="body1"
                  sx={{ mb: 0.5 }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Section>
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}> 
          {/* PRESS */}
          <Section title="Press, Radio, & Sync">
            <Box component="ul" sx={{ pl: 3, m: 0 }}>
              {press.slice(0, 10).map((p, index) => (
                <Typography
                  key={index}
                  component="li"
                  variant="body1"
                  sx={{ mb: 0.5 }}
                >
                  {p.company && (
                    <Typography component="span" fontWeight={600}>
                      {p.company}:{' '}
                    </Typography>
                  )}
                  {p.link ? (
                    <MuiLink
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      underline="hover"
                    >
                      {p.title}
                    </MuiLink>
                  ) : (
                    p.title
                  )}
                </Typography>
              ))}
            </Box>
          </Section>
        </Grid>
      </Grid>

      {/* CONTACT */}
      <Box
        component="footer"
        sx={{
          mt: { xs: 4, md: 6 },
          pt: 3,
          borderTop: (theme) => `0.125rem solid ${theme.palette.divider}`,
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
        <Typography variant="body1">
          <strong>Email:</strong> {' '}
          <MuiLink
            href={`mailto:${contact.email}`}
            underline="hover"
          >
            {contact.email}
          </MuiLink>
        </Typography>
        {contact.instagram && (
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            <strong>Instagram:</strong>{' '}
            <MuiLink
              href={"https://www.instagram.com/" + contact.instagram.slice(1)}
              target="_blank"
              rel="noreferrer"
              underline="hover"
            >
              {contact.instagram}
            </MuiLink>
          </Typography>
        )}
      </Box>
    </Container>
  );
}

const Section = ({ title, children }) => (
  <Box sx={{ mb: { xs: 4, md: 5 } }}>
    <Typography
      variant="h5"
      sx={{
        mb: 1.5,
        fontWeight: 600,
        borderBottom: (theme) => `0.125rem solid ${theme.palette.divider}`,
        pb: 0.75,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export function TikTokSlideShowIframe({ postId }) { const src = `https://www.tiktok.com/player/v1/${postId}`; return ( <iframe src={src} width="200" height="350" allow="encrypted-media; fullscreen; picture-in-picture" title="TikTok slideshow" style={{ border: 'none', overflow: 'hidden' }} /> ); }

export default EPKPage;