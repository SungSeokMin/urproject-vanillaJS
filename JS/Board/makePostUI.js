const contentAria = document.querySelector('.content-container');
const postAria = document.querySelector('.post-container');

const renderList = (data, start, end) => {
  for (let i = start; i < end; i++) {
    if (data[i].id) {
      let { id, thumbnail, nickname, title, content, like } = data[i];

      if (title.length >= 30) title = `${title.substring(0, 30)} ...`;
      if (content.length >= 50) content = `${content.substring(0, 50)}...`;

      postAria.appendChild(makePost(id, thumbnail, title, content, nickname, like));
    } else break;
  }
};

const goDetailPage = () => {
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

/* 무한 스크롤 */

let start = 0;
let end = 12;

const listEnd = document.querySelector('.list-end');

const getPost = async function () {
  const reqPost = await axios.get('http://localhost:5000/board', { Credential: true });

  const { data } = reqPost;
  renderList(data, start, end);

  goDetailPage();

  const listMoreObserver = new IntersectionObserver(
    async ([entry]) => {
      if (entry.isIntersecting) {
        listMoreObserver.unobserve(entry.target);
        if (end <= data.length) {
          await renderList(data, start, end);
          listMoreObserver.observe(entry.target);
        }
        start = end;
        end += 12;
      }
    },
    { threshold: 0.4 }
  );

  listMoreObserver.observe(listEnd);
};

getPost();

function makePost(id, thumbnail, title, content, writer, like) {
  const aTag = document.createElement('a');

  aTag.classList.add('post');
  aTag.setAttribute('href', '/HTML/Board/detailBoard.html');
  aTag.setAttribute('data-value', id);

  const imgAria = document.createElement('div');
  const img = document.createElement('img');
  imgAria.classList.add('img-aria');

  thumbnail ? img.setAttribute('src', thumbnail) : img.setAttribute('src', '/images/welcome.svg');
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
