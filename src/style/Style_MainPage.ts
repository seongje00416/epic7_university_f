import styled from "styled-components";

// 메인 컨테이너
export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
`
// --------------------------------------------- //
// 상단 메뉴 바 컨테이너
export const MenuBarContainer = styled.div`
    display: flex;
    height: 5vh;
    width: 100vw;
    background-color: black;
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
`
export const MenuItem = styled.div`
    color: white;
    margin: 10px;
    font-size: 16px;
    font-weight: bold;
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
    justify-content: center;
    align-items: center;
`