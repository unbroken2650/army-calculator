$(function () {
    $("#date").datepicker({
        showOn: "both",
        dateFormat: "yy/mm/dd",
        changeMonth: true,
        changeYear: true,
        prevText: "이전달",
        nextText: "다음달",
        closeText: "닫기",
        showButtonPanel: true,
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        onSelect: function (d) {
            var joinTime = d.split("/");
            var joinYear = Number(joinTime[0]);
            var joinMonth = Number(joinTime[1]);
            var joinDate = Number(joinTime[2]);
            var dischargeTime = [joinYear, joinMonth, joinDate];
            if (dischargeTime[1] >= 7) {
                dischargeTime[1] -= 6;
                dischargeTime[0] += 2;
            }
            else {
                dischargeTime[1] += 6;
                dischargeTime[0] += 1;
            }
            if (dischargeTime[2] == 1) {
                dischargeTime[1] -= 1;
                switch (dischargeTime[1]) {
                    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                        dischargeTime[2] = 31; break;
                    case 4: case 6: case 9: case 11:
                        dischargeTime[2] = 30; break;
                    case 2:
                        dischargeTime[2] = 28; break;
                } //윤년 추가해야 함.
            }
            else {
                dischargeTime[2] -= 1;
            }

            $("#dischargeDay").text(
                "전역일: " + dischargeTime[0] + "년 " + dischargeTime[1] + "월 " + dischargeTime[2] + "일"
            );
            function calcPercent(joinYear, joinMonth, joinDate){
                var dateCurrent = new Date();
                var dateJoin = new Date(joinYear, joinMonth-1, joinDate);
                var dateDischarge = new Date(dischargeTime[0], dischargeTime[1]-1, dischargeTime[2]);
                var diff = dateCurrent.getTime() - dateJoin.getTime();
                diff = Math.floor(diff / (1000*60*60*24) +1);
                var total = dateDischarge.getTime() - dateJoin.getTime();
                total = Math.floor(total / (1000*60*60*24) +1);
                
                var percent = parseInt(diff/total*1000)*0.1;
                $('#percentLeft').text(
                 percent + "% 지났습니다."
                )
            }
            calcPercent(joinYear, joinMonth, joinDate);
        }
    })
})



    
