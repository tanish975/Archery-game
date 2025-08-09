# 🏹 Archery / Bow & Arrow Game — WIP

*"The arrow knows no hesitation,  
the bow sings only when drawn,  
and the target waits in silence."*  

> **Status:** Work In Progress — under active development.  
> Current preview: local only (not deployed).

A lightweight SVG-based archery game built with **HTML**, **CSS**, and **Vanilla JavaScript**. This repo contains the development version — gameplay, assets, and prototype mechanics live here while I polish features.

---

## 🔧 Project status (development)
**Work in Progress (WIP)** — This project is under active development.  
Features may change, break, or disappear as I refine the gameplay.

## 🎮 Current Features
- Bow and arrow shooting mechanics.
- Basic scoring system.
- Sound effects for shooting and hitting.
- Static or simple target visuals.

## 🛠️ Tech Stack
- **HTML5** — Structure & elements.
- **CSS3** — Styling & animations.
- **JavaScript (Vanilla)** — Game logic & interactivity.
- **Audio** — MP3 sound effects for shooting and hitting.

## project structure
archery-game/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── audio/
│       ├── shoot.mp3
│       └── hit-sound.mp3
├── README.md
└── .gitignore


index.html → Main game page  
style.css → Game styling  
script.js → Game logic  
shoot.mp3 → Sound for shooting arrow  
hit-sound.mp3 → Sound when hitting target  
README.md → Project info

# 🎯 Planned Features (TODO)
- Moving targets.
- Difficulty levels.
- Arrow physics improvements.
- Game over screen with score summary.
- Mobile-friendly controls.
- GIF/screenshot demo in README.

# 🤝 Contributing
Suggestions, bug reports, and feature ideas are welcome.  
Fork the repo and submit a pull request.

---

# ▶️ Run locally (dev / preview)

**Method 1 — Open directly (fastest)**  
- Double-click `index.html` or open it in your browser.

**Method 2 — Local static server (recommended)**  
- Python 3:
```bash
# from project root
python -m http.server 8000
# open http://localhost:8000
