import { makeHeader } from './makeHeader.js';
import { loginControll } from '../Header/loginController.js';

makeHeader();

loginControll();

const { title, content, like } = JSON.parse(localStorage.detailInfo);

const titleEL = document.querySelector('.title');
const contentEL = document.querySelector('.content');
const likeEL = document.querySelector('.like');

titleEL.textContent = title;
contentEL.innerHTML = content;
likeEL.textContent = `좋아요 ${like}`;
