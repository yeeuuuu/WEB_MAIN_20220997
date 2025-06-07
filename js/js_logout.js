import {session_del} from "./js_session.js";

document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  init_logined();
});

function init_logined() {
  if (sessionStorage) {
    decrypt_text(); // 복호화 함수
  } else {
    alert("세션 스토리지 지원 x");
  }
}

// function logout(){
//   session_del(); // 세션 삭제
//   location.href='../index.html';
// }

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
      if (cookie_name[0] === name) {
        return unescape(cookie_name[1]);
      }
    }
  }
  return null;
}


function logout_count() {
  let count = parseInt(getCookie("logout_cnt")) || 0;
  count += 1;
  setCookie("logout_cnt", count, 1);
  console.log("로그아웃 횟수:", count);
}

const check_input = () => {
  logout_count();
  session_del(); // 세션 삭제
  localStorage.removeItem("jwt_token");
  console.log("JWT 토큰이 삭제되었습니다.");
  location.href='../index.html';
};

document.getElementById("logout_btn").addEventListener("click", check_input);