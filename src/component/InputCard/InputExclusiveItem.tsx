import {
    ExclusiveEquipmentOption,
    SpecialItemImage,
    SpecialItemLabel,
    SpecialItemContainer,
    ExclusiveEquipmentDescription,
    ExclusiveItemWrapper,
} from "@/style/Style_EstimateHeroPage.ts";

const InputExclusiveItem = () => {
    return (
        <SpecialItemContainer>
            <SpecialItemLabel> 전용장비 </SpecialItemLabel>
            <ExclusiveItemWrapper>
                <ExclusiveEquipmentOption>
                    <SpecialItemImage src="/src/assets/skill1.png" />
                </ExclusiveEquipmentOption>
                <ExclusiveEquipmentDescription> 해당 스킬의 쿨타임이 1턴 감소합니다. </ExclusiveEquipmentDescription>
            </ExclusiveItemWrapper>
            <ExclusiveItemWrapper>
                <ExclusiveEquipmentOption>
                    <SpecialItemImage src="/src/assets/skill2.png" />
                </ExclusiveEquipmentOption>
                <ExclusiveEquipmentDescription> 해당 스킬 사용 후 자신의 행동게이지가 15% 증가합니다. </ExclusiveEquipmentDescription>
            </ExclusiveItemWrapper>
            <ExclusiveItemWrapper>
                <ExclusiveEquipmentOption>
                    <SpecialItemImage src="/src/assets/skill2.png" />
                </ExclusiveEquipmentOption>
                <ExclusiveEquipmentDescription> 암습이 전체 공격으로 변경됩니다. </ExclusiveEquipmentDescription>
            </ExclusiveItemWrapper>
        </SpecialItemContainer>
    )
}

export default InputExclusiveItem;