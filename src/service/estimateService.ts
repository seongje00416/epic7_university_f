import Position = HeroAdvantage.Position;
import MainStat = HeroAdvantage.MainStat;

export namespace HeroAdvantage {
    export enum Position {
        DEALER,
        CARE,
        TANKER,
        DE_BUFFER,
    }

    export enum MainStat {
        HEALTH,
        ATTACK,
        DEFENSE
    }

    /*
        ONE_HIT_HIGH_DAMAGE:            단일 누커 딜러 ( 잔영의 비올레토, 방관자 화영 등 )
        MULTI_HIT_HIGH_DAMAGE:          광역 누커 딜러 ( 집행관 빌트레드, 사자왕 체르미아, 혈검 카린 등 )
        ONE_HIT_CONTINUED_DAMAGE:       단일 지속 딜러 ( 비올레토, 전승의 아미키 등)
        MULTI_HIT_CONTINUED_DAMAGE:     광역 지속 딜러 ( 일편고월 벨로나, 여름 방학 샬롯, 벨리안 등 )
        DE_BUFF_DEALER:                 상태 이상 딜러 ( 백은칼날의 아라민타, 남국의 이세리아, 해적 선장 플랑 등 )
        RECOVER_HEALTH:                 아군 회복 케어 ( 빛의 루엘, 로앤나 등 )
        CLEANSE_DE_BUFF:                디버프 제거 케어 ( 에밀리아, 조율자 카웨릭, 메이드 클로에 등 )
        BUFF_OUR_TEAM:                  버프 제공 케어 ( 프리다, 아미드, 지배자 릴리아스 등 )
        AURIUS_TANKER:                  아군 수호 탱커 ( 자유 기사 아로웰, 나락의 세실리아, 창공의 일리나브 등 )
        COUNTER_TANKER:                 딜러 겸용 탱커 ( 라스트 라이더 크라우, 크라우, 율하 등 )
        PRIMARY_TURNER:                 선턴 템포 잡이 ( 란, 페이라, 지오, 낙월 등 )
        CONTINUED_DE_BUFFER:            지속 상태 이상 ( 설국의 솔리타리아, 빛의 천사 안젤리카 등 )
     */
    export enum PlayStyle {
        ONE_HIT_HIGH_DAMAGE,
        MULTI_HIT_HIGH_DAMAGE,
        ONE_HIT_CONTINUED_DAMAGE,
        MULTI_HIT_CONTINUED_DAMAGE,
        DE_BUFF_DEALER,
        RECOVER_HEALTH,
        CLEANSE_DE_BUFF,
        BUFF_OUR_TEAM,
        AURIUS_TANKER,
        COUNTER_TANKER,
        PRIMARY_TURNER,
        CONTINUED_DE_BUFFER
    }
}

export const estimateEquipment = ( equipForm ):string | undefined => {
    let gradeValue:number = 0;
    gradeValue += Number( grading( equipForm.subOption1, equipForm.subValue1 ) );
    gradeValue += Number( grading( equipForm.subOption2, equipForm.subValue2 ) );
    gradeValue += Number( grading( equipForm.subOption3, equipForm.subValue3 ) );
    gradeValue += Number( grading( equipForm.subOption4, equipForm.subValue4 ) );

    console.log( gradeValue )

    if( gradeValue <= 45 ) return "C"
    else if( gradeValue <= 52 ) return "B"
    else if( gradeValue <= 60 ) return "A"
    else if( gradeValue <= 69 ) return "S"
    else if( gradeValue <= 75 ) return "SS"
    else if( gradeValue > 75 ) return "SSS"
}

const grading = ( option:string, value:number ):number => {

    if( option === "ATTACK" ){
        return Math.floor( value / 8 )
    }
    else if( option === "HEALTH" ){
        return Math.floor( value / 30 )
    }
    else if( option === "DEFENSE" ){
        return Math.floor( value / 7 )
    }
    else if( option === "SPEED" ){
        return value * 2;
    }
    else if( option === "CRITICAL_HIT_CHANCE" ){
        return Math.floor( value * 1.5 )
    }
    else if( option === "CRITICAL_HIT_DAMAGE" ){
        return Math.floor( value * 1.2 )
    }
    else {
        return value;
    }
}