//* 검색 버튼에 관한 함수

const searchBar = document.querySelector('.search-txt');
const searchBtn = document.querySelector('.search--btn');

// Navigation Bar의 search 기능
// 검색어를 입력 후 search icon을 누르면 해당 input의 value를 가져온다.
searchBtn.addEventListener('click', () => {
  searchBar.value = '';
});

//* 로그인 & 회원가입에 관한 함수

const loginBtn = document.querySelector('.login');

const signinModal = document.querySelector('#signin');
const closeSignin = document.querySelector('#signin-close');

const loginIncludeSignup = document.querySelector('.move-signup');
const signupModal = document.querySelector('#signup');

const closeSignup = document.querySelector('#signup-close');

// 메인 페이지에서 로그인 버튼이 눌렸을 경우

loginBtn.addEventListener('click', () => {
  signinModal.style.display = 'flex';
});

closeSignin.addEventListener('click', () => {
  signinModal.style.display = 'none';
});

loginIncludeSignup.addEventListener('click', () => {
  signinModal.style.display = 'none';
  signupModal.style.display = 'flex';
});

closeSignup.addEventListener('click', () => {
  signupModal.style.display = 'none';
});
