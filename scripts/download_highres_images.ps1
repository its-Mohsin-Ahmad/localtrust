$outDir = "C:\Users\SYED BROTHERs\OneDrive\Desktop\SMIT\localtrust\public\images\assets"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$images = @{
    "hero-plumber.jpg" = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85";
    "cat-plumbing.jpg" = "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80";
    "cat-electrical.jpg" = "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80";
    "cat-cleaning.jpg" = "https://images.unsplash.com/photo-1581539327726-384e0b64ad66?auto=format&fit=crop&w=600&q=80";
    "cat-mechanics.jpg" = "https://images.unsplash.com/photo-1552506112-a9311a5ba6b0?auto=format&fit=crop&w=600&q=80";
    "cat-tutoring.jpg" = "https://images.unsplash.com/photo-1523240796612-82004a222f0c?auto=format&fit=crop&w=600&q=80";
    "cat-carpentry.jpg" = "https://images.unsplash.com/photo-1584769280279-5b7440764460?auto=format&fit=crop&w=600&q=80";
    "cat-painting.jpg" = "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80";
    "cat-appliance.jpg" = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80";
    "cat-computer.jpg" = "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80";
    "cat-gardening.jpg" = "https://images.unsplash.com/photo-1624558666603-9488873350e1?auto=format&fit=crop&w=600&q=80";
    "cat-moving.jpg" = "https://images.unsplash.com/photo-1611781462273-3e0b1f6527f0?auto=format&fit=crop&w=600&q=80";
    "cat-beauty.jpg" = "https://images.unsplash.com/photo-1522337350908-16c359ad0cb5?auto=format&fit=crop&w=600&q=80";
    "expert-ahmed.jpg" = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80";
    "expert-sara.jpg" = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80";
    "expert-usman.jpg" = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80";
    "expert-ayesha.jpg" = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
    "benefits-technician.jpg" = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80";
    "testimonial-ayesha.jpg" = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80";
    "testimonial-bilal.jpg" = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80";
    "testimonial-fatima.jpg" = "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80";
    "provider-technician.jpg" = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80";
}

foreach ($item in $images.GetEnumerator()) {
    $target = Join-Path $outDir $item.Key
    try {
        Write-Output "Downloading $($item.Key)..."
        Invoke-WebRequest -Uri $item.Value -OutFile $target -UseBasicParsing -TimeoutSec 15
        Write-Output "Done: $($item.Key)"
    } catch {
        Write-Output "Failed $($item.Key): $_"
    }
}

Write-Output "All high-res images processed!"
