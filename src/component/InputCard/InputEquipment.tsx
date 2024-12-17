import {
    EquipmentContainer,
    EquipmentWrapper,
    EquipmentLabel,
    EquipmentSelect,
    EquipmentOption,
    EquipmentInput,
    EquipmentSubSelect,
    ClearButton,
    SubmitButton,
} from "@/style/Style_EstimateHeroPage.ts";
import { useState } from "react";
import {EquipOption, EquipSet, Grade, Level, EquipOptionEnum, EquipSetEnum, EquipGradeEnum, EquipLevelEnum } from "@/types/Equipment.ts";
import { useItemForm } from "@/component/hook/useItemForm.ts";

interface Props {
    onChangeIcon: (itemType:string) => void,
    itemType: string
}

const InputEquipment: React.FC<Props> = ( {onChangeIcon, itemType} ) => {
    const [ equipSet, setEquipSet] = useState<EquipSet>("ATTACK");
    const [ enhance, setEnhance ] = useState(0);
    const [ grade, setGrade ] = useState<Grade>("EPIC");
    const [ level, setLevel ] = useState<Level>("F" as Level);
    const [ mainOption, setMainOption ] = useState<EquipOption>("ATTACK");
    const [ mainValue, setMainValue ] = useState(0);
    const [ subOption1, setSubOption1 ] = useState<EquipOption>("ATTACK");
    const [ subValue1, setSubValue1 ] = useState(0);
    const [ subOption2, setSubOption2 ] = useState<EquipOption>("ATTACK");
    const [ subValue2, setSubValue2 ] = useState(0);
    const [ subOption3, setSubOption3 ] = useState<EquipOption>("NONE");
    const [ subValue3, setSubValue3 ] = useState(0);
    const [ subOption4, setSubOption4 ] = useState<EquipOption>("NONE");
    const [ subValue4, setSubValue4 ] = useState(0);

    const changeEquipmentIcon = () => {
        console.log( equipSet + " " + enhance + " " + grade );

        const equipType = itemType.toUpperCase();
        let huntMob = "";
        if( equipSet === "SPEED" || equipSet === "HIT" || equipSet === "CRITICAL" ) huntMob = "WYVERN";
        if( equipSet === "ATTACK" || equipSet === "HEALTH" || equipSet === "DEFENSE" || equipSet === "PROTECTION" ) huntMob = "GOLEM";
        if( equipSet === "RESIST" || equipSet === "DESTRUCTION" || equipSet === "LIFESTEAL" || equipSet === "COUNTER" ) huntMob = "BANSHEE";
        if( equipSet === "UNITY" || equipSet === "IMMUNITY" || equipSet === "RAGE" ) huntMob = "AZIMANAK";
        if( equipSet === "REVENGE" || equipSet === "INJURY" || equipSet === "PENETRATION" || equipSet === "TORRENT" ) huntMob = "CAIDES";
        onChangeIcon( grade.toUpperCase() + "_" + huntMob + "_" + equipType );
    }

    return (
        <EquipmentContainer>
            <EquipmentWrapper>
                <EquipmentLabel>
                    { itemType === "weapon" && "무기" }
                    { itemType === "helmet" && "투구" }
                    { itemType === "armor" && "갑옷" }
                    { itemType === "necklace" && "목걸이" }
                    { itemType === "ring" && "반지" }
                    { itemType === "boots" && "신발" }
                </EquipmentLabel>
            </EquipmentWrapper>
            <EquipmentWrapper>
                <EquipmentLabel> 장비 세트 </EquipmentLabel>
                <EquipmentSelect value={equipSet} onChange={ (e) => {setEquipSet(e.target.value as EquipSet);} }>
                    {
                        Object.entries( EquipSetEnum ).map( ( [key, value] ) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                            )
                        )
                    }
                </EquipmentSelect>
                <EquipmentInput type="number" placeholder="장비 강화 수치" onChange={(e) => setEnhance( Number(e.target.value) )}/>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 장비 등급 </EquipmentLabel>
                <EquipmentSelect value={grade} onChange={ (e) => {setGrade(e.target.value as Grade);} }>
                    {
                        Object.entries( EquipGradeEnum ).map( ( [key, value]) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                        ))
                    }
                </EquipmentSelect>
                <EquipmentSubSelect value={level} onChange={ (e) => {setLevel(e.target.value as Level);} }>
                    {
                        Object.entries( EquipLevelEnum ).map( ( [key, value]) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                        ))
                    }
                </EquipmentSubSelect>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 주 옵션 </EquipmentLabel>
                <EquipmentSelect onChange={ (e) => {setMainOption(e.target.value as EquipOption);} }>
                    {
                        Object.entries( EquipOptionEnum ).map( ( [key, value]) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                        ))
                    }
                </EquipmentSelect>
                <EquipmentInput type="number" placeholder="수치를 입력하세요" onChange={ (e) => { setMainValue(Number(e.target.value)) } }/>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 보조 옵션 1 </EquipmentLabel>
                <EquipmentSelect onChange={ (e) => {setSubOption1(e.target.value as EquipOption);} }>
                    {
                        Object.entries( EquipOptionEnum ).map( ( [key, value]) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                        ))
                    }
                </EquipmentSelect>
                <EquipmentInput type="number" placeholder="수치를 입력하세요" onChange={ (e) => { setSubValue1(Number(e.target.value)) } }/>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 보조 옵션 2 </EquipmentLabel>
                <EquipmentSelect onChange={ (e) => {setSubOption2(e.target.value as EquipOption);} }>
                    {
                        Object.entries( EquipOptionEnum ).map( ( [key, value]) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                        ))
                    }
                </EquipmentSelect>
                <EquipmentInput type="number" placeholder="수치를 입력하세요" onChange={ (e) => { setSubValue2(Number(e.target.value)) } }/>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 보조 옵션 3 </EquipmentLabel>
                <EquipmentSelect onChange={ (e) => {setSubOption3(e.target.value as EquipOption);} }>
                    <EquipmentOption value="NONE"> 없음 </EquipmentOption>
                    {
                        Object.entries( EquipOptionEnum ).map( ( [key, value]) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                        ))
                    }
                </EquipmentSelect>
                <EquipmentInput type="number" disabled={subOption3 === "NONE"} placeholder="수치를 입력하세요"
                                onChange={ (e) => { setSubValue3(Number(e.target.value)) } } />
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 보조 옵션 4 </EquipmentLabel>
                <EquipmentSelect onChange={ (e) => {setSubOption4(e.target.value as EquipOption);} } >
                    <EquipmentOption value="NONE"> 없음 </EquipmentOption>
                    {
                        Object.entries( EquipOptionEnum ).map( ( [key, value]) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                        ))
                    }
                </EquipmentSelect>
                <EquipmentInput type="number" disabled={subOption4 === "NONE"} placeholder="수치를 입력하세요"
                                onChange={ (e) => { setSubValue4(Number(e.target.value)) } }/>
            </EquipmentWrapper>
            <EquipmentWrapper>
                <ClearButton> 초기화 </ClearButton>
                <SubmitButton onClick={ () => changeEquipmentIcon()}> 적용 </SubmitButton>
            </EquipmentWrapper>
        </EquipmentContainer>
    );
}

export default InputEquipment;