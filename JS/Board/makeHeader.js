function makeHeader() {
  const header = document.querySelector('.nav-container');
  const signinModal = document.querySelector('#signin');
  const signupModal = document.querySelector('#signup');

  const getLoginSession = sessionStorage.getItem('loginInfo');

  const loginOrLogoutBtn = getLoginSession
    ? `<button class="login" style="display: none">로그인</button><button class="logout">로그아웃</button>`
    : `<button class="login">로그인</button><button class="logout" style="display: none">로그아웃</button>`;

  /*
  const myPageBtn = getLoginSession
    ? `<button class="mypage--btn" style="display: none">마이페이지</button>`
    : `<button class="mypage--btn" style="display: none">마이페이지</button>`;
 */
  const headerContent = `
    <a href="/">
      <img class="logo" src="/images/main-logo-purple.jpeg" alt="메인로고" />
    </a>
    <div class="right-items">
      <div class="search-box">
        <input type="text" class="search-txt" placeholder="검색어를 입력하세요." />
        <button class="search--btn" href="#">
          <i class="fas fa-search"></i>
        </button>
      </div>
      ${loginOrLogoutBtn}
      ${myPageBtn}
    </div>
`;

  const signinContent = `
    <div class="login-box">
      <div class="img-container">
        <img src="/images/login.svg" alt="login" />
      </div>
      <div class="input-container">
        <i class="fas fa-times" id="signin-close"></i>

        <span>로그인</span>

        <div class="info-container">
          <b>E-mail</b>
          <input type="text" class="email"/>
          <b>Password</b>
          <input type="password" class="password"/>
          <button class="signin--btn">로그인</button>
        </div>

        <div class="move-signup-container">
          <span>아직 회원이 아니신가요? </span><button class="move-signup">회원가입</button>
        </div>
      </div>
    </div>
`;

  const signupContent = `
    <div class="login-box">
      <div class="img-container">
        <img src="/images/welcome.svg" alt="login" />
      </div>
      <div class="input-container">
        <i class="fas fa-times" id="signup-close"></i>

        <span>회원가입</span>

        <div class="info-container">
          <b>E-mail</b>
          <input type="text" class="signup-email" />
          <b>Nickname</b>
          <input type="text" class="signup-nickname"/>
          <b>Password</b>
          <input type="password" class="signup-password"/>
          <button class="signup--btn">회원가입</button>
        </div>
      </div>
    </div>
`;

  header.innerHTML = headerContent;
  signinModal.innerHTML = signinContent;
  signupModal.innerHTML = signupContent;
}

export { makeHeader };
