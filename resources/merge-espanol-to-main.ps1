[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Title    = "Confirm Action"
$Question = "Are you to merge non-HTML changes from branch español to main?"
$Choices  = "&Y", "&N"

$Decision = $Host.UI.PromptForChoice($Title, $Question, $Choices, 1)

if ($Decision -eq 0){
    git switch main
    git merge espanol --no-commit --no-ff

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Merge paused (conflicts may exist, which is normal). Proceeding to restore HTML files..." -ForegroundColor Yellow
    }

    git checkout -- "*html"
    git add -A
    git commit -m "Merged non-HTML files from español"
    Write-Host "Merge completed" -ForegroundColor Green
}
else {
    Write-Host "Merge from branch español to main was not performed" -ForegroundColor Red
    Exit
}