import { session_set, session_get, session_check, session_del } from "./js_session.js";
import { encrypt_text, decrypt_text } from "./js_crypto.js";
import { generateJWT, checkAuth } from "./js_jwt_token.js";

function init() {
  // 로그인 폼에 쿠키에서 가져온 아이디 입력
  const emailInput = document.getElementById("typeEmailX");
  const idsave_check = document.getElementById("idSaveCheck");
  let get_id = getCookie("id");
  if (get_id) {
    emailInput.value = get_id;
    idsave_check.checked = true;
  }
  session_check(); // 세션 유무 검사
}

document.addEventListener("DOMContentLoaded", () => {
  init();
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

const check_xss = (input) => {
  // DOMPurify 라이브러리 로드 (CDN 사용)
  const DOMPurify = window.DOMPurify;

  // 입력 값을 DOMPurify로 sanitize
  const sanitizedInput = DOMPurify.sanitize(input);

  // Sanitized된 값과 원본 입력 값 비교
  if (sanitizedInput !== input) {
    // XSS 공격 가능성 발견 시 에러 처리
    alert("XSS 공격 가능성이 있는 입력값을 발견했습니다.");
    return false;
  }
  
  // Sanitized된 값 반환
  return sanitizedInput;
};

function setCookie(name, value, expiredays) {
  var date = new Date();
  date.setDate(date.getDate() + expiredays);
  document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/" + ";SameSite=None; Secure";
}
function getCookie(name) {
  var cookie = document.cookie;
  console.log("쿠키를 요청합니다.");
  if (cookie != "") {
    var cookie_array = cookie.split("; ");
    for (var index in cookie_array) {
      var cookie_name = cookie_array[index].split("=");
  //     if (cookie_name[0] == "id") {
  //       return cookie_name[1];
  //     }
  //   }
  // }
  // return;
      if (cookie_name[0] === name) {
        return unescape(cookie_name[1]);
      }
    }
  }
  return null;
}

function login_count() {
  let count = parseInt(getCookie("login_cnt")) || 0;
  count += 1;
  setCookie("login_cnt", count, 1);
  console.log("로그인 횟수:", count);
}

function logout_count() {
  let count = parseInt(getCookie("logout_cnt")) || 0;
  count += 1;
  setCookie("logout_cnt", count, 1);
  console.log("로그아웃 횟수:", count);
}

function logout(){
  logout_count();
  session_del(); // 세션 삭제
  location.href='../index.html';
}

function login_failed(){
  let failCount = parseInt(getCookie("login_failed_cnt")) || 0;
  failCount += 1;
  setCookie("login_failed_cnt", failCount, 1); // 1일 저장

  const statusElement = document.getElementById("login_status");

  if(failCount >= 5){
    alert("로그인 가능 횟수를 초과했습니다. 로그인 기능이 제한됩니다.")
    if (statusElement) {
      statusElement.innerText = `로그인 제한 상태입니다. (실패 횟수: ${failCount}회)`;
    }
    return false;
  }
  else {
    if (statusElement) {
      statusElement.innerText = `로그인 실패 횟수: ${failCount}회 (5회 이상 시 제한됩니다)`;
    }
  }

  return true;
}

const check_input = () => {
  const loginForm = document.getElementById("login_form");
  const loginBtn = document.getElementById("login_btn");
  const emailInput = document.getElementById("typeEmailX");
  const passwordInput = document.getElementById("typePasswordX");

  // 전역 변수 추가, 맨 위 위치
  const idsave_check = document.getElementById("idSaveCheck");

  login_count();

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  const sanitizedPassword = check_xss(passwordValue);
  // check_xss 함수로 비밀번호 Sanitize
  const sanitizedEmail = check_xss(emailValue);
  // check_xss 함수로 비밀번호 Sanitize

  const payload = {
    id: emailValue,
    exp: Math.floor(Date.now() / 1000) + 3600, // 1시간 (3600초)
  };
  const jwtToken = generateJWT(payload);

  if (emailValue === "") {
    alert("이메일을 입력하세요.");
    login_failed();
    return false;
  }

  if (passwordValue === "") {
    alert("비밀번호를 입력하세요.");
    login_failed();
    return false;
  }

  if (emailValue.length < 10) {
    alert("이메일은 최소 10글자 이상 입력해야 합니다.");
    login_failed();
    return false;
  }

  if (passwordValue.length < 15) {
    alert("비밀번호는 반드시 15글자 이상 입력해야 합니다.");
    login_failed();
    return false;
  }

  const hasSpecialChar =
    passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
  if (!hasSpecialChar) {
    alert("패스워드는 특수문자를 1개 이상 포함해야 합니다.");
    login_failed();
    return false;
  }

  const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
  const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
  if (!hasUpperCase || !hasLowerCase) {
    alert("패스워드는 대소문자를 1개 이상 포함해야 합니다.");
    login_failed();
    return false;
  }

  const Pattern = /(.{3,})\1/;
  if (Pattern.test(passwordValue)) {
    alert("패스워드에 3글자 이상 반복된 문자열을 입력할 수 없습니다.");
    login_failed();
    return false;
  }

  const NumberPattern = /(\d{2,})\1+/;
  if (NumberPattern.test(passwordValue)) {
    alert("패스워드에 2개 이상 숫자를 반복 입력할 수 없습니다.");
    login_failed();
    return false;
  }
  
  if (!sanitizedEmail) {
    // Sanitize된 비밀번호 사용
    return false;
  }
  if (!sanitizedPassword) {
    // Sanitize된 비밀번호 사용
    return false;
  }

  // 검사 마무리 단계 쿠키 저장, 최하단 submit 이전
  if (idsave_check.checked == true) {
    // 아이디 체크 o
    alert("쿠키를 저장합니다.", emailValue);
    setCookie("id", emailValue, 1); // 1일 저장
    alert("쿠키 값 :" + emailValue);
  } else {
    // 아이디 체크 x
    setCookie("id", emailValue.value, 0); //날짜를 0 - 쿠키 삭제
  }

  console.log("이메일:", emailValue);
  console.log("비밀번호:", passwordValue);

  session_set(); // 세션 생성
  localStorage.setItem("jwt_token", jwtToken);
  loginForm.submit();
  setCookie("login_failed_cnt", 0, 1);
};

document.getElementById("login_btn").addEventListener("click", check_input);