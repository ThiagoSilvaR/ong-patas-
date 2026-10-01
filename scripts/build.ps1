# Gera a versao de producao em dist/: CSS e JS unidos e minificados, HTML enxuto e imagem comprimida.
# Uso: powershell -ExecutionPolicy Bypass -File scripts/build.ps1
$ErrorActionPreference = 'Stop'
$raiz = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $raiz 'dist'
$utf8 = New-Object System.Text.UTF8Encoding($false)

function Ler($caminho) { [IO.File]::ReadAllText((Join-Path $raiz $caminho), $utf8) }
function Gravar($caminho, $texto) {
    $destino = Join-Path $dist $caminho
    New-Item -ItemType Directory -Force (Split-Path $destino) | Out-Null
    [IO.File]::WriteAllText($destino, $texto, $utf8)
}

if (Test-Path $dist) { Remove-Item -Recurse -Force $dist }

# CSS: junta os dois arquivos e tira comentarios e espacos
$css = (Ler 'css/reset.css') + "`n" + (Ler 'css/styles.css')
$css = $css -replace '(?s)/\*.*?\*/', '' -replace '\s+', ' ' -replace '\s*([{};,>])\s*', '$1'
Gravar 'css/app.min.css' $css.Trim()

# JS: junta na ordem do index.html e tira comentarios de linha inteira e indentacao
$html = Ler 'html/index.html'
$arquivos = [regex]::Matches($html, '<script src="\.\./(js/[^"]+)"') | ForEach-Object { $_.Groups[1].Value }
$linhas = ($arquivos | ForEach-Object { Ler $_ }) -join "`n" -split "`r?`n"
$js = ($linhas | ForEach-Object { $_.Trim() } | Where-Object { $_ -and $_ -notmatch '^(//|/\*.*\*/$)' }) -join "`n"
Gravar 'js/app.min.js' ($js -replace '\.\./imagens/', 'imagens/')

# HTML: troca os arquivos de desenvolvimento pelos de producao
$html = $html -replace '\s*<link rel="stylesheet" href="\.\./css/[^"]+">', '' -replace '\s*<script src="\.\./js/[^"]+"></script>', ''
$html = $html.Replace('</head>', "<link rel=`"stylesheet`" href=`"css/app.min.css`">`n</head>")
$html = $html.Replace('</body>', "<script src=`"js/app.min.js`"></script>`n</body>")
Gravar 'index.html' ((($html -split "`r?`n") | ForEach-Object { $_.Trim() } | Where-Object { $_ }) -join "`n")

# Imagem: WebP com 960 px de largura (sem o ffmpeg, so copia)
$origem = Join-Path $raiz 'imagens/maos-e-patas.webp'
$destino = Join-Path $dist 'imagens/maos-e-patas.webp'
New-Item -ItemType Directory -Force (Split-Path $destino) | Out-Null
if (Get-Command ffmpeg -ErrorAction SilentlyContinue) {
    ffmpeg -y -loglevel error -i $origem -vf scale=960:-2 -c:v libwebp -quality 75 $destino
} else {
    Copy-Item $origem $destino
}

Write-Host 'Build pronto em dist/'
Get-ChildItem $dist -Recurse -File | ForEach-Object { '{0,8:N0} bytes  {1}' -f $_.Length, $_.FullName.Substring($dist.Length + 1) }
