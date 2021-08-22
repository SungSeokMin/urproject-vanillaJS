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

  loginBtn.addEventListener('click', async () => {
    signinModal.style.display = 'flex';
  });

  signinBtn.addEventListener('click', async () => {
    // axios 요청 보내기 => 로그인 성공 || 실패

    const loginReq = await axios.post(
      'http://localhost:5000/user/login',
      {
        email: emailInput.value,
        password: passwordInput.value,
      },
      { withCredentials: true }
    );

    const { message, nickname } = loginReq.data;

    if (loginReq.status === 200 || message === 'login Ok') {
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'block';

      const info = {
        nickname,
        isCheck: true,
      };
      sessionStorage.setItem('loginInfo', JSON.stringify(info));

      window.location.href = '/index.html';
    } else if (message === 'email check') {
      alert('이메일을 다시 확인해주세요.');
    } else if (message === 'password check') {
      alert('비밀번호를 다시 확인해주세요.');
    }
  });

  logoutBtn.addEventListener('click', async () => {
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';

    await axios.get('http://localhost:5000/user/logout', { withCredentials: true });

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
