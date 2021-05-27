# Network I/O Sample

## Client

```java
package cn.yelfive.socket;

import java.io.IOException;
import java.io.OutputStream;
import java.net.*;
import java.nio.charset.StandardCharsets;

public class Client {
    public static void main(String[] args) throws IOException {
        InetAddress localhost = InetAddress.getByName("localhost");
        try (
                Socket socket = new Socket(localhost, 8090);
                OutputStream outputStream = socket.getOutputStream();
        ) {
            outputStream.write("English 中文".getBytes(StandardCharsets.UTF_8));
        }
    }
}

```

## Server

```java
package cn.yelfive.socket;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
    public static void main(String[] args) throws InterruptedException {
        ServerSocket serverSocket = null;
        try {
            serverSocket = new ServerSocket(8090);
            System.out.println("Listen on 8090");
            while (true) {
                Socket accept = serverSocket.accept();
                System.out.println("accepted");
                new Thread(new ServerHandler(accept)).start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            closeSockets(serverSocket);
        }
    }

    public static void closeSockets(Closeable... sockets) {
        for (Closeable socket : sockets) {
            if (socket != null) {
                try {
                    socket.close();
                } catch (IOException e) {
                    System.out.println("Close failed");
                    e.printStackTrace();
                }
            }
        }
    }
}

class ServerHandler implements Runnable {

    Socket socket;

    public ServerHandler(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        InputStream is = null;
        ByteArrayOutputStream baos = null;
        try {
            is = socket.getInputStream();
            baos = new ByteArrayOutputStream();

            byte[] buffer = new byte[1024];
            int len;
            while ((len = is.read(buffer)) != -1) {
                baos.write(buffer, 0, len);
                // Server can then decide by tokens such as EOL
                // that if the client has finished input,
                // and send back something if so.
            }
            System.out.println("server received: " + baos);
        } catch (IOException e) {
        } finally {
            closeSockets(is, baos, socket);
        }
    }

    void closeSockets(Closable ...args) {
        Server.closeSockets(args);
    }
}
```
