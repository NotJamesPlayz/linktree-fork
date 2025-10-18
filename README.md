# Linktree Clone

A forkable Linktree-style static site  share all your links in one place.

## Features
- Simple, lightweight, and forkable
- Edit `links.json` to customize your name, bio, avatar, and links
- No backend required  works with GitHub Pages

## Quick start

1. Fork this repository on GitHub (or create a repo and push your copy).
2. Edit `links.json` in the repository (use the GitHub web editor or your editor) to add your name, bio, avatar path (or URL), and links.
3. In the repository settings, enable GitHub Pages and set the source to the `main` branch and the root folder.
4. Visit: https://<your-username>.github.io/<repo-name>/ to see your page.

## File overview

- `index.html`  the single-page site.
- `styles.css`  styling.
- `script.js`  loads `links.json` and renders the page.
- `links.json`  edit this JSON to control the page content.
- `avatar.svg`  default avatar; replace or reference an external URL.
- `.nojekyll`  prevents Jekyll processing on GitHub Pages so files starting with `_` are served.

## Editing `links.json`

Example structure:

```
{
  "profile": {
    "name": "Your Name",
    "bio": "Short bio",
    "avatar": "avatar.svg"
  },
  "links": [
    {
      "title": "Title",
      "url": "https://...",
      "description": "Optional description",
      "tag": "Optional tag"
    }
  ]
}
```

## Local preview

To preview locally you can use a simple static server. Node.js example (PowerShell):

```powershell
npx http-server -c-1 . -p 8080
# then open http://localhost:8080 in your browser
```

Alternatively, Python 3:

```powershell
python -m http.server 8080
```

## Notes and tips

- The site fetches `links.json` directly from the same origin. If you host on GitHub Pages, editing `links.json` via the GitHub web UI updates the published page after a short delay.
- If you want per-user customization on GitHub Pages without forking, consider using query params or URL paths and a small serverless function; that's beyond this repo's scope.

## License

MIT
