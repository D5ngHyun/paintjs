const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const color = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById('jsSave');
const INITIAL_COLOR = '#2C2C2C';
const CANVAS_SIZE = 700;




canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = "#fff";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false; 
let filling = false;


function stopPainting(e){
    painting = false;
}

function startPainting(e){
    painting = true;
}


// 움직일때 위치아는 이벤트
function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting){
        // painting 이 false 면 실행        
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        // painting 이 true 면 실행
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

// 클릭했울때 일어나는 이벤트
// function onMouseDown(e){
//     painting = true; 
//     console.log('클릭된상태');
// }

//마우스버튼을 뗐을때 일어나는 이벤트
function onMouseUp(e){
    stopPainting();
    console.log('up');
}

function handleColorClick(e){
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeChange(e){
    console.log(e);
    const size = e.target.value;
    ctx.lineWidth = size; 
}

function handleModeClick(){
    if(filling === true ){
        filling = false;
        mode.innerText = 'Fill';
        // alert('채우기 모드');
    } else {
        filling = true;
        mode.innerText ='Paint';
        // alert('페인트모드');
    }
    console.log(filling);
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }

    // if문 if("this") << 안에 들어있는것이 true면 실행된다.
    // false 면 실행이 안됨.
}

function handleCM(e){
    console.log(e);
    e.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "paintJS[★]";

    link.click();
}

if(canvas){
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click',handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
}


Array.from(color).forEach(color => color.addEventListener('click',handleColorClick));

if(range){
    range.addEventListener('input',handleRangeChange);
}

if(mode){
    mode.addEventListener('click',handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener('click',handleSaveClick);
}

console.log(filling);