import {
    EstimateContainer,
    InputContainer,
    SelectContainer,
    MainContainer,
    SelectedContainer,
    StepContainer,
    Step, StepText, StepInfo,
} from "@/style/estimating/Style_EsitmateHeroPage.ts";

const EstimateHeroPage = () => {

    return (
        <MainContainer>
            <EstimateContainer>
                <SelectedContainer>

                </SelectedContainer>
                <SelectContainer>
                    <StepContainer>
                        <Step> 
                            <StepText> 1 </StepText>
                            <StepInfo> 영웅 선택 </StepInfo>
                        </Step>
                        <Step>
                            <StepText> 2 </StepText>
                            <StepInfo> 능력치 입력 </StepInfo>
                        </Step>
                        <Step>
                            <StepText> 3 </StepText>
                            <StepInfo> 아티팩트 및 전용장비 입력 </StepInfo>
                        </Step>
                    </StepContainer>
                    <InputContainer>

                    </InputContainer>
                </SelectContainer>
            </EstimateContainer>
        </MainContainer>
    )
}

export default EstimateHeroPage;