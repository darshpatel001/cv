# One-time GitHub Pages publishing setup

Your site is already configured to publish from `main` / repository root. The publishing cycle is:

**Edit local files -> review -> commit -> push to `main` -> GitHub Pages deploys -> website updates.**

A browser edit or a local file save does not itself update GitHub. Git must push the change to the remote repository. This package includes `publish.ps1` to make the review/commit/push steps one command.

## 1. Install the tools (Windows)

1. Install **Git for Windows**: https://git-scm.com/download/win
2. Install **GitHub Desktop** (recommended for sign-in and visual history): https://desktop.github.com/
3. Open GitHub Desktop and sign in to the account that owns `darshpatel001/cv`.

## 2. Clone the repository once

In GitHub Desktop: **File -> Clone repository -> URL**, enter:

`https://github.com/darshpatel001/cv.git`

Choose a permanent local folder, for example `C:\Users\YOUR_USER\Documents\GitHub\cv`.

Do not work from the ZIP's temporary extraction folder. Work from this cloned `cv` folder.

## 3. Put the portfolio files in the repository

Extract the portfolio ZIP. Copy its contents into the cloned `cv` folder, so `index.html` is directly inside `cv`, not inside `cv\some-extra-folder\`.

Keep these paths intact: `css`, `js`, `data`, `assets`, and `projects`. Do not delete `.git` (it is hidden and belongs to the cloned repository).

## 4. Configure Git identity once

Open PowerShell in the cloned `cv` folder and run (use the email associated with your GitHub account, or your GitHub noreply address):

```powershell
git config --global user.name "Darsh Patel"
git config --global user.email "YOUR_VERIFIED_OR_GITHUB_NOREPLY_EMAIL"
```

GitHub Desktop handles authentication. Do not put a Personal Access Token in scripts, HTML, JavaScript, or the repository.

## 5. Publish updates with one command

Whenever you edit/add/remove a website file:

1. Save your changes inside the cloned `cv` folder.
2. Open PowerShell in that folder.
3. Run:

```powershell
.\publish.ps1
```

4. Review the staged file list and confirm `Y` only if the files are safe to publish.
5. The script commits and pushes to `main`. GitHub Pages then builds the site automatically.

Check deployment at https://github.com/darshpatel001/cv/actions and open https://darshpatel001.github.io/cv/ after it succeeds. If the browser shows an old version, press `Ctrl+F5`.

## 6. Alternative: GitHub Desktop only

After editing files, open GitHub Desktop. Review the changed files, enter a summary such as `Add project photos and source links`, click **Commit to main**, then click **Push origin**. The website deploys after the push.

## Important distinction: automatic vs safe publishing

This setup does not auto-commit every keystroke or every file save. It gives you a one-command, review-before-push workflow. Fully automatic file-watcher publishing can accidentally publish half-written files, secrets, or confidential employer code. For an engineering portfolio, review-before-push is safer.

## Project content workflow

- New project: add an entry to `data/projects.json` and matching images under `assets/projects/<project-id>/`.
- Source files: put only shareable code under `projects/code/<project-id>/` and register it in `data/code-index.json`.
- Gallery: put images under `assets/gallery/` and register them in `data/gallery.json`.
- Documents: put public/shareable files under `projects/docs/` and link them from the relevant project.

Never publish credentials, private keys, passwords, customer data, confidential diagrams, or employer-owned firmware without written permission.

## Troubleshooting

- `git is not recognized`: install Git for Windows, close and reopen PowerShell.
- `not a git repository`: run the command inside the cloned `cv` folder.
- `index.html missing`: ensure website files are at repository root.
- `authentication failed`: sign in again through GitHub Desktop; do not paste tokens into files.
- Push rejected: run `git pull --rebase origin main`, resolve any conflicts, then run `git push origin main`.
- Deployment failed: inspect the failed run in the Actions tab.
