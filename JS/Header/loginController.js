/* 유효성 검사 */

function inspectInput(target, word) {
  if (target === 'email') {
    const reg_email =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!reg_email.test(word)) {
      return false;
    } else return true;
  } else if (target === 'password') {
    // 숫자 + 영문 + 특수문자 8~16자리
    const reg_password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
    if (!reg_password.test(word)) {
      return false;
    } else return true;
  } else {
    // nickname
    if (word.length < 2) return false;
    else return true;
  }
}

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

  const signinEmail = document.querySelector('.email');
  const signinPassword = document.querySelector('.password');

  const signupBtn = document.querySelector('.signup--btn');

  const signupEmail = document.querySelector('.signup-email');
  const signupNickname = document.querySelector('.signup-nickname');
  const signupPassword = document.querySelector('.signup-password');

  // 메인 페이지에서 로그인 버튼이 눌렸을 경우

  loginBtn.addEventListener('click', async () => {
    signinModal.style.display = 'flex';
  });

  signinBtn.addEventListener('click', async () => {
    // axios 요청 보내기 => 로그인 성공 || 실패
    const email = signinEmail.value;
    const password = signinPassword.value;

    // 유효성 검사
    if (!inspectInput('email', email)) {
      alert('이메일 형식이 옳바르지 않습니다.');
      return;
    } else if (!inspectInput('password', password)) {
      alert('숫자, 영문으로 이루어진 8 ~ 16자리 비밀번호만 가능합니다.');
      return;
    }

    const loginReq = await axios.post(
      'http://localhost:5000/user/login',
      {
        email,
        password,
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
      return;
    } else if (message === 'password check') {
      alert('비밀번호를 다시 확인해주세요.');
      return;
    }
  });

  logoutBtn.addEventListener('click', async () => {
    const myPageBtn = document.querySelector('.mypage--btn');
    myPageBtn.style.display = 'none';

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

  signupBtn.addEventListener('click', async () => {
    const email = signupEmail.value;
    const password = signupPassword.value;
    const nickname = signupNickname.value;

    if (!inspectInput('email', email)) {
      alert('이메일 형식이 옳바르지 않습니다.');
      return;
    } else if (!inspectInput('password', password)) {
      alert('숫자, 영문, 특수문자로 이루어진 8 ~ 16자리 비밀번호만 가능합니다.');
      return;
    } else if (!inspectInput('nickname', nickname)) {
      alert('1자리 이상의 닉네임만 가능합니다.');
      return;
    }

    const signupReq = await axios.post(
      'http://localhost:5000/user/signUp',
      {
        email,
        nickname,
        password,
      },
      { withCredentials: true }
    );

    const { message } = signupReq.data;

    if (message === 'signup Ok') {
      window.location.href = '/index.html';
    } else if (message === 'email already exist') {
      alert('중복된 이메일 입니다.');
      signupEmail.focus();
      return;
    } else if (message === 'nickname already exist') {
      alert('중복된 닉네임 입니다.');
      signupNickname.focus();
      return;
    }
  });

  closeSignup.addEventListener('click', () => {
    signupModal.style.display = 'none';
  });
}

export { loginControll };
