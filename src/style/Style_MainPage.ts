import styled from "styled-components";
import {Color} from "@/style/component/CustomColor.ts";

// 메인 컨테이너
export const MainContainer = styled.div`
    display: flex;
    width: 100vw;
    flex-direction: column;
    margin-top: 5vh;
`
// --------------------------------------------- //
// 상단 메뉴 바 컨테이너
export const MenuBarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    height: 5vh;
    width: 100vw;
    background-color: ${Color.custom_dark};
    z-index: 1000;
`
// 컨텐츠 컨테이너
export const ContentContainer = styled.div`
    display: flex;
    height: 95vh;
    flex-direction: column;
`
// --------------------------------------------- //
// Menu바
export const MenuBar = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`
export const LogoItem = styled.div`
    color: white;
    margin-left: 10px;
    margin-right: 30px;
    font-size: 20px;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`
export const MenuItem = styled.div`
    color: white;
    margin: 10px;
    font-size: 16px;
    font-weight: bold;
    
    &:hover {
        cursor: pointer;
        opacity: 80%;
    }
`
// --------------------------------------------- //
// Carousel 컨테이너
export const CarouselContainer = styled.div`
    height: 50vh;
    justify-content: center;
    align-items: center;
`

// Contents 컨테이너
export const SitemapContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 45vh;
    background-color: #F9F9F9;
`
export const SitemapWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 15vw;
    padding: 15px;
`
export const SitemapCategory = styled.div`
    font-size: 20px;
    padding: 5px;
    font-weight: bold;
    border-bottom: 1px solid lightgray;
`
export const SitemapItem = styled.div`
    font-size: 16px;
    padding: 5px;
    &:hover {
        cursor: pointer;
        opacity: 80%;
    }
`