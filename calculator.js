function calc() {
    var date = $('#buttonInputDate').val();
    var joinDateString = date.split('-');
    var joinYear = Number(joinDateString[0]);
    var joinMonth = Number(joinDateString[1]);
    var joinDay = Number(joinDateString[2]);
    if (joinYear == "" || joinMonth == "" || joinDay == "") {
        alert("날짜를 정확히 선택해주세요.");
        return;
    }
     //연도 월 일 각각 알려주기
    var joinDate = new Date(joinYear, joinMonth - 1, joinDay);
    /*1년 6개월 추가*/
    if (joinMonth <= 6) {
        joinYear += 1;
        joinMonth += 6;
    }
    else {
        joinYear += 2;
        joinMonth -= 6;
    }

    /*말일 계산*/
    if (joinDay == 1) {
        joinMonth -= 1;
        switch (joinMonth) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                joinDay = 31; break;
            case 4: case 6: case 9: case 11:
                joinDay = 30; break;
            case 2:
                joinDay = 28; break;
        }
    }
    else { joinDay -= 1;}
    /* 2월 29, 30, 31일 처리*/
    /* 2월 29일 - 윤년/평년 처리*/
    if (joinMonth == 2 && joinDay == 29) {
        if (joinYear % 4 == 0) {
            if (joinYear % 100 == 0) {
                if (joinYear % 400 != 0) {
                    joinMonth = 3; joinDay = 1;
                }
            }
        }
        else { joinMonth = 3; joinDay = 1; }
    }
    if (joinMonth == 2 && joinDay == 30) {
        if (joinYear % 4 == 0) {
            if (joinYear % 100 == 0) {
                if (joinYear % 400 != 0) {
                    joinDay = 2;
                }
            }
            else { joinDay = 1; }
        }
        else { joinDay = 2; }
        joinMonth = 3;
    }

    var dischargeDate = new Date(joinYear, joinMonth-1, joinDay);
    $("#dischargeDay").html("전역일 : " + dischargeDate.getFullYear() + "년 " + Number(dischargeDate.getMonth()+1) + "월 " + dischargeDate.getDate() + "일 ");
    var currentDate = new Date();
    var totalDays = parseInt((dischargeDate.getTime() - joinDate.getTime())/(1000*60*60*24));
    var leftDays = parseInt((dischargeDate.getTime() - currentDate.getTime())/(1000*60*60*24));
    console.log(totalDays, leftDays);
    var leftPercent = parseInt((totalDays - leftDays)/totalDays*10000)/100;
    if (leftPercent >= 100) {$("#percentLeft").html("전역을 축하드립니다!");}
    else if (leftPercent < 0) {$("#percentLeft").html("입대 이전입니다.");}
    else {$("#percentLeft").html(leftPercent + "% 지났습니다.");}

}
