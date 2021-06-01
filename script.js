// 描画するエリア
const canvas = document.getElementById('draw-area');
const canvasCtx = canvas.getContext('2d');

// 座標計算
const canvasOffset = canvas.getBoundingClientRect();
const offsetX = canvasOffset.left;
const offsetY = canvasOffset.top;

// ドラッグ開始座標
let startX = 0;
let startY = 0;

// ドラッグ開始オフセット
let startOffsetX = 0;
let startOffsetY = 0;

// 現在の座標
let currentX = 0;
let currentY = 0;

// 矩形の長さ
let width = 0;
let height = 0;

// ドラッグ判定フラグ
let isDown = false;

let rectangle = null;

const handleMouseDown = (e) => {
  e.preventDefault();
  e.stopPropagation();

  // クリックした座標を取得
  startX = e.offsetX;
  startY = parseInt(e.clientY - offsetY);

  startOffsetX = (e.clientX - e.offsetX) + e.offsetX;
  startOffsetY = (e.clientY - e.offsetY) + e.offsetY;

  isDown = true;
}

const handleMouseMove = (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!isDown) {
    return;
  }

  // 現在の座標を取得
  currentX = e.offsetX;
  currentY = e.offsetY; // ?
  

  // 直前に描画した図形を消去
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  // 矩形のサイズを計算
  width = currentX - startX;
  height = currentY - startY;

  // 描画
  canvasCtx.strokeRect(startX, startY, width, height);

  console.log('start X: ' + startX + ' start Y: ' + startY);
  console.log('current X: ' + currentX + ' current Y: ' + currentY);
  console.log('width: ' + width + ' height: ' + height);
  console.log('startOffsetX: ' + startOffsetX + ' startOffSetY: ' + startOffsetY);
  console.log('');
}

const handleMouseUp = (e) => {
  e.preventDefault();
  e.stopPropagation();

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  // divを生成
  const box = document.createElement('div');
  box.setAttribute('id', 'rectangle');
  box.setAttribute('onclick', 'hello()');
  box.style.width = width + 'px';

  box.style.height = height + 'px';
  box.style.top = startOffsetY + 'px';
  box.style.left = startOffsetX + 'px';
  rectangle = document.getElementById('rectangle');
  
  document.body.insertBefore(box, canvas);


  isDown = false;
}

const changeStyle = (element) => {
  element.style.background = 'black';
}

const hello = () => {
  console.log('hello');
}

canvas.addEventListener('mousedown', handleMouseDown, false);
canvas.addEventListener('mousemove', handleMouseMove, false);
canvas.addEventListener('mouseup', handleMouseUp, false);

document.getElementById('start').innerText = startX;

// start X: 5 start Y: 7
// script.js:69 current X: 39 current Y: 41
// script.js:70 width: 34 height: 34
// script.js:71 startOffsetX: 13 startOffSetY: 15