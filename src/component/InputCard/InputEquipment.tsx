import {
    EquipmentContainer,
    EquipmentWrapper,
    EquipmentLabel,
    EquipmentSelect,
    EquipmentOption,
    EquipmentInput,
    EquipmentSubSelect,
} from "@/style/Style_EstimateHeroPage.ts";

const InputEquipment = () => {
    return (
        <EquipmentContainer>
            <EquipmentWrapper>
                <EquipmentLabel> 장비 세트 </EquipmentLabel>
                <EquipmentSelect>
                    <EquipmentOption> 속도의 세트 </EquipmentOption>
                    <EquipmentOption> 치명의 세트 </EquipmentOption>
                    <EquipmentOption> 적중의 세트 </EquipmentOption>
                </EquipmentSelect>
                <EquipmentInput type="number" placeholder="장비 강화 수치"/>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 장비 등급 </EquipmentLabel>
                <EquipmentSelect>
                    <EquipmentOption> 희귀 </EquipmentOption>
                    <EquipmentOption> 영웅 </EquipmentOption>
                    <EquipmentOption> 전설 </EquipmentOption>
                </EquipmentSelect>
                <EquipmentSubSelect>
                    <EquipmentOption> 75레벨 </EquipmentOption>
                    <EquipmentOption> 85레벨 </EquipmentOption>
                    <EquipmentOption> 88레벨 </EquipmentOption>
                    <EquipmentOption> 90레벨 </EquipmentOption>
                </EquipmentSubSelect>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 주 옵션 </EquipmentLabel>
                <EquipmentSelect>
                    <EquipmentOption> 공격력 </EquipmentOption>
                    <EquipmentOption> 공격력(%) </EquipmentOption>
                    <EquipmentOption> 방어력 </EquipmentOption>
                </EquipmentSelect>
                <EquipmentInput type="number" placeholder="수치를 입력하세요"/>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 보조 옵션 1 </EquipmentLabel>
                <EquipmentSelect>
                    <EquipmentOption> 공격력 </EquipmentOption>
                    <EquipmentOption> 공격력(%) </EquipmentOption>
                    <EquipmentOption> 방어력 </EquipmentOption>
                </EquipmentSelect>
                <EquipmentInput type="number" placeholder="수치를 입력하세요"/>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 보조 옵션 2 </EquipmentLabel>
                <EquipmentSelect>
                    <EquipmentOption> 공격력 </EquipmentOption>
                    <EquipmentOption> 공격력(%) </EquipmentOption>
                    <EquipmentOption> 방어력 </EquipmentOption>
                </EquipmentSelect>
                <EquipmentInput type="number" placeholder="수치를 입력하세요"/>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 보조 옵션 3 </EquipmentLabel>
                <EquipmentSelect>
                    <EquipmentOption> 공격력 </EquipmentOption>
                    <EquipmentOption> 공격력(%) </EquipmentOption>
                    <EquipmentOption> 방어력 </EquipmentOption>
                </EquipmentSelect>
                <EquipmentInput type="number" placeholder="수치를 입력하세요"/>
            </EquipmentWrapper>

            <EquipmentWrapper>
                <EquipmentLabel> 보조 옵션 4 </EquipmentLabel>
                <EquipmentSelect>
                    <EquipmentOption> 없음 </EquipmentOption>
                    <EquipmentOption> 공격력 </EquipmentOption>
                    <EquipmentOption> 공격력(%) </EquipmentOption>
                    <EquipmentOption> 방어력 </EquipmentOption>
                </EquipmentSelect>
                <EquipmentInput type="number" placeholder="수치를 입력하세요"/>
            </EquipmentWrapper>
        </EquipmentContainer>
    );
}

export default InputEquipment;