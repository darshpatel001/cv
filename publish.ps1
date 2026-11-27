# Safely commit and publish the portfolio to GitHub Pages.
# Run from the repository root: .\publish.ps1
$ErrorActionPreference = 'Stop'
function Fail([string]$Message) { Write-Host $Message -ForegroundColor Red; exit 1 }
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Fail 'Git is not installed. Install Git for Windows and reopen PowerShell.' }
$root = (& git rev-parse --show-toplevel 2>$null)
if ($LASTEXITCODE -ne 0 -or -not $root) { Fail 'Open PowerShell in the cloned cv repository folder.' }
Set-Location $root
if ((& git branch --show-current).Trim() -ne 'main') { Fail 'Switch to main first: git switch main' }
if (-not (Test-Path 'index.html')) { Fail 'index.html must be in the repository root.' }
if (-not (& git remote get-url origin 2>$null)) { Fail 'origin remote missing. Run: git remote add origin https://github.com/darshpatel001/cv.git' }
if (-not (& git config user.name) -or -not (& git config user.email)) {
  Write-Host 'Configure your commit identity first:' -ForegroundColor Yellow
  Write-Host 'git config --global user.name "Darsh Patel"'
  Write-Host 'git config --global user.email "YOUR_VERIFIED_OR_GITHUB_NOREPLY_EMAIL"'
  exit 1
}
& git add -A
if ($LASTEXITCODE -ne 0) { Fail 'git add failed.' }
$changes = & git diff --cached --name-only
if (-not $changes) { Write-Host 'No changes to publish.' -ForegroundColor Green; exit 0 }
Write-Host "`nFiles to be committed:" -ForegroundColor Cyan
& git diff --cached --stat
Write-Host "`nIMPORTANT: check for passwords, API keys, private keys, employer-owned source code, customer data, and confidential files." -ForegroundColor Yellow
$confirm = Read-Host 'Commit and push these files to GitHub now? (Y/N)'
if ($confirm -notin @('Y','y','YES','yes')) { Write-Host 'Cancelled. Nothing was pushed.' -ForegroundColor Yellow; exit 0 }
& git commit -m ("Update portfolio: " + (Get-Date -Format 'yyyy-MM-dd HH:mm'))
if ($LASTEXITCODE -ne 0) { Fail 'Commit failed.' }
& git pull --rebase origin main
if ($LASTEXITCODE -ne 0) { Fail 'Pull/rebase failed. Resolve conflicts, then run this script again.' }
& git push origin main
if ($LASTEXITCODE -ne 0) { Fail 'Push failed. Check GitHub sign-in/network, then run: git push origin main' }
Write-Host "`nPushed successfully. GitHub Pages will publish the new commit automatically." -ForegroundColor Green
Write-Host 'Site: https://darshpatel001.github.io/cv/'
Write-Host 'Deployment: https://github.com/darshpatel001/cv/actions'
