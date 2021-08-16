// index.html 즉 메인페이지로 오면 localStorage의 detailInfo 없애기
// 상세페이지를 빠져나와서는 굳이 localStorage에 상세정보를 가지고 있을 필요가 없다.
window.addEventListener('load', () => {
  localStorage.removeItem('detailInfo');
});

/* 글쓰기 버튼 활성화 비활성화 */

const writeBtn = document.querySelector('.write--btn');

if (sessionStorage.getItem('loginInfo')) {
  writeBtn.style.display = 'block';
} else {
  writeBtn.style.display = 'none';
}

/* 최신순 | 추천순 | 내가 쓴 글 */

const postContent = document.querySelector('.post-container');

function appendElement(data) {
  while (postContent.hasChildNodes()) {
    postContent.removeChild(postContent.firstChild);
  }

  for (let i = 0; i < data.length; i++) {
    let { id, title, content, nickname, like } = data[i];

    if (title.length >= 30) title = `${title.substring(0, 30)} ...`;
    if (content.length >= 80) content = `${content.substring(0, 50)}...`;

    postContent.appendChild(makePost(id, title, content, nickname, like));
  }
}

function postClick() {
  const btn = document.querySelectorAll('.post');

  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', async () => {
      let result = await axios.get(`http://localhost:5000/board/${i + 1}`, { Credential: true });

      const { data } = result;

      localStorage.setItem('detailInfo', JSON.stringify(data));
    });
  }
}

// 최신순

const latestBtn = document.querySelector('.latest');

latestBtn.addEventListener('click', async () => {
  const reqPost = await axios.get('http://localhost:5000/board', { Credential: true });
  const { data } = reqPost;

  appendElement(data);
  postClick();
});

// 추천순

const recommendBtn = document.querySelector('.recommend');

recommendBtn.addEventListener('click', async () => {
  const reqPost = await axios.get('http://localhost:5000/board', { Credential: true });
  const { data } = reqPost;

  const recommendSort = data.sort((a, b) => b.like - a.like);

  appendElement(recommendSort);
  postClick();
});
// 내가 쓴 글

const myContentBtn = document.querySelector('.myContent');

myContentBtn.addEventListener('click', async () => {
  const reqPost = await axios.get('http://localhost:5000/board', { Credential: true });
  const { data } = reqPost;

  const myPost = JSON.parse(sessionStorage.getItem('loginInfo'));

  while (postContent.hasChildNodes()) {
    postContent.removeChild(postContent.firstChild);
  }

  if (myPost) {
    const { user } = myPost;

    const myPostSort = data.filter((post) => {
      const { nickname } = post;

      if (user === nickname) return post;
    });

    appendElement(myPostSort);
    postClick();
  }
});

/* 맨 위로 버튼 */

const movetoTop = document.querySelector('.moveToTop');

movetoTop.addEventListener('click', () => {
  window.scrollTo(0, 0);
});
