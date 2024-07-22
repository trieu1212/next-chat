'use client'
import { login } from '@/api/auth'
import { AuthContext } from '@/modules/auth_provider'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()
    const handleLogin = async () => {
        const res = await login({email, password})
    }
    const {authenticated} = useContext(AuthContext)

    useEffect(()=>{
        if(authenticated){
            router.push('/')
        }
    },[authenticated,router])

    return (
        <div className='m-auto w-[600px] border mt-9 flex flex-col items-center rounded-md bg-gray-300'>
            <h1 className='mt-4 text-[24px]'>Đăng nhập</h1>
            <form action="" className='p-3 mt-8 flex flex-col justify-center gap-6'>
                <div className='flex gap-12'>
                    <label htmlFor="">
                        Email
                    </label>
                    <input 
                        className='px-2'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className='flex gap-4'>
                    <label htmlFor="">
                        Mật khẩu
                    </label>
                    <input 
                        className='px-2'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
            </form>
            <button 
                className='bg-blue-500 text-white p-2 rounded-md my-4'
                onClick={handleLogin}
            >Đăng nhập</button>
            <div>
                <span>
                    Chưa có tài khoản? <Link href={`/register`}><span className='hover:text-red-400'>Đăng kí ngay</span></Link>
                </span>
            </div>
        </div>
    )
}

export default Login