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
import { EquipmentApplyStat } from "@/types/Equipment.ts";

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
                                        <EstimateEquipmentImage src="/src/assets/golem_weapon.png" />
                                        <EstimateEquipmentGradeImage src="/src/assets/equip_epic.png" />
                                        { /* 점수에 따라 등급을 보여주기 */}
                                        <ItemEstimatedGradeLabel color={"red"}> S </ItemEstimatedGradeLabel>
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
                                                { weaponFormData.subOption1 === "HEALTH" && "생명력" }
                                                { weaponFormData.subOption1 === "HEALTH_PER" && "생명력(%)" }
                                                { weaponFormData.subOption1 === "SPEED" && "속도" }
                                                { weaponFormData.subOption1 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { weaponFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { weaponFormData.subOption1 === "EFFECTIVENESS" && "효과적중" }
                                                { weaponFormData.subOption1 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { weaponFormData.subOption1 === "NONE" && "-" }
                                                { weaponFormData.subOption1 === "ATTACK_PER" && weaponFormData.subValue1 + "%" }
                                                { weaponFormData.subOption1 === "HEALTH" && weaponFormData.subValue1 }
                                                { weaponFormData.subOption1 === "HEALTH_PER" && weaponFormData.subValue1  + "%" }
                                                { weaponFormData.subOption1 === "SPEED" && weaponFormData.subValue1 }
                                                { weaponFormData.subOption1 === "CRITICAL_HIT_CHANCE" && weaponFormData.subValue1  + "%" }
                                                { weaponFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && weaponFormData.subValue1  + "%" }
                                                { weaponFormData.subOption1 === "EFFECTIVENESS" && weaponFormData.subValue1  + "%" }
                                                { weaponFormData.subOption1 === "EFFECT_RESISTANCE" && weaponFormData.subValue1  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { weaponFormData.subOption2 === "NONE" && "-" }
                                                { weaponFormData.subOption2 === "ATTACK_PER" && "공격력(%)" }
                                                { weaponFormData.subOption2 === "HEALTH" && "생명력" }
                                                { weaponFormData.subOption2 === "HEALTH_PER" && "생명력(%)" }
                                                { weaponFormData.subOption2 === "SPEED" && "속도" }
                                                { weaponFormData.subOption2 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { weaponFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { weaponFormData.subOption2 === "EFFECTIVENESS" && "효과적중" }
                                                { weaponFormData.subOption2 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { weaponFormData.subOption2 === "NONE" && "-" }
                                                { weaponFormData.subOption2 === "ATTACK_PER" && weaponFormData.subValue2 + "%" }
                                                { weaponFormData.subOption2 === "HEALTH" && weaponFormData.subValue2 }
                                                { weaponFormData.subOption2 === "HEALTH_PER" && weaponFormData.subValue2  + "%" }
                                                { weaponFormData.subOption2 === "SPEED" && weaponFormData.subValue2 }
                                                { weaponFormData.subOption2 === "CRITICAL_HIT_CHANCE" && weaponFormData.subValue2  + "%" }
                                                { weaponFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && weaponFormData.subValue2  + "%" }
                                                { weaponFormData.subOption2 === "EFFECTIVENESS" && weaponFormData.subValue2  + "%" }
                                                { weaponFormData.subOption2 === "EFFECT_RESISTANCE" && weaponFormData.subValue2  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { weaponFormData.subOption3 === "NONE" && "-" }
                                                { weaponFormData.subOption3 === "ATTACK_PER" && "공격력(%)" }
                                                { weaponFormData.subOption3 === "HEALTH" && "생명력" }
                                                { weaponFormData.subOption3 === "HEALTH_PER" && "생명력(%)" }
                                                { weaponFormData.subOption3 === "SPEED" && "속도" }
                                                { weaponFormData.subOption3 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { weaponFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { weaponFormData.subOption3 === "EFFECTIVENESS" && "효과적중" }
                                                { weaponFormData.subOption3 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { weaponFormData.subOption3 === "NONE" && "-" }
                                                { weaponFormData.subOption3 === "ATTACK_PER" && weaponFormData.subValue3 + "%" }
                                                { weaponFormData.subOption3 === "HEALTH" && weaponFormData.subValue3 }
                                                { weaponFormData.subOption3 === "HEALTH_PER" && weaponFormData.subValue3  + "%" }
                                                { weaponFormData.subOption3 === "SPEED" && weaponFormData.subValue3 }
                                                { weaponFormData.subOption3 === "CRITICAL_HIT_CHANCE" && weaponFormData.subValue3  + "%" }
                                                { weaponFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && weaponFormData.subValue3  + "%" }
                                                { weaponFormData.subOption3 === "EFFECTIVENESS" && weaponFormData.subValue3  + "%" }
                                                { weaponFormData.subOption3 === "EFFECT_RESISTANCE" && weaponFormData.subValue3  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { weaponFormData.subOption4 === "NONE" && "-" }
                                                { weaponFormData.subOption4 === "ATTACK_PER" && "공격력(%)" }
                                                { weaponFormData.subOption4 === "HEALTH" && "생명력" }
                                                { weaponFormData.subOption4 === "HEALTH_PER" && "생명력(%)" }
                                                { weaponFormData.subOption4 === "SPEED" && "속도" }
                                                { weaponFormData.subOption4 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { weaponFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { weaponFormData.subOption4 === "EFFECTIVENESS" && "효과적중" }
                                                { weaponFormData.subOption4 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { weaponFormData.subOption4 === "NONE" && "-" }
                                                { weaponFormData.subOption4 === "ATTACK_PER" && weaponFormData.subValue4 + "%" }
                                                { weaponFormData.subOption4 === "HEALTH" && weaponFormData.subValue4 }
                                                { weaponFormData.subOption4 === "HEALTH_PER" && weaponFormData.subValue4  + "%" }
                                                { weaponFormData.subOption4 === "SPEED" && weaponFormData.subValue4 }
                                                { weaponFormData.subOption4 === "CRITICAL_HIT_CHANCE" && weaponFormData.subValue4  + "%" }
                                                { weaponFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && weaponFormData.subValue4  + "%" }
                                                { weaponFormData.subOption4 === "EFFECTIVENESS" && weaponFormData.subValue4  + "%" }
                                                { weaponFormData.subOption4 === "EFFECT_RESISTANCE" && weaponFormData.subValue4  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { weaponFormData.setEffect === "NONE" ? "세트효과" : weaponFormData.setEffect }
                                            </EstimateEquipmentDescriptionLabel>
                                        </EstimateEquipmentDescription>
                                    </EstimateEquipmentDescriptionLine>
                                    <EstimateEquipmentIcon>
                                        <EstimateEquipmentImage src="/src/assets/banshee_weapon.png" />
                                        <EstimateEquipmentGradeImage src="/src/assets/equip_epic.png" />
                                        <ItemEstimatedGradeLabel color={"red"}> SS </ItemEstimatedGradeLabel>
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
                                                { helmetFormData.subOption1 === "HEALTH" && "생명력" }
                                                { helmetFormData.subOption1 === "HEALTH_PER" && "생명력(%)" }
                                                { helmetFormData.subOption1 === "SPEED" && "속도" }
                                                { helmetFormData.subOption1 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { helmetFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { helmetFormData.subOption1 === "EFFECTIVENESS" && "효과적중" }
                                                { helmetFormData.subOption1 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { helmetFormData.subOption1 === "NONE" && "-" }
                                                { helmetFormData.subOption1 === "ATTACK_PER" && helmetFormData.subValue1 + "%" }
                                                { helmetFormData.subOption1 === "HEALTH" && helmetFormData.subValue1 }
                                                { helmetFormData.subOption1 === "HEALTH_PER" && helmetFormData.subValue1  + "%" }
                                                { helmetFormData.subOption1 === "SPEED" && helmetFormData.subValue1 }
                                                { helmetFormData.subOption1 === "CRITICAL_HIT_CHANCE" && helmetFormData.subValue1  + "%" }
                                                { helmetFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && helmetFormData.subValue1  + "%" }
                                                { helmetFormData.subOption1 === "EFFECTIVENESS" && helmetFormData.subValue1  + "%" }
                                                { helmetFormData.subOption1 === "EFFECT_RESISTANCE" && helmetFormData.subValue1  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { helmetFormData.subOption2 === "NONE" && "-" }
                                                { helmetFormData.subOption2 === "ATTACK_PER" && "공격력(%)" }
                                                { helmetFormData.subOption2 === "HEALTH" && "생명력" }
                                                { helmetFormData.subOption2 === "HEALTH_PER" && "생명력(%)" }
                                                { helmetFormData.subOption2 === "SPEED" && "속도" }
                                                { helmetFormData.subOption2 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { helmetFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { helmetFormData.subOption2 === "EFFECTIVENESS" && "효과적중" }
                                                { helmetFormData.subOption2 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { helmetFormData.subOption2 === "NONE" && "-" }
                                                { helmetFormData.subOption2 === "ATTACK_PER" && helmetFormData.subValue2 + "%" }
                                                { helmetFormData.subOption2 === "HEALTH" && helmetFormData.subValue2 }
                                                { helmetFormData.subOption2 === "HEALTH_PER" && helmetFormData.subValue2  + "%" }
                                                { helmetFormData.subOption2 === "SPEED" && helmetFormData.subValue2 }
                                                { helmetFormData.subOption2 === "CRITICAL_HIT_CHANCE" && helmetFormData.subValue2  + "%" }
                                                { helmetFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && helmetFormData.subValue2  + "%" }
                                                { helmetFormData.subOption2 === "EFFECTIVENESS" && helmetFormData.subValue2  + "%" }
                                                { helmetFormData.subOption2 === "EFFECT_RESISTANCE" && helmetFormData.subValue2  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { helmetFormData.subOption3 === "NONE" && "-" }
                                                { helmetFormData.subOption3 === "ATTACK_PER" && "공격력(%)" }
                                                { helmetFormData.subOption3 === "HEALTH" && "생명력" }
                                                { helmetFormData.subOption3 === "HEALTH_PER" && "생명력(%)" }
                                                { helmetFormData.subOption3 === "SPEED" && "속도" }
                                                { helmetFormData.subOption3 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { helmetFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { helmetFormData.subOption3 === "EFFECTIVENESS" && "효과적중" }
                                                { helmetFormData.subOption3 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { helmetFormData.subOption3 === "NONE" && "-" }
                                                { helmetFormData.subOption3 === "ATTACK_PER" && helmetFormData.subValue3 + "%" }
                                                { helmetFormData.subOption3 === "HEALTH" && helmetFormData.subValue3 }
                                                { helmetFormData.subOption3 === "HEALTH_PER" && helmetFormData.subValue3  + "%" }
                                                { helmetFormData.subOption3 === "SPEED" && helmetFormData.subValue3 }
                                                { helmetFormData.subOption3 === "CRITICAL_HIT_CHANCE" && helmetFormData.subValue3  + "%" }
                                                { helmetFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && helmetFormData.subValue3  + "%" }
                                                { helmetFormData.subOption3 === "EFFECTIVENESS" && helmetFormData.subValue3  + "%" }
                                                { helmetFormData.subOption3 === "EFFECT_RESISTANCE" && helmetFormData.subValue3  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { helmetFormData.subOption4 === "NONE" && "-" }
                                                { helmetFormData.subOption4 === "ATTACK_PER" && "공격력(%)" }
                                                { helmetFormData.subOption4 === "HEALTH" && "생명력" }
                                                { helmetFormData.subOption4 === "HEALTH_PER" && "생명력(%)" }
                                                { helmetFormData.subOption4 === "SPEED" && "속도" }
                                                { helmetFormData.subOption4 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { helmetFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { helmetFormData.subOption4 === "EFFECTIVENESS" && "효과적중" }
                                                { helmetFormData.subOption4 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { helmetFormData.subOption4 === "NONE" && "-" }
                                                { helmetFormData.subOption4 === "ATTACK_PER" && helmetFormData.subValue4 + "%" }
                                                { helmetFormData.subOption4 === "HEALTH" && helmetFormData.subValue4 }
                                                { helmetFormData.subOption4 === "HEALTH_PER" && helmetFormData.subValue4  + "%" }
                                                { helmetFormData.subOption4 === "SPEED" && helmetFormData.subValue4 }
                                                { helmetFormData.subOption4 === "CRITICAL_HIT_CHANCE" && helmetFormData.subValue4  + "%" }
                                                { helmetFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && helmetFormData.subValue4  + "%" }
                                                { helmetFormData.subOption4 === "EFFECTIVENESS" && helmetFormData.subValue4  + "%" }
                                                { helmetFormData.subOption4 === "EFFECT_RESISTANCE" && helmetFormData.subValue4  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> { helmetFormData.setEffect === "NONE" ? "세트효과" : helmetFormData.setEffect } </EstimateEquipmentDescriptionLabel>
                                        </EstimateEquipmentDescription>
                                    </EstimateEquipmentDescriptionLine>
                                    <EstimateEquipmentIcon>
                                        <EstimateEquipmentImage src="/src/assets/banshee_weapon.png" />
                                        <EstimateEquipmentGradeImage src="/src/assets/equip_epic.png" />
                                        <ItemEstimatedGradeLabel color={"blue"}> C </ItemEstimatedGradeLabel>
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
                                                { armorFormData.subOption1 === "HEALTH" && "생명력" }
                                                { armorFormData.subOption1 === "HEALTH_PER" && "생명력(%)" }
                                                { armorFormData.subOption1 === "SPEED" && "속도" }
                                                { armorFormData.subOption1 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { armorFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { armorFormData.subOption1 === "EFFECTIVENESS" && "효과적중" }
                                                { armorFormData.subOption1 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { armorFormData.subOption1 === "NONE" && "-" }
                                                { armorFormData.subOption1 === "ATTACK_PER" && armorFormData.subValue1 + "%" }
                                                { armorFormData.subOption1 === "HEALTH" && armorFormData.subValue1 }
                                                { armorFormData.subOption1 === "HEALTH_PER" && armorFormData.subValue1  + "%" }
                                                { armorFormData.subOption1 === "SPEED" && armorFormData.subValue1 }
                                                { armorFormData.subOption1 === "CRITICAL_HIT_CHANCE" && armorFormData.subValue1  + "%" }
                                                { armorFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && armorFormData.subValue1  + "%" }
                                                { armorFormData.subOption1 === "EFFECTIVENESS" && armorFormData.subValue1  + "%" }
                                                { armorFormData.subOption1 === "EFFECT_RESISTANCE" && armorFormData.subValue1  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { armorFormData.subOption2 === "NONE" && "-" }
                                                { armorFormData.subOption2 === "ATTACK_PER" && "공격력(%)" }
                                                { armorFormData.subOption2 === "HEALTH" && "생명력" }
                                                { armorFormData.subOption2 === "HEALTH_PER" && "생명력(%)" }
                                                { armorFormData.subOption2 === "SPEED" && "속도" }
                                                { armorFormData.subOption2 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { armorFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { armorFormData.subOption2 === "EFFECTIVENESS" && "효과적중" }
                                                { armorFormData.subOption2 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { armorFormData.subOption2 === "NONE" && "-" }
                                                { armorFormData.subOption2 === "ATTACK_PER" && armorFormData.subValue2 + "%" }
                                                { armorFormData.subOption2 === "HEALTH" && armorFormData.subValue2 }
                                                { armorFormData.subOption2 === "HEALTH_PER" && armorFormData.subValue2  + "%" }
                                                { armorFormData.subOption2 === "SPEED" && armorFormData.subValue2 }
                                                { armorFormData.subOption2 === "CRITICAL_HIT_CHANCE" && armorFormData.subValue2  + "%" }
                                                { armorFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && armorFormData.subValue2  + "%" }
                                                { armorFormData.subOption2 === "EFFECTIVENESS" && armorFormData.subValue2  + "%" }
                                                { armorFormData.subOption2 === "EFFECT_RESISTANCE" && armorFormData.subValue2  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { armorFormData.subOption3 === "NONE" && "-" }
                                                { armorFormData.subOption3 === "ATTACK_PER" && "공격력(%)" }
                                                { armorFormData.subOption3 === "HEALTH" && "생명력" }
                                                { armorFormData.subOption3 === "HEALTH_PER" && "생명력(%)" }
                                                { armorFormData.subOption3 === "SPEED" && "속도" }
                                                { armorFormData.subOption3 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { armorFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { armorFormData.subOption3 === "EFFECTIVENESS" && "효과적중" }
                                                { armorFormData.subOption3 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { armorFormData.subOption3 === "NONE" && "-" }
                                                { armorFormData.subOption3 === "ATTACK_PER" && armorFormData.subValue3 + "%" }
                                                { armorFormData.subOption3 === "HEALTH" && armorFormData.subValue3 }
                                                { armorFormData.subOption3 === "HEALTH_PER" && armorFormData.subValue3  + "%" }
                                                { armorFormData.subOption3 === "SPEED" && armorFormData.subValue3 }
                                                { armorFormData.subOption3 === "CRITICAL_HIT_CHANCE" && armorFormData.subValue3  + "%" }
                                                { armorFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && armorFormData.subValue3  + "%" }
                                                { armorFormData.subOption3 === "EFFECTIVENESS" && armorFormData.subValue3  + "%" }
                                                { armorFormData.subOption3 === "EFFECT_RESISTANCE" && armorFormData.subValue3  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { armorFormData.subOption4 === "NONE" && "-" }
                                                { armorFormData.subOption4 === "ATTACK_PER" && "공격력(%)" }
                                                { armorFormData.subOption4 === "HEALTH" && "생명력" }
                                                { armorFormData.subOption4 === "HEALTH_PER" && "생명력(%)" }
                                                { armorFormData.subOption4 === "SPEED" && "속도" }
                                                { armorFormData.subOption4 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { armorFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { armorFormData.subOption4 === "EFFECTIVENESS" && "효과적중" }
                                                { armorFormData.subOption4 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { armorFormData.subOption4 === "NONE" && "-" }
                                                { armorFormData.subOption4 === "ATTACK_PER" && armorFormData.subValue4 + "%" }
                                                { armorFormData.subOption4 === "HEALTH" && armorFormData.subValue4 }
                                                { armorFormData.subOption4 === "HEALTH_PER" && armorFormData.subValue4  + "%" }
                                                { armorFormData.subOption4 === "SPEED" && armorFormData.subValue4 }
                                                { armorFormData.subOption4 === "CRITICAL_HIT_CHANCE" && armorFormData.subValue4  + "%" }
                                                { armorFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && armorFormData.subValue4  + "%" }
                                                { armorFormData.subOption4 === "EFFECTIVENESS" && armorFormData.subValue4  + "%" }
                                                { armorFormData.subOption4 === "EFFECT_RESISTANCE" && armorFormData.subValue4  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> { armorFormData.setEffect === "NONE" ? "세트효과" : armorFormData.setEffect } </EstimateEquipmentDescriptionLabel>
                                        </EstimateEquipmentDescription>
                                    </EstimateEquipmentDescriptionLine>
                                </EstimateEquipmentRow>
                                <EstimateEquipmentRow>
                                    <EstimateEquipmentIcon>
                                        <EstimateEquipmentImage src="/src/assets/banshee_weapon.png" />
                                        <EstimateEquipmentGradeImage src="/src/assets/equip_epic.png" />
                                        <ItemEstimatedGradeLabel color={"green"}> B </ItemEstimatedGradeLabel>
                                    </EstimateEquipmentIcon>
                                    <EstimateEquipmentDescriptionLine>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { necklaceFormData.mainOption === "NONE" && "-" }
                                                { necklaceFormData.mainOption === "ATTACK_PER" && "공격력(%)" }
                                                { necklaceFormData.mainOption === "HEALTH" && "생명력" }
                                                { necklaceFormData.mainOption === "HEALTH_PER" && "생명력(%)" }
                                                { necklaceFormData.mainOption === "SPEED" && "속도" }
                                                { necklaceFormData.mainOption === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { necklaceFormData.mainOption === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { necklaceFormData.mainOption === "EFFECTIVENESS" && "효과적중" }
                                                { necklaceFormData.mainOption === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { necklaceFormData.mainOption === "NONE" && "-" }
                                                { necklaceFormData.mainOption === "ATTACK_PER" && necklaceFormData.mainValue + "%" }
                                                { necklaceFormData.mainOption === "HEALTH" && necklaceFormData.mainValue }
                                                { necklaceFormData.mainOption === "HEALTH_PER" && necklaceFormData.mainValue  + "%" }
                                                { necklaceFormData.mainOption === "SPEED" && necklaceFormData.mainValue }
                                                { necklaceFormData.mainOption === "CRITICAL_HIT_CHANCE" && necklaceFormData.mainValue  + "%" }
                                                { necklaceFormData.mainOption === "CRITICAL_HIT_DAMAGE" && necklaceFormData.mainValue  + "%" }
                                                { necklaceFormData.mainOption === "EFFECTIVENESS" && necklaceFormData.mainValue  + "%" }
                                                { necklaceFormData.mainOption === "EFFECT_RESISTANCE" && necklaceFormData.mainValue  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <DescriptionLine />
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { necklaceFormData.subOption1 === "NONE" && "-" }
                                                { necklaceFormData.subOption1 === "ATTACK_PER" && "공격력(%)" }
                                                { necklaceFormData.subOption1 === "HEALTH" && "생명력" }
                                                { necklaceFormData.subOption1 === "HEALTH_PER" && "생명력(%)" }
                                                { necklaceFormData.subOption1 === "SPEED" && "속도" }
                                                { necklaceFormData.subOption1 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { necklaceFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { necklaceFormData.subOption1 === "EFFECTIVENESS" && "효과적중" }
                                                { necklaceFormData.subOption1 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { necklaceFormData.subOption1 === "NONE" && "-" }
                                                { necklaceFormData.subOption1 === "ATTACK_PER" && necklaceFormData.subValue1 + "%" }
                                                { necklaceFormData.subOption1 === "HEALTH" && necklaceFormData.subValue1 }
                                                { necklaceFormData.subOption1 === "HEALTH_PER" && necklaceFormData.subValue1  + "%" }
                                                { necklaceFormData.subOption1 === "SPEED" && necklaceFormData.subValue1 }
                                                { necklaceFormData.subOption1 === "CRITICAL_HIT_CHANCE" && necklaceFormData.subValue1  + "%" }
                                                { necklaceFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && necklaceFormData.subValue1  + "%" }
                                                { necklaceFormData.subOption1 === "EFFECTIVENESS" && necklaceFormData.subValue1  + "%" }
                                                { necklaceFormData.subOption1 === "EFFECT_RESISTANCE" && necklaceFormData.subValue1  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { necklaceFormData.subOption2 === "NONE" && "-" }
                                                { necklaceFormData.subOption2 === "ATTACK_PER" && "공격력(%)" }
                                                { necklaceFormData.subOption2 === "HEALTH" && "생명력" }
                                                { necklaceFormData.subOption2 === "HEALTH_PER" && "생명력(%)" }
                                                { necklaceFormData.subOption2 === "SPEED" && "속도" }
                                                { necklaceFormData.subOption2 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { necklaceFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { necklaceFormData.subOption2 === "EFFECTIVENESS" && "효과적중" }
                                                { necklaceFormData.subOption2 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { necklaceFormData.subOption2 === "NONE" && "-" }
                                                { necklaceFormData.subOption2 === "ATTACK_PER" && necklaceFormData.subValue2 + "%" }
                                                { necklaceFormData.subOption2 === "HEALTH" && necklaceFormData.subValue2 }
                                                { necklaceFormData.subOption2 === "HEALTH_PER" && necklaceFormData.subValue2  + "%" }
                                                { necklaceFormData.subOption2 === "SPEED" && necklaceFormData.subValue2 }
                                                { necklaceFormData.subOption2 === "CRITICAL_HIT_CHANCE" && necklaceFormData.subValue2  + "%" }
                                                { necklaceFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && necklaceFormData.subValue2  + "%" }
                                                { necklaceFormData.subOption2 === "EFFECTIVENESS" && necklaceFormData.subValue2  + "%" }
                                                { necklaceFormData.subOption2 === "EFFECT_RESISTANCE" && necklaceFormData.subValue2  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { necklaceFormData.subOption3 === "NONE" && "-" }
                                                { necklaceFormData.subOption3 === "ATTACK_PER" && "공격력(%)" }
                                                { necklaceFormData.subOption3 === "HEALTH" && "생명력" }
                                                { necklaceFormData.subOption3 === "HEALTH_PER" && "생명력(%)" }
                                                { necklaceFormData.subOption3 === "SPEED" && "속도" }
                                                { necklaceFormData.subOption3 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { necklaceFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { necklaceFormData.subOption3 === "EFFECTIVENESS" && "효과적중" }
                                                { necklaceFormData.subOption3 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { necklaceFormData.subOption3 === "NONE" && "-" }
                                                { necklaceFormData.subOption3 === "ATTACK_PER" && necklaceFormData.subValue3 + "%" }
                                                { necklaceFormData.subOption3 === "HEALTH" && necklaceFormData.subValue3 }
                                                { necklaceFormData.subOption3 === "HEALTH_PER" && necklaceFormData.subValue3  + "%" }
                                                { necklaceFormData.subOption3 === "SPEED" && necklaceFormData.subValue3 }
                                                { necklaceFormData.subOption3 === "CRITICAL_HIT_CHANCE" && necklaceFormData.subValue3  + "%" }
                                                { necklaceFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && necklaceFormData.subValue3  + "%" }
                                                { necklaceFormData.subOption3 === "EFFECTIVENESS" && necklaceFormData.subValue3  + "%" }
                                                { necklaceFormData.subOption3 === "EFFECT_RESISTANCE" && necklaceFormData.subValue3  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { necklaceFormData.subOption4 === "NONE" && "-" }
                                                { necklaceFormData.subOption4 === "ATTACK_PER" && "공격력(%)" }
                                                { necklaceFormData.subOption4 === "HEALTH" && "생명력" }
                                                { necklaceFormData.subOption4 === "HEALTH_PER" && "생명력(%)" }
                                                { necklaceFormData.subOption4 === "SPEED" && "속도" }
                                                { necklaceFormData.subOption4 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { necklaceFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { necklaceFormData.subOption4 === "EFFECTIVENESS" && "효과적중" }
                                                { necklaceFormData.subOption4 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { necklaceFormData.subOption4 === "NONE" && "-" }
                                                { necklaceFormData.subOption4 === "ATTACK_PER" && necklaceFormData.subValue4 + "%" }
                                                { necklaceFormData.subOption4 === "HEALTH" && necklaceFormData.subValue4 }
                                                { necklaceFormData.subOption4 === "HEALTH_PER" && necklaceFormData.subValue4  + "%" }
                                                { necklaceFormData.subOption4 === "SPEED" && necklaceFormData.subValue4 }
                                                { necklaceFormData.subOption4 === "CRITICAL_HIT_CHANCE" && necklaceFormData.subValue4  + "%" }
                                                { necklaceFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && necklaceFormData.subValue4  + "%" }
                                                { necklaceFormData.subOption4 === "EFFECTIVENESS" && necklaceFormData.subValue4  + "%" }
                                                { necklaceFormData.subOption4 === "EFFECT_RESISTANCE" && necklaceFormData.subValue4  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> { necklaceFormData.setEffect === "NONE" ? "세트효과" : necklaceFormData.setEffect } </EstimateEquipmentDescriptionLabel>
                                        </EstimateEquipmentDescription>
                                    </EstimateEquipmentDescriptionLine>
                                    <EstimateEquipmentIcon>
                                        <EstimateEquipmentImage src="/src/assets/banshee_weapon.png" />
                                        <EstimateEquipmentGradeImage src="/src/assets/equip_epic.png" />
                                        <ItemEstimatedGradeLabel color={"purple"}> A </ItemEstimatedGradeLabel>
                                    </EstimateEquipmentIcon>
                                    <EstimateEquipmentDescriptionLine>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { ringFormData.mainOption === "NONE" && "-" }
                                                { ringFormData.mainOption === "ATTACK_PER" && "공격력(%)" }
                                                { ringFormData.mainOption === "HEALTH" && "생명력" }
                                                { ringFormData.mainOption === "HEALTH_PER" && "생명력(%)" }
                                                { ringFormData.mainOption === "SPEED" && "속도" }
                                                { ringFormData.mainOption === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { ringFormData.mainOption === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { ringFormData.mainOption === "EFFECTIVENESS" && "효과적중" }
                                                { ringFormData.mainOption === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { ringFormData.mainOption === "NONE" && "-" }
                                                { ringFormData.mainOption === "ATTACK_PER" && ringFormData.mainValue + "%" }
                                                { ringFormData.mainOption === "HEALTH" && ringFormData.mainValue }
                                                { ringFormData.mainOption === "HEALTH_PER" && ringFormData.mainValue  + "%" }
                                                { ringFormData.mainOption === "SPEED" && ringFormData.mainValue }
                                                { ringFormData.mainOption === "CRITICAL_HIT_CHANCE" && ringFormData.mainValue  + "%" }
                                                { ringFormData.mainOption === "CRITICAL_HIT_DAMAGE" && ringFormData.mainValue  + "%" }
                                                { ringFormData.mainOption === "EFFECTIVENESS" && ringFormData.mainValue  + "%" }
                                                { ringFormData.mainOption === "EFFECT_RESISTANCE" && ringFormData.mainValue  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <DescriptionLine />
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { ringFormData.subOption1 === "NONE" && "-" }
                                                { ringFormData.subOption1 === "ATTACK_PER" && "공격력(%)" }
                                                { ringFormData.subOption1 === "HEALTH" && "생명력" }
                                                { ringFormData.subOption1 === "HEALTH_PER" && "생명력(%)" }
                                                { ringFormData.subOption1 === "SPEED" && "속도" }
                                                { ringFormData.subOption1 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { ringFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { ringFormData.subOption1 === "EFFECTIVENESS" && "효과적중" }
                                                { ringFormData.subOption1 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { ringFormData.subOption1 === "NONE" && "-" }
                                                { ringFormData.subOption1 === "ATTACK_PER" && ringFormData.subValue1 + "%" }
                                                { ringFormData.subOption1 === "HEALTH" && ringFormData.subValue1 }
                                                { ringFormData.subOption1 === "HEALTH_PER" && ringFormData.subValue1  + "%" }
                                                { ringFormData.subOption1 === "SPEED" && ringFormData.subValue1 }
                                                { ringFormData.subOption1 === "CRITICAL_HIT_CHANCE" && ringFormData.subValue1  + "%" }
                                                { ringFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && ringFormData.subValue1  + "%" }
                                                { ringFormData.subOption1 === "EFFECTIVENESS" && ringFormData.subValue1  + "%" }
                                                { ringFormData.subOption1 === "EFFECT_RESISTANCE" && ringFormData.subValue1  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { ringFormData.subOption2 === "NONE" && "-" }
                                                { ringFormData.subOption2 === "ATTACK_PER" && "공격력(%)" }
                                                { ringFormData.subOption2 === "HEALTH" && "생명력" }
                                                { ringFormData.subOption2 === "HEALTH_PER" && "생명력(%)" }
                                                { ringFormData.subOption2 === "SPEED" && "속도" }
                                                { ringFormData.subOption2 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { ringFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { ringFormData.subOption2 === "EFFECTIVENESS" && "효과적중" }
                                                { ringFormData.subOption2 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { ringFormData.subOption2 === "NONE" && "-" }
                                                { ringFormData.subOption2 === "ATTACK_PER" && ringFormData.subValue2 + "%" }
                                                { ringFormData.subOption2 === "HEALTH" && ringFormData.subValue2 }
                                                { ringFormData.subOption2 === "HEALTH_PER" && ringFormData.subValue2  + "%" }
                                                { ringFormData.subOption2 === "SPEED" && ringFormData.subValue2 }
                                                { ringFormData.subOption2 === "CRITICAL_HIT_CHANCE" && ringFormData.subValue2  + "%" }
                                                { ringFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && ringFormData.subValue2  + "%" }
                                                { ringFormData.subOption2 === "EFFECTIVENESS" && ringFormData.subValue2  + "%" }
                                                { ringFormData.subOption2 === "EFFECT_RESISTANCE" && ringFormData.subValue2  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { ringFormData.subOption3 === "NONE" && "-" }
                                                { ringFormData.subOption3 === "ATTACK_PER" && "공격력(%)" }
                                                { ringFormData.subOption3 === "HEALTH" && "생명력" }
                                                { ringFormData.subOption3 === "HEALTH_PER" && "생명력(%)" }
                                                { ringFormData.subOption3 === "SPEED" && "속도" }
                                                { ringFormData.subOption3 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { ringFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { ringFormData.subOption3 === "EFFECTIVENESS" && "효과적중" }
                                                { ringFormData.subOption3 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { ringFormData.subOption3 === "NONE" && "-" }
                                                { ringFormData.subOption3 === "ATTACK_PER" && ringFormData.subValue3 + "%" }
                                                { ringFormData.subOption3 === "HEALTH" && ringFormData.subValue3 }
                                                { ringFormData.subOption3 === "HEALTH_PER" && ringFormData.subValue3  + "%" }
                                                { ringFormData.subOption3 === "SPEED" && ringFormData.subValue3 }
                                                { ringFormData.subOption3 === "CRITICAL_HIT_CHANCE" && ringFormData.subValue3  + "%" }
                                                { ringFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && ringFormData.subValue3  + "%" }
                                                { ringFormData.subOption3 === "EFFECTIVENESS" && ringFormData.subValue3  + "%" }
                                                { ringFormData.subOption3 === "EFFECT_RESISTANCE" && ringFormData.subValue3  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { ringFormData.subOption4 === "NONE" && "-" }
                                                { ringFormData.subOption4 === "ATTACK_PER" && "공격력(%)" }
                                                { ringFormData.subOption4 === "HEALTH" && "생명력" }
                                                { ringFormData.subOption4 === "HEALTH_PER" && "생명력(%)" }
                                                { ringFormData.subOption4 === "SPEED" && "속도" }
                                                { ringFormData.subOption4 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { ringFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { ringFormData.subOption4 === "EFFECTIVENESS" && "효과적중" }
                                                { ringFormData.subOption4 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { ringFormData.subOption4 === "NONE" && "-" }
                                                { ringFormData.subOption4 === "ATTACK_PER" && ringFormData.subValue4 + "%" }
                                                { ringFormData.subOption4 === "HEALTH" && ringFormData.subValue4 }
                                                { ringFormData.subOption4 === "HEALTH_PER" && ringFormData.subValue4  + "%" }
                                                { ringFormData.subOption4 === "SPEED" && ringFormData.subValue4 }
                                                { ringFormData.subOption4 === "CRITICAL_HIT_CHANCE" && ringFormData.subValue4  + "%" }
                                                { ringFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && ringFormData.subValue4  + "%" }
                                                { ringFormData.subOption4 === "EFFECTIVENESS" && ringFormData.subValue4  + "%" }
                                                { ringFormData.subOption4 === "EFFECT_RESISTANCE" && ringFormData.subValue4  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> { ringFormData.setEffect === "NONE" ? "세트효과" : necklaceFormData.setEffect } </EstimateEquipmentDescriptionLabel>
                                        </EstimateEquipmentDescription>
                                    </EstimateEquipmentDescriptionLine>
                                    <EstimateEquipmentIcon>
                                        <EstimateEquipmentImage src="/src/assets/banshee_weapon.png" />
                                        <EstimateEquipmentGradeImage src="/src/assets/equip_epic.png" />
                                        <ItemEstimatedGradeLabel color={"darkred"}> SSS </ItemEstimatedGradeLabel>
                                    </EstimateEquipmentIcon>
                                    <EstimateEquipmentDescriptionLine>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { bootsFormData.mainOption === "NONE" && "-" }
                                                { bootsFormData.mainOption === "ATTACK_PER" && "공격력(%)" }
                                                { bootsFormData.mainOption === "HEALTH" && "생명력" }
                                                { bootsFormData.mainOption === "HEALTH_PER" && "생명력(%)" }
                                                { bootsFormData.mainOption === "SPEED" && "속도" }
                                                { bootsFormData.mainOption === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { bootsFormData.mainOption === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { bootsFormData.mainOption === "EFFECTIVENESS" && "효과적중" }
                                                { bootsFormData.mainOption === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { bootsFormData.mainOption === "NONE" && "-" }
                                                { bootsFormData.mainOption === "ATTACK_PER" && bootsFormData.mainValue + "%" }
                                                { bootsFormData.mainOption === "HEALTH" && bootsFormData.mainValue }
                                                { bootsFormData.mainOption === "HEALTH_PER" && bootsFormData.mainValue  + "%" }
                                                { bootsFormData.mainOption === "SPEED" && bootsFormData.mainValue }
                                                { bootsFormData.mainOption === "CRITICAL_HIT_CHANCE" && bootsFormData.mainValue  + "%" }
                                                { bootsFormData.mainOption === "CRITICAL_HIT_DAMAGE" && bootsFormData.mainValue  + "%" }
                                                { bootsFormData.mainOption === "EFFECTIVENESS" && bootsFormData.mainValue  + "%" }
                                                { bootsFormData.mainOption === "EFFECT_RESISTANCE" && bootsFormData.mainValue  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <DescriptionLine />
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { bootsFormData.subOption1 === "NONE" && "-" }
                                                { bootsFormData.subOption1 === "ATTACK_PER" && "공격력(%)" }
                                                { bootsFormData.subOption1 === "HEALTH" && "생명력" }
                                                { bootsFormData.subOption1 === "HEALTH_PER" && "생명력(%)" }
                                                { bootsFormData.subOption1 === "SPEED" && "속도" }
                                                { bootsFormData.subOption1 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { bootsFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { bootsFormData.subOption1 === "EFFECTIVENESS" && "효과적중" }
                                                { bootsFormData.subOption1 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { bootsFormData.subOption1 === "NONE" && "-" }
                                                { bootsFormData.subOption1 === "ATTACK_PER" && bootsFormData.subValue1 + "%" }
                                                { bootsFormData.subOption1 === "HEALTH" && bootsFormData.subValue1 }
                                                { bootsFormData.subOption1 === "HEALTH_PER" && bootsFormData.subValue1  + "%" }
                                                { bootsFormData.subOption1 === "SPEED" && bootsFormData.subValue1 }
                                                { bootsFormData.subOption1 === "CRITICAL_HIT_CHANCE" && bootsFormData.subValue1  + "%" }
                                                { bootsFormData.subOption1 === "CRITICAL_HIT_DAMAGE" && bootsFormData.subValue1  + "%" }
                                                { bootsFormData.subOption1 === "EFFECTIVENESS" && bootsFormData.subValue1  + "%" }
                                                { bootsFormData.subOption1 === "EFFECT_RESISTANCE" && bootsFormData.subValue1  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { bootsFormData.subOption2 === "NONE" && "-" }
                                                { bootsFormData.subOption2 === "ATTACK_PER" && "공격력(%)" }
                                                { bootsFormData.subOption2 === "HEALTH" && "생명력" }
                                                { bootsFormData.subOption2 === "HEALTH_PER" && "생명력(%)" }
                                                { bootsFormData.subOption2 === "SPEED" && "속도" }
                                                { bootsFormData.subOption2 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { bootsFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { bootsFormData.subOption2 === "EFFECTIVENESS" && "효과적중" }
                                                { bootsFormData.subOption2 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { bootsFormData.subOption2 === "NONE" && "-" }
                                                { bootsFormData.subOption2 === "ATTACK_PER" && bootsFormData.subValue2 + "%" }
                                                { bootsFormData.subOption2 === "HEALTH" && bootsFormData.subValue2 }
                                                { bootsFormData.subOption2 === "HEALTH_PER" && bootsFormData.subValue2  + "%" }
                                                { bootsFormData.subOption2 === "SPEED" && bootsFormData.subValue2 }
                                                { bootsFormData.subOption2 === "CRITICAL_HIT_CHANCE" && bootsFormData.subValue2  + "%" }
                                                { bootsFormData.subOption2 === "CRITICAL_HIT_DAMAGE" && bootsFormData.subValue2  + "%" }
                                                { bootsFormData.subOption2 === "EFFECTIVENESS" && bootsFormData.subValue2  + "%" }
                                                { bootsFormData.subOption2 === "EFFECT_RESISTANCE" && bootsFormData.subValue2  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { bootsFormData.subOption3 === "NONE" && "-" }
                                                { bootsFormData.subOption3 === "ATTACK_PER" && "공격력(%)" }
                                                { bootsFormData.subOption3 === "HEALTH" && "생명력" }
                                                { bootsFormData.subOption3 === "HEALTH_PER" && "생명력(%)" }
                                                { bootsFormData.subOption3 === "SPEED" && "속도" }
                                                { bootsFormData.subOption3 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { bootsFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { bootsFormData.subOption3 === "EFFECTIVENESS" && "효과적중" }
                                                { bootsFormData.subOption3 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { bootsFormData.subOption3 === "NONE" && "-" }
                                                { bootsFormData.subOption3 === "ATTACK_PER" && bootsFormData.subValue3 + "%" }
                                                { bootsFormData.subOption3 === "HEALTH" && bootsFormData.subValue3 }
                                                { bootsFormData.subOption3 === "HEALTH_PER" && bootsFormData.subValue3  + "%" }
                                                { bootsFormData.subOption3 === "SPEED" && bootsFormData.subValue3 }
                                                { bootsFormData.subOption3 === "CRITICAL_HIT_CHANCE" && bootsFormData.subValue3  + "%" }
                                                { bootsFormData.subOption3 === "CRITICAL_HIT_DAMAGE" && bootsFormData.subValue3  + "%" }
                                                { bootsFormData.subOption3 === "EFFECTIVENESS" && bootsFormData.subValue3  + "%" }
                                                { bootsFormData.subOption3 === "EFFECT_RESISTANCE" && bootsFormData.subValue3  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel>
                                                { bootsFormData.subOption4 === "NONE" && "-" }
                                                { bootsFormData.subOption4 === "ATTACK_PER" && "공격력(%)" }
                                                { bootsFormData.subOption4 === "HEALTH" && "생명력" }
                                                { bootsFormData.subOption4 === "HEALTH_PER" && "생명력(%)" }
                                                { bootsFormData.subOption4 === "SPEED" && "속도" }
                                                { bootsFormData.subOption4 === "CRITICAL_HIT_CHANCE" && "치명확률" }
                                                { bootsFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && "치명피해" }
                                                { bootsFormData.subOption4 === "EFFECTIVENESS" && "효과적중" }
                                                { bootsFormData.subOption4 === "EFFECT_RESISTANCE" && "효과저항" }
                                            </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel>
                                                { bootsFormData.subOption4 === "NONE" && "-" }
                                                { bootsFormData.subOption4 === "ATTACK_PER" && bootsFormData.subValue4 + "%" }
                                                { bootsFormData.subOption4 === "HEALTH" && bootsFormData.subValue4 }
                                                { bootsFormData.subOption4 === "HEALTH_PER" && bootsFormData.subValue4  + "%" }
                                                { bootsFormData.subOption4 === "SPEED" && bootsFormData.subValue4 }
                                                { bootsFormData.subOption4 === "CRITICAL_HIT_CHANCE" && bootsFormData.subValue4  + "%" }
                                                { bootsFormData.subOption4 === "CRITICAL_HIT_DAMAGE" && bootsFormData.subValue4  + "%" }
                                                { bootsFormData.subOption4 === "EFFECTIVENESS" && bootsFormData.subValue4  + "%" }
                                                { bootsFormData.subOption4 === "EFFECT_RESISTANCE" && bootsFormData.subValue4  + "%" }
                                            </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> { bootsFormData.setEffect === "NONE" ? "세트효과" : necklaceFormData.setEffect } </EstimateEquipmentDescriptionLabel>
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