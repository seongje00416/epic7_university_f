export enum HeroStatEnum {
    ATTACK = "공격력",
    DEFENSE = "방어력",
    HEALTH = "생명력",
    SPEED = "속도",
    CRITICAL_HIT_CHANCE = "치명확률",
    CRITICAL_HIT_DAMAGE = "치명피해",
    EFFECTIVENESS = "효과적중",
    EFFECT_RESISTANCE = "효과저항",
    DUAL_ATTACK_CHANCE = "협공확률"
}

export interface HeroStat {
    attack: number
    defense: number
    health: number
    speed: number
    criticalHitChance: number
    criticalHitDamage: number
    effectiveness: number
    effectResistance: number
    dualAttackChance: number
}

export interface Hero {
    id: number;
    name: string;
    grade: number;
    imprintRelease: string;
    irIncrease: number;
    irBase: number;
    importConcentration: string;
    icIncrease: number;
    icBase: number;
    imageURL: string;
    heroClass: string;
    constellation: string;
}