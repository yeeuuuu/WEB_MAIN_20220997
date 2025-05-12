document.getElementById("search_button_msg").addEventListener("click", search_message);

function search_message() {
  let msg = "검색을 수행합니다!";
  alert(msg);
}

/*
const search_message=()=> {
    const c = '검색을 수행합니다';
    alert(c);
  }
*/

function googleSearch() {
  const searchTerm = document.getElementById("search_input").value; // 검색어로 설정
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