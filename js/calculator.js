function calc() {
  let joinYear = Number($("#inputYear").val());
  let joinMonth = Number($("#inputMonth").val());
  let joinDay = Number($("#inputDay").val());
  if (joinYear === "" || joinMonth === "" || joinDay === "") {
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
  if (joinDay === 1) {
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
  if (joinMonth === 2 && joinDay === 29) {
      if (joinYear % 4 === 0) {
          if (joinYear % 100 === 0) {
              if (joinYear % 400 !== 0) {
                  joinMonth = 3; joinDay = 1;
              }
          }
      }
      else { joinMonth = 3; joinDay = 1; }
  }
  if (joinMonth === 2 && joinDay === 30) {
      if (joinYear % 4 === 0) {
          if (joinYear % 100 === 0) {
              if (joinYear % 400 !== 0) {
                  joinDay = 2;
              }
          }
          else { joinDay = 1; }
      }
      else { joinDay = 2; }
      joinMonth = 3;
  }

  const dischargeDate = new Date(joinYear, joinMonth-1, joinDay);

  const result_1 = document.querySelector("#dischargeDay");
  result_1.innerHTML = `<p>예상 전역일은 <b>${dischargeDate.getFullYear()}년 ${Number(dischargeDate.getMonth()+1)}월 ${dischargeDate.getDate()}일</b>이네요!</p>`;

  const result_2 = document.querySelector("#percentLeft");
  const result_3 = document.querySelector("#salaryLeft");
  
  const currentDate = new Date();
  const totalDays = parseInt((dischargeDate.getTime() - joinDate.getTime())/(1000*60*60*24), 10);
  const leftDays = parseInt((dischargeDate.getTime() - currentDate.getTime())/(1000*60*60*24), 10);
  const leftPercent = parseInt((totalDays - leftDays)/totalDays*10000, 10)/100;
  
  // result_2
  if (leftPercent >= 100) {result_2.innerHTML = "<p>전역을 축하드립니다!</p>";}
  else if (leftPercent < 0) {result_2.innerHTML = "<p>입대 이전입니다.</p>";}
  else {result_2.innerHTML = `<p>${currentDate.getFullYear()}년 ${Number(currentDate.getMonth()+1)}월 ${currentDate.getDate()}일을 기준으로 <b>${leftPercent}</b>% 지났습니다.</p>`;}

  // result_3
  let leftMonths = Number();
  if (currentDate.getDate() < 10) {leftMonths = Math.floor(leftDays / 30);}
  else {leftMonths = Math.floor((leftDays / 30) - 1);}
  result_3.innerHTML = `<p><b>월급 ${leftMonths}번</b>만 더 받으면 전역! 미리 축하드립니다 :)</p>`;
}
