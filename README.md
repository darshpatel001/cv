# Darsh Patel — Engineering Portfolio V7

A tab-based, responsive engineering portfolio built with plain HTML, CSS and JavaScript for GitHub Pages. V7 adds a live engineering terminal, rotating focus labels, a scrolling technology ticker, reveal-on-scroll cards, live India time, scroll progress and a back-to-top control. No build tools, frameworks, backend or package installation are required.

## Publish / update

Upload the **contents** of this folder to the root of your existing GitHub Pages repository. Keep the directory structure intact. `index.html` must be at repository root. Commit to `main`; do not unpublish the site.

## Dynamic interactions (V7)

- Animated terminal-style engineering focus panel on the overview.
- Rotating focus labels and live India clock.
- Scrolling technology ticker (pauses on hover).
- Reveal-on-scroll cards, subtle hover motion and keyboard focus styles.
- Reading progress bar and back-to-top control.
- Respects the visitor’s reduced-motion accessibility preference.

All interactions are client-side and require no backend or build step.

## Main navigation tabs

- Overview
- About me
- Expertise
- Projects
- Code library
- Image gallery
- Hardware lab
- Experience
- Contact

## Where to add your own content

### 1. Your profile photo

Replace `assets/profile/profile-placeholder.svg` with your own image named `profile.jpg` (or another filename). Then update this line in `index.html`:

```html
<img id="profile-image" src="assets/profile/profile-placeholder.svg" ...>
```

For example:

```html
<img id="profile-image" src="assets/profile/profile.jpg" alt="Darsh Patel">
```

### 2. Project photos and diagrams

Each project has its own folder:

```text
assets/projects/
├── c2000-w5500/
├── linux-mini-shell/
├── industrial-iot-gateway/
├── w55rp20-platform/
├── rp2040-microshell/
└── w5500-dhcp/
```

Put project-specific photos inside the matching folder, for example:

```text
assets/projects/c2000-w5500/
├── cover.svg
├── board-top.jpg
├── pcb-layout.png
├── oscilloscope-capture.png
└── wiring-setup.jpg
```

To use a different cover image, edit that project's `"image"` field in `data/projects.json`.

### 3. Add a new project

Add an object to `data/projects.json`. Example:

```json
{
  "id": "my-new-project",
  "title": "My New Embedded Project",
  "category": "Firmware",
  "tags": ["STM32", "Embedded C", "SPI"],
  "groups": ["firmware"],
  "status": "Completed",
  "description": "Short project summary.",
  "details": [
    "What the project does.",
    "Hardware and software architecture.",
    "Important implementation details.",
    "Testing and measured results."
  ],
  "image": "assets/projects/my-new-project/cover.jpg",
  "code": [
    {
      "title": "main.c",
      "path": "projects/code/my-new-project/main.c"
    }
  ],
  "resources": [
    {
      "label": "Project documentation",
      "url": "projects/docs/my-new-project-notes.pdf"
    }
  ]
}
```

Create the matching folder under `assets/projects/my-new-project/` and upload the cover image. JSON must be valid: use double quotes and do not leave trailing commas.

### 4. Add source code

Create a folder per project under `projects/code/`:

```text
projects/code/
├── c2000-w5500/
│   ├── spi_dma.c
│   ├── w5500.c
│   └── w5500.h
└── linux-mini-shell/
    ├── minishell.c
    └── job_control.c
```

Register each file in `data/code-index.json`:

```json
[
  {
    "title": "spi_dma.c",
    "language": "C",
    "project": "W5500 Ethernet with TI C2000",
    "path": "projects/code/c2000-w5500/spi_dma.c"
  },
  {
    "title": "minishell.c",
    "language": "C",
    "project": "Linux Mini Shell",
    "path": "projects/code/linux-mini-shell/minishell.c"
  }
]
```

The Code Library fetches source as text and displays it. It does not compile or execute uploaded files. Avoid uploading secrets, private keys, passwords, customer data, or proprietary company code.

### 5. Add photos to the gallery

Put images in `assets/gallery/`, then register them in `data/gallery.json`:

```json
[
  {
    "title": "W5500 development setup",
    "caption": "SPI connection and bench test",
    "image": "assets/gallery/w5500-setup.jpg",
    "alt": "W5500 module connected to development board"
  }
]
```

### 6. Add documentation

Put public PDFs or notes in `projects/docs/<project-id>/` and add a resource link in the matching project object. Only publish documents you have permission to share.

## GitHub Pages notes

- This is a static website. It does not need a backend.
- Keep all paths relative, as supplied, for project pages served from a repository subpath.
- If the repository is `username.github.io`, the site is served from the root domain.
- After commits, allow GitHub Pages to deploy and hard-refresh the browser with Ctrl+F5.

## Accuracy and privacy

Keep status labels honest (Completed, Development, Evaluation, Architecture, Learning). Do not publish employer-owned firmware, confidential product details, credentials, or customer data. Add only source code and images you own or are authorized to publish.

## Expanded project catalogue (V8)

The portfolio now includes 18 project and engineering-work entries. They are intentionally classified by evidence/status so that portfolio visitors can distinguish implementation and debugging from architecture studies, hardware evaluation and future learning tracks.

### Project data management

Edit `data/projects.json` to add or update entries. Each entry supports:
- `id`: unique lowercase identifier used by the project card.
- `title`, `category`, `description`: public-facing project summary.
- `tags`: searchable technologies and protocols.
- `groups`: one or more filter groups (`firmware`, `networking`, `linux`, `iot`, `industrial`, `electronics`).
- `status`: honest progress label such as `Development`, `Under development`, `Architecture / research`, or `Evaluation`.
- `details`: technical implementation points, experiments, and scope.
- `engineeringNotes`: qualifications, constraints, or important implementation observations.
- `image`: path to a project cover image.
- `code` and `resources`: optional public source/document links.

The project search checks titles, categories, status, descriptions, tags, details and engineering notes. Project detail windows show the technical notes as well as the implementation details.

### Accuracy and publication guidance

Some entries are active engineering work, debugging investigations or built learning exercises. Others are explicitly labelled as architecture, evaluation, research or planned experiments. Keep those distinctions when updating the portfolio. Only change an entry to `Completed` after the hardware/software has been implemented and tested. Do not publish employer-owned firmware, private customer information, credentials, signing keys, unreleased product details or proprietary schematics.
