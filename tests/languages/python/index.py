import http.server
import http.client, urllib.parse

class SimpleHTTPRequestHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(501)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("Not implemented", "utf-8"))


    def do_POST(self):
        conn = http.client.HTTPConnection("localhost:4000")
        conn.request("POST", "")
        response = conn.getresponse()

        if response.status != 200:
            self.send_response(503)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(bytes("Service unavailable", "utf-8"))
        else:
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(bytes("OK", "utf-8"))


server_address = ('localhost', 3000)
httpd = http.server.HTTPServer(server_address, SimpleHTTPRequestHandler)
httpd.serve_forever()
