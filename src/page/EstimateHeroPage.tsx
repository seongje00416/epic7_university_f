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
    SubSelectBox, CheckBoxLabel, SubInputGroup,
} from "@/style/Style_EstimateHeroPage.ts";
import InputEquipment, { Ref } from '@/component/InputCard/InputEquipment.tsx'
import InputExclusiveItem from "@/component/InputCard/InputExclusiveItem.tsx";
import InputArtifact from "@/component/InputCard/InputArtifact.tsx";

import { useItemForm } from "@/component/hook/useItemForm.ts";
import { HeroStatEnum } from "@/types/Hero.ts";

import {useRef, useState} from "react";

const EstimateHeroPage = () => {
    const [ item, setItem ] = useState("none");
    const [ weaponIcon, setWeaponIcon ] = useState(["none", "none", false ]);
    const [ helmetIcon, setHelmetIcon ] = useState(["none", "none", false ]);
    const [ armorIcon, setArmorIcon ] = useState(["none", "none", false ]);
    const [ necklaceIcon, setNecklaceIcon ] = useState(["none", "none", false ]);
    const [ ringIcon, setRingIcon ] = useState(["none", "none", false ]);
    const [ bootsIcon, setBootsIcon ] = useState(["none", "none", false ]);

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
                            <SelectBox>
                                {/* 추후 DB에서 영웅 정보를 불러오는 방법으로 변경 예정 */}
                                <Option> 숲의 현자 비비안 </Option>
                                <Option> 집행관 빌트레드 </Option>
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
                        { item === "weapon" && <InputEquipment ref={ref} onChangeIcon={handleEquipmentIconChange} formData={weaponFormData} handleChange={handleEquipmentChange} itemType="weapon"/>}
                        { item === "helmet" && <InputEquipment ref={ref} onChangeIcon={handleEquipmentIconChange} formData={helmetFormData} handleChange={handleEquipmentChange} itemType="helmet"/>}
                        { item === "armor" && <InputEquipment ref={ref} onChangeIcon={handleEquipmentIconChange} formData={armorFormData} handleChange={handleEquipmentChange} itemType="armor"/>}
                        { item === "necklace" && <InputEquipment ref={ref} onChangeIcon={handleEquipmentIconChange} formData={necklaceFormData} handleChange={handleEquipmentChange} itemType="necklace"/>}
                        { item === "ring" && <InputEquipment ref={ref} onChangeIcon={handleEquipmentIconChange} formData={ringFormData} handleChange={handleEquipmentChange} itemType="ring"/>}
                        { item === "boots" && <InputEquipment ref={ref} onChangeIcon={handleEquipmentIconChange} formData={bootsFormData} handleChange={handleEquipmentChange} itemType="boots"/>}
                    </InputCard>
                </CardContainer>
                <ResultContainer>
                    <HeroStatResultCard>
                        {
                            Object.entries( HeroStatEnum ).map( ( [key, value] ) => (
                                    <StatResultWrapper key={ "STAT_WRAPPER_" + key }>
                                        <StatResultLabel key={ "STAT_NAME_LABEL_" + key }> { value } </StatResultLabel>
                                        <StatResultValueLabel key={ "LABEL_" + key }> 255 </StatResultValueLabel>
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
                                        <ItemEstimatedGradeLabel color={"red"}> S </ItemEstimatedGradeLabel>
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
                                        <ItemEstimatedGradeLabel color={"red"}> SS </ItemEstimatedGradeLabel>
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
                                        <ItemEstimatedGradeLabel color={"blue"}> C </ItemEstimatedGradeLabel>
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