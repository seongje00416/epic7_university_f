import {
    EstimateContainer,
    InputContainer,
    SelectContainer,
    MainContainer,
    SelectedContainer,
    StepContainer,
    Step,
    StepText,
    StepInfo,
    StatContainer, StatWrapper, StatLabel, StatInput, StatSelect, StatOption,
} from "@/style/estimating/Style_EsitmateHeroPage.ts";

const EstimateHeroPage = () => {

    return (
        <MainContainer>
            <EstimateContainer>
                <SelectedContainer>

                </SelectedContainer>
                <SelectContainer>
                    <StepContainer>
                        <Step id="step01" isCurrent={true} >
                            <StepText> 1 </StepText>
                            <StepInfo> 영웅 선택 </StepInfo>
                        </Step>
                        <Step id="step02" isCurrent={false} >
                            <StepText> 2 </StepText>
                            <StepInfo> 능력치 입력 </StepInfo>
                        </Step>
                        <Step id="step03" isCurrent={false} >
                            <StepText> 3 </StepText>
                            <StepInfo> 아티팩트 및 전용장비 입력 </StepInfo>
                        </Step>
                    </StepContainer>
                    <InputContainer id="input_heroSelect" isCurrent = {false} >
                        1111
                    </InputContainer>
                    <InputContainer id="input_statInput" isCurrent = {true}>
                        <StatContainer>
                            <StatWrapper>
                                <StatLabel> 공격력 </StatLabel>
                                <StatInput type="number" />
                            </StatWrapper>
                            <StatWrapper>
                                <StatLabel> 방어력 </StatLabel>
                                <StatInput type="number" />
                            </StatWrapper>
                            <StatWrapper>
                                <StatLabel> 생명력 </StatLabel>
                                <StatInput type="number" />
                            </StatWrapper>
                            <StatWrapper>
                                <StatLabel> 속도 </StatLabel>
                                <StatInput type="number" />
                            </StatWrapper>
                            <StatWrapper>
                                <StatLabel> 치명확률 </StatLabel>
                                <StatInput type="number" />
                            </StatWrapper>
                            <StatWrapper>
                                <StatLabel> 치명피해 </StatLabel>
                                <StatInput type="number" />
                            </StatWrapper>
                            <StatWrapper>
                                <StatLabel> 효과적중 </StatLabel>
                                <StatInput type="number" />
                            </StatWrapper>
                            <StatWrapper>
                                <StatLabel> 효과저항 </StatLabel>
                                <StatInput type="number" />
                            </StatWrapper>
                            <StatWrapper>
                                <StatLabel> 협공확률 </StatLabel>
                                <StatInput type="number" />
                            </StatWrapper>
                            <StatWrapper>
                                <StatLabel></StatLabel>
                                <StatSelect>
                                    <StatOption> 속도의 세트 </StatOption>
                                </StatSelect>
                            </StatWrapper>
                            <StatWrapper>
                                <StatLabel> 세트 효과 </StatLabel>
                                <StatSelect>
                                    <StatOption> 속도의 세트 </StatOption>
                                </StatSelect>
                            </StatWrapper>
                            <StatWrapper>
                                <StatLabel></StatLabel>
                                <StatSelect>
                                    <StatOption> 속도의 세트 </StatOption>
                                </StatSelect>
                            </StatWrapper>
                        </StatContainer>
                    </InputContainer>
                    <InputContainer id="input_equips" isCurrent = {false}>
                        3333
                    </InputContainer>
                </SelectContainer>
            </EstimateContainer>
        </MainContainer>
    )
}

export default EstimateHeroPage;