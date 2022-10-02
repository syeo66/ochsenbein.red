---
title: 'Adding websocket to express using rxjs'
date: '2022-10-02T11:15:00.000Z'
description: 'RxJs is a great way to deal with streams. And websockets are the very definition of streams.'
devTo: 'https://dev.to/syeo66/'
---

I am currently working on a small little smart mirror or digital photo frame tool which will be installed on a Raspberry Pi by and consists of a server and a frontend. Since everything will be running on the same device in a local network I don't see any reason the add any kind of authentication to the websocket connection, which makes everything a bit easier (I just feel like having to say that - but certainly there will be some "but security" comments, right? 😁).

So, I was working with RxJs in the frontend in the past, but I never used it on the backend side. What I will be trying to do is retrieving the Astronomy Picture of the Day from the NASA API and send the message to change the background image regularly.

## Setting up Express

```typescript
import express from 'express'
import ws from 'ws'

// Initialize the express engine
const app: express.Application = express()

// Take a port 3000 for running server.
const PORT = Number(process.env.PORT || 8080)

// Retrieve a websocket server instance
// I am aware RxJs has it's own websocket Observable
// I intentionally optet to not use it because I felt
// it was more tailored to frontend use.
const wsServer = new ws.Server({ noServer: true })
wsServer.on('connection', (socket) => {
  // The websocket stuff will go here
})

// Handling '/' Request
app.get('/', (_req, res) => {
  res.send('Just a websocket APotD server')
})

// Server setup
const server = app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})

// Initiate the websocket server when the browser requests an upgrade
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (websocket) => {
    wsServer.emit('connection', websocket, request)
  })
})
```

As you can see we do not have to do much here. Just deal with the upgrade request from the server and emit a new connection using our websocket server.
