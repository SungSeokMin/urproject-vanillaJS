// 글쓰기 버튼 활성화 비활성화

const writeBtn = document.querySelector('.write--btn');

if(sessionStorage.getItem('login')) {
  writeBtn.style.display = 'block'
} else {
  writeBtn.style.display = 'none'
}