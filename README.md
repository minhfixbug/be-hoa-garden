# Khu vườn nhỏ dành cho Bé Hoa

A mobile-friendly Vietnamese Women's Day gift page. The illustration cards work on their own until you add your photos.

## Add your photos

1. Put up to three image files in `dist/photos/` (create that folder).
2. Open `dist/app.js` and fill in the `photos` array at the top. For example:

   ```js
   { src: './photos/our-first-date.jpg', alt: 'Bé Hoa and me on our first date' },
   ```

3. Refresh the page. A card uses its illustration whenever its photo path is empty or the image fails to load.

You can edit the card captions and the letter directly in `dist/index.html`. For a more personal note, replace the sample letter before sharing.

## Preview locally

Serve the `dist` directory with any static HTTP server, such as `python -m http.server 8000 --directory dist`, then open `http://localhost:8000`.

The page is plain HTML, CSS, and JavaScript with no build step. It has reduced-motion support and works without Google Fonts using system fallbacks.
