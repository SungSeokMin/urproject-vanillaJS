function loginControll() {
  //* 로그인 & 회원가입에 관한 함수
  const loginBtn = document.querySelector('.login');
  const logoutBtn = document.querySelector('.logout');

  const signinModal = document.querySelector('#signin');
  const signinBtn = document.querySelector('.signin--btn');

  const closeSignin = document.querySelector('#signin-close');
  const closeSignup = document.querySelector('#signup-close');

  const signupModal = document.querySelector('#signup');
  
  const loginIncludeSignup = document.querySelector('.move-signup');

  // 메인 페이지에서 로그인 버튼이 눌렸을 경우

  loginBtn.addEventListener('click', () => {
    signinModal.style.display = 'flex';
  });

  signinBtn.addEventListener('click', () => {
  
    // axios 요청 보내기 => 로그인 성공 || 실패

    // 로그인 버튼 숨기고 로그아웃 버튼 보여주기
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'block';

      sessionStorage.setItem('login', true);

      window.location.href = "/index.html"
  })

  logoutBtn.addEventListener('click', () => {
    loginBtn.style.display = 'block';
      logoutBtn.style.display = 'none';

      sessionStorage.removeItem('login');
      window.location.href = "/index.html"
  })

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
