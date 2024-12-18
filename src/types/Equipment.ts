// 장비에 필요한 속성 타입 정의
export type EquipSet =
    "ATTACK" | "DEFENSE" | "HEALTH" | "SPEED" | "CRITICAL" | "DESTRUCTION" | "HIT" | "RESIST" | "LIFESTEAL" | "COUNTER" | "UNITY" | "IMMUNITY" |
    "RAGE" | "PENETRATION" | "REVENGE" | "INJURY" | "PROTECTION" | "TORRENT"
export type Grade = "RARE" | "HEROIC" | "EPIC"
export type EquipOption =
    "ATTACK" | "ATTACK_PER" | "HEALTH" | "HEALTH_PER" | "DEFENSE" | "DEFENSE_PER" | "SPEED" | "CRITICAL_HIT_CHANCE" | "CRITICAL_HIT_DAMAGE" |
    "EFFECTIVENESS" | "EFFECT_RESISTANCE" | "NONE"
export type Level =
    "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H"

// 장비에 필요한 열거형 정의
export enum EquipSetEnum {
    ATTACK = "공격의 세트",
    DEFENSE = "방어의 세트",
    HEALTH = "생명의 세트",
    SPEED = "속도의 세트",
    CRITICAL = "치명의 세트",
    DESTRUCTION = "파멸의 세트",
    HIT = "적중의 세트",
    RESIST = "저항의 세트",
    LIFESTEAL = "흡혈의 세트",
    COUNTER = "반격의 세트",
    UNITY = "협공의 세트",
    IMMUNITY = "면역의 세트",
    RAGE = "분노의 세트",
    PENETRATION = "관통의 세트",
    REVENGE = "복수의 세트",
    INJURY = "상처의 세트",
    PROTECTION = "보호의 세트",
    TORRENT = "격류의 세트",
}

export enum EquipGradeEnum {
    EPIC = "전설",
    HEROIC = "영웅",
    RARE = "희귀",
}

export enum EquipOptionEnum {
    ATTACK = "공격력",
    ATTACK_PER = "공격력(%)",
    DEFENSE = "방어력",
    DEFENSE_PER = "방어력(%)",
    HEALTH = "생명력",
    HEALTH_PER = "생명력(%)",
    SPEED = '속도"',
    CRITICAL_HIT_CHANCE = "치명확률",
    CRITICAL_HIT_DAMAGE = "치명피해",
    EFFECTIVENESS = "효과적중",
    EFFECT_RESISTANCE = "효과저항"
}

export enum EquipLevelEnum {
    A = "D레벨",
    B = "71레벨",
    C = "75레벨",
    D = "78레벨",
    E = "80레벨",
    F = "85레벨",
    G = "88레벨",
    H = "90레벨"
}

export interface Equipment {
    equipSet: EquipSet
    enhance: number
    grade: Grade
    mainOption: EquipOption
    mainValue: number
    subOption1: EquipOption
    subValue1: number
    subOption2: EquipOption
    subValue2: number
    subOption3: EquipOption
    subValue3: number
    subOption4: EquipOption
    subValue4: number
}