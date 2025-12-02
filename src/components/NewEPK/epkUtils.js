export function formatShowDate(date) {
  if (!date) return '';
  if (typeof date.toDate === 'function') {
    return date.toDate().toLocaleDateString('en-US');
  }
  if (typeof date.seconds === 'number') {
    return new Date(date.seconds * 1000).toLocaleDateString('en-US');
  }
  return String(date);
}

export function getTikTokPostId(link) {
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

export function TikTokSlideShowIframe({ postId }) {
  const src = `https://www.tiktok.com/player/v1/${postId}`;
  return (
    <iframe
      src={src}
      width="220"
      height="380"
      allow="encrypted-media; fullscreen; picture-in-picture"
      title="TikTok slideshow"
      style={{ border: 'none', overflow: 'hidden', display: 'block' }}
    />
  );
}

export function InstagramEmbedIframe({ postId }) {
  const src = `https://www.instagram.com/p/${postId}/embed`;

  return (
    <iframe
      src={src}
      width="220"
      height="380"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      title="Instagram embed"
      style={{
        border: 'none',
        overflow: 'hidden',
        display: 'block',
        backgroundColor: 'black',
      }}
    />
  );
}

export function getInstagramPostId(link) {
  if (!link) return '';
  try {
    const url = new URL(link);
    const parts = url.pathname.split('/').filter(Boolean);
    return parts[1] || ''; // supports /p/ and /reel/
  } catch {
    const parts = link.split('/').filter(Boolean);
    return parts[parts.length - 2] || '';
  }
}

export const performancePicPath = '../data/Pictures/Performances';