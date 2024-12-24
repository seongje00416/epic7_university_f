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
import { Equipment } from "@/types/Equipment.ts";

const EstimateHeroPage = () => {
    const [ item, setItem ] = useState("none");
    const [ weaponIcon, setWeaponIcon ] = useState(["none", "none", false ]);
    const [ helmetIcon, setHelmetIcon ] = useState(["none", "none", false ]);
    const [ armorIcon, setArmorIcon ] = useState(["none", "none", false ]);
    const [ necklaceIcon, setNecklaceIcon ] = useState(["none", "none", false ]);
    const [ ringIcon, setRingIcon ] = useState(["none", "none", false ]);
    const [ bootsIcon, setBootsIcon ] = useState(["none", "none", false ]);

    const [ weapon, setWeapon ] = useState<Equipment[]>([])
    const [ helmet, setHelmet ] = useState<Equipment[]>([])
    const [ armor, setArmor ] = useState<Equipment[]>([])
    const [ necklace, setNecklace ] = useState<Equipment[]>([])
    const [ ring, setRing ] = useState<Equipment[]>([])
    const [ boots, setBoots ] = useState<Equipment[]>([])

    const [ attack, setAttack ] = useState([0, 0]);
    const [ defense, setDefense ] = useState([0, 0]);
    const [ health, setHealth ] = useState([0, 0]);
    const [ criticalChance, setCriticalChance ] = useState([0, 0]);
    const [ criticalDamage, setCriticalDamage ] = useState([0, 0]);
    const [ speed, setSpeed ] = useState([0, 0]);
    const [ effectiveness, setEffectiveness ] = useState([0, 0]);
    const [ effectResistance, setEffectResistance ] = useState([0, 0]);
    const [ dualAttackChance, setDualAttackChance ] = useState([0, 0]);

    const [ heros, setHeros ] = useState<HeroShow[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);

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
    const changeInputCard = ( itemType:string ) => {
        setItem(itemType);
        setTimeout(() => {
            ref.current?.settingInputCard();
        }, 0);
    }
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

    // 장비 스탯 적용 함수
    const applyEquipmentStat = ( stat:string, value:number, isPercent: boolean ) => {
        switch( stat ) {
            case "ATTACK" :
                {
                    let updatedValue = 0;
                    if( isPercent ) updatedValue = attack[0] + ( attack[0] * ( value / 100 ) )
                    else updatedValue = attack[0] + Number(value)
                    setAttack( [ attack[0], updatedValue ] );
                    break
                }
            case "DEFENSE" :
                {
                    let updatedValue = 0;
                    if( isPercent ) updatedValue = defense[0] + ( defense[0] * ( value / 100 ) )
                    else updatedValue = defense[0] + Number(value)
                    setDefense( [ defense[0], updatedValue ] );
                    break
                }
        }
    }


    // API 호출 함수
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
                                        <EstimateEquipmentImage src="/src/assets/banshee_weapon.png" />
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
                                            <EstimateEquipmentDescriptionLabel> { weaponFormData.setEffect === "NONE" && "세트효과" } </EstimateEquipmentDescriptionLabel>
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
                                            <EstimateEquipmentDescriptionLabel> { helmetFormData.setEffect === "NONE" && "세트효과" } </EstimateEquipmentDescriptionLabel>
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
                                            <EstimateEquipmentDescriptionLabel> 치명확률 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 100% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 치명피해 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 23% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 치명확률 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 100% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 치명확률 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 100% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 속도의 세트 </EstimateEquipmentDescriptionLabel>
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
                                            <EstimateEquipmentDescriptionLabel> 속도 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 45 </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <DescriptionLine />
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 치명확률 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 100% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 치명피해 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 23% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 치명확률 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 100% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 치명확률 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 100% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 속도의 세트 </EstimateEquipmentDescriptionLabel>
                                        </EstimateEquipmentDescription>
                                    </EstimateEquipmentDescriptionLine>
                                    <EstimateEquipmentIcon>
                                        <EstimateEquipmentImage src="/src/assets/banshee_weapon.png" />
                                        <EstimateEquipmentGradeImage src="/src/assets/equip_epic.png" />
                                        <ItemEstimatedGradeLabel color={"purple"}> A </ItemEstimatedGradeLabel>
                                    </EstimateEquipmentIcon>
                                    <EstimateEquipmentDescriptionLine>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 속도 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 45 </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <DescriptionLine />
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 치명확률 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 100% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 치명피해 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 23% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 치명확률 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 100% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 치명확률 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 100% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 속도의 세트 </EstimateEquipmentDescriptionLabel>
                                        </EstimateEquipmentDescription>
                                    </EstimateEquipmentDescriptionLine>
                                    <EstimateEquipmentIcon>
                                        <EstimateEquipmentImage src="/src/assets/banshee_weapon.png" />
                                        <EstimateEquipmentGradeImage src="/src/assets/equip_epic.png" />
                                        <ItemEstimatedGradeLabel color={"darkred"}> SSS </ItemEstimatedGradeLabel>
                                    </EstimateEquipmentIcon>
                                    <EstimateEquipmentDescriptionLine>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 속도 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 45 </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <DescriptionLine />
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 치명확률 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 100% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 치명피해 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 23% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 치명확률 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 100% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 치명확률 </EstimateEquipmentDescriptionLabel>
                                            <EstimateEquipmentDescriptionValueLabel> 100% </EstimateEquipmentDescriptionValueLabel>
                                        </EstimateEquipmentDescription>
                                        <EstimateEquipmentDescription>
                                            <EstimateEquipmentDescriptionLabel> 속도의 세트 </EstimateEquipmentDescriptionLabel>
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