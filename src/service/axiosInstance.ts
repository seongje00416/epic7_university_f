import axios, {
    AxiosError,
    AxiosResponse,
} from 'axios'

export type ApiResponse<T> = {
    success: boolean
    data: T
}

export type ErrorResponse = {
    success: boolean
    data: {
        code: string
        message: string
    }
}

console.log( import.meta.env.VITE_API_BASE_URL )

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error: AxiosError<ErrorResponse>) => {
        if (error.response?.data) {
            return Promise.reject(new Error(error.response.data.data.message))
        }
        return Promise.reject(new Error('에러가 발생했습니다.'))
    }
)

export default axiosInstance