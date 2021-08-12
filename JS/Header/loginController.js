function loginControll() {
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
}
export { loginControll };
