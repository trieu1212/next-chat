'use client'
import React, { createContext, ReactNode, useState } from 'react'

type Conn = WebSocket | null

export const WebSocketContext = createContext<{
    conn: Conn,
    setConn: React.Dispatch<React.SetStateAction<Conn>>
}>({
    conn: null,
    setConn: () => {}
})

const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const [conn, setConn] = useState<Conn>(null) 

    return (
        <WebSocketContext.Provider value={{ conn, setConn }}>
            {children}
        </WebSocketContext.Provider>
    )
}

export default WebSocketProvider
