import { useEffect, useState } from 'react'

import { io } from 'socket.io-client';

function App() {

  const [data, setData] = useState();



  useEffect(() => {
    console.log(`UseEffect executed...`)

    const socket = io('https://api-staging.angiefior.com', {
      query: {
        access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE3MzI2OTA4MTEsImV4cCI6MTczMjc3NzIxMX0.DAvsZ7jcoVVBrLyZrkJWIN12cg2PoChBvcRnNPm9V-I` // put the access token here
      }
    });

    socket.emit('listen-notif', '1') // 1 is admin role id, put currently logged in admin role id here

    socket.on('notif', (n) => {
      console.log(n); // n is the same payload from notification, you can do whatever you want with this data
    })
    // payload example:
    /**
     * {transaction_id: 286, type: 'NEW_ORDER', content: 'Mr L - INV/20241127/PQL0P7 new order created'}
     */

    return () => {
      socket.close(); // close socket connection
    }
  }, [])
  return (
    <>
      <main>
        <h1 className='bg-black text-white'>Test Websocket</h1>
      </main>
    </>
  )
}

export default App
