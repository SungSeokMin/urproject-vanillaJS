import { makeHeader } from './makeHeader.js';
import { loginControll } from '../Header/loginController.js';

makeHeader();

loginControll();

const { title, content } = JSON.parse(localStorage.detailInfo);

const titleEL = document.querySelector('.title');
const contentEL = document.querySelector('.content');

titleEL.textContent = title;
contentEL.innerHTML = content;
