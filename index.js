const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        // Read existing messages from the file
        fs.readFile('message.txt', 'utf8', (err, data) => {
            const existingMessages = err || !data ? '' : data;

            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Chat App</title></head>');
            res.write('<body>');
            
            // Show previously submitted message(s) at the top of the form
            if (existingMessages) {
                res.write(`<div>${existingMessages}</div>`);
            }

            // Input form: action="/message", method="POST", input name="message"
            res.write(`
                <form action="/message" method="POST">
                    <input type="text" name="message" />
                    <button type="submit">Send</button>
                </form>
            `);

            res.write('</body>');
            res.write('</html>');
            return res.end();
        });
        return;
    }

    if (url === '/message' && method === 'POST') {
        const body = [];

        // Collect incoming data chunks via stream
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        // Process data once all chunks have arrived
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            // Form sends key-value pairs like "message=hello+world"
            const rawMessage = parsedBody.split('=')[1] || '';

            // Replace '+' with a space and decode URL encoding
            const formattedMessage = decodeURIComponent(rawMessage.replace(/\+/g, ' '));

            // Write or append the message to message.txt
            fs.writeFile('message.txt', formattedMessage, (err) => {
                // Redirect back to '/' using 302 status code
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    // Fallback 404 for unhandled routes
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Page Not Found</h1>');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});