function loginControll() {
  //* 로그인 & 회원가입에 관한 함수
  const loginBtn = document.querySelector('.login');
  const logoutBtn = document.querySelector('.logout');

  const signinModal = document.querySelector('#signin');
  const signinBtn = document.querySelector('.signin--btn');

  const signupModal = document.querySelector('#signup');

  const closeSignin = document.querySelector('#signin-close');
  const closeSignup = document.querySelector('#signup-close');

  const loginIncludeSignup = document.querySelector('.move-signup');

  const emailInput = document.querySelector('.email');
  const passwordInput = document.querySelector('.password');

  // 메인 페이지에서 로그인 버튼이 눌렸을 경우

  loginBtn.addEventListener('click', () => {
    signinModal.style.display = 'flex';
  });

  signinBtn.addEventListener('click', () => {
    // axios 요청 보내기 => 로그인 성공 || 실패

    const email = 'jkl1545';
    const password = '1234';

    if (email !== emailInput.value || password !== passwordInput.value) {
      alert('사용자 정보를 다시 입력해주세요');
    } else {
      // 로그인 버튼 숨기고 로그아웃 버튼 보여주기
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'block';

      const info = {
        user: email,
        isCheck: true,
      };
      sessionStorage.setItem('loginInfo', JSON.stringify(info));

      window.location.href = '/index.html';
    }
  });

  logoutBtn.addEventListener('click', () => {
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';

    sessionStorage.removeItem('loginInfo');
    window.location.href = '/index.html';
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
