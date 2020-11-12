const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const ToDos_LS = 'toDos';
let toDos = [];
let idCnt = 1;

function saveToDos() {
  localStorage.setItem(ToDos_LS , JSON.stringify(toDos));
}

function deleteTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li); //html에서 삭제
  const cleanToDos = toDos.filter(function (toDo){
    console.log(li.id , toDo.id);
    return parseInt(li.id) !== toDo.id;
  }); // cleanToDos == 삭제완료된 배열
  console.log(cleanToDos);
  toDos = cleanToDos; //삭제된걸로 바뀌치기
  saveToDos(); //저장
}

function paintToDo(text) {
  console.log("paintodo")
  idCnt += 1;
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.classList.add("delBtn");
  delBtn.addEventListener("click",deleteTodo);
  const span = document.createElement("span");
  span.innerText = text;
  const newId = idCnt;
  li.appendChild(span);
  li.appendChild(delBtn);
  toDoList.appendChild(li);
  li.id = newId;
  const toDoObj = {
    text : text,
    id : newId
  }
  toDos.push(toDoObj);
  console.log(toDos);

  saveToDos();
}


function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;

  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(ToDos_LS);
  if(loadedToDos !== null){
    const paresedToDos = JSON.parse(loadedToDos);
    paresedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });

  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit",handleSubmit)
}

init();
