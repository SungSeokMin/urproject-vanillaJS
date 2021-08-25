function makePost(id, thumbnail, title, content, writer, like) {
  const aTag = document.createElement('a');

  aTag.classList.add('post');
  aTag.setAttribute('href', '/detailBoard.html');
  aTag.setAttribute('data-value', id);

  const imgAria = document.createElement('div');
  const img = document.createElement('img');
  imgAria.classList.add('img-aria');

  thumbnail
    ? img.setAttribute('src', thumbnail)
    : img.setAttribute('src', '/images/white-thumbnail.png');
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

export { makePost };
