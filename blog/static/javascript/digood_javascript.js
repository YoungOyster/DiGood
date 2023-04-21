//マーク選択
let mark = '&#128147;'; //グローバル変数。初期値はハート。
$('#heart').click(function() {
  mark = '&#128147;';
});
$('#star').click(function() {
  mark = '&#9733;';
});


//表示非表示切り替えフラグ
let ON_OFF = true;


//座標とサイズを取得
function get_Size_Coords(event){
  //クリックした座標の取得
  var x = event.offsetX;
  var y = event.offsetY;
  console.log('クリックした箇所の座標：', x, y);
  console.log('クリックしたときのマーク:', mark);
  //クリック時のマーク表示
  const DisplayMark = document.createElement('div');
  DisplayMark.innerHTML = mark;
  DisplayMark.style.position = 'absolute';
  DisplayMark.style.top = y + 'px';
  DisplayMark.style.left = x + 'px';
  document.body.appendChild(DisplayMark);
  setTimeout(function() {
    document.body.removeChild(DisplayMark);
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


// 画面読み込み時にサーバーから取ってきた方がいい？
//→  window.onload = onLoad;


// サーバーから座標とサイズを受信する関数
function receiveCoordsFromServer() {
  $.ajax({
    url: 'server/',
    type: 'GET',
    success: function(response) { 
      console.log(response);
      console.log('要素数：' + response.length)
      let html = '';
      console.log(response[0])
      const image = document.getElementById('img');
      const original_Width = image.width;
      const original_Height = image.height;
      for(let i = 0; i < response.length; i++){
        x = response[i][0];
        y = response[i][1];
        Width = response[i][2];
        Height = response[i][3];
        const original_X = x * (original_Width / Width);
        const original_Y = y * (original_Height / Height);
        let htmlParts = '<p>' + response[i] + '</p>' + 'original_X:' + original_X + ', original_Y:' + original_Y + '</p>';
        html += htmlParts;
        //DBの座標にハートマーク表示
        const DisplayMark = document.createElement('div');
        // DisplayMark.innerHTML = mark;
        DisplayMark.innerHTML = response[i][4];
        DisplayMark.style.position = 'absolute';
        DisplayMark.style.top = original_Y + 'px';
        DisplayMark.style.left = original_X + 'px';
        document.getElementById('container').innerHTML = html;
        if (ON_OFF){
          // document.querySelector('layout').appendChild(DisplayMark);
          document.getElementById('main').appendChild(DisplayMark);
          // append_div[0].appendChild(DisplayMark);
          // 変数に格納したHTMLを出力
        }
        else{
          // マークを削除
          //styleのdisplayの値を変更するかvisibleで切り替えるかもある。
          //visibleを使うと空間は空いたままになるからdisplayよりそっちの方がいいかも。
          // append_div[0].removeChild(DisplayMark); //←動かない。removechild on nodeのエラー
          // append_div[0].removeChild(append_div[0].childNodes.item(2)); //←動いた
          // document.getElementById('main').removeChild(DisplayMark);
          //img要素を、開始タグと終了タグがある状態にして
          //それを親要素にできればいけるかも
        }
      }
      ON_OFF = !ON_OFF; //値を反転
      console.log(ON_OFF)
    },
    error: function(response) {
      console.log('データの取得に失敗しました');
    },
  });
}

//画像サイズの変更に合わせてマークの位置を調整
function mark_Position(){
  //表示されているときはhtml内にDisplayMarkのブロックが存在している
  //表示はしないが要素として元の画像サイズを持たせるとか
  //DisplayMarkの座標、位置を読み込んで計算とか
  const image = document.getElementById('img');
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