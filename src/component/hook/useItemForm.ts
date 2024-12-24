import { useState } from "react";
import { EquipSet, EquipOption, Grade, Level } from "@/types/Equipment.ts";

interface EquipmentFormData {
    parts: string,
    setEffect: EquipSet,
    enhance: number,
    grade: Grade,
    level: Level,
    mainOption: EquipOption,
    mainValue: number,
    subOption1: EquipOption,
    subValue1: number,
    subOption2: EquipOption,
    subValue2: number,
    subOption3: EquipOption,
    subValue3: number,
    subOption4: EquipOption,
    subValue4: number,
}

interface ExclusiveItemFormData {
    option: EquipOption,
    value: number,
    num: number,
}

export const useItemForm = () => {
    const [ weaponFormData, setWeaponFormData ] = useState<EquipmentFormData>({
        parts: 'WEAPON',
        setEffect: "ATTACK",
        enhance: 0,
        grade: "EPIC",
        level: "F",
        mainOption: "ATTACK",
        mainValue: 0,
        subOption1: "NONE",
        subValue1: 0,
        subOption2: "NONE",
        subValue2: 0,
        subOption3: "NONE",
        subValue3: 0,
        subOption4: "NONE",
        subValue4: 0,
    })
    const [ helmetFormData, setHelmetFormData ] = useState<EquipmentFormData>({
        parts: 'HELMET',
        setEffect: "ATTACK",
        enhance: 0,
        grade: "EPIC",
        level: "F",
        mainOption: "HEALTH",
        mainValue: 0,
        subOption1: "NONE",
        subValue1: 0,
        subOption2: "NONE",
        subValue2: 0,
        subOption3: "NONE",
        subValue3: 0,
        subOption4: "NONE",
        subValue4: 0,
    })
    const [ armorFormData, setArmorFormData ] = useState<EquipmentFormData>({
        parts: 'ARMOR',
        setEffect: "ATTACK",
        enhance: 0,
        grade: "EPIC",
        level: "F",
        mainOption: "DEFENSE",
        mainValue: 0,
        subOption1: "NONE",
        subValue1: 0,
        subOption2: "NONE",
        subValue2: 0,
        subOption3: "NONE",
        subValue3: 0,
        subOption4: "NONE",
        subValue4: 0,
    })
    const [ necklaceFormData, setNecklaceFormData ] = useState<EquipmentFormData>({
        parts: 'NECKLACE',
        setEffect: "ATTACK",
        enhance: 0,
        grade: "EPIC",
        level: "F",
        mainOption: "NONE",
        mainValue: 0,
        subOption1: "NONE",
        subValue1: 0,
        subOption2: "NONE",
        subValue2: 0,
        subOption3: "NONE",
        subValue3: 0,
        subOption4: "NONE",
        subValue4: 0,
    })
    const [ ringFormData, setRingFormData ] = useState<EquipmentFormData>({
        parts: 'RING',
        setEffect: "ATTACK",
        enhance: 0,
        grade: "EPIC",
        level: "F",
        mainOption: "NONE",
        mainValue: 0,
        subOption1: "NONE",
        subValue1: 0,
        subOption2: "NONE",
        subValue2: 0,
        subOption3: "NONE",
        subValue3: 0,
        subOption4: "NONE",
        subValue4: 0,
    })
    const [ bootsFormData, setBootsFormData ] = useState<EquipmentFormData>({
        parts: 'BOOTS',
        setEffect: "ATTACK",
        enhance: 0,
        grade: "EPIC",
        level: "F",
        mainOption: "NONE",
        mainValue: 0,
        subOption1: "NONE",
        subValue1: 0,
        subOption2: "NONE",
        subValue2: 0,
        subOption3: "NONE",
        subValue3: 0,
        subOption4: "NONE",
        subValue4: 0,
    })
    const [ exclusiveFormData, setExclusiveFormData ] = useState<ExclusiveItemFormData>({
        option: "CRITICAL_HIT_CHANCE",
        value: 0,
        num: 1,
    })
    const [ artifact, setArtifact ] = useState("")

    const handleEquipmentChange = ( parts:string, name:string, value:string ) => {
        switch( parts ) {
            case "WEAPON" :
                setWeaponFormData( (prev) => ({ ...prev, [name]: value } ) )
                break;
            case "ARMOR" :
                setArmorFormData( (prev) => ({ ...prev, [name]: value } ) )
                break;
            case "HELMET" :
                setHelmetFormData( (prev) => ({ ...prev, [name]: value } ) )
                break;
            case "NECKLACE" :
                setNecklaceFormData( (prev) => ({ ...prev, [name]: value } ) )
                break;
            case "RING" :
                setRingFormData( (prev) => ({ ...prev, [name]: value } ) )
                break;
            case "BOOTS" :
                setBootsFormData( (prev) => ({ ...prev, [name]: value } ) )
                break;
        }
    }

    const handleExclusiveChange = ( name:string, value:string ) => {
        setExclusiveFormData( (prev) => ({ ...prev, [name]: value } ) )
    }

    const statValueValidate = ( option:EquipOption, value:number, level:Level, enhance: number, grade: Grade ) => {
        let maxIncrement;
        let max = 0;
        // 빈 옵션일 경우 스킵
        if( option === "NONE" ) return true;

        // 장비 레벨별 +3마다 올라가는 최대 수치값 지정
        if( level === "B" ){
            if( option === "ATTACK_PER" || option === "DEFENSE_PER" || option === "HEALTH_PER" || option === "EFFECT_RESISTANCE" || option === "EFFECTIVENESS" ) maxIncrement = 7;
            else if( option === "ATTACK" ) maxIncrement = 42;
            else if( option === "DEFENSE" ) maxIncrement = 30;
            else if( option === "HEALTH" ) maxIncrement = 180;
            else if( option === "CRITICAL_HIT_CHANCE" ) maxIncrement = 4;
            else if( option === "CRITICAL_HIT_DAMAGE" ) maxIncrement = 6;
            else if( option === "SPEED" ) maxIncrement = 4;
        }
        else if( level === "C" || level === "A" || level === "D" || level === "E" || level === "F" ) {
            if( option === "ATTACK_PER" || option === "DEFENSE_PER" || option === "HEALTH_PER" || option === "EFFECT_RESISTANCE" || option === "EFFECTIVENESS" ) maxIncrement = 8;
            else if( option === "ATTACK" ) maxIncrement = 47;
            else if( option === "DEFENSE" ) maxIncrement = 34;
            else if( option === "HEALTH" ) maxIncrement = 202;
            else if( option === "CRITICAL_HIT_CHANCE" ) maxIncrement = 5;
            else if( option === "CRITICAL_HIT_DAMAGE" ) maxIncrement = 7;
            else if( option === "SPEED" ) maxIncrement = 5;
        }
        else if( level === "G" ){
            if( option === "ATTACK_PER" || option === "DEFENSE_PER" || option === "HEALTH_PER" || option === "EFFECT_RESISTANCE" || option === "EFFECTIVENESS" ) maxIncrement = 9;
            else if( option === "ATTACK" ) maxIncrement = 50;
            else if( option === "DEFENSE" ) maxIncrement = 36;
            else if( option === "HEALTH" ) maxIncrement = 220;
            else if( option === "CRITICAL_HIT_CHANCE" ) maxIncrement = 6;
            else if( option === "CRITICAL_HIT_DAMAGE" ) maxIncrement = 8;
            else if( option === "SPEED" ) maxIncrement = 5;
        }
        else if( level === "H" ){
            if( enhance !== 15 ) return false;
            if( option === "ATTACK_PER" || option === "DEFENSE_PER" || option === "HEALTH_PER" || option === "EFFECT_RESISTANCE" || option === "EFFECTIVENESS" ) maxIncrement = 8;
            else if( option === "ATTACK" ) maxIncrement = 47;
            else if( option === "DEFENSE" ) maxIncrement = 34;
            else if( option === "HEALTH" ) maxIncrement = 202;
            else if( option === "CRITICAL_HIT_CHANCE" ) maxIncrement = 5;
            else if( option === "CRITICAL_HIT_DAMAGE" ) maxIncrement = 7;
            else if( option === "SPEED" ) maxIncrement = 5;
        }
        // 등급 및 강화별 최댓값 지정
        if( maxIncrement === null ){
            if( -1 < enhance && enhance < 4 ) max += maxIncrement;
            else if( 3 < enhance && enhance < 6 ) max += maxIncrement;
            else if( 5 < enhance && enhance < 9 ) max += maxIncrement;
            else if( 8 < enhance && enhance < 12 && grade !== "RARE" ) max += maxIncrement;
            else if( 11 < enhance && enhance < 15 && grade === "EPIC" ) max += maxIncrement;
            else if( enhance === 15 ) max += maxIncrement;
            else return false;
        }
        return !(value < 0 || value > max);

    }

    const isWeaponFormValid = () => {
        const {
            parts,
            setEffect,
            enhance,
            grade,
            level,
            mainOption,
            mainValue,
            subOption1,
            subValue1,
            subOption2,
            subValue2,
            subOption3,
            subValue3,
            subOption4,
            subValue4,
        } = weaponFormData;
        // 파트 위치 확인
        if( parts !== "WEAPON" ) return false;
        // 주스탯 확인
        if( mainOption !== "ATTACK" ) return false;
        // 강화 수치 유효성 검사
        if( enhance < 0 || enhance > 15 ) return false;
        return (
            setEffect &&
            enhance.toString().trim() !== '' &&
            grade &&
            level &&
            mainValue.toString().trim() !== '' &&
            subOption1 &&
            subOption2 &&
            subOption3 &&
            subOption4 &&
            subValue1.toString().trim() !== '' &&
            subValue2.toString().trim() !== '' &&
            subValue3.toString().trim() !== '' &&
            subValue4.toString().trim() !== ''
        )
    }

    const isHelmetFormValid = () => {
        const {
            parts,
            setEffect,
            enhance,
            grade,
            level,
            mainOption,
            mainValue,
            subOption1,
            subValue1,
            subOption2,
            subValue2,
            subOption3,
            subValue3,
            subOption4,
            subValue4,
        } = helmetFormData;
        return (
            parts === "HELMET" &&
            setEffect &&
            enhance.toString().trim() !== '' &&
            grade &&
            level &&
            mainOption === "HEALTH" &&
            mainValue.toString().trim() !== '' &&
            subOption1 &&
            subOption2 &&
            subOption3 &&
            subOption4 &&
            subValue1.toString().trim() !== '' &&
            subValue2.toString().trim() !== '' &&
            subValue3.toString().trim() !== '' &&
            subValue4.toString().trim() !== ''
        )
    }

    const isArmorFormValid = () => {
        const {
            parts,
            setEffect,
            enhance,
            grade,
            level,
            mainOption,
            mainValue,
            subOption1,
            subValue1,
            subOption2,
            subValue2,
            subOption3,
            subValue3,
            subOption4,
            subValue4,
        } = armorFormData;
        return (
            parts === "ARMOR" &&
            setEffect &&
            enhance.toString().trim() !== '' &&
            grade &&
            level &&
            mainOption === "DEFENSE" &&
            mainValue.toString().trim() !== '' &&
            subOption1 &&
            subOption2 &&
            subOption3 &&
            subOption4 &&
            subValue1.toString().trim() !== '' &&
            subValue2.toString().trim() !== '' &&
            subValue3.toString().trim() !== '' &&
            subValue4.toString().trim() !== ''
        )
    }

    const isNecklaceFormValid = () => {
        const {
            parts,
            setEffect,
            enhance,
            grade,
            level,
            mainOption,
            mainValue,
            subOption1,
            subValue1,
            subOption2,
            subValue2,
            subOption3,
            subValue3,
            subOption4,
            subValue4,
        } = necklaceFormData;
        return (
            parts === "NECKLACE" &&
            setEffect &&
            enhance.toString().trim() !== '' &&
            grade &&
            level &&
            mainOption &&
            mainValue.toString().trim() !== '' &&
            subOption1 &&
            subOption2 &&
            subOption3 &&
            subOption4 &&
            subValue1.toString().trim() !== '' &&
            subValue2.toString().trim() !== '' &&
            subValue3.toString().trim() !== '' &&
            subValue4.toString().trim() !== ''
        )
    }

    const isRingFormValid = () => {
        const {
            parts,
            setEffect,
            enhance,
            grade,
            level,
            mainOption,
            mainValue,
            subOption1,
            subValue1,
            subOption2,
            subValue2,
            subOption3,
            subValue3,
            subOption4,
            subValue4,
        } = ringFormData;
        return (
            parts === "RING" &&
            setEffect &&
            enhance.toString().trim() !== '' &&
            grade &&
            level &&
            mainOption &&
            mainValue.toString().trim() !== '' &&
            subOption1 &&
            subOption2 &&
            subOption3 &&
            subOption4 &&
            subValue1.toString().trim() !== '' &&
            subValue2.toString().trim() !== '' &&
            subValue3.toString().trim() !== '' &&
            subValue4.toString().trim() !== ''
        )
    }

    const isBootsFormValid = () => {
        const {
            parts,
            setEffect,
            enhance,
            grade,
            level,
            mainOption,
            mainValue,
            subOption1,
            subValue1,
            subOption2,
            subValue2,
            subOption3,
            subValue3,
            subOption4,
            subValue4,
        } = bootsFormData;
        return (
            parts === "BOOTS" &&
            setEffect &&
            enhance.toString().trim() !== '' &&
            grade &&
            level &&
            mainOption &&
            mainValue.toString().trim() !== '' &&
            subOption1 &&
            subOption2 &&
            subOption3 &&
            subOption4 &&
            subValue1.toString().trim() !== '' &&
            subValue2.toString().trim() !== '' &&
            subValue3.toString().trim() !== '' &&
            subValue4.toString().trim() !== ''
        )
    }
    return {
        weaponFormData,
        helmetFormData,
        armorFormData,
        necklaceFormData,
        ringFormData,
        bootsFormData,
        artifact,
        exclusiveFormData,
        handleEquipmentChange,
        handleExclusiveChange,
        setArtifact,
        isArmorFormValid,
        isRingFormValid,
        isBootsFormValid,
        isHelmetFormValid,
        isWeaponFormValid,
        isNecklaceFormValid,
        statValueValidate
    }
}