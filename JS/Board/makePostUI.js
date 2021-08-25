import { makePost } from './makePost.js';

const contentAria = document.querySelector('.content-container');
const postAria = document.querySelector('.post-container');

const renderList = (data, start, end) => {
  for (let i = start; i < end; i++) {
    const bool = data[i] ? data[i].id : false;

    if (bool) {
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

    btn[i].addEventListener('click', () => {
      localStorage.setItem('board_id', JSON.stringify(id));
    });
  }
};

/* 무한 스크롤 */

let start = 0;
let end = 12;

const listEnd = document.querySelector('.list-end');

const render = async function () {
  const reqPost = await axios.get('http://localhost:5000/board', { Credential: true });

  const { data } = reqPost;
  renderList(data, start, end);
  goDetailPage();

  const listMoreObserver = new IntersectionObserver(
    async ([entry]) => {
      if (entry.isIntersecting) {
        // 내가 쓴 글 같은 경우 listEnd는 항상 보이기 때문에 isIntersecting의 값이 true이다.
        // 그래서 내가 쓴 글이 없어도 밑의 로직을 실행하기 때문에 getBoundingClientRect의 top값으로 분기를 해줬다.
        const { top } = listEnd.getBoundingClientRect();

        listMoreObserver.unobserve(entry.target);
        if (end <= data.length && top > 230 && listEnd.dataset.value === 'main') {
          await renderList(data, start, end);
          listMoreObserver.observe(entry.target);
        }
        start = end;
        end += 12;
      } else return;
    },
    { threshold: 0.4 }
  );

  listMoreObserver.observe(listEnd);
};

render();
