import styled from "styled-components";
import {colors} from "@/common/CommonStyle";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
`

export const PageWrapper = styled.div`
    width: 80%;
    background-color: ${colors.color_green};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

// (좌측) 영웅 이미지 카드
export const HeroCard = styled.div`
    width: 35%;
    height: 80vh;
    border-radius: 5px;
    background-color: ${colors.color_natural};
`

// (우측) 정보 입력 카드
export const InputCard = styled.div`
    width: 45%;
    height: 80vh;
    border-radius: 5px;
    background-color: ${colors.color_natural};
`

