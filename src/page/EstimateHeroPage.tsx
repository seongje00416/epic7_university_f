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
} from "@/style/Style_EstimateHeroPage.ts";
import InputEquipment from '@/component/InputEquipment'

const EstimateHeroPage = () => {
    return (
        <Container>
            <PageWrapper>
                <AnnouncementContainer>
                    <AnnouncementCard>
                        * 영웅 레벨은 각 등급별 만렙을 기준으로 측정됩니다.
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
                                <ExclusiveItemBlank> dd </ExclusiveItemBlank>
                                <ArtifactBlank> oo </ArtifactBlank>
                            </SpecialItemWrapper>
                            <EquipmentItemWrapper>
                                <EquipmentItemBlank> dd </EquipmentItemBlank>
                                <EquipmentItemBlank> dd </EquipmentItemBlank>
                                <EquipmentItemBlank> dd </EquipmentItemBlank>
                                <EquipmentItemBlank> dd </EquipmentItemBlank>
                                <EquipmentItemBlank> dd </EquipmentItemBlank>
                                <EquipmentItemBlank> dd </EquipmentItemBlank>
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
                        <InputEquipment />
                    </InputCard>
                </CardContainer>
            </PageWrapper>
        </Container>
    )
}

export default EstimateHeroPage;