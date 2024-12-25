import {
    Container,
    PageWrapper,
    CardContainer,
    SelectContainer,
    AnnouncementContainer,
    AnnouncementCard,
    SelectCard,
    HeroCard,
    InputCard,
    HeroImage,
    InputTitle,
    SelectBox,
    Option,
    InputGroup,
    ItemContainer,
    SpecialItemWrapper,
    EquipmentItemWrapper,
    SkillWrapper,
    EquipmentItemBlank,
    ArtifactBlank,
    ExclusiveItemBlank,
    SkillIcon,
    SkillSet,
    SkillLevelLabel,
    SkillLevelOption,
    DefaultInputBox,
    EquipmentItemImage,
    EquipmentItemGradeImage,
    EquipmentItemShowWrapper,
    AnnouncementText,
    ResultContainer,
    HeroStatResultCard,
    EstimateResultCard,
    StatResultWrapper,
    StatResultLabel,
    StatResultValueLabel,
    SetEffectLabel,
    SetEffectWrapper,
    SetEffectValueLabel,
    EstimateEquipmentContainer,
    EstimateHeroContainer,
    EstimateEquipmentWrapper,
    EstimateEquipmentIcon,
    EstimateEquipmentDescription,
    EstimateEquipmentImage,
    EstimateEquipmentDescriptionLabel,
    EstimateEquipmentDescriptionValueLabel,
    EstimateEquipmentRow,
    EstimateEquipmentGradeImage,
    EstimateEquipmentDescriptionLine,
    DescriptionLine,
    ItemEstimatedGradeLabel,
    EstimateHeroIcon,
    EstimateHeroImage,
    EstimateHeroGrade,
    EstimateHeroScore,
    CheckBox,
    SubSelectBox, CheckBoxLabel, SubInputGroup, EquipmentOption,
} from "@/style/Style_EstimateHeroPage.ts";
import InputEquipment, { Ref } from '@/component/InputCard/InputEquipment.tsx'
import InputExclusiveItem from "@/component/InputCard/InputExclusiveItem.tsx";
import InputArtifact from "@/component/InputCard/InputArtifact.tsx";

import { useItemForm } from "@/component/hook/useItemForm.ts";
import { HeroStatEnum} from "@/types/Hero.ts";

import {useEffect, useRef, useState} from "react";
import {HeroShow, retrieveAllHero, retrieveBaseStat} from "@/service/api/heroApi.ts";
import {EquipmentApplyStat, EquipSetEnum} from "@/types/Equipment.ts";

import { estimateEquipment } from "@/service/estimateService.ts";

const EstimateHeroPage = () => {
    const [ item, setItem ] = useState("none");

    // 장비 아이콘 설정을 위한 변수
    // [ 등급( 희귀, 영웅, 전설 ), 토벌명( 와이번, 벤시 등 ), 입력 여부 ]
    const [ weaponIcon, setWeaponIcon ] = useState(["none", "none", false ]);
    const [ helmetIcon, setHelmetIcon ] = useState(["none", "none", false ]);
    const [ armorIcon, setArmorIcon ] = useState(["none", "none", false ]);
    const [ necklaceIcon, setNecklaceIcon ] = useState(["none", "none", false ]);
    const [ ringIcon, setRingIcon ] = useState(["none", "none", false ]);
    const [ bootsIcon, setBootsIcon ] = useState(["none", "none", false ]);

    // 사용자 설정된 장비  스탯 정보
    const [ weapon, setWeapon ] = useState<EquipmentApplyStat>()
    const [ helmet, setHelmet ] = useState<EquipmentApplyStat>()
    const [ armor, setArmor ] = useState<EquipmentApplyStat>()
    const [ necklace, setNecklace ] = useState<EquipmentApplyStat>()
    const [ ring, setRing ] = useState<EquipmentApplyStat>()
    const [ boots, setBoots ] = useState<EquipmentApplyStat>()

    const [ weaponGrade, setWeaponGrade ] = useState<string | undefined>("-")
    const [ helmetGrade, setHelmetGrade ] = useState<string | undefined>("-")
    const [armorGrade, setArmorGrade ] = useState<string | undefined>("-")
    const [necklaceGrade, setNecklaceGrade ] = useState<string | undefined>("-")
    const [ringGrade, setRingGrade ] = useState<string | undefined>("-")
    const [bootsGrade, setBootsGrade ] = useState<string | undefined>("-")

    // 화면에 표시되는 스탯
    // [ 베이스 스탯, 장비 옵션 적용 스탯 ]
    const [ attack, setAttack ] = useState([0, 0]);
    const [ defense, setDefense ] = useState([0, 0]);
    const [ health, setHealth ] = useState([0, 0]);
    const [ criticalChance, setCriticalChance ] = useState([0, 0]);
    const [ criticalDamage, setCriticalDamage ] = useState([0, 0]);
    const [ speed, setSpeed ] = useState([0, 0]);
    const [ effectiveness, setEffectiveness ] = useState([0, 0]);
    const [ effectResistance, setEffectResistance ] = useState([0, 0]);
    const [ dualAttackChance, setDualAttackChance ] = useState([0, 0]);

    // 영웅 목록
    const [ heros, setHeros ] = useState<HeroShow[]>([]);
    // 로딩 여부
    const [ isLoading, setIsLoading ] = useState(false);

    // 타 파일에서 함수 사용을 위한 Ref
    const ref = useRef<Ref>(null);

    const {
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
    } = useItemForm();

    // 화면 컨트롤 함수
    //  입력 카드 변경 함수
    const changeInputCard = ( itemType:string ) => {
        setItem(itemType);
        setTimeout(() => {
            ref.current?.settingInputCard();
        }, 0);
    }
    //  장비 아이콘 변경 함수
    const handleEquipmentIconChange = (itemType: string) => {
        const equipGrade = itemType.split( "_" )[0]
        const equipHunt = itemType.split( "_" )[1]
        const equipType = itemType.split( "_" )[2]

        if( equipType === "WEAPON" ) setWeaponIcon( [ "equip_" + equipGrade.toLowerCase() + ".png", equipHunt.toLowerCase() + "_weapon.png", true ] );
        if( equipType === "HELMET" ) setHelmetIcon( [ "equip_" + equipGrade.toLowerCase() + ".png", equipHunt.toLowerCase() + "_helmet.png", true ] );
        if( equipType === "ARMOR" ) setArmorIcon( [ "equip_" + equipGrade.toLowerCase() + ".png", equipHunt.toLowerCase() + "_armor.png", true ] );
        if( equipType === "NECKLACE" ) setNecklaceIcon( [ "equip_" + equipGrade.toLowerCase() + ".png", equipHunt.toLowerCase() + "_necklace.png", true ] );
        if( equipType === "RING" ) setRingIcon( [ "equip_" + equipGrade.toLowerCase() + ".png", equipHunt.toLowerCase() + "_ring.png", true ] );
        if( equipType === "BOOTS" ) setBootsIcon( [ "equip_" + equipGrade.toLowerCase() + ".png", equipHunt.toLowerCase() + "_boots.png", true ] );
    };

    // 장비 스탯 지정 함수
    const applyEquipmentStat = () => {
        switch( item ){
            case "weapon":
                setWeapon({
                    mainOption: weaponFormData.mainOption,
                    mainValue: weaponFormData.mainValue,
                    subOption1: weaponFormData.subOption1,
                    subOption2: weaponFormData.subOption2,
                    subOption3: weaponFormData.subOption3,
                    subOption4: weaponFormData.subOption4,
                    subValue1: weaponFormData.subOption1.includes("_PER")
                        ? calculatePercentValue(weaponFormData.subOption1.split("_")[0], weaponFormData.subValue1)
                        : weaponFormData.subValue1,
                    subValue2: weaponFormData.subOption2.includes("_PER")
                        ? calculatePercentValue(weaponFormData.subOption2.split("_")[0], weaponFormData.subValue2)
                        : weaponFormData.subValue2,
                    subValue3: weaponFormData.subOption3.includes("_PER")
                        ? calculatePercentValue(weaponFormData.subOption3.split("_")[0], weaponFormData.subValue3)
                        : weaponFormData.subValue3,
                    subValue4: weaponFormData.subOption4.includes("_PER")
                        ? calculatePercentValue(weaponFormData.subOption4.split("_")[0], weaponFormData.subValue4)
                        : weaponFormData.subValue4,
                });
                break;
            case "helmet":
                setHelmet({
                    mainOption: helmetFormData.mainOption,
                    mainValue: helmetFormData.mainValue,
                    subOption1: helmetFormData.subOption1,
                    subOption2: helmetFormData.subOption2,
                    subOption3: helmetFormData.subOption3,
                    subOption4: helmetFormData.subOption4,
                    subValue1: helmetFormData.subOption1.includes("_PER")
                        ? calculatePercentValue(helmetFormData.subOption1.split("_")[0], helmetFormData.subValue1)
                        : helmetFormData.subValue1,
                    subValue2: helmetFormData.subOption2.includes("_PER")
                        ? calculatePercentValue(helmetFormData.subOption2.split("_")[0], helmetFormData.subValue2)
                        : helmetFormData.subValue2,
                    subValue3: helmetFormData.subOption3.includes("_PER")
                        ? calculatePercentValue(helmetFormData.subOption3.split("_")[0], helmetFormData.subValue3)
                        : helmetFormData.subValue3,
                    subValue4: helmetFormData.subOption4.includes("_PER")
                        ? calculatePercentValue(helmetFormData.subOption4.split("_")[0], helmetFormData.subValue4)
                        : helmetFormData.subValue4,
                });
                break;
            case "armor":
                setArmor({
                    mainOption: armorFormData.mainOption,
                    mainValue: armorFormData.mainValue,
                    subOption1: armorFormData.subOption1,
                    subOption2: armorFormData.subOption2,
                    subOption3: armorFormData.subOption3,
                    subOption4: armorFormData.subOption4,
                    subValue1: armorFormData.subOption1.includes("_PER")
                        ? calculatePercentValue(armorFormData.subOption1.split("_")[0], armorFormData.subValue1)
                        : armorFormData.subValue1,
                    subValue2: armorFormData.subOption2.includes("_PER")
                        ? calculatePercentValue(armorFormData.subOption2.split("_")[0], armorFormData.subValue2)
                        : armorFormData.subValue2,
                    subValue3: armorFormData.subOption3.includes("_PER")
                        ? calculatePercentValue(armorFormData.subOption3.split("_")[0], armorFormData.subValue3)
                        : armorFormData.subValue3,
                    subValue4: armorFormData.subOption4.includes("_PER")
                        ? calculatePercentValue(armorFormData.subOption4.split("_")[0], armorFormData.subValue4)
                        : armorFormData.subValue4,
                });
                break;
            case "necklace":
                setNecklace({
                    mainOption: necklaceFormData.mainOption,
                    mainValue: necklaceFormData.mainValue,
                    subOption1: necklaceFormData.subOption1,
                    subOption2: necklaceFormData.subOption2,
                    subOption3: necklaceFormData.subOption3,
                    subOption4: necklaceFormData.subOption4,
                    subValue1: necklaceFormData.subOption1.includes("_PER")
                        ? calculatePercentValue(necklaceFormData.subOption1.split("_")[0], necklaceFormData.subValue1)
                        : necklaceFormData.subValue1,
                    subValue2: necklaceFormData.subOption2.includes("_PER")
                        ? calculatePercentValue(necklaceFormData.subOption2.split("_")[0], necklaceFormData.subValue2)
                        : necklaceFormData.subValue2,
                    subValue3: necklaceFormData.subOption3.includes("_PER")
                        ? calculatePercentValue(necklaceFormData.subOption3.split("_")[0], necklaceFormData.subValue3)
                        : necklaceFormData.subValue3,
                    subValue4: necklaceFormData.subOption4.includes("_PER")
                        ? calculatePercentValue(necklaceFormData.subOption4.split("_")[0], necklaceFormData.subValue4)
                        : necklaceFormData.subValue4,
                });
                break;
            case "ring":
                setRing({
                    mainOption: ringFormData.mainOption,
                    mainValue: ringFormData.mainValue,
                    subOption1: ringFormData.subOption1,
                    subOption2: ringFormData.subOption2,
                    subOption3: ringFormData.subOption3,
                    subOption4: ringFormData.subOption4,
                    subValue1: ringFormData.subOption1.includes("_PER")
                        ? calculatePercentValue(ringFormData.subOption1.split("_")[0], ringFormData.subValue1)
                        : ringFormData.subValue1,
                    subValue2: ringFormData.subOption2.includes("_PER")
                        ? calculatePercentValue(ringFormData.subOption2.split("_")[0], ringFormData.subValue2)
                        : ringFormData.subValue2,
                    subValue3: ringFormData.subOption3.includes("_PER")
                        ? calculatePercentValue(ringFormData.subOption3.split("_")[0], ringFormData.subValue3)
                        : ringFormData.subValue3,
                    subValue4: ringFormData.subOption4.includes("_PER")
                        ? calculatePercentValue(ringFormData.subOption4.split("_")[0], ringFormData.subValue4)
                        : ringFormData.subValue4,
                });
                break;
            case "boots":
                setBoots({
                    mainOption: bootsFormData.mainOption,
                    mainValue: bootsFormData.mainValue,
                    subOption1: bootsFormData.subOption1,
                    subOption2: bootsFormData.subOption2,
                    subOption3: bootsFormData.subOption3,
                    subOption4: bootsFormData.subOption4,
                    subValue1: bootsFormData.subOption1.includes("_PER")
                        ? calculatePercentValue(bootsFormData.subOption1.split("_")[0], bootsFormData.subValue1)
                        : bootsFormData.subValue1,
                    subValue2: bootsFormData.subOption2.includes("_PER")
                        ? calculatePercentValue(bootsFormData.subOption2.split("_")[0], bootsFormData.subValue2)
                        : bootsFormData.subValue2,
                    subValue3: bootsFormData.subOption3.includes("_PER")
                        ? calculatePercentValue(bootsFormData.subOption3.split("_")[0], bootsFormData.subValue3)
                        : bootsFormData.subValue3,
                    subValue4: bootsFormData.subOption4.includes("_PER")
                        ? calculatePercentValue(bootsFormData.subOption4.split("_")[0], bootsFormData.subValue4)
                        : bootsFormData.subValue4,
                });
                break;
        }
    }
    // 비율 스탯 계산 함수
    const calculatePercentValue = ( option:string, value:number ) => {
        switch( option ){
            case "ATTACK":
                return Math.floor( attack[0] * ( value / 100 ) )
            case "HEALTH":
                return Math.floor( health[0] * ( value / 100 ) )
            case "DEFENSE":
                return Math.floor( defense[0] * ( value / 100 ) )
            default:
                return 0
        }
    }

    // API를 통한 영웅 목록 조회
    useEffect( () => {
        const fetchHero = async () => {
            setIsLoading(true)
            try {
                const response = await retrieveAllHero( 0, 20 )
                setHeros( response.content )
            } catch( err ){
                console.error( err )
            } finally {
                setIsLoading(false)
            }
        }
        fetchHero()
    }, [ 0, 20 ] )

    // 장비 변경 감지
    useEffect(() => {
        console.log( "CHANGED" )
    }, [weapon, helmet, armor, necklace, ring, boots]);

    // 장비의 옵션 적용
    useEffect(() => {
        const equipList = [weapon, helmet, armor, necklace, ring, boots];
        let attackIncrease = 0;
        let defenseIncrease = 0;
        let healthIncrease = 0;
        let criticalChanceIncrease = 0;
        let criticalDamageIncrease = 0;
        let effectivenessIncrease = 0;
        let effectResistanceIncrease = 0;
        let speedIncrease = 0;

        console.log( helmet )

        equipList.forEach(equip => {
            if (equip) {
                // 주 옵션
                if (equip.mainOption.includes("ATTACK")) attackIncrease += Number(equip.mainValue);
                else if (equip.mainOption.includes("DEFENSE")) defenseIncrease += Number(equip.mainValue);
                else if (equip.mainOption.includes("HEALTH")) healthIncrease += Number(equip.mainValue);
                else if (equip.mainOption === "CRITICAL_HIT_CHANCE") criticalChanceIncrease += Number(equip.mainValue);
                else if (equip.mainOption === "CRITICAL_HIT_DAMAGE") criticalDamageIncrease += Number(equip.mainValue);
                else if (equip.mainOption === "EFFECTIVENESS") effectivenessIncrease += Number(equip.mainValue);
                else if (equip.mainOption === "EFFECT_RESISTANCE") effectResistanceIncrease += Number(equip.mainValue);
                else if (equip.mainOption === "SPEED") speedIncrease += Number(equip.mainValue);

                // 보조 옵션 1
                if (equip.subOption1.includes("ATTACK")) attackIncrease += Number(equip.subValue1);
                else if (equip.subOption1.includes("DEFENSE")) defenseIncrease += Number(equip.subValue1);
                else if (equip.subOption1.includes("HEALTH")) healthIncrease += Number(equip.subValue1);
                else if (equip.subOption1 === "CRITICAL_HIT_CHANCE") criticalChanceIncrease += Number(equip.subValue1);
                else if (equip.subOption1 === "CRITICAL_HIT_DAMAGE") criticalDamageIncrease += Number(equip.subValue1);
                else if (equip.subOption1 === "EFFECTIVENESS") effectivenessIncrease += Number(equip.subValue1);
                else if (equip.subOption1 === "EFFECT_RESISTANCE") effectResistanceIncrease += Number(equip.subValue1);
                else if (equip.subOption1 === "SPEED") speedIncrease += Number(equip.subValue1);

                // 보조 옵션 2
                if (equip.subOption2.includes("ATTACK")) attackIncrease += Number(equip.subValue2);
                else if (equip.subOption2.includes("DEFENSE")) defenseIncrease += Number(equip.subValue2);
                else if (equip.subOption2.includes("HEALTH")) healthIncrease += Number(equip.subValue2);
                else if (equip.subOption2 === "CRITICAL_HIT_CHANCE") criticalChanceIncrease += Number(equip.subValue2);
                else if (equip.subOption2 === "CRITICAL_HIT_DAMAGE") criticalDamageIncrease += Number(equip.subValue2);
                else if (equip.subOption2 === "EFFECTIVENESS") effectivenessIncrease += Number(equip.subValue2);
                else if (equip.subOption2 === "EFFECT_RESISTANCE") effectResistanceIncrease += Number(equip.subValue2);
                else if (equip.subOption2 === "SPEED") speedIncrease += Number(equip.subValue2);

                // 보조 옵션 3
                if (equip.subOption3.includes("ATTACK")) attackIncrease += Number(equip.subValue3);
                else if (equip.subOption3.includes("DEFENSE")) defenseIncrease += Number(equip.subValue3);
                else if (equip.subOption1.includes("HEALTH")) healthIncrease += Number(equip.subValue3);
                else if (equip.subOption1 === "CRITICAL_HIT_CHANCE") criticalChanceIncrease += Number(equip.subValue3);
                else if (equip.subOption3 === "CRITICAL_HIT_DAMAGE") criticalDamageIncrease += Number(equip.subValue3);
                else if (equip.subOption3 === "EFFECTIVENESS") effectivenessIncrease += Number(equip.subValue3);
                else if (equip.subOption3 === "EFFECT_RESISTANCE") effectResistanceIncrease += Number(equip.subValue3);
                else if (equip.subOption3 === "SPEED") speedIncrease += Number(equip.subValue3);

                // 보조 옵션 1
                if (equip.subOption4.includes("ATTACK")) attackIncrease += Number(equip.subValue4);
                else if (equip.subOption4.includes("DEFENSE")) defenseIncrease += Number(equip.subValue4);
                else if (equip.subOption4.includes("HEALTH")) healthIncrease += Number(equip.subValue4);
                else if (equip.subOption4 === "CRITICAL_HIT_CHANCE") criticalChanceIncrease += Number(equip.subValue4);
                else if (equip.subOption4 === "CRITICAL_HIT_DAMAGE") criticalDamageIncrease += Number(equip.subValue4);
                else if (equip.subOption4 === "EFFECTIVENESS") effectivenessIncrease += Number(equip.subValue4);
                else if (equip.subOption4 === "EFFECT_RESISTANCE") effectResistanceIncrease += Number(equip.subValue4);
                else if (equip.subOption4 === "SPEED") speedIncrease += Number(equip.subValue4);

                console.log( healthIncrease )
            }
        });

        setAttack([attack[0], attack[0] + Number(attackIncrease)]);
        setDefense([defense[0], defense[0] + Number(defenseIncrease)]);
        setHealth([health[0], health[0] + Number(healthIncrease)]);
        setSpeed([speed[0], speed[0] + Number(speedIncrease)]);
        setCriticalChance([criticalChance[0], criticalChance[0] + Number(criticalChanceIncrease)]);
        setCriticalDamage([criticalDamage[0], criticalDamage[0] + Number(criticalDamageIncrease)]);
        setEffectiveness([effectiveness[0], effectiveness[0] + Number(effectivenessIncrease)]);
        setEffectResistance([effectResistance[0], effectResistance[0] + Number(effectResistanceIncrease)]);
        
        // 등급 산출
        if( item === "weapon" ) setWeaponGrade( estimateEquipment(weaponFormData) )
        else if( item === "helmet" ) setHelmetGrade( estimateEquipment(helmetFormData) )
        else if( item === "armor" ) setArmorGrade( estimateEquipment(armorFormData) )
        else if( item === "necklace" ) setNecklaceGrade( estimateEquipment(necklaceFormData) )
        else if( item === "ring" ) setRingGrade( estimateEquipment(ringFormData) )
        else if( item === "boots" ) setBootsGrade( estimateEquipment(bootsFormData) )

    }, [weapon, helmet, armor, necklace, ring, boots, weaponGrade, helmetGrade, armorGrade, necklaceGrade, ringGrade, bootsGrade ]);

    // [ 기본 스탯, 장비 적용 스탯 ]
    const settingBaseStat = async ( heroID:number ) => {
        const response = await retrieveBaseStat( heroID )
        setAttack( [ response.attack, response.attack ] )
        setDefense( [ response.defense, response.defense ] )
        setHealth( [ response.health, response.health ] )
        setSpeed( [ response.speed, response.speed ] )
        setCriticalChance( [ response.criticalHitChance, response.criticalHitChance ] )
        setCriticalDamage( [ response.criticalHitDamage, response.criticalHitDamage ] )
        setEffectiveness( [ response.effectiveness, response.effectiveness ] )
        setEffectResistance( [ response.effectResistance, response.effectResistance ] )
        setDualAttackChance( [ response.dualAttackChance, response.dualAttackChance ] )
    }

    return (
        <Container>
            <PageWrapper>
                <AnnouncementContainer>
                    <AnnouncementCard>
                        <AnnouncementText> * 영웅 레벨은 각 등급별 만렙을 기준으로 측정됩니다. </AnnouncementText>
                        <AnnouncementText> * 영웅은 모두 6성 6각을 기준으로 측정됩니다. </AnnouncementText>
                        <AnnouncementText> * 장비 이미지는 모두 90레벨 제련템으로 표시되지만 실제 능력치는 입력한 값으로 적용됩니다. </AnnouncementText>
                    </AnnouncementCard>
                </AnnouncementContainer>
                <SelectContainer>
                    <SelectCard>
                        <InputGroup>
                            <InputTitle> 태생 등급 </InputTitle>
                            <SelectBox>
                                <Option value="3" > ⭐⭐⭐ </Option>
                                <Option value="4"> ⭐⭐⭐⭐ </Option>
                                <Option value="5" > ⭐⭐⭐⭐⭐ </Option>
                            </SelectBox>
                        </InputGroup>

                        <InputGroup>
                            <InputTitle> 영웅 </InputTitle>
                            <SelectBox onChange={ (e) => settingBaseStat(Number(e.target.value) ) }>
                                {
                                    heros.map( ( hero ) => (
                                        <EquipmentOption key={hero.id} value={hero.id}> { hero.name } </EquipmentOption>
                                    ))
                                }
                            </SelectBox>
                        </InputGroup>

                        <SubInputGroup>
                            <InputTitle> 기억각인 </InputTitle>
                            <CheckBox value="RELEASE" type="radio"/>
                            <CheckBoxLabel> 각인 해방 </CheckBoxLabel>
                            <CheckBox value="CONCENTRATION" type="radio"/>
                            <CheckBoxLabel> 각인 집중 </CheckBoxLabel>
                            <SubSelectBox>
                                <Option value="F" > 잠김 </Option>
                                <Option value="D" > D </Option>
                                <Option value="C" > C </Option>
                                <Option value="B" > B </Option>
                                <Option value="A" > A </Option>
                                <Option value="S" > S </Option>
                                <Option value="SS" > SS </Option>
                                <Option value="SSS" > SSS </Option>
                            </SubSelectBox>
                        </SubInputGroup>
                    </SelectCard>
                </SelectContainer>
                <CardContainer>
                    <HeroCard>
                        { /* 추후 선택한 영웅에 맞는 이미지로 변경되도록 수정 */ }
                        <HeroImage src = '/src/assets/sylvan_sage_vivian_stand.png' />
                        <ItemContainer>
                            <SpecialItemWrapper>
                                <ExclusiveItemBlank onClick={ () => { changeInputCard("exclusive")} }></ExclusiveItemBlank>
                                <ArtifactBlank onClick={ () => { changeInputCard("artifact")} }></ArtifactBlank>
                            </SpecialItemWrapper>
                            <EquipmentItemWrapper>
                                <EquipmentItemBlank $isFilled={weaponIcon[2] as boolean} id="equip_icon_weapon" onClick={ () => { changeInputCard("weapon")} } >
                                    { weaponIcon[0] === "none" && "무기" }
                                    {
                                        weaponIcon[0] !== "none" &&
                                        <EquipmentItemShowWrapper>
                                            <EquipmentItemImage src={'/src/assets/' + weaponIcon[1] }/>
                                            <EquipmentItemGradeImage src={'/src/assets/' + weaponIcon[0] }/>
                                        </EquipmentItemShowWrapper>
                                    }
                                </EquipmentItemBlank>
                                <EquipmentItemBlank $isFilled={necklaceIcon[2] as boolean} onClick={ () => { changeInputCard("necklace")} } >
                                    { necklaceIcon[0] === "none" && "목걸이" }
                                    {
                                        necklaceIcon[0] !== "none" &&
                                        <EquipmentItemShowWrapper>
                                            <EquipmentItemImage src={'/src/assets/' + necklaceIcon[1] } />
                                            <EquipmentItemGradeImage src={'/src/assets/' + necklaceIcon[0] }/>
                                        </EquipmentItemShowWrapper>
                                    }
                                </EquipmentItemBlank>
                                <EquipmentItemBlank $isFilled={helmetIcon[2] as boolean} onClick={ () => { changeInputCard("helmet")} } >
                                    { helmetIcon[0] === "none" && "투구" }
                                    {
                                        helmetIcon[0] !== "none" &&
                                        <EquipmentItemShowWrapper>
                                            <EquipmentItemImage src={'/src/assets/' + helmetIcon[1] } />
                                            <EquipmentItemGradeImage src={'/src/assets/' + helmetIcon[0] }/>
                                        </EquipmentItemShowWrapper>
                                    }
                                </EquipmentItemBlank>
                                <EquipmentItemBlank $isFilled={ringIcon[2] as boolean} onClick={ () => { changeInputCard("ring")} } >
                                    { ringIcon[0] === "none" && "반지" }
                                    {
                                        ringIcon[0] !== "none" &&
                                        <EquipmentItemShowWrapper>
                                            <EquipmentItemImage src={'/src/assets/' + ringIcon[1] } />
                                            <EquipmentItemGradeImage src={'/src/assets/' + ringIcon[0] }/>
                                        </EquipmentItemShowWrapper>
                                    }
                                </EquipmentItemBlank>
                                <EquipmentItemBlank $isFilled={armorIcon[2] as boolean} onClick={ () => { changeInputCard("armor")} } >
                                    { armorIcon[0] === "none" && "갑옷" }
                                    {
                                        armorIcon[0] !== "none" &&
                                        <EquipmentItemShowWrapper>
                                            <EquipmentItemImage src={'/src/assets/' + armorIcon[1] } />
                                            <EquipmentItemGradeImage src={'/src/assets/' + armorIcon[0] }/>
                                        </EquipmentItemShowWrapper>
                                    }
                                </EquipmentItemBlank>
                                <EquipmentItemBlank $isFilled={bootsIcon[2] as boolean} onClick={ () => { changeInputCard("boots")} } >
                                    { bootsIcon[0] === "none" && "신발" }
                                    {
                                        bootsIcon[0] !== "none" &&
                                        <EquipmentItemShowWrapper>
                                            <EquipmentItemImage src={'/src/assets/' + bootsIcon[1] } />
                                            <EquipmentItemGradeImage src={'/src/assets/' + bootsIcon[0] }/>
                                        </EquipmentItemShowWrapper>
                                    }
                                </EquipmentItemBlank>
                            </EquipmentItemWrapper>
                            <SkillWrapper>
                                {/* 추후 영웅에 맞는 스킬 이미지 및 선택 가능한 수치를 해당 스킬의 최대 레벨까지 지정할 수 있도록 수정 예정 */}
                                <SkillSet>
                                    <SkillIcon src="/src/assets/skill1.png"/>
                                    <SkillLevelLabel>
                                        <SkillLevelOption> + 1 </SkillLevelOption>
                                        <SkillLevelOption> + 2 </SkillLevelOption>
                                        <SkillLevelOption> + 3 </SkillLevelOption>
                                        <SkillLevelOption> + 4 </SkillLevelOption>
                                        <SkillLevelOption> + 5 </SkillLevelOption>
                                    </SkillLevelLabel>
                                </SkillSet>
                                <SkillSet>
                                    <SkillIcon src="/src/assets/skill2.png"/>
                                    <SkillLevelLabel>
                                        <SkillLevelOption> + 1 </SkillLevelOption>
                                        <SkillLevelOption> + 2 </SkillLevelOption>
                                        <SkillLevelOption> + 3 </SkillLevelOption>
                                        <SkillLevelOption> + 4 </SkillLevelOption>
                                        <SkillLevelOption> + 5 </SkillLevelOption>
                                    </SkillLevelLabel>
                                </SkillSet>
                                <SkillSet>
                                    <SkillIcon src="/src/assets/skill3.png"/>
                                    <SkillLevelLabel>
                                        <SkillLevelOption> + 1 </SkillLevelOption>
                                        <SkillLevelOption> + 2 </SkillLevelOption>
                                        <SkillLevelOption> + 3 </SkillLevelOption>
                                        <SkillLevelOption> + 4 </SkillLevelOption>
                                        <SkillLevelOption> + 5 </SkillLevelOption>
                                    </SkillLevelLabel>
                                </SkillSet>
                            </SkillWrapper>
                        </ItemContainer>
                    </HeroCard>
                    <InputCard>
                        { item === "none" && <DefaultInputBox> 장비를 선택해주세요. </DefaultInputBox> }
                        { item === "artifact" && <InputArtifact />}
                        { item === "exclusive" && <InputExclusiveItem />}
                        { item === "weapon" && <InputEquipment ref={ref} heroStatUpdate={applyEquipmentStat} onChangeIcon={handleEquipmentIconChange} formData={weaponFormData} handleChange={handleEquipmentChange} itemType="weapon"/>}
                        { item === "helmet" && <InputEquipment ref={ref} heroStatUpdate={applyEquipmentStat} onChangeIcon={handleEquipmentIconChange} formData={helmetFormData} handleChange={handleEquipmentChange} itemType="helmet"/>}
                        { item === "armor" && <InputEquipment ref={ref} heroStatUpdate={applyEquipmentStat} onChangeIcon={handleEquipmentIconChange} formData={armorFormData} handleChange={handleEquipmentChange} itemType="armor"/>}
                        { item === "necklace" && <InputEquipment ref={ref} heroStatUpdate={applyEquipmentStat} onChangeIcon={handleEquipmentIconChange} formData={necklaceFormData} handleChange={handleEquipmentChange} itemType="necklace"/>}
                        { item === "ring" && <InputEquipment ref={ref} heroStatUpdate={applyEquipmentStat} onChangeIcon={handleEquipmentIconChange} formData={ringFormData} handleChange={handleEquipmentChange} itemType="ring"/>}
                        { item === "boots" && <InputEquipment ref={ref} heroStatUpdate={applyEquipmentStat} onChangeIcon={handleEquipmentIconChange} formData={bootsFormData} handleChange={handleEquipmentChange} itemType="boots"/>}
                    </InputCard>
                </CardContainer>
                <ResultContainer>
                    <HeroStatResultCard>
                        {
                            Object.entries( HeroStatEnum ).map( ( [key, value] ) => (
                                    <StatResultWrapper key={ "STAT_WRAPPER_" + key }>
                                        <StatResultLabel key={ "STAT_NAME_LABEL_" + key }> { value } </StatResultLabel>
                                        <StatResultValueLabel key={ "LABEL_" + key }>
                                            {   key === "ATTACK" ? attack[1] :
                                                key === "DEFENSE" ? defense[1] :
                                                key === "HEALTH" ? health[1] :
                                                key === "SPEED" ? speed[1] :
                                                key === "CRITICAL_HIT_CHANCE" ? criticalChance[1] :
                                                key === "CRITICAL_HIT_DAMAGE" ? criticalDamage[1] :
                                                key === "EFFECTIVENESS" ? effectiveness[1] :
                                                key === "EFFECT_RESISTANCE" ? effectResistance[1] :
                                                key === "DUAL_ATTACK_CHANCE" ? dualAttackChance[1] : 0
                                            }
                                        </StatResultValueLabel>
                                    </StatResultWrapper>
                                )
                            )
                        }
                        <StatResultWrapper>
                            {/* 추후 입력한 정보에 따라 변경되도록 수정 예정  */}
                            <SetEffectLabel> 세트효과 </SetEffectLabel>
                            <SetEffectWrapper>
                                <SetEffectValueLabel> 속도의 세트 </SetEffectValueLabel>
                                <SetEffectValueLabel> 적중의 세트 </SetEffectValueLabel>
                                <SetEffectValueLabel> 없음 </SetEffectValueLabel>
                            </SetEffectWrapper>
                        </StatResultWrapper>
                    </HeroStatResultCard>
                    <EstimateResultCard>
                        <EstimateEquipmentContainer>
                            <EstimateEquipmentWrapper>
                                <EstimateEquipmentRow>
                                    <EstimateEquipmentIcon>
                                        { weaponIcon[2] ? <EstimateEquipmentImage src={ '/src/assets/' + weaponIcon[1] } /> : <EstimateEquipmentImage src={ '/src/assets/golem_weapon.png' } />}
                                        { weaponIcon[2] ? <EstimateEquipmentGradeImage src={ '/src/assets/' + weaponIcon[0]} /> : <EstimateEquipmentGradeImage src={ '/src/assets/equip_epic.png'} />}
                                        {weaponGrade === "C" && <ItemEstimatedGradeLabel color={"green"}> { weaponGrade } </ItemEstimatedGradeLabel>}
                                        {weaponGrade === "B" && <ItemEstimatedGradeLabel color={"blue"}> { weaponGrade } </ItemEstimatedGradeLabel>}
                                        {weaponGrade === "A" && <ItemEstimatedGradeLabel color={"purple"}> { weaponGrade } </ItemEstimatedGradeLabel>}
                                        {weaponGrade === "S" && <ItemEstimatedGradeLabel color={"red"}> { weaponGrade } </ItemEstimatedGradeLabel>}
                                        {weaponGrade === "SS" && <ItemEstimatedGradeLabel color={"red"}> { weaponGrade } </ItemEstimatedGradeLabel>}
                                        {weaponGrade === "SSS" && <ItemEstimatedGradeLabel color={"darkred"}> { weaponGrade } </ItemEstimatedGradeLabel>}
                                    </EstimateEquipmentIcon>
                                    <EstimateEquipmentDescriptionLine>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 공격력 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> { weaponFormData.mainValue } </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <DescriptionLine />
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { weaponFormData.subOption1 === "NONE" && "-" }
                                                { weaponFormData.subOption1 === "ATTACK_PER" && "공격력(%)" }
                                                { weaponFormData.subOption1 === "ATTACK" && "공격력" }
                                                { weaponFormData.subOption1 === "HEALTH" && "생명력" }
                                                { weaponFormData.subOption1 === "HEALTH_PER" && "생명력(%)" }
                                                { weaponFormData.subOption1 === "DEFENSE_PER" && "방어력(%)" }
                                                { weaponFormData.subOption1 === "DEFENSE" && "방어력" }
                                                { weaponFormData.subOption1 === "SPEED" && "속도" }
                                                { weaponFormData.subOption1 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { weaponFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { weaponFormData.subOption1 === "EFFECTIVENESS" && "효과적중" }
                                                { weaponFormData.subOption1 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    weaponFormData.subOption1 === "NONE" ?
                                                        "-" : weaponFormData.subOption1 === "HEALTH" || weaponFormData.subOption1 === "ATTACK" || weaponFormData.subOption1 === "DEFENSE" ?
                                                            weaponFormData.subValue1 : weaponFormData.subValue1 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { weaponFormData.subOption2 === "NONE" && "-" }
                                                { weaponFormData.subOption2 === "ATTACK_PER" && "공격력(%)" }
                                                { weaponFormData.subOption2 === "ATTACK" && "공격력" }
                                                { weaponFormData.subOption2 === "HEALTH" && "생명력" }
                                                { weaponFormData.subOption2 === "HEALTH_PER" && "생명력(%)" }
                                                { weaponFormData.subOption1 === "DEFENSE_PER" && "방어력(%)" }
                                                { weaponFormData.subOption1 === "DEFENSE" && "방어력" }
                                                { weaponFormData.subOption2 === "SPEED" && "속도" }
                                                { weaponFormData.subOption2 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { weaponFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { weaponFormData.subOption2 === "EFFECTIVENESS" && "효과적중" }
                                                { weaponFormData.subOption2 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    weaponFormData.subOption2 === "NONE" ?
                                                        "-" : weaponFormData.subOption2 === "HEALTH" || weaponFormData.subOption2 === "ATTACK" || weaponFormData.subOption2 === "DEFENSE" ?
                                                            weaponFormData.subValue2 : weaponFormData.subValue2 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { weaponFormData.subOption3 === "NONE" && "-" }
                                                { weaponFormData.subOption3 === "ATTACK_PER" && "공격력(%)" }
                                                { weaponFormData.subOption3 === "ATTACK" && "공격력" }
                                                { weaponFormData.subOption3 === "HEALTH" && "생명력" }
                                                { weaponFormData.subOption3 === "HEALTH_PER" && "생명력(%)" }
                                                { weaponFormData.subOption3 === "SPEED" && "속도" }
                                                { weaponFormData.subOption3 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { weaponFormData.subOption1 === "DEFENSE_PER" && "방어력(%)" }
                                                { weaponFormData.subOption1 === "DEFENSE" && "방어력" }
                                                { weaponFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { weaponFormData.subOption3 === "EFFECTIVENESS" && "효과적중" }
                                                { weaponFormData.subOption3 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    weaponFormData.subOption3 === "NONE" ?
                                                        "-" : weaponFormData.subOption3 === "HEALTH" || weaponFormData.subOption3 === "ATTACK" || weaponFormData.subOption3 === "DEFENSE" ?
                                                            weaponFormData.subValue3 : weaponFormData.subValue3 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { weaponFormData.subOption4 === "NONE" && "-" }
                                                { weaponFormData.subOption4 === "ATTACK_PER" && "공격력(%)" }
                                                { weaponFormData.subOption4 === "ATTACK" && "공격력" }
                                                { weaponFormData.subOption1 === "DEFENSE_PER" && "방어력(%)" }
                                                { weaponFormData.subOption1 === "DEFENSE" && "방어력" }
                                                { weaponFormData.subOption4 === "HEALTH" && "생명력" }
                                                { weaponFormData.subOption4 === "HEALTH_PER" && "생명력(%)" }
                                                { weaponFormData.subOption4 === "SPEED" && "속도" }
                                                { weaponFormData.subOption4 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { weaponFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { weaponFormData.subOption4 === "EFFECTIVENESS" && "효과적중" }
                                                { weaponFormData.subOption4 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    weaponFormData.subOption4 === "NONE" ?
                                                        "-" : weaponFormData.subOption4 === "HEALTH" || weaponFormData.subOption4 === "ATTACK" || weaponFormData.subOption4 === "DEFENSE" ?
                                                            weaponFormData.subValue4 : weaponFormData.subValue4 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { weaponFormData.setEffect === "NONE" && "세트효과" }
                                                { Object.entries( EquipSetEnum ).map( ( [key, value] ) => (key === weaponFormData.setEffect && value)) }
                                            </EstimateEquipmentDescriptionLabel>
                                        </EstimateEquipmentDescription>
                                    </EstimateEquipmentDescriptionLine>
                                    <EstimateEquipmentIcon>
                                        { helmetIcon[2] ? <EstimateEquipmentImage src={ '/src/assets/' + helmetIcon[1] } /> : <EstimateEquipmentImage src={ '/src/assets/golem_armor.png' } />}
                                        { helmetIcon[2] ? <EstimateEquipmentGradeImage src={ '/src/assets/' + helmetIcon[0]} /> : <EstimateEquipmentGradeImage src={ '/src/assets/equip_epic.png'} />}
                                        {helmetGrade === "C" && <ItemEstimatedGradeLabel color={"green"}> { helmetGrade } </ItemEstimatedGradeLabel>}
                                        {helmetGrade === "B" && <ItemEstimatedGradeLabel color={"blue"}> { helmetGrade } </ItemEstimatedGradeLabel>}
                                        {helmetGrade === "A" && <ItemEstimatedGradeLabel color={"purple"}> { helmetGrade } </ItemEstimatedGradeLabel>}
                                        {helmetGrade === "S" && <ItemEstimatedGradeLabel color={"red"}> { helmetGrade } </ItemEstimatedGradeLabel>}
                                        {helmetGrade === "SS" && <ItemEstimatedGradeLabel color={"red"}> { helmetGrade } </ItemEstimatedGradeLabel>}
                                        {helmetGrade === "SSS" && <ItemEstimatedGradeLabel color={"darkred"}> { helmetGrade } </ItemEstimatedGradeLabel>}
                                    </EstimateEquipmentIcon>
                                    <EstimateEquipmentDescriptionLine>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 생명력 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> { helmetFormData.mainValue } </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <DescriptionLine />
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { helmetFormData.subOption1 === "NONE" && "-" }
                                                { helmetFormData.subOption1 === "ATTACK_PER" && "공격력(%)" }
                                                { helmetFormData.subOption1 === "ATTACK" && "공격력" }
                                                { helmetFormData.subOption1 === "DEFENSE_PER" && "방어력(%)" }
                                                { helmetFormData.subOption1 === "DEFENSE" && "방어력" }
                                                { helmetFormData.subOption1 === "HEALTH" && "생명력" }
                                                { helmetFormData.subOption1 === "HEALTH_PER" && "생명력(%)" }
                                                { helmetFormData.subOption1 === "SPEED" && "속도" }
                                                { helmetFormData.subOption1 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { helmetFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { helmetFormData.subOption1 === "EFFECTIVENESS" && "효과적중" }
                                                { helmetFormData.subOption1 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    helmetFormData.subOption1 === "NONE" ?
                                                        "-" : helmetFormData.subOption1 === "HEALTH" || helmetFormData.subOption1 === "ATTACK" || helmetFormData.subOption1 === "DEFENSE" ?
                                                            helmetFormData.subValue1 : helmetFormData.subValue1 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { helmetFormData.subOption2 === "NONE" && "-" }
                                                { helmetFormData.subOption2 === "ATTACK_PER" && "공격력(%)" }
                                                { helmetFormData.subOption2 === "ATTACK" && "공격력" }
                                                { helmetFormData.subOption2 === "DEFENSE_PER" && "방어력(%)" }
                                                { helmetFormData.subOption2 === "DEFENSE" && "방어력" }
                                                { helmetFormData.subOption2 === "HEALTH" && "생명력" }
                                                { helmetFormData.subOption2 === "HEALTH_PER" && "생명력(%)" }
                                                { helmetFormData.subOption2 === "SPEED" && "속도" }
                                                { helmetFormData.subOption2 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { helmetFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { helmetFormData.subOption2 === "EFFECTIVENESS" && "효과적중" }
                                                { helmetFormData.subOption2 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    helmetFormData.subOption2 === "NONE" ?
                                                        "-" : helmetFormData.subOption2 === "HEALTH" || helmetFormData.subOption2 === "ATTACK" || helmetFormData.subOption2 === "DEFENSE" ?
                                                            helmetFormData.subValue2 : helmetFormData.subValue2 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { helmetFormData.subOption3 === "NONE" && "-" }
                                                { helmetFormData.subOption3 === "ATTACK_PER" && "공격력(%)" }
                                                { helmetFormData.subOption3 === "ATTACK" && "공격력" }
                                                { helmetFormData.subOption3 === "DEFENSE_PER" && "방어력(%)" }
                                                { helmetFormData.subOption3 === "DEFENSE" && "방어력" }
                                                { helmetFormData.subOption3 === "HEALTH" && "생명력" }
                                                { helmetFormData.subOption3 === "HEALTH_PER" && "생명력(%)" }
                                                { helmetFormData.subOption3 === "SPEED" && "속도" }
                                                { helmetFormData.subOption3 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { helmetFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { helmetFormData.subOption3 === "EFFECTIVENESS" && "효과적중" }
                                                { helmetFormData.subOption3 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    helmetFormData.subOption3 === "NONE" ?
                                                        "-" : helmetFormData.subOption3 === "HEALTH" || helmetFormData.subOption3 === "ATTACK" || helmetFormData.subOption3 === "DEFENSE" ?
                                                            helmetFormData.subValue3 : helmetFormData.subValue3 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { helmetFormData.subOption4 === "NONE" && "-" }
                                                { helmetFormData.subOption4 === "ATTACK_PER" && "공격력(%)" }
                                                { helmetFormData.subOption4 === "ATTACK" && "공격력" }
                                                { helmetFormData.subOption4 === "DEFENSE_PER" && "방어력(%)" }
                                                { helmetFormData.subOption4 === "DEFENSE" && "방어력" }
                                                { helmetFormData.subOption4 === "HEALTH" && "생명력" }
                                                { helmetFormData.subOption4 === "HEALTH_PER" && "생명력(%)" }
                                                { helmetFormData.subOption4 === "SPEED" && "속도" }
                                                { helmetFormData.subOption4 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { helmetFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { helmetFormData.subOption4 === "EFFECTIVENESS" && "효과적중" }
                                                { helmetFormData.subOption4 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    helmetFormData.subOption4 === "NONE" ?
                                                        "-" : helmetFormData.subOption4 === "HEALTH" || helmetFormData.subOption4 === "ATTACK" || helmetFormData.subOption4 === "DEFENSE" ?
                                                            helmetFormData.subValue4 : helmetFormData.subValue4 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { helmetFormData.setEffect === "NONE" && "세트효과" }
                                                { Object.entries( EquipSetEnum ).map( ( [key, value] ) => (key === helmetFormData.setEffect && value)) }
                                            </EstimateEquipmentDescriptionLabel>
                                        </EstimateEquipmentDescription>
                                    </EstimateEquipmentDescriptionLine>
                                    <EstimateEquipmentIcon>
                                        { armorIcon[2] ? <EstimateEquipmentImage src={ '/src/assets/' + armorIcon[1] } /> : <EstimateEquipmentImage src={ '/src/assets/golem_armor.png' } />}
                                        { armorIcon[2] ? <EstimateEquipmentGradeImage src={ '/src/assets/' + armorIcon[0]} /> : <EstimateEquipmentGradeImage src={ '/src/assets/equip_epic.png'} />}
                                        {armorGrade === "C" && <ItemEstimatedGradeLabel color={"green"}> { armorGrade } </ItemEstimatedGradeLabel>}
                                        {armorGrade === "B" && <ItemEstimatedGradeLabel color={"blue"}> { armorGrade } </ItemEstimatedGradeLabel>}
                                        {armorGrade === "A" && <ItemEstimatedGradeLabel color={"purple"}> { armorGrade } </ItemEstimatedGradeLabel>}
                                        {armorGrade === "S" && <ItemEstimatedGradeLabel color={"red"}> { armorGrade } </ItemEstimatedGradeLabel>}
                                        {armorGrade === "SS" && <ItemEstimatedGradeLabel color={"red"}> { armorGrade } </ItemEstimatedGradeLabel>}
                                        {armorGrade === "SSS" && <ItemEstimatedGradeLabel color={"darkred"}> { armorGrade } </ItemEstimatedGradeLabel>}
                                    </EstimateEquipmentIcon>
                                    <EstimateEquipmentDescriptionLine>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 방어력 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> { armorFormData.mainValue } </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <DescriptionLine />
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { armorFormData.subOption1 === "NONE" && "-" }
                                                { armorFormData.subOption1 === "ATTACK_PER" && "공격력(%)" }
                                                { armorFormData.subOption1 === "ATTACK" && "공격력" }
                                                { armorFormData.subOption1 === "HEALTH" && "생명력" }
                                                { armorFormData.subOption1 === "HEALTH_PER" && "생명력(%)" }
                                                { armorFormData.subOption1 === "SPEED" && "속도" }
                                                { armorFormData.subOption1 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { armorFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { armorFormData.subOption1 === "DEFENSE_PER" && "방어력(%)" }
                                                { armorFormData.subOption1 === "DEFENSE" && "방어력" }
                                                { armorFormData.subOption1 === "EFFECTIVENESS" && "효과적중" }
                                                { armorFormData.subOption1 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    armorFormData.subOption1 === "NONE" ?
                                                        "-" : armorFormData.subOption1 === "HEALTH" || armorFormData.subOption1 === "ATTACK" || armorFormData.subOption1 === "DEFENSE" ?
                                                            armorFormData.subValue1 : armorFormData.subValue1 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { armorFormData.subOption2 === "NONE" && "-" }
                                                { armorFormData.subOption2 === "ATTACK_PER" && "공격력(%)" }
                                                { armorFormData.subOption2 === "ATTACK" && "공격력" }
                                                { armorFormData.subOption2 === "HEALTH" && "생명력" }
                                                { armorFormData.subOption2 === "HEALTH_PER" && "생명력(%)" }
                                                { armorFormData.subOption2 === "SPEED" && "속도" }
                                                { armorFormData.subOption2 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { armorFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { armorFormData.subOption2 === "DEFENSE_PER" && "방어력(%)" }
                                                { armorFormData.subOption2 === "DEFENSE" && "방어력" }
                                                { armorFormData.subOption2 === "EFFECTIVENESS" && "효과적중" }
                                                { armorFormData.subOption2 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    armorFormData.subOption2 === "NONE" ?
                                                        "-" : armorFormData.subOption2 === "HEALTH" || armorFormData.subOption2 === "ATTACK" || armorFormData.subOption2 === "DEFENSE" ?
                                                            armorFormData.subValue2 : armorFormData.subValue2 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { armorFormData.subOption3 === "NONE" && "-" }
                                                { armorFormData.subOption3 === "ATTACK_PER" && "공격력(%)" }
                                                { armorFormData.subOption3 === "ATTACK" && "공격력" }
                                                { armorFormData.subOption3 === "HEALTH" && "생명력" }
                                                { armorFormData.subOption3 === "HEALTH_PER" && "생명력(%)" }
                                                { armorFormData.subOption3 === "SPEED" && "속도" }
                                                { armorFormData.subOption3 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { armorFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { armorFormData.subOption3 === "DEFENSE_PER" && "방어력(%)" }
                                                { armorFormData.subOption3 === "DEFENSE" && "방어력" }
                                                { armorFormData.subOption3 === "EFFECTIVENESS" && "효과적중" }
                                                { armorFormData.subOption3 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    armorFormData.subOption3 === "NONE" ?
                                                        "-" : armorFormData.subOption3 === "HEALTH" || armorFormData.subOption3 === "ATTACK" || armorFormData.subOption3 === "DEFENSE" ?
                                                            armorFormData.subValue3 : armorFormData.subValue3 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { armorFormData.subOption4 === "NONE" && "-" }
                                                { armorFormData.subOption4 === "ATTACK_PER" && "공격력(%)" }
                                                { armorFormData.subOption4 === "ATTACK" && "공격력" }
                                                { armorFormData.subOption4 === "HEALTH" && "생명력" }
                                                { armorFormData.subOption4 === "HEALTH_PER" && "생명력(%)" }
                                                { armorFormData.subOption4 === "SPEED" && "속도" }
                                                { armorFormData.subOption4 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { armorFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { armorFormData.subOption4 === "DEFENSE_PER" && "방어력(%)" }
                                                { armorFormData.subOption4 === "DEFENSE" && "방어력" }
                                                { armorFormData.subOption4 === "EFFECTIVENESS" && "효과적중" }
                                                { armorFormData.subOption4 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    armorFormData.subOption4 === "NONE" ?
                                                        "-" : armorFormData.subOption4 === "HEALTH" || armorFormData.subOption4 === "ATTACK" || armorFormData.subOption4 === "DEFENSE" ?
                                                            armorFormData.subValue4 : armorFormData.subValue4 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { armorFormData.setEffect === "NONE" && "세트효과"}
                                                { Object.entries( EquipSetEnum ).map( ( [key, value] ) => (key === armorFormData.setEffect && value)) }
                                            </EstimateEquipmentDescriptionLabel>
                                        </EstimateEquipmentDescription>
                                    </EstimateEquipmentDescriptionLine>
                                </EstimateEquipmentRow>
                                <EstimateEquipmentRow>
                                    <EstimateEquipmentIcon>
                                        { necklaceIcon[2] ? <EstimateEquipmentImage src={ '/src/assets/' + necklaceIcon[1] } /> : <EstimateEquipmentImage src={ '/src/assets/golem_necklace.png' } />}
                                        { necklaceIcon[2] ? <EstimateEquipmentGradeImage src={ '/src/assets/' + necklaceIcon[0]} /> : <EstimateEquipmentGradeImage src={ '/src/assets/equip_epic.png'} />}
                                        {necklaceGrade === "C" && <ItemEstimatedGradeLabel color={"green"}> { necklaceGrade } </ItemEstimatedGradeLabel>}
                                        {necklaceGrade === "B" && <ItemEstimatedGradeLabel color={"blue"}> { necklaceGrade } </ItemEstimatedGradeLabel>}
                                        {necklaceGrade === "A" && <ItemEstimatedGradeLabel color={"purple"}> { necklaceGrade } </ItemEstimatedGradeLabel>}
                                        {necklaceGrade === "S" && <ItemEstimatedGradeLabel color={"red"}> { necklaceGrade } </ItemEstimatedGradeLabel>}
                                        {necklaceGrade === "SS" && <ItemEstimatedGradeLabel color={"red"}> { necklaceGrade } </ItemEstimatedGradeLabel>}
                                        {necklaceGrade === "SSS" && <ItemEstimatedGradeLabel color={"darkred"}> { necklaceGrade } </ItemEstimatedGradeLabel>}
                                    </EstimateEquipmentIcon>
                                    <EstimateEquipmentDescriptionLine>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { necklaceFormData.mainOption === "NONE" && "-" }
                                                { necklaceFormData.mainOption === "ATTACK_PER" && "공격력(%)" }
                                                { necklaceFormData.mainOption === "ATTACK" && "공격력" }
                                                { necklaceFormData.mainOption === "HEALTH" && "생명력" }
                                                { necklaceFormData.mainOption === "HEALTH_PER" && "생명력(%)" }
                                                { necklaceFormData.mainOption === "DEFENSE_PER" && "방어력(%)" }
                                                { necklaceFormData.mainOption === "DEFENSE" && "방어력" }
                                                { necklaceFormData.mainOption === "SPEED" && "속도" }
                                                { necklaceFormData.mainOption === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { necklaceFormData.mainOption === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { necklaceFormData.mainOption === "EFFECTIVENESS" && "효과적중" }
                                                { necklaceFormData.mainOption === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    necklaceFormData.mainOption === "NONE" ?
                                                        "-" : necklaceFormData.mainOption === "HEALTH" || necklaceFormData.mainOption === "ATTACK" || necklaceFormData.mainOption === "DEFENSE" ?
                                                            necklaceFormData.mainValue : necklaceFormData.mainValue + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <DescriptionLine />
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { necklaceFormData.subOption1 === "NONE" && "-" }
                                                { necklaceFormData.subOption1 === "ATTACK_PER" && "공격력(%)" }
                                                { necklaceFormData.subOption1 === "ATTACK" && "공격력" }
                                                { necklaceFormData.subOption1 === "HEALTH" && "생명력" }
                                                { necklaceFormData.subOption1 === "HEALTH_PER" && "생명력(%)" }
                                                { necklaceFormData.subOption1 === "DEFENSE_PER" && "방어력(%)" }
                                                { necklaceFormData.subOption1 === "DEFENSE" && "방어력" }
                                                { necklaceFormData.subOption1 === "SPEED" && "속도" }
                                                { necklaceFormData.subOption1 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { necklaceFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { necklaceFormData.subOption1 === "EFFECTIVENESS" && "효과적중" }
                                                { necklaceFormData.subOption1 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    necklaceFormData.subOption1 === "NONE" ?
                                                        "-" : necklaceFormData.subOption1 === "HEALTH" || necklaceFormData.subOption1 === "ATTACK" || necklaceFormData.subOption1 === "DEFENSE" ?
                                                            necklaceFormData.subValue1 : necklaceFormData.subValue1 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { necklaceFormData.subOption2 === "NONE" && "-" }
                                                { necklaceFormData.subOption2 === "ATTACK_PER" && "공격력(%)" }
                                                { necklaceFormData.subOption2 === "ATTACK" && "공격력" }
                                                { necklaceFormData.subOption2 === "HEALTH" && "생명력" }
                                                { necklaceFormData.subOption2 === "HEALTH_PER" && "생명력(%)" }
                                                { necklaceFormData.subOption2 === "DEFENSE_PER" && "방어력(%)" }
                                                { necklaceFormData.subOption2 === "DEFENSE" && "방어력" }
                                                { necklaceFormData.subOption2 === "SPEED" && "속도" }
                                                { necklaceFormData.subOption2 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { necklaceFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { necklaceFormData.subOption2 === "EFFECTIVENESS" && "효과적중" }
                                                { necklaceFormData.subOption2 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    necklaceFormData.subOption2 === "NONE" ?
                                                        "-" : necklaceFormData.subOption2 === "HEALTH" || necklaceFormData.subOption2 === "ATTACK" || necklaceFormData.subOption2 === "DEFENSE" ?
                                                            necklaceFormData.subValue2 : necklaceFormData.subValue2 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { necklaceFormData.subOption3 === "NONE" && "-" }
                                                { necklaceFormData.subOption3 === "ATTACK_PER" && "공격력(%)" }
                                                { necklaceFormData.subOption3 === "ATTACK" && "공격력" }
                                                { necklaceFormData.subOption3 === "HEALTH" && "생명력" }
                                                { necklaceFormData.subOption3 === "HEALTH_PER" && "생명력(%)" }
                                                { necklaceFormData.subOption3 === "DEFENSE_PER" && "방어력(%)" }
                                                { necklaceFormData.subOption3 === "DEFENSE" && "방어력" }
                                                { necklaceFormData.subOption3 === "SPEED" && "속도" }
                                                { necklaceFormData.subOption3 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { necklaceFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { necklaceFormData.subOption3 === "EFFECTIVENESS" && "효과적중" }
                                                { necklaceFormData.subOption3 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    necklaceFormData.subOption3 === "NONE" ?
                                                        "-" : necklaceFormData.subOption3 === "HEALTH" || necklaceFormData.subOption3 === "ATTACK" || necklaceFormData.subOption3 === "DEFENSE" ?
                                                            necklaceFormData.subValue3 : necklaceFormData.subValue3 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { necklaceFormData.subOption4 === "NONE" && "-" }
                                                { necklaceFormData.subOption4 === "ATTACK_PER" && "공격력(%)" }
                                                { necklaceFormData.subOption4 === "ATTACK" && "공격력" }
                                                { necklaceFormData.subOption4 === "HEALTH" && "생명력" }
                                                { necklaceFormData.subOption4 === "HEALTH_PER" && "생명력(%)" }
                                                { necklaceFormData.subOption4 === "DEFENSE_PER" && "방어력(%)" }
                                                { necklaceFormData.subOption4 === "DEFENSE" && "방어력" }
                                                { necklaceFormData.subOption4 === "SPEED" && "속도" }
                                                { necklaceFormData.subOption4 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { necklaceFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { necklaceFormData.subOption4 === "EFFECTIVENESS" && "효과적중" }
                                                { necklaceFormData.subOption4 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    necklaceFormData.subOption4 === "NONE" ?
                                                        "-" : necklaceFormData.subOption4 === "HEALTH" || necklaceFormData.subOption4 === "ATTACK" || necklaceFormData.subOption4 === "DEFENSE" ?
                                                            necklaceFormData.subValue4 : necklaceFormData.subValue4 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { necklaceFormData.setEffect === "NONE" && "세트효과" }
                                                { Object.entries( EquipSetEnum ).map( ( [key, value] ) => (key === necklaceFormData.setEffect && value)) }
                                            </EstimateEquipmentDescriptionLabel>
                                        </EstimateEquipmentDescription>
                                    </EstimateEquipmentDescriptionLine>
                                    <EstimateEquipmentIcon>
                                        { ringIcon[2] ? <EstimateEquipmentImage src={ '/src/assets/' + ringIcon[1] } /> : <EstimateEquipmentImage src={ '/src/assets/golem_ring.png' } />}
                                        { ringIcon[2] ? <EstimateEquipmentGradeImage src={ '/src/assets/' + ringIcon[0]} /> : <EstimateEquipmentGradeImage src={ '/src/assets/equip_epic.png'} />}
                                        {ringGrade === "C" && <ItemEstimatedGradeLabel color={"green"}> { ringGrade } </ItemEstimatedGradeLabel>}
                                        {ringGrade === "B" && <ItemEstimatedGradeLabel color={"blue"}> { ringGrade } </ItemEstimatedGradeLabel>}
                                        {ringGrade === "A" && <ItemEstimatedGradeLabel color={"purple"}> { ringGrade } </ItemEstimatedGradeLabel>}
                                        {ringGrade === "S" && <ItemEstimatedGradeLabel color={"red"}> { ringGrade } </ItemEstimatedGradeLabel>}
                                        {ringGrade === "SS" && <ItemEstimatedGradeLabel color={"red"}> { ringGrade } </ItemEstimatedGradeLabel>}
                                        {ringGrade === "SSS" && <ItemEstimatedGradeLabel color={"darkred"}> { ringGrade } </ItemEstimatedGradeLabel>}
                                    </EstimateEquipmentIcon>
                                    <EstimateEquipmentDescriptionLine>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { ringFormData.mainOption === "NONE" && "-" }
                                                { ringFormData.mainOption === "ATTACK_PER" && "공격력(%)" }
                                                { ringFormData.mainOption === "ATTACK" && "공격력" }
                                                { ringFormData.mainOption === "HEALTH" && "생명력" }
                                                { ringFormData.mainOption === "HEALTH_PER" && "생명력(%)" }
                                                { ringFormData.mainOption === "DEFENSE_PER" && "방어력(%)" }
                                                { ringFormData.mainOption === "DEFENSE" && "방어력" }
                                                { ringFormData.mainOption === "SPEED" && "속도" }
                                                { ringFormData.mainOption === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { ringFormData.mainOption === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { ringFormData.mainOption === "EFFECTIVENESS" && "효과적중" }
                                                { ringFormData.mainOption === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    ringFormData.mainOption === "NONE" ?
                                                        "-" : ringFormData.mainOption === "HEALTH" || ringFormData.mainOption === "ATTACK" || ringFormData.mainOption === "DEFENSE" ?
                                                            ringFormData.mainValue : ringFormData.mainValue + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <DescriptionLine />
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { ringFormData.subOption1 === "NONE" && "-" }
                                                { ringFormData.subOption1 === "ATTACK_PER" && "공격력(%)" }
                                                { ringFormData.subOption1 === "ATTACK" && "공격력" }
                                                { ringFormData.subOption1 === "HEALTH" && "생명력" }
                                                { ringFormData.subOption1 === "HEALTH_PER" && "생명력(%)" }
                                                { ringFormData.subOption1 === "DEFENSE_PER" && "방어력(%)" }
                                                { ringFormData.subOption1 === "DEFENSE" && "방어력" }
                                                { ringFormData.subOption1 === "SPEED" && "속도" }
                                                { ringFormData.subOption1 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { ringFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { ringFormData.subOption1 === "EFFECTIVENESS" && "효과적중" }
                                                { ringFormData.subOption1 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    ringFormData.subOption1 === "NONE" ?
                                                        "-" : ringFormData.subOption1 === "HEALTH" || ringFormData.subOption1 === "ATTACK" || ringFormData.subOption1 === "DEFENSE" ?
                                                            ringFormData.subValue1 : ringFormData.subValue1 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { ringFormData.subOption2 === "NONE" && "-" }
                                                { ringFormData.subOption2 === "ATTACK_PER" && "공격력(%)" }
                                                { ringFormData.subOption2 === "ATTACK" && "공격력" }
                                                { ringFormData.subOption2 === "HEALTH" && "생명력" }
                                                { ringFormData.subOption2 === "HEALTH_PER" && "생명력(%)" }
                                                { ringFormData.subOption2 === "DEFENSE_PER" && "방어력(%)" }
                                                { ringFormData.subOption2 === "DEFENSE" && "방어력" }
                                                { ringFormData.subOption2 === "SPEED" && "속도" }
                                                { ringFormData.subOption2 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { ringFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { ringFormData.subOption2 === "EFFECTIVENESS" && "효과적중" }
                                                { ringFormData.subOption2 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    ringFormData.subOption2 === "NONE" ?
                                                        "-" : ringFormData.subOption2 === "HEALTH" || ringFormData.subOption2 === "ATTACK" || ringFormData.subOption2 === "DEFENSE" ?
                                                            ringFormData.subValue2 : ringFormData.subValue2 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { ringFormData.subOption3 === "NONE" && "-" }
                                                { ringFormData.subOption3 === "ATTACK_PER" && "공격력(%)" }
                                                { ringFormData.subOption3 === "ATTACK" && "공격력" }
                                                { ringFormData.subOption3 === "HEALTH" && "생명력" }
                                                { ringFormData.subOption3 === "HEALTH_PER" && "생명력(%)" }
                                                { ringFormData.subOption3 === "DEFENSE_PER" && "방어력(%)" }
                                                { ringFormData.subOption3 === "DEFENSE" && "방어력" }
                                                { ringFormData.subOption3 === "SPEED" && "속도" }
                                                { ringFormData.subOption3 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { ringFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { ringFormData.subOption3 === "EFFECTIVENESS" && "효과적중" }
                                                { ringFormData.subOption3 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    ringFormData.subOption3 === "NONE" ?
                                                        "-" : ringFormData.subOption3 === "HEALTH" || ringFormData.subOption3 === "ATTACK" || ringFormData.subOption3 === "DEFENSE" ?
                                                            ringFormData.subValue3 : ringFormData.subValue3 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { ringFormData.subOption4 === "NONE" && "-" }
                                                { ringFormData.subOption4 === "ATTACK_PER" && "공격력(%)" }
                                                { ringFormData.subOption4 === "ATTACK" && "공격력" }
                                                { ringFormData.subOption4 === "HEALTH" && "생명력" }
                                                { ringFormData.subOption4 === "HEALTH_PER" && "생명력(%)" }
                                                { ringFormData.subOption4 === "DEFENSE_PER" && "방어력(%)" }
                                                { ringFormData.subOption4 === "DEFENSE" && "방어력" }
                                                { ringFormData.subOption4 === "SPEED" && "속도" }
                                                { ringFormData.subOption4 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { ringFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { ringFormData.subOption4 === "EFFECTIVENESS" && "효과적중" }
                                                { ringFormData.subOption4 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    ringFormData.subOption4 === "NONE" ?
                                                        "-" : ringFormData.subOption4 === "HEALTH" || ringFormData.subOption4 === "ATTACK" || ringFormData.subOption4 === "DEFENSE" ?
                                                            ringFormData.subValue4 : ringFormData.subValue4 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { ringFormData.setEffect === "NONE" && "세트효과" }
                                                { Object.entries( EquipSetEnum ).map( ( [key, value] ) => (key === ringFormData.setEffect && value)) }
                                            </EstimateEquipmentDescriptionLabel>
                                        </EstimateEquipmentDescription>
                                    </EstimateEquipmentDescriptionLine>
                                    <EstimateEquipmentIcon>
                                        { bootsIcon[2] ? <EstimateEquipmentImage src={ '/src/assets/' + bootsIcon[1] } /> : <EstimateEquipmentImage src={ '/src/assets/golem_boots.png' } />}
                                        { bootsIcon[2] ? <EstimateEquipmentGradeImage src={ '/src/assets/' + bootsIcon[0]} /> : <EstimateEquipmentGradeImage src={ '/src/assets/equip_epic.png'} />}
                                        {bootsGrade === "C" && <ItemEstimatedGradeLabel color={"green"}> { bootsGrade } </ItemEstimatedGradeLabel>}
                                        {bootsGrade === "B" && <ItemEstimatedGradeLabel color={"blue"}> { bootsGrade } </ItemEstimatedGradeLabel>}
                                        {bootsGrade === "A" && <ItemEstimatedGradeLabel color={"purple"}> { bootsGrade } </ItemEstimatedGradeLabel>}
                                        {bootsGrade === "S" && <ItemEstimatedGradeLabel color={"red"}> { bootsGrade } </ItemEstimatedGradeLabel>}
                                        {bootsGrade === "SS" && <ItemEstimatedGradeLabel color={"red"}> { bootsGrade } </ItemEstimatedGradeLabel>}
                                        {bootsGrade === "SSS" && <ItemEstimatedGradeLabel color={"darkred"}> { bootsGrade } </ItemEstimatedGradeLabel>}
                                    </EstimateEquipmentIcon>
                                    <EstimateEquipmentDescriptionLine>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { bootsFormData.mainOption === "NONE" && "-" }
                                                { bootsFormData.mainOption === "ATTACK_PER" && "공격력(%)" }
                                                { bootsFormData.mainOption === "ATTACK" && "공격력" }
                                                { bootsFormData.mainOption === "HEALTH" && "생명력" }
                                                { bootsFormData.mainOption === "HEALTH_PER" && "생명력(%)" }
                                                { bootsFormData.mainOption === "DEFENSE_PER" && "방어력(%)" }
                                                { bootsFormData.mainOption === "DEFENSE" && "방어력" }
                                                { bootsFormData.mainOption === "SPEED" && "속도" }
                                                { bootsFormData.mainOption === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { bootsFormData.mainOption === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { bootsFormData.mainOption === "EFFECTIVENESS" && "효과적중" }
                                                { bootsFormData.mainOption === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    bootsFormData.mainOption === "NONE" ?
                                                        "-" : bootsFormData.mainOption === "HEALTH" || bootsFormData.mainOption === "ATTACK" || bootsFormData.mainOption === "DEFENSE" ?
                                                            bootsFormData.mainValue : bootsFormData.mainValue + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <DescriptionLine />
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { bootsFormData.subOption1 === "NONE" && "-" }
                                                { bootsFormData.subOption1 === "ATTACK_PER" && "공격력(%)" }
                                                { bootsFormData.subOption1 === "ATTACK" && "공격력" }
                                                { bootsFormData.subOption1 === "HEALTH" && "생명력" }
                                                { bootsFormData.subOption1 === "HEALTH_PER" && "생명력(%)" }
                                                { bootsFormData.subOption1 === "SPEED" && "속도" }
                                                { bootsFormData.subOption1 === "DEFENSE_PER" && "방어력(%)" }
                                                { bootsFormData.subOption1 === "DEFENSE" && "방어력" }
                                                { bootsFormData.subOption1 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { bootsFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { bootsFormData.subOption1 === "EFFECTIVENESS" && "효과적중" }
                                                { bootsFormData.subOption1 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    bootsFormData.subOption1 === "NONE" ?
                                                        "-" : bootsFormData.subOption1 === "HEALTH" || bootsFormData.subOption1 === "ATTACK" || bootsFormData.subOption1 === "DEFENSE" ?
                                                            bootsFormData.subValue1 : bootsFormData.subValue1 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { bootsFormData.subOption2 === "NONE" && "-" }
                                                { bootsFormData.subOption2 === "ATTACK_PER" && "공격력(%)" }
                                                { bootsFormData.subOption2 === "ATTACK" && "공격력" }
                                                { bootsFormData.subOption2 === "HEALTH" && "생명력" }
                                                { bootsFormData.subOption2 === "HEALTH_PER" && "생명력(%)" }
                                                { bootsFormData.subOption2 === "DEFENSE_PER" && "방어력(%)" }
                                                { bootsFormData.subOption2 === "DEFENSE" && "방어력" }
                                                { bootsFormData.subOption2 === "SPEED" && "속도" }
                                                { bootsFormData.subOption2 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { bootsFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { bootsFormData.subOption2 === "EFFECTIVENESS" && "효과적중" }
                                                { bootsFormData.subOption2 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    bootsFormData.subOption2 === "NONE" ?
                                                        "-" : bootsFormData.subOption2 === "HEALTH" || bootsFormData.subOption2 === "ATTACK" || bootsFormData.subOption2 === "DEFENSE" ?
                                                            bootsFormData.subValue2 : bootsFormData.subValue2 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { bootsFormData.subOption3 === "NONE" && "-" }
                                                { bootsFormData.subOption3 === "ATTACK_PER" && "공격력(%)" }
                                                { bootsFormData.subOption3 === "ATTACK" && "공격력" }
                                                { bootsFormData.subOption3 === "HEALTH" && "생명력" }
                                                { bootsFormData.subOption3 === "HEALTH_PER" && "생명력(%)" }
                                                { bootsFormData.subOption3 === "SPEED" && "속도" }
                                                { bootsFormData.subOption3 === "DEFENSE_PER" && "방어력(%)" }
                                                { bootsFormData.subOption3 === "DEFENSE" && "방어력" }
                                                { bootsFormData.subOption3 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { bootsFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { bootsFormData.subOption3 === "EFFECTIVENESS" && "효과적중" }
                                                { bootsFormData.subOption3 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    bootsFormData.subOption3 === "NONE" ?
                                                        "-" : bootsFormData.subOption3 === "HEALTH" || bootsFormData.subOption3 === "ATTACK" || bootsFormData.subOption3 === "DEFENSE" ?
                                                            bootsFormData.subValue3 : bootsFormData.subValue3 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { bootsFormData.subOption4 === "NONE" && "-" }
                                                { bootsFormData.subOption4 === "ATTACK_PER" && "공격력(%)" }
                                                { bootsFormData.subOption4 === "ATTACK" && "공격력" }
                                                { bootsFormData.subOption4 === "HEALTH" && "생명력" }
                                                { bootsFormData.subOption4 === "HEALTH_PER" && "생명력(%)" }
                                                { bootsFormData.subOption4 === "SPEED" && "속도" }
                                                { bootsFormData.subOption4 === "DEFENSE_PER" && "방어력(%)" }
                                                { bootsFormData.subOption4 === "DEFENSE" && "방어력" }
                                                { bootsFormData.subOption4 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { bootsFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { bootsFormData.subOption4 === "EFFECTIVENESS" && "효과적중" }
                                                { bootsFormData.subOption4 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                {
                                                    bootsFormData.subOption4 === "NONE" ?
                                                        "-" : bootsFormData.subOption4 === "HEALTH" || bootsFormData.subOption4 === "ATTACK" || bootsFormData.subOption4 === "DEFENSE" ?
                                                            bootsFormData.subValue4 : bootsFormData.subValue4 + "%"
                                                }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { bootsFormData.setEffect === "NONE" && "세트효과" }
                                                { Object.entries( EquipSetEnum ).map( ( [key, value] ) => (key === bootsFormData.setEffect && value)) }
                                            </EstimateEquipmentDescriptionLabel>
                                        </EstimateEquipmentDescription>
                                    </EstimateEquipmentDescriptionLine>
                                </EstimateEquipmentRow>
                            </EstimateEquipmentWrapper>
                        </EstimateEquipmentContainer>
                        <EstimateHeroContainer>
                            <EstimateHeroIcon>
                                <EstimateHeroImage src="/src/assets/vivian_B_avatar.png" />
                            </EstimateHeroIcon>
                            <EstimateHeroGrade> SS </EstimateHeroGrade>
                            <EstimateHeroScore> 83.5점</EstimateHeroScore>
                        </EstimateHeroContainer>
                    </EstimateResultCard>
                </ResultContainer>
            </PageWrapper>
        </Container>
    )
}

export default EstimateHeroPage;