# Local emoji icons (PNG)

These **Fluent-style 3D** PNGs are served from `/emoji/*.png` so icons work offline, without hotlinking GitHub, and without CORS issues.

- **Regenerate / update:** from the repo root run  
  `python3 scripts/download-emoji-assets.py`
- **Mapping & alt text:** `src/constants/emojis.js`
- **Component:** `src/components/UI/EmojiImage.js`

Do not remove this folder; pages like **Contact** and **ATS results** depend on these assets.
