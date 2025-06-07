/*
function search_message() {
  let msg = "검색을 수행합니다!";
  alert(msg);
}
*/

const search_message=()=> {
    const c = '검색을 수행합니다';
    alert(c);
  }

  document.getElementById("search_button_msg").addEventListener("click", search_message);

function googleSearch() {
  const searchTerm = document.getElementById("search_input").value.trim(); // 검색어로 설정

  // 공백 검사
  if (searchTerm === "") {
    alert("검색어를 입력해주세요.");
    return false;
  }

  // 금지어
  const BWords = ["시발", "씨발", "ㅅㅂ" , "개새끼", "병신"];

  for (let word of BWords) {
    if (searchTerm.includes(word)) {
      alert("부적절한 검색어가 포함되어 있습니다.");
      return false;
    }
  }

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    searchTerm
  )}`;
  // 새 창에서 구글 검색을 수행
  window.open(googleSearchUrl, "_blank"); // 새로운 창에서 열기.
  return false;
}

/*
function search_message() {
  alert("첫 번째 함수입니다.");
}

function search_message() {
  alert("두 번째 함수입니다.");
}
*/

//자바스크립트에서 함수를 중복 사용하면 에러가 발생하진 않고 가장 마지막에 있는 함수가 출력된다. 
//자바스크립트는 같은 함수가 중복되면 가장 마지막에 선언된 함수가 이전 것을 덮어쓰기 때문.