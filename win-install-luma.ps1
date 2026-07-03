Write-Host "Starting Python3 installation via WinGet..." -ForegroundColor Cyan
winget install --id Python.Python.3 --silent --accept-source-agreements --accept-package-agreements
$targetPath = Join-Path -Path $PSScriptRoot -ChildPath "backend"
Push-Location $targetPath

Write-Host "Starting Node.js installation via WinGet..." -ForegroundColor Cyan
winget install --id OpenJS.NodeJS.LTS -e --silent --accept-source-agreements --accept-package-agreements
$targetPath = Join-Path -Path $PSScriptRoot -ChildPath "frontend"

# Force PowerShell to refresh the PATH environment variable
Write-Host "Refreshing environment variables..." -ForegroundColor Cyan
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")


$pyJob | Start-Job -ScriptBlock {
    python3 -m venv .venv
    .\venv\Scripts\Activate.ps1

    Write-Host "Installing Python backend dependencies..." -ForegroundColor Cyan
    pip install -r requirements.txt

    Write-Host "Checking for pending database migrations..." -ForegroundColor Yellow
    python .\manage.py makemigrations
    python .\manage.py migrate

    Write-Host "`nLaunching Django server on http://localhost:8000/" -ForegroundColor Green
    python .\manage.py runserver
}

Pop-Location

$nodeJob | Start-Job{
    Push-Location $targetPath

    Write-Host "Installing Node.js frontend dependencies..." -ForegroundColor Cyan
    npm install

    Write-Host "`nLaunching Luma angular application on http://localhost:4200/" -ForegroundColor Green
    Start-Job -ScriptBlock{npm start}
}

$nodeJob | Wait-Job | Receive-Job
$pyJob | Wait-Job | Receive-Job

Pop-Location