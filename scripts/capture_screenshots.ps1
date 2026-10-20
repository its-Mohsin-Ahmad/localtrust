$edgePaths = @(
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
)

$browser = $null
foreach ($p in $edgePaths) {
    if (Test-Path $p) {
        $browser = $p
        break
    }
}

if (-not $browser) {
    $cmd = Get-Command msedge.exe -ErrorAction SilentlyContinue
    if ($cmd) { $browser = $cmd.Source }
}

Write-Output "Found browser: $browser"

$outDir = "C:\Users\SYED BROTHERs\OneDrive\Desktop\SMIT\localtrust\public\images\qa"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

function Take-Screenshot($name, $width, $height) {
    $outPath = Join-Path $outDir "$name.png"
    if (Test-Path $outPath) { Remove-Item $outPath -Force }
    $args = "--headless --disable-gpu --hide-scrollbars --window-size=$width,$height --screenshot=`"$outPath`" http://localhost:3000"
    Start-Process -FilePath $browser -ArgumentList $args -Wait
    Start-Sleep -Seconds 1
    if (Test-Path $outPath) {
        Write-Output "Captured $name ($width x $height): $outPath"
    } else {
        Write-Output "Failed to capture $name"
    }
}

Take-Screenshot "homepage-desktop" 1280 3000
Take-Screenshot "homepage-tablet" 768 2800
Take-Screenshot "homepage-mobile" 390 3200
