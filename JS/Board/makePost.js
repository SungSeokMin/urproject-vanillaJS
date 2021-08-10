const contentAria = document.querySelector('.content-container');

/*
- window.innerHeight = 브라우저에서 실제로 표시되고 있는 영역의 높이
- window.scrollY = 스크롤이 세로로 얼마나 이동했는지 px로 나타냄, 0부터 시작해서 내릴수록 증가
- document.body.offsetHeight = 요소의 실제 높이

핵심 포인트

표시되는 영역 + 스크롤 값이 콘텐츠 전체 높이보다 크면 더이상 내려갈 곳이 없다는 뜻
따라서 그때마다 새로운 요소를 추가해주면 무한 스크롤 구현 완성 !
*/

let dataLength = 0;

const getPost = async () => {
  const reqPost = await axios.get('http://localhost:5000/board');

  const { data } = reqPost;

  for (let i = 0; i < data.length; i++) {
    let { id, title, content, like } = data[i];

    if (title.length >= 30) title = `${title.substring(0, 30)} ...`;
    if (content.length >= 80) content = `${content.substring(0, 80)}...`;

    contentAria.appendChild(makePost(id, title, content, like));
  }

  dataLength = data.length;
};
getPost();

function makePost(id, title, content, like) {
  const aTag = document.createElement('a');
  aTag.classList.add('post');
  aTag.setAttribute('href', '#');
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
  descAria.textContent = content;

  const likeAria = document.createElement('div');
  likeAria.classList.add('like-aria');
  likeAria.textContent = `⭐️ ${like}`;

  aTag.append(imgAria, titleAria, descAria, likeAria);

  return aTag;
}
