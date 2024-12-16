import styled from "styled-components";
import {colors} from "@/common/CommonStyle";

// Container
export const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

export const PageWrapper = styled.div`
    width: 80%;
    background-color: ${colors.color_light}
`

// Select Box
export const CommunityCard = styled.div`
    margin: 30px;
    background-color: ${colors.color_green};
    border: 1px solid ${colors.color_light};
    border-radius: 15px;
`

export const RankingCard = styled.div`
    margin: 30px;
    background-color: ${colors.color_green};
    border: 1px solid ${colors.color_light};
    border-radius: 15px;
`

export const CheckCard = styled.div`
    margin: 30px;
    background-color: ${colors.color_green};
    border: 1px solid ${colors.color_light};
    border-radius: 15px;
`