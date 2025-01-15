import styled from "styled-components";
import {Color} from "@/style/component/CustomColor.ts";

interface StepProps {
    isCurrent?: boolean;    // ? 를 붙이면 optional prop이 됩니다
}

// 메인 컨테이너
export const MainContainer = styled.div`
    height: 95vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
`

// 평가 컨텐츠 컨테이너
export const EstimateContainer = styled.div`
    display: flex;
    width: 100%;
    height: 90%;
    background-color: whitesmoke;
    justify-content: center;
    align-items: center;
`

// 좌측 선택된 정보 디스플레이 컨테이너
export const SelectedContainer = styled.div`
    width: 35%;
    height: 70%;
    border-left: 1px solid lightgray;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
`

// 우측 정보 선택 및 입력 디스플레이 컨테이너
export const SelectContainer = styled.div`
    width: 55%;
    height: 70%;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
`

//      단계 컨테이너
export const StepContainer = styled.div`
    display: flex;
`
export const Step = styled.div<StepProps>`
    text-align: center;
    flex: 1;
    background-color: ${Color.custom_color_2};
    opacity: ${ props => props.isCurrent ? 1 : 0.5 };
    font-weight: ${ props => props.isCurrent ? "bold" : "normal" };
`
export const StepText = styled.p`
    font-size: 18px;
    border-bottom: 1px solid ${Color.custom_color_1};
    margin: 0;
`
export const StepInfo = styled.p`
    font-size: 16px;
    margin: 0;
`

//      입력 컨테이너
export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`
export const InputWrapper = styled.div`

`
export const InputLabel = styled.div`

`
export const InputBlank = styled.div`

`
export const Input = styled.input`

`


