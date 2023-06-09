//マーク選択
// let mark = "<img src=\"{% static 'marks/valentinesday_heart.png' %}\" width=\"10\" height=\"10\">"; //グローバル変数。初期値はハート。

// $('#heart').click(function() {
//   mark = '&#128147;';
// });
// $('#star').click(function() {
//   mark = '&#9733;';
// });

//マーク選択
//（注）シングルクォート(')じゃなくてバッククォート(`)を使わないとテンプレートリテラルが使えない
let mark = `<img src="${heartMarkPath}" width="30" height="30">`; // グローバル変数。初期値はハート。

$('#heart').click(function() {
  mark = `<img src="${heartMarkPath}" width="30" height="30">`;
});
$('#star').click(function() {
  mark = `<img src="${starMarkPath}" width="30" height="30">`;
});




//表示非表示切り替えフラグ
let on_off = true;
//マーク表示用ブロックの保管
let mark_div = [];
//受信データ保管用
//let receive_date = [];
let receive_date;




//座標とサイズを取得
function get_Size_Coords(event){
  //クリックした座標の取得
  let x = event.offsetX;
  let y = event.offsetY;
  console.log('クリックした箇所の座標：', x, y);
  console.log('クリックしたときのマーク:', mark);
  //クリック時のマーク表示
  let displaymark = document.createElement('div');
  displaymark.innerHTML = mark;
  displaymark.style.position = 'absolute';
  displaymark.style.top = y + 'px';
  displaymark.style.left = x + 'px';
  document.body.appendChild(displaymark);
  setTimeout(function() {
    document.body.removeChild(displaymark);
  }, 1000);
  //クリックした画像サイズの取得
  const image = document.getElementById('img');
  const Width = image.width;
  const Height = image.height;
  console.log('クリックした画像サイズWidth', Width, Height);
  sendCoordsToServer(x, y, Width, Height);
}


// サーバーに座標とサイズを送信する関数
function sendCoordsToServer(x,y,Width,Height) {
  $.ajax({
    url: 'view/',
    type: 'POST',
    dataType: 'json',
    data: {
      coords_x: x,
      coords_y: y,
      click_Width: Width,
      click_Height: Height,
      click_mark: mark,
    },
    success: function(response) { 
      console.log('座標の送信に成功しました');
    },
    error: function(response) {
      console.log('座標の送信に失敗しました');
    },
  });
}

$('#img').click(function(event) {
  get_Size_Coords(event)
});


// サーバーから座標とサイズを受信する関数
function receiveCoordsFromServer() {
  $.ajax({
    url: 'server/',
    type: 'GET',
    success: function(response) { 
      let html = '';
      const image = document.getElementById('img');
      const original_Width = image.width;
      const original_Height = image.height;
      if (on_off){
        for(let i = 0; i < response.length; i++){
          x = response[i][0];
          y = response[i][1];
          Width = response[i][2];
          Height = response[i][3];
          const original_X = x * (original_Width / Width);
          const original_Y = y * (original_Height / Height);
          let htmlParts = '<p>' + response[i] + '</p>' + 'original_X:' + original_X + ', original_Y:' + original_Y + '</p>';
          html += htmlParts;
          document.getElementById('container').innerHTML = html;
          //DBの座標にマーク表示
          let displaymark = document.createElement('div');  //idを割り振ったほうがいい？
          displaymark.innerHTML = response[i][4];
          displaymark.style.position = 'absolute';
          displaymark.style.top = original_Y + 'px';
          displaymark.style.left = original_X + 'px';
          mark_div.push(displaymark)
          document.getElementById('main').appendChild(displaymark);
          
//          receive_date.push(response);
          receive_date = response;
        }
      }
      else{
      // マークを削除
        for(let md of mark_div) {
          document.getElementById('main').removeChild(md); //id使って消せる？
        }
        mark_div = []
      //styleのdisplayの値を変更するかvisibleで切り替えるかもある。
      //visibleを使うと空間は空いたままになるからdisplayよりそっちの方がいいかも。
      // append_div[0].removeChild(displaymark); //←動かない。removechild on nodeのエラー
      // append_div[0].removeChild(append_div[0].childNodes.item(2)); //←動いた

      //img要素を、開始タグと終了タグがある状態にして
      //それを親要素にできればいけるかも
      }
      on_off = !on_off; //値を反転
      console.log(on_off)
    },
    error: function(response) {
      console.log('データの取得に失敗しました');
    },
  });
}


//画像サイズの変更に合わせてマークの位置を調整
function mark_Position(){
  //表示されているときはhtml内にdisplaymarkのブロックが存在している
  //表示はしないが要素として元の画像サイズを持たせるとか
  //displaymarkの座標、位置を読み込んで計算とか
  if (mark_div.length != 0){
    const image = document.getElementById('img');
    for (let i = 0; i < receive_date.length; i++){
      let x = receive_date[i][0];
      let y = receive_date[i][1];
//      Width = receive_date[i][2];
//      Height = receive_date[i][3];
//      console.log(x, y, Width, Height);
      const original_X = x * (image.width / Width);
      const original_Y = y * (image.height / Height);
      mark_div[i].style.top = original_Y + "px";
      mark_div[i].style.left = original_X + "px";
      console.log(mark_div[i].style.top);
    }
  }
  else{
    ;
  }
}


window.addEventListener('resize', mark_Position);

// //ページ読み込み時に実行
// function onLoad() {
//   receiveCoordsFromServer();
// }

// window.onload = onLoad;

$('#button').click(function() {
    receiveCoordsFromServer();
});