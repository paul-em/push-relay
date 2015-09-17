require 'socket'
require 'net/http'

server = TCPServer.new('', 3000)
uri = URI('http://localhost:4000')

loop do
  socket = server.accept
  method, path = socket.gets.split

  if method == "POST"
    req = Net::HTTP::Post.new(uri)
    res = Net::HTTP.start(uri.hostname, uri.port) do |http|
      http.request(req)
    end
    if res.code != "200"
      response = "Service unavailable"
      socket.print "HTTP/1.1 503 Service Unavailable\r\n" +
                     "Content-Type: text/plain\r\n" +
                     "Content-Length: #{response.bytesize}\r\n" +
                     "Connection: close\r\n"
      socket.print "\r\n"
      socket.print response
    else
      response = "OK"
      socket.print "HTTP/1.1 200 OK\r\n" +
                     "Content-Type: text/plain\r\n" +
                     "Content-Length: #{response.bytesize}\r\n" +
                     "Connection: close\r\n"
      socket.print "\r\n"
      socket.print response
    end
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
