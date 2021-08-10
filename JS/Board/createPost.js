// Summer Note

$(document).ready(function () {
  $('#summernote').summernote();
});

$('#summernote').summernote({
  height: 550, // set editor height
  minHeight: 550, // set minimum height of editor
  maxHeight: 550, // set maximum height of editor
  focus: true, // set focus to editable area after initializing summernote
  toolbar: [
    // [groupName, [list of button]]
    ['fontname', ['fontname']],
    ['fontsize', ['fontsize']],
    ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
    ['color', ['forecolor', 'color']],
    ['table', ['table']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['insert', ['picture', 'link']],
  ],
});

// img input을 숨기고 버튼으로 대체하기

const imgInput = document.querySelector('#real-input');
const imgUpload = document.querySelector('.img-upload');

imgUpload.addEventListener('click', () => {
  alert('업데이트 예정 !!');
  // imgInput.click();
});

// title, desc, imgInput 내용 가져오기

const titleInput = document.querySelector('.title-input');
const descInput = document.querySelector('#summernote');
const checkBtn = document.querySelector('.check--btn');

checkBtn.addEventListener('click', async () => {
  // 요청 보내기

  // TODO
  // 현재는 임시적으로 id값을 axios를 통해 게시글의 마지막 번호를 조회하지만
  // 추후 DataBase 구축 시에는 이럴 필요 없다 !!
  const getPost = await axios.get('http://localhost:5000/board');
  const { data } = getPost;

  const currentId = data[data.length - 1].id;

  const post = {
    id: currentId + 1,
    title: titleInput.value,
    content: descInput.value,
    like: 0,
  };
  axios.post('http://localhost:5000/board', post).then(() => {
    window.location.href = '/index.html';
  });
});
