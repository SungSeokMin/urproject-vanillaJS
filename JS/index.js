// 글쓰기 버튼 활성화 비활성화

const writeBtn = document.querySelector('.write--btn');

if (sessionStorage.getItem('loginInfo')) {
  writeBtn.style.display = 'block';
} else {
  writeBtn.style.display = 'none';
}

// 최신순 | 추천순 | 내가 쓴 글

const postContent = document.querySelector('.post-container');

function appendElement(data) {
  for (let i = 0; i < data.length; i++) {
    let { id, title, content, like } = data[i];

    if (title.length >= 30) title = `${title.substring(0, 30)} ...`;
    if (content.length >= 80) content = `${content.substring(0, 80)}...`;

    postContent.appendChild(makePost(id, title, content, like));
  }
}

// 최신순

const latestBtn = document.querySelector('.latest');

latestBtn.addEventListener('click', async () => {
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
  const reqPost = await axios.get('http://localhost:5000/board', { Credential: true });
  const { data } = reqPost;

  const recommendSort = data.sort((a, b) => b.like - a.like);

  while (postContent.hasChildNodes()) {
    postContent.removeChild(postContent.firstChild);
  }

  appendElement(recommendSort);
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
  }
});
