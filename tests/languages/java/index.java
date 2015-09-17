import java.io.*;
import java.net.*;

class index
{
    public static void main(String argv[]) throws Exception
        {
            ServerSocket server = new ServerSocket(3000);
            URL url = new URL("http://localhost:4000");
            while(true)
            {
                Socket socket = server.accept();
                BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                String str = in.readLine();
                if (str.startsWith("POST")) {
                    HttpURLConnection con = (HttpURLConnection) url.openConnection();

                    con.setDoOutput(true);
                    OutputStream os = con.getOutputStream();
                    os.flush();
                    os.close();

                    int responseCode = con.getResponseCode();

                    if(responseCode != 200){
                        try {
                            out.println("HTTP/1.1 503 Service Unavailable");
                            out.println("Content-Type: text/plain");
                            out.println("Content-Length: 19");
                            out.println("");
                            out.println("Service unavailable");
                        } finally {
                            socket.close();
                        }
                    } else {
                        try {
                            out.println("HTTP/1.1 200 OK");
                            out.println("Content-Type: text/plain");
                            out.println("Content-Length: 2");
                            out.println("");
                            out.println("OK");
                        } finally {
                            socket.close();
                        }
                    }
                } else {
                    try {
                        out.println("HTTP/1.1 501 Not Implemented");
                        out.println("Content-Type: text/plain");
                        out.println("Content-Length: 15");
                        out.println("");
                        out.println("Not Implemented");
                    } finally {
                        socket.close();
                    }
                }
            }
        }
}
