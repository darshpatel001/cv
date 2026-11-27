# Darsh Patel — Engineering Portfolio

A responsive, dark-themed personal engineering portfolio built with plain HTML, CSS and JavaScript. It is designed for GitHub Pages and does not require a backend, build step, package manager or framework.

## Project structure

```text
darsh-engineering-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   └── favicon.svg
└── README.md
```

## Preview locally

Open `index.html` in a browser. For a local development server, you can use the VS Code Live Server extension or run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish on GitHub Pages

1. Create a public repository named `YOUR-USERNAME.github.io`.
2. Upload the **contents** of this folder to the repository root. `index.html` must be at the root, alongside `css/`, `js/` and `assets/`.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then save.
6. Wait for the deployment to finish. Your site will be available at `https://YOUR-USERNAME.github.io`.

## Personalize before sharing

Open `index.html` and replace:
- `YOUR_EMAIL@example.com` with your professional email.
- The LinkedIn homepage link with your actual LinkedIn profile URL.
- Review project descriptions and update each status as implementation progresses.
- Add public GitHub repository links, project photos, test results and measured outcomes when available.

The GitHub profile link is currently set to `https://github.com/darshpatel001`.

## Features

- Responsive desktop and mobile layouts
- Animated network/circuit background
- Scroll progress indicator and active navigation state
- Scroll-reveal section animations
- Filterable project cards with expandable technical details
- Reduced-motion accessibility support
- No backend, external JavaScript libraries or build tooling

## Accuracy note

Project entries intentionally distinguish development work, learning projects, architecture concepts and evaluation studies. Keep these labels accurate and only publish performance figures, production claims or proficiency ratings that can be substantiated.
