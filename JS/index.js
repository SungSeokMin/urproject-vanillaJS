// index.html 즉 메인페이지로 오면 localStorage의 detailInfo 없애기
// 상세페이지를 빠져나와서는 굳이 localStorage에 상세정보를 가지고 있을 필요가 없다.
window.addEventListener('load', () => {
  localStorage.removeItem('board_id');
  listEnd.setAttribute('data-value', 'main');
});

/* 글쓰기 버튼 활성화 비활성화 */

const writeBtn = document.querySelector('.write--btn');

if (sessionStorage.getItem('loginInfo')) {
  writeBtn.style.display = 'block';
} else {
  writeBtn.style.display = 'none';
}

/* 최신순 | 추천순 | 내가 쓴 글 | 검색 */

const postContent = document.querySelector('.post-container');

function appendElement(data) {
  for (let i = 0; i < data.length; i++) {
    let { id, thumbnail, title, content, nickname, like } = data[i];
    if (title.length >= 30) title = `${title.substring(0, 30)} ...`;
    if (content.length >= 50) content = `${content.substring(0, 50)}...`;

    postContent.appendChild(makePost(id, thumbnail, title, content, nickname, like));
    postClick();
  }
}

function postClick() {
  const btn = document.querySelectorAll('.post');

  for (let i = 0; i < btn.length; i++) {
    const id = btn[i].dataset.value;

    btn[i].addEventListener('click', async () => {
      let result = await axios.get(`http://localhost:5000/board/${id}`, { Credential: true });

      const { data } = result;

      localStorage.setItem('detailInfo', JSON.stringify(data));
    });
  }
}

// 최신순

const latestBtn = document.querySelector('.latest');

latestBtn.addEventListener('click', async () => {
  listEnd.setAttribute('data-value', 'latest');
  const reqPost = await axios.get('http://localhost:5000/board', { Credential: true });
  const { data } = reqPost;

  while (postContent.hasChildNodes()) {
    postContent.removeChild(postContent.firstChild);
  }

  appendElement(data);
});

// 추천순

const recommendBtn = document.querySelector('.recommend');

recommendBtn.addEventListener('click', async () => {
  listEnd.setAttribute('data-value', 'recommend');
  const reqPost = await axios.get('http://localhost:5000/board', { Credential: true });
  const { data } = reqPost;

  while (postContent.hasChildNodes()) {
    postContent.removeChild(postContent.firstChild);
  }

  const recommendSort = data.sort((a, b) => b.like - a.like);

  appendElement(recommendSort);
});
// 내가 쓴 글

const myContentBtn = document.querySelector('.myContent');

myContentBtn.addEventListener('click', async () => {
  listEnd.setAttribute('data-value', 'mycontent');
  const reqPost = await axios.get('http://localhost:5000/board', { Credential: true });
  const { data } = reqPost;

  while (postContent.hasChildNodes()) {
    postContent.removeChild(postContent.firstChild);
  }

  const myPost = JSON.parse(sessionStorage.getItem('loginInfo'));

  if (myPost) {
    const { user } = myPost;

    const myPostSort = data.filter((post) => {
      const { nickname } = post;
      if (user === nickname) return post;
    });
    appendElement(myPostSort);
  }
});

// 검색

const searchBar = document.querySelector('.search-txt');
const searchBtn = document.querySelector('.search--btn');

/* 맨 위로 버튼 */

const movetoTop = document.querySelector('.moveToTop');

movetoTop.addEventListener('click', () => {
  window.scrollTo(0, 0);
});
