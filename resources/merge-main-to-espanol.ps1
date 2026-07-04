[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Title    = "Confirm Action"
$Question = "Are you to merge non-HTML changes from branch main to español?"
$Choices  = "&Y", "&N"

$Decision = $Host.UI.PromptForChoice($Title, $Question, $Choices, 1)

if ($Decision -eq 0){
    Write-Host "Merging changes in main into español" -ForegroundColor Yellow
    git switch español
    git merge main --no-commit --no-ff

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Merge paused (conflicts may exist, which is normal). Proceeding to restore HTML files..." -ForegroundColor Yellow
    }

    git checkout -- "*html"
    git add -A
    git commit -m "Merged non-HTML files from main"
    Write-Host "Merge completed" -ForegroundColor Green
} else {
    Write-Host "Merge from branch main to español was not performed" -ForegroundColor Red
    Exit
}