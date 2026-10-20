Add-Type -AssemblyName System.Drawing

$src = "C:\Users\SYED BROTHERs\.gemini\antigravity\brain\20d63f43-4a05-42e6-84bc-955adadfab1a\.user_uploaded\media_1792461229710_198bcb81.jpg"
$bmp = New-Object System.Drawing.Bitmap($src)
$outDir = "C:\Users\SYED BROTHERs\OneDrive\Desktop\SMIT\localtrust\public\images\reference"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

Write-Output "Image size: $($bmp.Width) x $($bmp.Height)"

# Let's crop the key images directly from the reference image with clean sub-bitmaps:
function Crop-Image($name, $x, $y, $w, $h) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    $targetPath = Join-Path $outDir "$name.jpg"
    $cropped.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Dispose()
    Write-Output "Saved $name ($w x $h) to $targetPath"
}

# In 682 x 1024 reference image:
# Navbar is Y: 0 to ~32 (Height 32 / 1024)
# Hero is Y: 32 to ~210
# Categories is Y: 210 to ~430
# Local Experts is Y: 430 to ~570
# Benefits is Y: 570 to ~710
# Testimonials is Y: 710 to ~825
# Provider banner is Y: 825 to ~895
# Nearby is Y: 895 to ~940
# Footer is Y: 940 to 1024

# Let's crop:
# 1. Hero right image (plumber and woman in kitchen):
Crop-Image "hero-plumber" 345 32 337 178

# 2. Categories (2 rows x 6 cards):
# Row 1 cards:
Crop-Image "cat-plumbing" 42 260 62 40
Crop-Image "cat-electrical" 139 260 97 78
Crop-Image "cat-cleaning" 250 260 62 40
Crop-Image "cat-mechanics" 354 260 62 40
Crop-Image "cat-tutoring" 458 260 62 40
Crop-Image "cat-carpentry" 562 260 62 40

# Row 2 cards:
Crop-Image "cat-painting" 42 344 62 40
Crop-Image "cat-appliance" 146 344 62 40
Crop-Image "cat-computer" 250 344 62 40
Crop-Image "cat-gardening" 354 344 62 40
Crop-Image "cat-moving" 458 344 62 40
Crop-Image "cat-beauty" 562 344 62 40

# 3. 4 Local Experts portraits:
Crop-Image "expert-ahmed" 38 474 65 65
Crop-Image "expert-sara" 198 474 65 65
Crop-Image "expert-usman" 352 474 65 65
Crop-Image "expert-ayesha" 507 474 65 65

# 4. Benefits left image (van & technician):
Crop-Image "benefits-technician" 32 580 156 128

# 5. Testimonial avatars:
Crop-Image "testimonial-ayesha" 41 750 18 18
Crop-Image "testimonial-bilal" 250 750 18 18
Crop-Image "testimonial-fatima" 463 750 18 18

# 6. Provider banner right image:
Crop-Image "provider-technician" 388 825 250 62

# 7. Map pin illustration:
Crop-Image "nearby-map" 540 890 120 45

$bmp.Dispose()
Write-Output "All reference crops extracted successfully!"
