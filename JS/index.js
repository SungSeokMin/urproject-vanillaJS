import { makePost } from '../JS/Board/makePost';
import '../CSS/index.css';
import '../CSS/reset.css';

const spinner = document.querySelector('.loading');

setTimeout(() => {
  spinner.style.display = 'none';
}, 500);

const listEnd = document.querySelector('.list-end');

if (window.location.pathname === '/') {
  localStorage.removeItem('board_id');
  localStorage.removeItem('detailInfo');
}

window.addEventListener('load', () => {
  listEnd ? listEnd.setAttribute('data-value', 'main') : null;
});

/* 글쓰기 버튼 활성화 비활성화 */

const writeBtn = document.querySelector('.write--btn');

if (sessionStorage.getItem('loginInfo')) {
  writeBtn ? (writeBtn.style.display = 'block') : null;
} else {
  writeBtn ? (writeBtn.style.display = 'none') : null;
}

/* 최신순 | 추천순 | 내가 쓴 글 | 검색 */

const postContent = document.querySelector('.post-container');

function appendElement(data) {
  for (let i = 0; i < data.length; i++) {
    let { id, thumbnail, title, content, nickname, like } = data[i];
    if (title.length >= 30) title = `${title.substring(0, 30)} ...`;
    if (content.length >= 50) content = `${content.substring(0, 50)}...`;

    postContent.appendChild(makePost(id, thumbnail, title, content, nickname, like));
  }
}

function postClick() {
  const btn = document.querySelectorAll('.post');

  for (let i = 0; i < btn.length; i++) {
    const id = btn[i].dataset.value;

    btn[i].addEventListener('click', async () => {
      localStorage.setItem('board_id', JSON.stringify(id));
    });
  }
}

// 최신순

const latestBtn = document.querySelector('.latest');

latestBtn.addEventListener('click', async () => {
  listEnd.setAttribute('data-value', 'latest');
  const reqPost = await axios.get('http://3.95.14.52:5000/board', { Credential: true });
  const { data } = reqPost;

  while (postContent.hasChildNodes()) {
    postContent.removeChild(postContent.firstChild);
  }

  appendElement(data.reverse());
  postClick();
});

// 추천순

const recommendBtn = document.querySelector('.recommend');

recommendBtn.addEventListener('click', async () => {
  listEnd.setAttribute('data-value', 'recommend');
  const reqPost = await axios.get('http://3.95.14.52:5000/board', { Credential: true });
  const { data } = reqPost;

  while (postContent.hasChildNodes()) {
    postContent.removeChild(postContent.firstChild);
  }

  const recommendSort = data.sort((a, b) => b.like - a.like);

  appendElement(recommendSort);
  postClick();
});
// 내가 쓴 글

const myContentBtn = document.querySelector('.myContent');

myContentBtn.addEventListener('click', async () => {
  listEnd.setAttribute('data-value', 'mycontent');
  const reqPost = await axios.get('http://3.95.14.52:5000/board', { Credential: true });
  const { data } = reqPost;

  while (postContent.hasChildNodes()) {
    postContent.removeChild(postContent.firstChild);
  }

  const myPost = JSON.parse(sessionStorage.getItem('loginInfo'));
  if (myPost) {
    const { nickname } = myPost;

    const myPostSort = data.filter((post) => {
      const { nickname: postNickname } = post;
      if (nickname === postNickname) return post;
    });
    appendElement(myPostSort);
    postClick();
  }
});

// 검색

const searchBar = document.querySelector('.search-txt');
const searchBtn = document.querySelector('.search--btn');

searchBtn.addEventListener('click', async () => {
  const searchValue = searchBar.value;

  while (postContent.hasChildNodes()) {
    postContent.removeChild(postContent.firstChild);
  }

  const searchReq = await axios.post('http://3.95.14.52:5000/board/search', {
    title: searchValue,
  });
  const { data } = searchReq;

  appendElement(data);
  postClick();
});

/* 맨 위로 버튼 */

const movetoTop = document.querySelector('.moveToTop');

movetoTop.addEventListener('click', () => {
  window.scrollTo(0, 0);
});
