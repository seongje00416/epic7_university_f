import styled from "styled-components";
import {colors} from "@/common/CommonStyle";

export const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    overflow-y: auto;
`

export const PageWrapper = styled.div`
    width: 85%;
    background-color: ${colors.color_green};
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-top: 5vh;
    padding-bottom: 10vh;
    overflow-y: auto;
`
export const AnnouncementContainer = styled.div`
    width: 100%;
    justify-content: center;
    display: flex;
`

export const SelectContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

export const CardContainer = styled.div`
    width: 100%;
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
`
// 공지 카드
export const AnnouncementCard = styled.div`
    width: calc( 80% + 15px );
    background-color: ${colors.color_natural};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
    height: 20vh;
`

// 고정 정보 선택 카드
export const SelectCard = styled.div`
    width: calc( 80% + 15px );
    height: 10vh;
    border-radius: 5px;
    background-color: ${colors.color_natural};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
`

export const InputGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 23%;
`

export const InputTitle = styled.label`
    font-weight: bold;
    font-size: 18px;
    text-align: center;
`

export const SelectBox = styled.select`
    border-radius: 5px;
    text-align: center;
    height: 30px;
    width: 65%;
    font-size: 14px;
`

export const Option = styled.option`
    font-weight: bold;
    
`


// (좌측) 영웅 이미지 카드
export const HeroCard = styled.div`
    width: 35%;
    height: 100%;
    border-radius: 5px;
    background-color: ${colors.color_natural};
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    position: relative;
`

export const HeroImage = styled.img`
    width: auto;
    max-width: 90%;
    height: auto;
    max-height: 90%;
    z-index: 1;
`

// (우측) 정보 입력 카드
export const InputCard = styled.div`
    width: 45%;
    height: 100%;
    border-radius: 5px;
    background-color: ${colors.color_natural};
    overflow-y: auto;
`
//      장비칸 컨테이너
export const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 10;
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
`
//      전용장비 및 아티팩트
export const SpecialItemWrapper = styled.div`
    flex: 2;
    display: flex;
    justify-content: right;
    align-items: center;
`

export const ArtifactBlank = styled.div`
    background-color: black;
    margin-right: 15px;
    border: 1px solid gray;
    opacity: 65%;
    width: 5vw;
    height: 5vw;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
`

export const ExclusiveItemBlank = styled.div`
    background-color: black;
    border: 1px solid gray;
    opacity: 65%;
    width: 4.5vw;
    height: 4.5vw;
    padding-top: 5px;
    margin-top: 80px;
    clip-path: polygon(
            50% 0%,    /* 0 */
            69% 21%,   
            92.5% 25%,   /* 0 */
            83% 50%,   
            92.5% 75%,   /* 0 */
            69% 79%,   
            50% 100%,   /* 0 */
            31% 79%,   
            0% 75%,    /* 0 */
            9.5% 50%,    
            0% 25%,     /* 0 */
            31% 21%
    );
`

//      장비 및 장신구
export const EquipmentItemWrapper = styled.div`
    flex: 3;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    width: 100%;
    height: 100%;
    column-gap: 50%;
    row-gap: 1%;
`

export const EquipmentItemBlank = styled.div`
    border-radius: 5px;
    background-color: black;
    border: 1px solid gray;
    opacity: 65%;
    width: 4vw;
    height: 4vw;
`
//      스킬 강화 및 스킬트리
export const SkillWrapper = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`
export const SkillSet = styled.div`
    display: flex;
    flex-direction: column;
`

export const SkillIcon = styled.img`
    width: 5vw;
    height: 5vw;
    border: none;
`

export const SkillLevelLabel = styled.select`
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    background-color: orange;
    color: white;
    padding: 3px;
    border-radius: 15px;
    border: 2px solid darkorange;
`

export const SkillLevelOption = styled.option`
    background-color: white;
    color: black;
`

