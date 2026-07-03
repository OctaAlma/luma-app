Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

# ---------------------------------------
# Install prerequisites
# ---------------------------------------

Write-Host "Updating WinGet sources..." -ForegroundColor Cyan
winget source update
winget source reset --force

Write-Host "Installing Python 3.12..." -ForegroundColor Cyan
winget install --id Python.Python.3.12 `
    --silent `
    --accept-source-agreements `
    --accept-package-agreements

Write-Host "Installing Node.js LTS..." -ForegroundColor Cyan
winget install --id OpenJS.NodeJS.LTS -e `
    --silent `
    --accept-source-agreements `
    --accept-package-agreements

# Refresh PATH for this PowerShell session
$env:Path = (
    [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
    [Environment]::GetEnvironmentVariable("Path", "User")
)

# ---------------------------------------
# Paths
# ---------------------------------------

$Backend = Join-Path $PSScriptRoot "backend"
$Frontend = Join-Path $PSScriptRoot "frontend"

# ---------------------------------------
# Backend
# ---------------------------------------

Write-Host "Starting Django backend..." -ForegroundColor Green

Start-Process powershell `
    -WorkingDirectory $Backend `
    -ArgumentList @(
        "-NoExit",
        "-Command",
@"
python -m venv .venv

& .\.venv\Scripts\Activate.ps1

python -m pip install --upgrade pip
pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate

python manage.py runserver
"@
    )

# ---------------------------------------
# Frontend
# ---------------------------------------

Write-Host "Starting Angular frontend..." -ForegroundColor Green

Start-Process powershell `
    -WorkingDirectory $Frontend `
    -ArgumentList @(
        "-NoExit",
        "-Command",
@"
npx ng analytics disable
npm install

npm run start
"@
    )

Write-Host ""
Write-Host "Backend:  http://localhost:8000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:4200" -ForegroundColor Yellow