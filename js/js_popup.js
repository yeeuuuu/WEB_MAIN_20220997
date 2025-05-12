/*
function popup() {
  window.open(
    "../popup/popup.html",
    "팝업테스트",
    "width=400, height=300, top=10, left=10"
  );
}
*/
function pop_up() {
  var cookieCheck = getCookie("popupYN");
  if (cookieCheck != "N") {
    window.open(
      "../popup/popup.html",
      "팝업테스트",
      "width=400, height=300, top=10, left=10"
    );
  }
}

/* 
  function 은 함수라는 뜻.
  popup 이라는 함수를 호출하면 윈도우를 오픈한다. 

  파일 경로와 문자열, 가로세로 사이즈, 공백이 나와있음.
  
  */

function show_clock() {
  let currentDate = new Date(); // 현재 시스템 날짜 객체 생성
  let divClock = document.getElementById("divClock");
  let msg = "현재 시간 : ";

  if (currentDate.getHours() > 12) {
    // 12시 보다 크면 오후 아니면 오전
    msg += "오후";
    msg += currentDate.getHours() - 12 + "시";
  } else {
    msg += "오전";
    msg += currentDate.getHours() + "시";
  }

  msg += currentDate.getMinutes() + "분";
  msg += currentDate.getSeconds() + "초";
  divClock.innerText = msg;

  if (currentDate.getMinutes() > 58) {
    //정각 1분전 빨강색 출력
    divClock.style.color = "red";
  }

  setTimeout(show_clock, 1000); //1초마다 갱신
}

/*
function over(obj) {
  obj.src = "../Images/RG_RED.png";
}
  */
const over = (obj) => {
  obj.src = "../Images/RG_RED.png";
};
const search_message = () => {
  const c = "검색을 수행합니다";
  alert(c);
};
function out(obj) {
  obj.src = "../Images/RG_WHITE.png";
}

function setCookie(name, value, expiredays) {
  var date = new Date();
  date.setDate(date.getDate() + expiredays);
  document.cookie =
    escape(name) +
    "=" +
    escape(value) +
    "; expires=" +
    date.toUTCString() +
    "; path=/";
}
function getCookie(name) {
  var cookie = document.cookie;
  console.log("쿠키를 요청합니다.");
  if (cookie != "") {
    var cookie_array = cookie.split("; ");
    for (var index in cookie_array) {
      var cookie_name = cookie_array[index].split("=");
      if (cookie_name[0] == "popupYN") {
        return cookie_name[1];
      }
    }
  }
  return;
}
