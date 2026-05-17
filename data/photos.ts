import type { Photo } from '~/types'

// How to add your own photos:
// 1. Upload your image files to the public/photos/ folder in this repository
//    (GitHub web UI: navigate to public/photos/ → "Add file" → "Upload files")
// 2. Reference them below as  src: '/photos/your-filename.jpg'
// 3. Replace the placeholder entries below with your real photos

export const photos: Photo[] = [
  {
    src: 'https://picsum.photos/seed/at1/600/450',
    alt: 'Photo placeholder 1',
    caption: 'Add your caption here',
    category: 'Personal',
  },
  {
    src: 'https://picsum.photos/seed/at2/600/450',
    alt: 'Photo placeholder 2',
    caption: 'Add your caption here',
    category: 'Travel',
  },
  {
    src: 'https://picsum.photos/seed/at3/600/450',
    alt: 'Photo placeholder 3',
    caption: 'Add your caption here',
    category: 'Personal',
  },
  {
    src: 'https://picsum.photos/seed/at4/600/450',
    alt: 'Photo placeholder 4',
    caption: 'Add your caption here',
    category: 'Travel',
  },
  {
    src: 'https://picsum.photos/seed/at5/600/450',
    alt: 'Photo placeholder 5',
    caption: 'Add your caption here',
    category: 'Events',
  },
  {
    src: 'https://picsum.photos/seed/at6/600/450',
    alt: 'Photo placeholder 6',
    caption: 'Add your caption here',
    category: 'Events',
  },
]
