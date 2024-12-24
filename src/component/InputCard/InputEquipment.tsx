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
import { useState, forwardRef, useImperativeHandle } from "react";
import { EquipOption, EquipSet, Grade, Level, EquipOptionEnum, EquipSetEnum, EquipGradeEnum, EquipLevelEnum } from "@/types/Equipment.ts";
import { useItemForm } from "@/component/hook/useItemForm.ts";

interface EquipmentFormData {
    parts: string;
    setEffect: EquipSet;
    enhance: number;
    grade: Grade;
    level: Level;
    mainOption: EquipOption;
    mainValue: number;
    subOption1: EquipOption;
    subValue1: number;
    subOption2: EquipOption;
    subValue2: number;
    subOption3: EquipOption;
    subValue3: number;
    subOption4: EquipOption;
    subValue4: number;
}

interface Props {
    onChangeIcon: (itemType:string) => void;
    itemType: string;
    formData: EquipmentFormData;
    handleChange: ( type:string, name:string, value:string ) => void;
    heroStatUpdate: (stat:string, value:number, isPercent:boolean) => void;
}

export interface Ref {
    settingInputCard: () => void;
}

const InputEquipment = forwardRef<Ref, Props>((props, ref) => {
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

    const {
        isArmorFormValid,
        isRingFormValid,
        isBootsFormValid,
        isHelmetFormValid,
        isWeaponFormValid,
        isNecklaceFormValid,
        statValueValidate
    } = useItemForm();

    useImperativeHandle(ref, () => ({
        settingInputCard
    }));

    const changeEquipmentIcon = () => {
        const equipType = props.itemType.toUpperCase();
        console.log( props.formData );

        // 아이템 아이콘 변경
        let huntMob = "";
        if( equipSet === "SPEED" || equipSet === "HIT" || equipSet === "CRITICAL" ) huntMob = "WYVERN";
        if( equipSet === "ATTACK" || equipSet === "HEALTH" || equipSet === "DEFENSE" || equipSet === "PROTECTION" ) huntMob = "GOLEM";
        if( equipSet === "RESIST" || equipSet === "DESTRUCTION" || equipSet === "LIFESTEAL" || equipSet === "COUNTER" ) huntMob = "BANSHEE";
        if( equipSet === "UNITY" || equipSet === "IMMUNITY" || equipSet === "RAGE" ) huntMob = "AZIMANAK";
        if( equipSet === "REVENGE" || equipSet === "INJURY" || equipSet === "PENETRATION" || equipSet === "TORRENT" ) huntMob = "CAIDES";
        props.onChangeIcon( grade.toUpperCase() + "_" + huntMob + "_" + equipType );

        // 아이템 수치 적용
        if( props.formData.mainOption === "ATTACK_PER" ) props.heroStatUpdate( "ATTACK", props.formData.mainValue, true )
        else if( props.formData.mainOption === "DEFENSE_PER" ) props.heroStatUpdate( "DEFENSE", props.formData.mainValue, true )
        else if( props.formData.mainOption === "HEALTH_PER" ) props.heroStatUpdate( "HEALTH", props.formData.mainValue, true )
        else if( props.formData.mainOption === "NONE" ) console.log("PASS");
        else props.heroStatUpdate( props.formData.mainOption, props.formData.mainValue, false )

        if( props.formData.subOption1 === "ATTACK_PER" ) props.heroStatUpdate( "ATTACK", props.formData.subValue1, true )
        else if( props.formData.subOption1 === "DEFENSE_PER" ) props.heroStatUpdate( "DEFENSE", props.formData.subValue1, true )
        else if( props.formData.subOption1 === "HEALTH_PER" ) props.heroStatUpdate( "HEALTH", props.formData.subValue1, true )
        else if( props.formData.subOption1 === "NONE" ) console.log("PASS");
        else props.heroStatUpdate( props.formData.subOption1, props.formData.subValue1, false )

        if( props.formData.subOption2 === "ATTACK_PER" ) props.heroStatUpdate( "ATTACK", props.formData.subValue2, true )
        else if( props.formData.subOption2 === "DEFENSE_PER" ) props.heroStatUpdate( "DEFENSE", props.formData.subValue2, true )
        else if( props.formData.subOption2 === "HEALTH_PER" ) props.heroStatUpdate( "HEALTH", props.formData.subValue2, true )
        else if( props.formData.subOption2 === "NONE" ) console.log("PASS");
        else props.heroStatUpdate( props.formData.subOption2, props.formData.subValue2, false )

        if( props.formData.subOption3 === "ATTACK_PER" ) props.heroStatUpdate( "ATTACK", props.formData.subValue3, true )
        else if( props.formData.subOption3 === "DEFENSE_PER" ) props.heroStatUpdate( "DEFENSE", props.formData.subValue3, true )
        else if( props.formData.subOption3 === "HEALTH_PER" ) props.heroStatUpdate( "HEALTH", props.formData.subValue3, true )
        else if( props.formData.subOption3 === "NONE" ) console.log("PASS");
        else props.heroStatUpdate( props.formData.subOption3, props.formData.subValue3, false )

        if( props.formData.subOption4 === "ATTACK_PER" ) props.heroStatUpdate( "ATTACK", props.formData.subValue4, true )
        else if( props.formData.subOption4 === "DEFENSE_PER" ) props.heroStatUpdate( "DEFENSE", props.formData.subValue4, true )
        else if( props.formData.subOption4 === "HEALTH_PER" ) props.heroStatUpdate( "HEALTH", props.formData.subValue4, true )
        else if( props.formData.subOption4 === "NONE" ) console.log("PASS");
        else props.heroStatUpdate( props.formData.subOption4, props.formData.subValue4, false )
    }

    const settingInputCard = () => {
        setEquipSet( props.formData.setEffect as EquipSet );
        setEnhance( props.formData.enhance );
        setGrade( props.formData.grade as Grade );
        setLevel( props.formData.level as Level );
        setMainOption( props.formData.mainOption as EquipOption );
        setMainValue( props.formData.mainValue );
        setSubOption1( props.formData.subOption1 as EquipOption );
        setSubValue1( props.formData.subValue1 );
        setSubOption2( props.formData.subOption2 as EquipOption );
        setSubValue2( props.formData.subValue2 );
        setSubOption3( props.formData.subOption3 as EquipOption );
        setSubValue3( props.formData.subValue3 );
        setSubOption4( props.formData.subOption4 as EquipOption );
        setSubValue4( props.formData.subValue4 );
    }

    const onChangeValue = ( name:string, value:string ) => {
        props.handleChange( props.itemType.toUpperCase(), name, value );
        switch( name ) {
            case "setEffect":
                setEquipSet( value as EquipSet );
                break;
            case "enhance":
                setEnhance( parseInt(value) );
                break;
            case "grade":
                setGrade( value as Grade );
                break;
            case "level":
                setLevel( value as Level );
                break;
            case "mainOption":
                setMainOption( value as EquipOption );
                break;
            case "mainValue":
                setMainValue( parseInt(value) );
                break;
            case "subOption1":
                setSubOption1( value as EquipOption );
                break;
            case "subValue1":
                setSubValue1( parseInt(value) );
                break;
            case "subOption2":
                setSubOption2( value as EquipOption );
                break;
            case "subValue2":
                setSubValue2( parseInt(value) );
                break;
            case "subOption3":
                setSubOption3( value as EquipOption );
                break;
            case "subValue3":
                setSubValue3( parseInt(value) );
                break;
            case "subOption4":
                setSubOption4( value as EquipOption );
                break;
            case "subValue4":
                setSubValue4( parseInt(value) );
                break;
        }
    }

    return (
        <EquipmentContainer>
            <EquipmentWrapper>
                <EquipmentLabel>
                    { props.itemType === "weapon" && "무기" }
                    { props.itemType === "helmet" && "투구" }
                    { props.itemType === "armor" && "갑옷" }
                    { props.itemType === "necklace" && "목걸이" }
                    { props.itemType === "ring" && "반지" }
                    { props.itemType === "boots" && "신발" }
                </EquipmentLabel>
            </EquipmentWrapper>
            <EquipmentWrapper>
                <EquipmentLabel> 장비 세트 </EquipmentLabel>
                <EquipmentSelect value={equipSet} onChange={ (e) => {onChangeValue("setEffect", e.target.value);} }>
                    {
                        Object.entries( EquipSetEnum ).map( ( [key, value] ) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                            )
                        )
                    }
                </EquipmentSelect>
                <EquipmentInput type="number" value={enhance} placeholder="장비 강화 수치" onChange={ (e) => {onChangeValue("enhance", e.target.value);} }/>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 장비 등급 </EquipmentLabel>
                <EquipmentSelect value={grade} onChange={ (e) => {onChangeValue("grade", e.target.value);} }>
                    {
                        Object.entries( EquipGradeEnum ).map( ( [key, value]) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                        ))
                    }
                </EquipmentSelect>
                <EquipmentSubSelect value={level} onChange={ (e) => {onChangeValue("level", e.target.value);} }>
                    {
                        Object.entries( EquipLevelEnum ).map( ( [key, value]) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                        ))
                    }
                </EquipmentSubSelect>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 주 옵션 </EquipmentLabel>
                <EquipmentSelect value={mainOption} onChange={ (e) => {onChangeValue("mainOption", e.target.value);} }>
                    {
                        Object.entries( EquipOptionEnum ).map( ( [key, value]) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                        ))
                    }
                </EquipmentSelect>
                <EquipmentInput type="number" value={mainValue} placeholder="수치를 입력하세요" onChange={ (e) => { onChangeValue("mainValue", e.target.value); } }/>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 보조 옵션 1 </EquipmentLabel>
                <EquipmentSelect value={subOption1} onChange={ (e) => { onChangeValue("subOption1", e.target.value); } }>
                    {
                        Object.entries( EquipOptionEnum ).map( ( [key, value]) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                        ))
                    }
                </EquipmentSelect>
                <EquipmentInput type="number" value={subValue1} placeholder="수치를 입력하세요" onChange={ (e) => { onChangeValue("subValue1", e.target.value); } }/>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 보조 옵션 2 </EquipmentLabel>
                <EquipmentSelect value={subOption2} onChange={ (e) => {onChangeValue("subOption2", e.target.value);} }>
                    {
                        Object.entries( EquipOptionEnum ).map( ( [key, value]) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                        ))
                    }
                </EquipmentSelect>
                <EquipmentInput type="number" value={subValue2} placeholder="수치를 입력하세요" onChange={ (e) => { onChangeValue("subValue2", e.target.value); } }/>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 보조 옵션 3 </EquipmentLabel>
                <EquipmentSelect value={subOption3} onChange={ (e) => {onChangeValue("subOption3", e.target.value);} }>
                    <EquipmentOption value="NONE"> 없음 </EquipmentOption>
                    {
                        Object.entries( EquipOptionEnum ).map( ( [key, value]) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                        ))
                    }
                </EquipmentSelect>
                <EquipmentInput type="number" disabled={subOption3 === "NONE"} placeholder="수치를 입력하세요" value={subValue3}
                                onChange={ (e) => { onChangeValue("subValue3", e.target.value); } } />
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 보조 옵션 4 </EquipmentLabel>
                <EquipmentSelect value={subOption4} onChange={ (e) => {onChangeValue("subOption4", e.target.value);} } >
                    <EquipmentOption value="NONE"> 없음 </EquipmentOption>
                    {
                        Object.entries( EquipOptionEnum ).map( ( [key, value]) => (
                            <EquipmentOption value={key}> { value } </EquipmentOption>
                        ))
                    }
                </EquipmentSelect>
                <EquipmentInput type="number" disabled={subOption4 === "NONE"} placeholder="수치를 입력하세요" value={subValue4}
                                onChange={ (e) => { onChangeValue("subValue4", e.target.value); } }/>
            </EquipmentWrapper>
            <EquipmentWrapper>
                <ClearButton> 초기화 </ClearButton>
                <SubmitButton onClick={ () => changeEquipmentIcon()}> 적용 </SubmitButton>
            </EquipmentWrapper>
        </EquipmentContainer>
    );
});

export default InputEquipment;