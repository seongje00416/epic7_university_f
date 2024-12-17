import styled from "styled-components";
import {colors} from "@/common/CommonStyle";

export const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    overflow-y: auto;
`

export const PageWrapper = styled.div`
    width: 100%;
    background-color: ${colors.color_light};
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

export const ResultContainer = styled.div`
    width: 100%;
    height: 55vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
`
// 공지 카드
export const AnnouncementCard = styled.div`
    width: calc( 80% + 15px );
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 20vh;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`

export const AnnouncementText = styled.div`
    font-weight: bold;
    font-size: 18px;
`

// 고정 정보 선택 카드
export const SelectCard = styled.div`
    width: calc( 80% + 15px );
    height: 10vh;
    border-radius: 5px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`

export const InputGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 20%;
`
export const SubInputGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 30%;
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
    width: 70%;
    font-size: 14px;
`

export const SubSelectBox = styled.select`
    border-radius: 5px;
    text-align: center;
    height: 30px;
    width: 25%;
    font-size: 14px;
`

export const Option = styled.option`
    font-weight: bold;
`

export const CheckBox = styled.input`
    
`
export const CheckBoxLabel = styled.label`
    align-items: center;
    justify-content: center;
    display: flex;
`


// (좌측) 영웅 이미지 카드
export const HeroCard = styled.div`
    width: 35%;
    height: 100%;
    border-radius: 5px;
    background-image: url('/src/assets/base_menu.png');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    position: relative;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`

export const HeroImage = styled.img`
    width: auto;
    max-width: 90%;
    height: auto;
    max-height: 90%;
    z-index: 1;
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
    &:hover {
        cursor: pointer;
        opacity: 80%;
    }
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
    &:hover {
        cursor: pointer;
        opacity: 80%;
    }
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

interface Props {
    isFilled: boolean
}
export const EquipmentItemBlank = styled.div<Props>`
    border-radius: 5px;
    background-color: black;
    border: 1px solid gray;
    opacity: ${ props => (props.isFilled ? '1' : '0.65') };
    width: 4vw;
    height: 4vw;
    position: relative;
    &:hover {
        cursor: pointer;
        opacity: 80%;
    }
`
export const EquipmentItemShowWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`
export const EquipmentItemImage = styled.img`
    width: 100%;
    height: auto;
    position: absolute;
    z-index: 10;
`

export const EquipmentItemGradeImage = styled.img`
    width: 100%;
    height: auto;
    z-index: 1;
`
//      스킬 강화 및 스킬트리
export const SkillWrapper = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
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
    border: 1px solid darkorange;
    &:hover {
        cursor: pointer;
    }
`

export const SkillLevelOption = styled.option`
    background-color: white;
    color: black;
`


// (우측) 정보 입력 카드
export const InputCard = styled.div`
    width: 45%;
    height: 100%;
    border-radius: 5px;
    justify-content: center;
    background-color: white;
    overflow-y: auto;
    display: flex;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`

export const DefaultInputBox = styled.div`
    text-align: center;
    font-size: 20px;
    color: gray;
    opacity: 65%;
    font-weight: bold;
`

// 장비 정보 입력
export const EquipmentContainer = styled.div`
    display: flex;
    width: 100%;
    height: 80%;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    margin-inline: 20px;
`

export const EquipmentWrapper = styled.div`
    display: flex;
    gap: 15px;
    padding-inline: 15px;
    margin-block: 10px;
    justify-content: center;
`

export const EquipmentLabel = styled.label`
    flex: 1.5;
    font-weight: bold;
    text-align: center;
`

export const EquipmentSelect = styled.select`
    flex: 2;
    text-align: center;
    font-size: 14px;
    padding: 3px;
`

export const EquipmentOption = styled.option`

`

export const EquipmentSubSelect = styled.select`
    flex: 5;
`

export const EquipmentInput = styled.input`
    flex: 5;
`

export const ClearButton = styled.div`
    width: 20%;
    text-align: center;
    border-radius: 10px;
    font-weight: bold;
    border: 2px solid gray;
    margin-top: 15px;
    &:hover {
        cursor: pointer;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
    }
`
export const SubmitButton = styled.div`
    width: 20%;
    text-align: center;
    font-weight: bold;
    border-radius: 10px;
    border: 2px solid green;
    margin-top: 15px;
    &:hover {
        cursor: pointer;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
    }
`

// 전용장비 및 아티팩트
export const SpecialItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    width: 100%;
    height: 80%;
    gap: 15px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: white;
    margin-inline: 20px;
`

// 아티팩트 정보 입력
export const ArtifactWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 35px;
`

export const ArtifactOption = styled.div`
    width: 15%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 5px;
    &:hover {
        cursor: pointer;
        opacity: 80%;
    }
`

export const ArtifactNameLabel = styled.label`
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`

//      아티팩트 필터
export const ArtifactFilterWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
`
export const ArtifactFilterLabel = styled.label`
    font-weight: bold;
    text-align: center;
`
export const ArtifactFilterSelect = styled.select`
    width: 30%;
    padding: 5px;
    text-align: center;
`
export const ArtifactFilterOption = styled.option`
    
`

// 전용장비 정보 입력
export const ExclusiveItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 80%;
    gap: 20px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid rgba( 0, 0, 0, 0);
    &:hover {
        border: 1px solid gray;
        cursor: pointer;
    }
`

export const ExclusiveEquipmentOption = styled.div`
    width: 15%;
    height: auto;
`

export const ExclusiveEquipmentDescription = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
`

// 공통
export const SpecialItemLabel = styled.label`
    font-weight: bold;
    font-size: 28px;
    margin-bottom: 20px;
`

export const SpecialItemImage = styled.img`
    width: 100%;
    height: auto;
`

// (하단 좌측) 영웅 스탯 카드
export const HeroStatResultCard = styled.div`
    width: 15%;
    height: 100%;
    justify-content: center;
    background-color: white;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`

export const StatResultWrapper = styled.div`
    display: flex;
    margin-block: 1%;
    justify-content: center;
    align-items: center;
    text-align: center;
`

export const StatResultLabel = styled.label`
    font-weight: bold;
    width: 35%;
`
export const StatResultValueLabel = styled.label`
    width: 35%;
`

export const SetEffectContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const SetEffectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 35%;
`

export const SetEffectLabel = styled.label`
    font-weight: bold;
    width: 35%;
`

export const SetEffectValueLabel = styled.label`

`

// (하단 우측) 평가 결과 카드
export const EstimateResultCard = styled.div`
    width: 65%;
    height: 100%;
    background-image: url('/src/assets/rta_013.png');
    background-size: cover;
    display: flex;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`

export const EstimateEquipmentContainer = styled.div`
    display: flex;
    width: 70%;
    justify-items: center;
`
// 장비 정리
export const EstimateEquipmentWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 15px;
    
`
export const EstimateEquipmentRow = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex: 1;
    gap: 10px;
    
`
export const EstimateEquipmentIcon = styled.div`
    position: relative;
`
export const EstimateEquipmentImage = styled.img`
    width: 100%;
    height: auto;
    position: absolute;
    z-index: 10;
`
export const EstimateEquipmentGradeImage = styled.img`
    z-index: 1;
    width: 100%;
    height: auto;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`

export const EstimateEquipmentDescription = styled.div`
    display: flex;
    text-align: center;
    width: 100%;
`
export const EstimateEquipmentDescriptionLine = styled.div`
    display: flex;
    width: 25%;
    text-align: center;
    flex-direction: column;
    border: 1px solid lightgray;
    justify-content: center;
    align-items: center;
    height: 80%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    background-color: whitesmoke;
`
export const EstimateEquipmentDescriptionLabel = styled.label`
    font-weight: bold;
    text-align: center;
    flex: 1;
`
export const EstimateEquipmentDescriptionValueLabel = styled.label`
    text-align: center;
    flex: 1;
`
export const DescriptionLine = styled.hr`
    border: 1px solid black;
    width: 80%;
    opacity: 10%;
`
interface GradeProps {
    color: string
}
export const ItemEstimatedGradeLabel = styled.label<GradeProps>`
    font-weight: bold;
    font-size: 30px;
    display: flex;
    color: ${ props => (props.color) };
    justify-content: center;
    align-items: center;
`
// 영웅 등급
export const EstimateHeroContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const EstimateHeroIcon = styled.div`
    width: 70%;
`
export const EstimateHeroImage = styled.img`
    width: 100%;
    height: auto;
`
export const EstimateHeroGrade = styled.label`
    font-weight: bold;
    font-size: 54px;
    color: lightyellow;
    width: 70%;
    background-color: rgba( 255, 255, 225, 20% );
    border: solid 1px gray;
    border-radius: 10px;
    text-align: center;
`
export const EstimateHeroScore = styled.label`
    font-weight: bold;
    font-size: 24px;
    color: white;
`
export const EstimateHeroRanking = styled.label`

`

