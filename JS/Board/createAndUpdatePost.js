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
// 썸네일 버튼 클릭 후 이미지 파일 가져오면 thumbnail 변수에 저장하기

const imgInput = document.querySelector('#real-input');
const imgUpload = document.querySelector('.img-upload');

var reader = new FileReader();
let thumbnail = '';

function uploadImgPreview() {
  imgInput.addEventListener('change', (e) => {
    const file = e.target.files[0];

    // thumbnail = reader.result;
    reader.onload = (e) => {
      const img = document.createElement('img');

      img.onload = function (event) {
        let canvas = document.createElement('canvas');

        let ctx = canvas.getContext('2d');

        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;

        let width = img.width;
        let height = img.height;

        // Change the resizing logic
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = height * (MAX_WIDTH / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = width * (MAX_HEIGHT / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.witdh = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        let dataurl = canvas.toDataURL('image/png');

        thumbnail = dataurl;
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
imgUpload.addEventListener('click', () => {
  imgInput.click();
  uploadImgPreview();
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
if (localStorage.getItem('board_id')) {
  // 작성된 글에 대한 수정
  const { id } = JSON.parse(localStorage.getItem('board_id'));

  // titleInput.value = title;
  // summerNoteEditAria.innerHTML = content;

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

    const { nickname } = JSON.parse(sessionStorage.getItem('loginInfo'));

    const post = {
      nickname,
      thumbnail,
      title: titleInput.value,
      content: descInput.value,
    };

    axios.post('http://localhost:5000/board', post, {}).then((res) => {
      window.location.href = '/index.html';
    });
  });
}
