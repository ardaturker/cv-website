import type { Photo } from '~/types'

// How to upload your photos:
// 1. Go to https://github.com/ardaturker/cv-website/tree/claude/add-website-photos-P9rd4/public/photos
// 2. Click "Add file" → "Upload files"
// 3. Upload the files with the exact filenames listed below

export const photos: Photo[] = [
  {
    src: '/photos/friends-dinner.jpg',
    alt: 'Dinner with a friend at a restaurant',
    caption: 'Good times',
    category: 'Friends',
  },
  {
    src: '/photos/night-adventure.jpg',
    alt: 'Friends on a cart at night',
    caption: 'Night adventures',
    category: 'Friends',
  },
  {
    src: '/photos/lisbon-cristo-rei.jpg',
    alt: 'Friends at Cristo Rei monument in Lisbon',
    caption: 'Cristo Rei, Lisbon',
    category: 'Travel',
  },
  {
    src: '/photos/sunset-bridge.jpg',
    alt: 'Stunning sunset over a bridge',
    caption: 'Sonderborg sunset',
    category: 'Places',
  },
]
