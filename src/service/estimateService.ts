
export const estimateEquipment = ( equipForm ):string | undefined => {
    let gradeValue = 0;
    gradeValue += grading( equipForm.subOption1, equipForm.subValue1 );
    gradeValue += grading( equipForm.subOption2, equipForm.subValue2 );
    gradeValue += grading( equipForm.subOption3, equipForm.subValue3 );
    gradeValue += grading( equipForm.subOption4, equipForm.subValue4 );

    if( gradeValue <= 2 ) return "C"
    else if( gradeValue <= 5 ) return "B"
    else if( gradeValue <= 8 ) return "A"
    else if( gradeValue <= 10 ) return "S"
    else if( gradeValue <= 12 ) return "SS"
    else if( gradeValue > 12 ) return "SSS"
}

const grading = ( option:string, value:number ):number => {
    if( option === "ATTACK" ){
        if( value <= 55 ) return 1;
        else if( value <= 110 ) return 2;
        else if( value <= 165 ) return 3;
        else if( value <= 220 ) return 4;
        else if( value <= 275 ) return 5;
        else if( value <= 329 ) return 6;
    }
    else if( option === "HEALTH" ){
        if( value <= 236 ) return 1;
        else if( value <= 472 ) return 2;
        else if( value <= 708 ) return 3;
        else if( value <= 944 ) return 4;
        else if( value <= 1179 ) return 5;
        else if( value <= 1414 ) return 6;
    }
    else if( option === "DEFENSE" ){
        if( value <= 40 ) return 1;
        else if( value <= 80 ) return 2;
        else if( value <= 120 ) return 3;
        else if( value <= 160 ) return 4;
        else if( value <= 199 ) return 5;
        else if( value <= 238 ) return 6;
    }
    else if( option === "SPEED" ){
        if( value <= 4 ) return 1;
        else if( value <= 10 ) return 2;
        else if( value <= 14 ) return 3;
        else if( value <= 17 ) return 4;
        else if( value <= 20 ) return 5;
        else if( value > 20 ) return 6;
    }
    else if( option === "CRITICAL_HIT_CHANCE" ){
        if( value <= 6 ) return 1;
        else if( value <= 10 ) return 2;
        else if( value <= 14 ) return 3;
        else if( value <= 18 ) return 4;
        else if( value <= 21 ) return 5;
        else if( value > 21 ) return 6;
    }
    else if( option === "CRITICAL_HIT_DAMAGE" ){
        if( value <= 8 ) return 1;
        else if( value <= 13 ) return 2;
        else if( value <= 18 ) return 3;
        else if( value <= 23 ) return 4;
        else if( value <= 28 ) return 5;
        else if( value > 28 ) return 6;
    }
    else {
        if( value <= 10 ) return 1;
        else if( value <= 15 ) return 2;
        else if( value <= 19 ) return 3;
        else if( value <= 23 ) return 4;
        else if( value <= 28 ) return 5;
        else if( value > 28 ) return 6;
        else return 0;
    }
    return 0;
}