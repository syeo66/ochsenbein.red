---
title: 'Adding websocket to express using rxjs'
date: '2022-12-22T11:15:00.000Z'
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

## Create the observable using RxJS

I created a file which will contain export the observable we'll use to provide the stream for the websockets.

```typescript
const nasaApotd = () => {
}

export default nasaApotd
```

### Fetching the data in regular intervals

First I'd have to fetch the data from the API. To rotate through random images we'll retrieve a new random set of images every hour.

```typescript 
import axios from 'axios'
import { catchError, concatMap, distinctUntilChanged, filter, from, map, switchMap, take, timer } from 'rxjs'

const refetchInterval = 3600 // fetch every hour
const rotationInterval = 30 // rotate background every 30 seconds

const rotationCount = Math.floor(refetchInterval / Math.max(1, rotationInterval))

const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${rotationCount}`

const $nasaApotd = () => {
  return timer(0, refetchInterval * 1000).pipe(
    concatMap(() =>
      from(axios.get(url)).pipe(
        catchError((err) => {
          console.error('NasaApotd', err.response.statusText)
          return [null]
        })
      )
    ),
  )
}

export default nasaApotd
```

This will create a timer which fetches data from the url once an hour.

=== TODO describe `timer`, `concatMap`, `pipe` and `from` ===

### Prepare the data

```typescript
[...]
import { z } from 'zod'

const ApodData = z.object({
  copyright: z.optional(z.string()),
  hdurl: z.optional(z.string()),
})
const ApodDataArray = z.array(ApodData)

[...]

const $nasaApotd = () => {
  return timer(0, refetchInterval * 1000).pipe(
    concatMap(() =>
      [...]
    ),
    map((res): BackgroundData[] => {
      if (!res) {
        return []
      }

      const data = ApodDataArray.safeParse(res.data)

      if (!data.success) {
        console.warn(data.error)
        return []
      }

      return data.data
        ?.map<BackgroundData | null>(({ hdurl, copyright }) => (hdurl ? { url: hdurl, credits: copyright } : null))
        .filter((e): e is BackgroundData => Boolean(e))
    }),
  )
}

export default nasaApotd
```

=== TODO describe `map`, mention zod for data validation. ===

### Rotate the images

```typescript
[...]

const $nasaApotd = () => {
  return timer(0, refetchInterval * 1000).pipe(
    concatMap(() =>
      [...]
    ),
    map((res): BackgroundData[] => {
      [...]
    }),
    switchMap((ev) =>
      timer(0, rotationInterval * 1000).pipe(
        take(Math.ceil(rotationCount)),
        map((i) => (ev[i % ev.length] ? `SetBackground ${JSON.stringify(ev[i % ev.length])}` : null))
      )
    ),
  )
}

export default nasaApotd
```

=== TODO describe `switchMap` and `take` ===

### Make sure we don't send repeated messages

```typescript
[...]

const $nasaApotd = () => {
  return timer(0, refetchInterval * 1000).pipe(
    concatMap(() =>
      [...]
    ),
    map((res): BackgroundData[] => {
      [...]
    }),
    switchMap((ev) =>
      [...]
    ),
    filter(Boolean),
    distinctUntilChanged()
  )
}

export default nasaApotd
```

=== TODO describe `filter` and `distinctUntilChanged` ===

## Hook up the observable with the websocket
