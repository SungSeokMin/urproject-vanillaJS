import { makeHeader } from './makeHeader.js';
import { loginControll } from '../Header/loginController.js';

makeHeader();

loginControll();

// session에 저장된 detail 정보를 가져와서 화면에 보여준다.
const modifyBtn = document.querySelector('#modify');
const removeBtn = document.querySelector('#remove');

const likeBtn = document.querySelector('#like');
const unLikeBtn = document.querySelector('#unLike');

const boardId = localStorage.board_id ? JSON.parse(localStorage.board_id) : null;

boardId
  ? axios.get(`http://localhost:5000/board/${boardId}`, { Credential: true }).then((res) => {
      const { nickname, title, content } = res.data[0];

      if (sessionStorage.getItem('loginInfo')) {
        const { nickname: userNickname } = JSON.parse(sessionStorage.getItem('loginInfo'));

        if (nickname === userNickname) {
          modifyBtn.style.display = 'inline';
          removeBtn.style.display = 'inline';
        }

        likeBtn.style.display = 'inline';
      }

      const titleEL = document.querySelector('.title');
      const contentEL = document.querySelector('.content');

      titleEL ? (titleEL.textContent = title) : null;
      contentEL ? (contentEL.innerHTML = content) : null;
    })
  : null;

/* 수정 & 삭제 */

// 수정

modifyBtn
  ? modifyBtn.addEventListener('click', () => {
      // createAndUpdatePost.js에서 새 글을 작성할 때와 수정할때 분기를 나눠줬다.
      window.location.href = './createboard.html';
    })
  : null;

// 삭제

removeBtn
  ? removeBtn.addEventListener('click', () => {
      if (confirm('정말로 삭제하시겠습니까?') === true) {
        const id = JSON.parse(localStorage.getItem('board_id'));
        // 삭제 요청
        axios.delete(`http://localhost:5000/board/${id}`).then(() => {
          window.location.href = '/';
        });
      }
    })
  : null;

/* 좋아요 클릭 */

likeBtn
  ? likeBtn.addEventListener('click', () => {
      likeBtn.style.display = 'none';
      unLikeBtn.style.display = 'inline';
    })
  : null;

unLikeBtn
  ? unLikeBtn.addEventListener('click', () => {
      likeBtn.style.display = 'inline';
      unLikeBtn.style.display = 'none';
    })
  : null;
