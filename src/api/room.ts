import { APP_URL } from '@/constants';

import { CreateRoomInput } from './../types/create-room';
export const createRoom = async (data: CreateRoomInput) => {
    try {
        const res = await fetch(`${APP_URL}/ws/create-room`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        alert('Tạo phòng thành công')
    } catch (error) {
        console.log(error)
    }
}

export const listRoom = async () => {
    try {
        const res = await fetch(`${APP_URL}/ws/get-rooms`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data; 
    } catch (error) {
        console.log(error)
    }
}