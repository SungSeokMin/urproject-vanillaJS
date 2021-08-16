const contentAria = document.querySelector('.content-container');
const postAria = document.querySelector('.post-container');
/*
- window.innerHeight = 브라우저에서 실제로 표시되고 있는 영역의 높이
- window.scrollY = 스크롤이 세로로 얼마나 이동했는지 px로 나타냄, 0부터 시작해서 내릴수록 증가
- document.body.offsetHeight = 요소의 실제 높이

핵심 포인트

표시되는 영역 + 스크롤 값이 콘텐츠 전체 높이보다 크면 더이상 내려갈 곳이 없다는 뜻
따라서 그때마다 새로운 요소를 추가해주면 무한 스크롤 구현 완성 !
*/

const getPost = async () => {
  const reqPost = await axios.get('http://localhost:5000/board', { Credential: true });

  const { data } = reqPost;

  for (let i = 0; i < data.length; i++) {
    if (data[i].id) {
      let { id, nickname, title, content, like } = data[i];

      if (title.length >= 30) title = `${title.substring(0, 30)} ...`;
      if (content.length >= 80) content = `${content.substring(0, 50)}...`;

      postAria.appendChild(makePost(id, title, content, nickname, like));
    }
  }

  const btn = document.querySelectorAll('.post');
  for (let i = 0; i < btn.length; i++) {
    const id = btn[i].dataset.value;

    btn[i].addEventListener('click', async () => {
      let result = await axios.get(`http://localhost:5000/board/${id}`, { Credential: true });

      const { data } = result;

      localStorage.setItem('detailInfo', JSON.stringify(data));
    });
  }
};

getPost();

function makePost(id, title, content, writer, like) {
  const aTag = document.createElement('a');

  aTag.classList.add('post');
  aTag.setAttribute('href', '/HTML/Board/detailBoard.html');
  aTag.setAttribute('data-value', id);

  const imgAria = document.createElement('div');
  const img = document.createElement('img');
  imgAria.classList.add('img-aria');

  img.setAttribute('src', './images/welcome.svg');
  img.setAttribute('alt', 'post');
  imgAria.appendChild(img);

  const titleAria = document.createElement('div');
  const titleSpan = document.createElement('span');
  titleAria.classList.add('title-aria');
  titleSpan.textContent = title;
  titleAria.appendChild(titleSpan);

  const descAria = document.createElement('div');
  descAria.classList.add('desc-aria');
  descAria.innerHTML = content;

  const likeAria = document.createElement('div');
  likeAria.classList.add('like-aria');

  const likeAriaLeft = document.createElement('div');
  likeAriaLeft.classList.add('like-aria--left');

  const writerAria = document.createElement('span');
  writerAria.textContent = writer;

  likeAriaLeft.append(writerAria);

  const likeAriaRight = document.createElement('div');
  likeAriaRight.classList.add('like-aria--right');

  const likeIcon = document.createElement('i');
  likeIcon.classList.add('fas', 'fa-heartbeat');
  const spanEl = document.createElement('span');
  spanEl.classList.add('hi');
  spanEl.textContent = like;

  likeAriaRight.append(likeIcon, spanEl);

  likeAria.append(likeAriaLeft, likeAriaRight);

  aTag.append(imgAria, titleAria, descAria, likeAria);

  return aTag;
}
