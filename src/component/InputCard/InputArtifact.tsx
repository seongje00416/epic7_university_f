import {
    SpecialItemContainer,
    SpecialItemLabel,
    SpecialItemImage,
    ArtifactWrapper,
    ArtifactOption,
    ArtifactNameLabel,
    ArtifactFilterWrapper,
    ArtifactFilterOption,
    ArtifactFilterSelect,
    ArtifactFilterLabel
} from "@/style/Style_EstimateHeroPage.ts";

const InputArtifact = () => {
    return (
        <SpecialItemContainer>
            <SpecialItemLabel> 아티팩트 </SpecialItemLabel>
            <ArtifactFilterWrapper>
                <ArtifactFilterLabel> 직업 </ArtifactFilterLabel>
                <ArtifactFilterSelect>
                    <ArtifactFilterOption> 전체 </ArtifactFilterOption>
                    <ArtifactFilterOption> 공통 </ArtifactFilterOption>
                </ArtifactFilterSelect>
                <ArtifactFilterLabel> 등급 </ArtifactFilterLabel>
                <ArtifactFilterSelect>
                    <ArtifactFilterOption> 전체 </ArtifactFilterOption>
                    <ArtifactFilterOption> 4성 </ArtifactFilterOption>
                    <ArtifactFilterOption> 5성 </ArtifactFilterOption>
                </ArtifactFilterSelect>
            </ArtifactFilterWrapper>
            <ArtifactWrapper>
                <ArtifactOption>
                    <SpecialItemImage src="/src/assets/artifacts/artifact_pos.png"/>
                    <ArtifactNameLabel> 포스(P.O.S) </ArtifactNameLabel>
                </ArtifactOption>
                <ArtifactOption>
                    <SpecialItemImage src="/src/assets/artifacts/artifact_pos.png"/>
                    <ArtifactNameLabel> 포스(P.O.S) </ArtifactNameLabel>
                </ArtifactOption>
                <ArtifactOption>
                    <SpecialItemImage src="/src/assets/artifacts/artifact_pos.png"/>
                    <ArtifactNameLabel> 포스(P.O.S) </ArtifactNameLabel>
                </ArtifactOption>
                <ArtifactOption>
                    <SpecialItemImage src="/src/assets/artifacts/artifact_pos.png"/>
                    <ArtifactNameLabel> 포스(P.O.S) </ArtifactNameLabel>
                </ArtifactOption>
            </ArtifactWrapper>
            <ArtifactWrapper>
                <ArtifactOption>
                    <SpecialItemImage src="/src/assets/artifacts/artifact_pos.png"/>
                    <ArtifactNameLabel> 포스(P.O.S) </ArtifactNameLabel>
                </ArtifactOption>
                <ArtifactOption>
                    <SpecialItemImage src="/src/assets/artifacts/artifact_pos.png"/>
                    <ArtifactNameLabel> 포스(P.O.S) </ArtifactNameLabel>
                </ArtifactOption>
                <ArtifactOption>
                    <SpecialItemImage src="/src/assets/artifacts/artifact_pos.png"/>
                    <ArtifactNameLabel> 포스(P.O.S) </ArtifactNameLabel>
                </ArtifactOption>
                <ArtifactOption>
                    <SpecialItemImage src="/src/assets/artifacts/artifact_pos.png"/>
                    <ArtifactNameLabel> 포스(P.O.S) </ArtifactNameLabel>
                </ArtifactOption>
            </ArtifactWrapper>
        </SpecialItemContainer>
    )
}

export default InputArtifact
