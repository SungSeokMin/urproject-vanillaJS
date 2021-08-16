import { makeHeader } from './makeHeader.js';
import { loginControll } from '../Header/loginController.js';

makeHeader();

loginControll();

// session에 저장된 detail 정보를 가져와서 화면에 보여준다.
const modifyBtn = document.querySelector('#modify');
const removeBtn = document.querySelector('#remove');

const { nickname, title, content } = JSON.parse(localStorage.detailInfo);

if (sessionStorage.getItem('loginInfo')) {
  const { user: userNickname } = JSON.parse(sessionStorage.getItem('loginInfo'));

  if (nickname === userNickname) {
    modifyBtn.style.display = 'inline';
    removeBtn.style.display = 'inline';
  }
}

const titleEL = document.querySelector('.title');
const contentEL = document.querySelector('.content');

titleEL.textContent = title;
contentEL.innerHTML = content;

/* 수정 & 삭제 */

// 수정

modifyBtn.addEventListener('click', () => {
  window.location.href = '../../HTML/createboard.html';
  // createAndUpdatePost.js에서 새 글을 작성할 때와 수정할때 분기를 나눠줬다.
});

// 삭제
