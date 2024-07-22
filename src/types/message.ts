export type Message = {
    content: string;
    client_id: string;
    name: string;
    room_id: string;
    type: 'recv' | 'self'
}