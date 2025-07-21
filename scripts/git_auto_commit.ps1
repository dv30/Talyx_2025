# Git Automation for Talyx 2025 Chunk Logging System
# Automatically commits changes after successful chunk completion

param(
    [Parameter(Mandatory=$true)]
    [string]$ChunkId,
    
    [Parameter(Mandatory=$true)]
    [string]$ChunkDescription,
    
    [Parameter(Mandatory=$false)]
    [string]$ProjectPath = "C:\Users\maria\OneDrive\Documents\Projekt-Francuzsky_jazyk\LinguaStory_2025\Talyx",
    
    [Parameter(Mandatory=$false)]
    [switch]$DryRun = $false
)

Write-Host "Git Automation for Chunk: $ChunkId" -ForegroundColor Cyan
Write-Host "Description: $ChunkDescription" -ForegroundColor Cyan

# Change to project directory
Set-Location $ProjectPath

# Check if we're in a Git repository
if (-not (Test-Path ".git")) {
    Write-Host "Error: Not in a Git repository" -ForegroundColor Red
    exit 1
}

# Get current Git status
$GitStatus = git status --porcelain

if ($GitStatus) {
    Write-Host "Changes detected:" -ForegroundColor Cyan
    $GitStatus | ForEach-Object { Write-Host "   $_" }
    
    if ($DryRun) {
        Write-Host "DRY RUN MODE - No changes will be committed" -ForegroundColor Yellow
        Write-Host "Would execute: git add ." -ForegroundColor Yellow
        Write-Host "Would execute: git commit -m 'CHUNK_${ChunkId}: ${ChunkDescription}'" -ForegroundColor Yellow
    } else {
        # Add all changes
        Write-Host "Staging all changes..." -ForegroundColor Cyan
        git add .
        
        # Create commit message with chunk ID
        $CommitMessage = "CHUNK_${ChunkId}: ${ChunkDescription}"
        
        # Commit changes
        Write-Host "Committing changes..." -ForegroundColor Cyan
        $CommitResult = git commit -m $CommitMessage 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            # Get the commit hash
            $CommitHash = git rev-parse --short HEAD
            
            Write-Host "Successfully committed chunk $ChunkId" -ForegroundColor Green
            Write-Host "Commit hash: $CommitHash" -ForegroundColor Green
            Write-Host "Message: $CommitMessage" -ForegroundColor Green
            
            # Return commit hash for logging
            $result = @{
                Success = $true
                CommitHash = $CommitHash
                CommitMessage = $CommitMessage
                Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            }
            
            # Output result for parsing
            Write-Host "AUTOMATION_RESULT: $($result | ConvertTo-Json -Compress)" -ForegroundColor Magenta
            
        } else {
            Write-Host "Failed to commit changes" -ForegroundColor Red
            Write-Host "Error: $CommitResult" -ForegroundColor Red
            
            $result = @{
                Success = $false
                Error = $CommitResult
                Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            }
            
            Write-Host "AUTOMATION_RESULT: $($result | ConvertTo-Json -Compress)" -ForegroundColor Magenta
        }
    }
} else {
    Write-Host "No changes to commit" -ForegroundColor Yellow
    
    $result = @{
        Success = $true
        CommitHash = "no-changes"
        CommitMessage = "No changes detected"
        Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    }
    
    Write-Host "AUTOMATION_RESULT: $($result | ConvertTo-Json -Compress)" -ForegroundColor Magenta
}

# Optional: Push to remote (uncomment if desired)
# Write-Host "Pushing to remote..." -ForegroundColor Cyan
# git push origin main