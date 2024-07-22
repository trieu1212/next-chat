import { APP_URL } from "@/constants"

export const listClients = async(roomId:string) => {
    try {
        const res = await fetch(`${APP_URL}/ws/get-clients/${roomId}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data:Array<{
            name:string
        }> = await res.json();
        return data; 
    } catch (error) {
        console.log(error)
    }
}