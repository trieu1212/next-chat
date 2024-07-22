'use client'
import { Message } from '@/types/message'
import React from 'react'

const ChatBody = ({ data }: { data: Array<Message> }) => {
    
    return (
        <React.Fragment>
            {data.map((message: Message, index: number) => {
                if (message.type === 'recv') {
                    return (
                        <div
                            className='flex flex-col mt-2 w-full text-right justify-end'
                            key={index}
                        >
                            <div className='text-sm'>
                                {message.name}
                            </div>
                            <div className='bg-blue-400 text-black px-4 py-1 rounded-md inline-block mt-1'>
                                {message.content}
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div
                            className='flex flex-col mt-2 w-full text-left justify-start'
                            key={index}
                        >
                            <div className='text-sm'>
                                {message.name}
                            </div>
                            <div className='bg-gray-400 text-black px-4 py-1 rounded-md inline-block mt-1'>
                                {message.content}
                            </div>
                        </div>
                    )
                }
            })}
        </React.Fragment>
    )
}

export default ChatBody
