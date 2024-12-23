import axiosInstance, { ApiResponse } from '../axiosInstance'
import {Hero, HeroStat } from "@/types/Hero.ts";

export type PaginatedResponse<T> = {
    page: number
    size: number
    total: number
    content: T[]
}

export type HeroShow = {
    id: number
    name: string
    grade: number
    heroClass: string
}
export type HeroListResponse = PaginatedResponse<HeroShow>

// About Hero
export const retrieveAllHero = async (
    page: number,
    size: number
): Promise<HeroListResponse> => {
    const response: ApiResponse<HeroListResponse> = await axiosInstance.get(
        '/api/v1/hero/getAllHero',
        {
            params: { page, size },
        }
    )
    return response.data
}

export const retrieveHeroDetail = async (id: number): Promise<Hero> => {
    const response: ApiResponse<Hero> = await axiosInstance.get(
        `/api/v1/hero/getHero/${id}`
    )
    return response.data
}

// About BaseStat
export const retrieveBaseStat = async (id:number): Promise<HeroStat> => {
    const response: ApiResponse<HeroStat> = await axiosInstance.get(
        `/api/v1/baseStat/getBaseStat/${id}`
    )
    return response.data
}