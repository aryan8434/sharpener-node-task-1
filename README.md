# Node.js Task 1: Streams, Buffers, and Request Redirection

This project demonstrates handling HTTP requests, reading chunks using Streams, concatenating Buffers, writing form submissions to a file, and redirecting with a 302 HTTP status code in pure Node.js.

## Features
- **GET `/`**: Displays submitted message(s) from `message.txt` and an HTML input form.
- **POST `/message`**: Listens for data stream chunks (`req.on('data')`), buffers and parses incoming form data (`req.on('end')`), saves the message to `message.txt`, and redirects the client back to `/` with a `302` response.

## Running the Application
```bash
node index.js
```
The server will start listening at `http://localhost:3000`.
