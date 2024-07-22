'use client'
import ChatBody from '@/components/ChatBody'
import { Message } from '@/types/message'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { WebSocketContext } from '@/modules/web_socket_provider'
import { useRouter } from 'next/navigation'
import { listClients } from '@/api/client'
import autosize from 'autosize'
import { AuthContext } from '@/modules/auth_provider'

const Chat = () => {
    const textArea = useRef<HTMLTextAreaElement>(null)
    const { conn } = useContext(WebSocketContext)
    const { user } = useContext(AuthContext)
    const router = useRouter()
    const [clientUsers, setClientUsers] = useState<Array<{ name: string }>>([])
    const [messages, setMessages] = useState<Array<Message>>([])

    const roomId = conn ? new URL(conn.url).pathname.split('/')[3] : 'N/A'

    const getListUsers = async () => {
        const res = await listClients(roomId)
        if (res) setClientUsers(res)
        console.log('Client Users:', res)
    }

    const sendMessage = () => {
        if (!textArea.current?.value) return
        if (conn == null) {
            router.push('/')
            return
        }
        const messageToSend = textArea.current.value
        conn.send(messageToSend)
        textArea.current.value = ''
    }

    useEffect(() => {
        if (textArea.current) {
            autosize(textArea.current)
        }
        if (conn == null) {
            router.push('/')
            return
        }

        conn.onmessage = (event) => {
            const m: Message = JSON.parse(event.data)
            console.log('Received message:', m)
            if (m.content === "Một người dùng đã tham gia đoạn chat") {
                getListUsers()
            } else if (m.content === "Một người dùng đã thoát đoạn chat") {
                setClientUsers(prev => prev.filter((u) => u.name !== m.name))
                setMessages(prev => [...prev, m])
            } else {
                m.type = user.name !== m.name ? "recv" : "self"
                setMessages(prev => [...prev, m])
            }
        }

        conn.onclose = () => {
            console.log('WebSocket closed')
        }
        conn.onerror = (error) => {
            console.error('WebSocket error:', error)
        }
        conn.onopen = () => {
            console.log('WebSocket connected')
            getListUsers()
        }
    }, [conn, router, user.name])

    return (
        <div className='flex flex-col w-full'>
            <div className='p-4 md:mx-6 mb-14'>
                <ChatBody data={messages} />
            </div>
            <div className='fixed bottom-0 mt-4 w-full'>
                <div className='flex md:flex-row px-4 py-2 bg-gray-300 md:mx-4 rounded-sm'>
                    <div className='flex w-full mr-4 rounded-md border border-blue'>
                        <textarea
                            ref={textArea}
                            className='w-full h-10 p-2 rounded-md focus:outline-none'
                            style={{ resize: 'none' }}
                            placeholder='Nhập tin nhắn'
                        />
                    </div>
                    <div className='flex items-center'>
                        <button
                            className='p-2 rounded-md bg-blue-400 text-white'
                            onClick={sendMessage}
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
