import { makeHeader } from '../Board/makeHeader.js';
import { loginControll } from './loginController.js';

makeHeader();

loginControll();

//* 검색 버튼에 관한 함수

const searchBar = document.querySelector('.search-txt');
const searchBtn = document.querySelector('.search--btn');

// Navigation Bar의 search 기능
// 검색어를 입력 후 search icon을 누르면 해당 input의 value를 가져온다.
searchBtn.addEventListener('click', () => {
  searchBar.value = '';
});
