param([int]$Port = 8080)

$rootDir = "d:\Data_sciences_& _data_analytics\Data_analytics]\projects\liv-protfolio-app"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Output "HTTP server running at http://127.0.0.1:$Port/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        try {
            $urlPath = $request.Url.LocalPath.TrimStart('/')
            if ([string]::IsNullOrWhiteSpace($urlPath)) {
                $urlPath = "index.html"
            }
            
            $urlPath = [System.Uri]::UnescapeDataString($urlPath).Replace('/', '\')
            $filePath = [System.IO.Path]::Combine($rootDir, $urlPath)
            
            if ([System.IO.File]::Exists($filePath)) {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $contentType = switch ($ext) {
                    ".html" { "text/html; charset=utf-8" }
                    ".css"  { "text/css; charset=utf-8" }
                    ".js"   { "application/javascript; charset=utf-8" }
                    ".json" { "application/json; charset=utf-8" }
                    ".svg"  { "image/svg+xml" }
                    ".png"  { "image/png" }
                    ".jpg"  { "image/jpeg" }
                    ".pdf"  { "application/pdf" }
                    default { "application/octet-stream" }
                }
                $response.ContentType = $contentType
                $response.StatusCode = 200
                $response.Close($bytes, $false)
            } else {
                $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
                $response.StatusCode = 404
                $response.ContentType = "text/plain; charset=utf-8"
                $response.Close($msg, $false)
            }
        } catch {
            Write-Warning "Request handler error: $_"
            try { $response.Close() } catch {}
        }
    }
} finally {
    $listener.Stop()
}
