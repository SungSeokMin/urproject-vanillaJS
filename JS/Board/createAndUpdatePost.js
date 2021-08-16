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

// 수정할 때 기존에 있던 내용을 가져오기 위해 select 했다.
const summerNoteEditAria = document.querySelector('.note-editable');

// 메인페이지로 이동하면 storage이 정보는 날라가게 된다.
// 밑의 if 분기는 상세페이지로 이동 후 내가 쓴 글이면 수정버튼이 보이는데
// 이때 수정버튼을 누르고 들어왔을때의 상황이다.
if (localStorage.getItem('detailInfo')) {
  // 작성된 글에 대한 수정
  const { id, title, content } = JSON.parse(localStorage.getItem('detailInfo'));

  titleInput.value = title;
  summerNoteEditAria.innerHTML = content;

  checkBtn.addEventListener('click', () => {
    axios
      .patch(`http://localhost:5000/board/${id}`, {
        title: titleInput.value,
        content: summerNoteEditAria.innerHTML,
      })
      .then(() => {
        window.location.href = '/index.html';
      });
  });
} else {
  checkBtn.addEventListener('click', async () => {
    // 새로운 글 작성 시 요청 보내기

    // TODO
    // 현재는 임시적으로 id값을 axios를 통해 게시글의 마지막 번호를 조회하지만
    // 추후 DataBase 구축 시에는 이럴 필요 없다 !!
    const getPost = await axios.get('http://localhost:5000/board');
    const { data } = getPost;

    const currentId = data[data.length - 1].id;
    const { user } = JSON.parse(sessionStorage.getItem('loginInfo'));

    const post = {
      id: currentId + 1,
      nickname: user,
      title: titleInput.value,
      content: descInput.value,
      like: 0,
    };

    axios.post('http://localhost:5000/board', post).then(() => {
      window.location.href = '/index.html';
    });
  });
}
