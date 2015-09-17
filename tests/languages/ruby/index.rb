require 'socket'
require 'net/http'

server = TCPServer.new('localhost', 3000)
uri = URI('http://localhost:3001')

loop do
  socket = server.accept
  method, path = socket.gets.split
  if method == "GET"
    req = Net::HTTP::Post.new(uri)
    res = Net::HTTP.start(uri.hostname, uri.port) do |http|
      http.request(req)
    end

    response = res.code
    socket.print response
  else
    response = "Not implemented"
    socket.print "HTTP/1.1 501 Not Implemented\r\n" +
                   "Content-Type: text/plain\r\n" +
                   "Content-Length: #{response.bytesize}\r\n" +
                   "Connection: close\r\n"
    socket.print "\r\n"
    socket.print response
  end
  socket.close
end
