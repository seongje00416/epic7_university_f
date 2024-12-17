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
} from "@/style/Style_EstimateHeroPage.ts";
import InputEquipment from '@/component/InputCard/InputEquipment.tsx'
import InputExclusiveItem from "@/component/InputCard/InputExclusiveItem.tsx";
import InputArtifact from "@/component/InputCard/InputArtifact.tsx";

import { useState } from "react";

const EstimateHeroPage = () => {
    const [ item, setItem ] = useState("none");
    const [ weaponIcon, setWeaponIcon ] = useState(["none", "none", false ]);
    const [ helmetIcon, setHelmetIcon ] = useState(["none", "none", false ]);
    const [ armorIcon, setArmorIcon ] = useState(["none", "none", false ]);
    const [ necklaceIcon, setNecklaceIcon ] = useState(["none", "none", false ]);
    const [ ringIcon, setRingIcon ] = useState(["none", "none", false ]);
    const [ bootsIcon, setBootsIcon ] = useState(["none", "none", false ]);

    const changeInputCard = ( itemType:string ) => {
        setItem(itemType);
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
                        <AnnouncementText> * 장비 이미지는 모두 90레벨 제련템으로 표시되지만 실제 능력치는 입력한 값으로 적용됩니다. </AnnouncementText>
                    </AnnouncementCard>
                </AnnouncementContainer>
                <SelectContainer>
                    <SelectCard>
                        <InputGroup>
                            <InputTitle> 영웅 </InputTitle>
                            <SelectBox>
                                <Option> 숲의 현자 비비안 </Option>
                                <Option> 집행관 빌트레드 </Option>
                            </SelectBox>
                        </InputGroup>

                        <InputGroup>
                            <InputTitle> 등급 </InputTitle>
                            <SelectBox>
                                <Option> ⭐⭐⭐⭐⭐ </Option>
                                <Option> ⭐⭐⭐⭐⭐⭐ </Option>
                            </SelectBox>
                        </InputGroup>

                        <InputGroup>
                            <InputTitle> 각성 </InputTitle>
                            <SelectBox>
                                <Option> 0단계 </Option>
                                <Option> 1단계 </Option>
                                <Option> 2단계 </Option>
                                <Option> 3단계 </Option>
                                <Option> 4단계 </Option>
                                <Option> 5단계 </Option>
                                <Option> 6단계 </Option>
                            </SelectBox>
                        </InputGroup>

                        <InputGroup>
                            <InputTitle> 기억각인 </InputTitle>
                            <SelectBox>
                                <Option> 잠김 </Option>
                                <Option> D </Option>
                                <Option> C </Option>
                                <Option> B </Option>
                                <Option> A </Option>
                                <Option> S </Option>
                                <Option> SS </Option>
                                <Option> SSS </Option>
                            </SelectBox>
                        </InputGroup>
                    </SelectCard>
                </SelectContainer>
                <CardContainer>
                    <HeroCard>
                        <HeroImage src = '/src/assets/sylvan_sage_vivian_stand.png' />
                        <ItemContainer>
                            <SpecialItemWrapper>
                                <ExclusiveItemBlank onClick={ () => { changeInputCard("exclusive")} }></ExclusiveItemBlank>
                                <ArtifactBlank onClick={ () => { changeInputCard("artifact")} }></ArtifactBlank>
                            </SpecialItemWrapper>
                            <EquipmentItemWrapper>
                                <EquipmentItemBlank isFilled={weaponIcon[2] as boolean} id="equip_icon_weapon" onClick={ () => { changeInputCard("weapon")} } >
                                    { weaponIcon[0] === "none" && "무기" }
                                    {
                                        weaponIcon[0] !== "none" &&
                                        <EquipmentItemShowWrapper>
                                            <EquipmentItemImage src={'/src/assets/' + weaponIcon[1] }/>
                                            <EquipmentItemGradeImage src={'/src/assets/' + weaponIcon[0] }/>
                                        </EquipmentItemShowWrapper>
                                    }
                                </EquipmentItemBlank>
                                <EquipmentItemBlank isFilled={necklaceIcon[2] as boolean} onClick={ () => { changeInputCard("necklace")} } >
                                    { necklaceIcon[0] === "none" && "목걸이" }
                                    {
                                        necklaceIcon[0] !== "none" &&
                                        <EquipmentItemShowWrapper>
                                            <EquipmentItemImage src={'/src/assets/' + necklaceIcon[1] } />
                                            <EquipmentItemGradeImage src={'/src/assets/' + necklaceIcon[0] }/>
                                        </EquipmentItemShowWrapper>
                                    }
                                </EquipmentItemBlank>
                                <EquipmentItemBlank isFilled={helmetIcon[2] as boolean} onClick={ () => { changeInputCard("helmet")} } >
                                    { helmetIcon[0] === "none" && "투구" }
                                    {
                                        helmetIcon[0] !== "none" &&
                                        <EquipmentItemShowWrapper>
                                            <EquipmentItemImage src={'/src/assets/' + helmetIcon[1] } />
                                            <EquipmentItemGradeImage src={'/src/assets/' + helmetIcon[0] }/>
                                        </EquipmentItemShowWrapper>
                                    }
                                </EquipmentItemBlank>
                                <EquipmentItemBlank isFilled={ringIcon[2] as boolean} onClick={ () => { changeInputCard("ring")} } >
                                    { ringIcon[0] === "none" && "반지" }
                                    {
                                        ringIcon[0] !== "none" &&
                                        <EquipmentItemShowWrapper>
                                            <EquipmentItemImage src={'/src/assets/' + ringIcon[1] } />
                                            <EquipmentItemGradeImage src={'/src/assets/' + ringIcon[0] }/>
                                        </EquipmentItemShowWrapper>
                                    }
                                </EquipmentItemBlank>
                                <EquipmentItemBlank isFilled={armorIcon[2] as boolean} onClick={ () => { changeInputCard("armor")} } >
                                    { armorIcon[0] === "none" && "갑옷" }
                                    {
                                        armorIcon[0] !== "none" &&
                                        <EquipmentItemShowWrapper>
                                            <EquipmentItemImage src={'/src/assets/' + armorIcon[1] } />
                                            <EquipmentItemGradeImage src={'/src/assets/' + armorIcon[0] }/>
                                        </EquipmentItemShowWrapper>
                                    }
                                </EquipmentItemBlank>
                                <EquipmentItemBlank isFilled={bootsIcon[2] as boolean} onClick={ () => { changeInputCard("boots")} } >
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
                        { item === "weapon" && <InputEquipment onChangeIcon={handleEquipmentIconChange} itemType="weapon"/>}
                        { item === "helmet" && <InputEquipment onChangeIcon={handleEquipmentIconChange} itemType="helmet"/>}
                        { item === "armor" && <InputEquipment onChangeIcon={handleEquipmentIconChange} itemType="armor"/>}
                        { item === "necklace" && <InputEquipment onChangeIcon={handleEquipmentIconChange} itemType="necklace"/>}
                        { item === "ring" && <InputEquipment onChangeIcon={handleEquipmentIconChange} itemType="ring"/>}
                        { item === "boots" && <InputEquipment onChangeIcon={handleEquipmentIconChange} itemType="boots"/>}
                    </InputCard>
                </CardContainer>
            </PageWrapper>
        </Container>
    )
}

export default EstimateHeroPage;