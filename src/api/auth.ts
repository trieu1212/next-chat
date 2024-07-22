import { RegisterInput } from "@/types/register";
import { APP_URL } from "@/constants";
import { LoginInput } from "@/types/login";
import { UserInterface } from "@/types/user";

export const register = async (data: RegisterInput) => {
    try {
        const res = await fetch(`${APP_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const json = await res.json()
        if (res.ok) {
            window.location.href = '/login'
        }
    } catch (error) {
        console.log(error)
    }
}

export const login = async (data: LoginInput) => {
    try {
        const res = await fetch(`${APP_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const json = await res.json()
        if (res.ok) {
            const user: UserInterface = {
                id: json.id,
                email: json.email,
                name: json.name,
            }

            localStorage.setItem('user', JSON.stringify(user))
            return window.location.href = '/'
        }
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    const res = await fetch(`${APP_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    localStorage.removeItem('user')
    return window.location.href = '/login'
}