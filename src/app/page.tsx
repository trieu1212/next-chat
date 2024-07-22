'use client'
import { logout } from "@/api/auth";
import { createRoom, listRoom } from "@/api/room";
import { AuthContext } from "@/modules/auth_provider";
import { WebSocketContext } from "@/modules/web_socket_provider";
import { CreateRoomInput } from "@/types/create-room";
import { Rooms } from "@/types/list-rooms";
import { useContext, useEffect, useState } from "react";
import { WEBSOCKET_URL } from "@/constants";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useContext(AuthContext)
  const { setConn } = useContext(WebSocketContext)
  const [idRoom, setIdRoom] = useState('')
  const [roomName, setRoomName] = useState('')
  const [rooms, setRooms] = useState<Rooms[]>([])
  const router = useRouter()
  const handleLogout = async () => {
    await logout()
    alert('Đăng xuất thành công')
  }

  const getListRoom = async () => {
    const data = await listRoom()
    if (data) {
      setRooms(data.rooms);
    } else {
      console.log('Failed to fetch rooms');
    }
  }

  useEffect(() => {
    getListRoom()
  }, [])

  const handleCreateRoom = async () => {
    const data: CreateRoomInput = {
      id: idRoom,
      name: roomName
    }
    await createRoom(data)
    await getListRoom()
  }

  const handleJoinRoom = async (id: string) => {
    const ws = new WebSocket(`${WEBSOCKET_URL}/ws/join-room/${id}?userId=${user.id}&name=${user.name}`)
    if (ws.OPEN) {
      setConn(ws)
      router.push('/chat')
      return
    }
  }
  return (
    <>
      {user && (
        <div className="flex justify-center gap-6 items-center space-y-4">
          <h1>Xin chào {user.name}</h1>
          <div
            className="bg-red-400 p-2 rounded-lg hover:bg-red-600 hover:text-white cursor-pointer"
            onClick={handleLogout}
          >
            Đăng xuất
          </div>
        </div>
      )}
      <div className="my-8 px-4 w-full h-full">
        <div className="flex flex-col gap-4 w-[500px] mx-auto justify-center mt-3 p-5">
          <input type="text"
            className=" rounded-md p-2 border border-gray-300"
            placeholder="Nhập Mã phòng"
            value={idRoom}
            onChange={(e) => setIdRoom(e.target.value)}
          />
          <input type="text"
            className=" rounded-md p-2 border border-gray-300"
            placeholder="Nhập tên phòng"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handleCreateRoom}
          >
            Thêm phòng mới
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-col-5 gap-4 mt-6 px-4 mx-auto">
        {rooms?.length > 0 && rooms.map((item, index) => {
          return (
            <div
              key={index}
              className="border border-blue p-4 flex items-center rounded-md w-[450px]"
              onClick={() => handleJoinRoom(item.id)}
            >
              <div className="w-full">
                <div className="text-sm">
                  Phòng
                </div>
                <div className="text-blue font-bold text-lg">
                  {item.name}
                </div>
              </div>
              <div>
                <button className="px-4 text-white bg-blue-400 rounded-sm">
                  Vào
                </button>
              </div>
            </div>
          )
        })}
      </div>
      {!rooms && (
        <div className="text-center text-[20px] font-semibold">
          Hiện không có phòng chat nào đang hoạt động
        </div>
      )}
    </>
  );
}
