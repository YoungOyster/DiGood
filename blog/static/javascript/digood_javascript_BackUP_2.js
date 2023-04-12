let mark = '&#128147;'; //グローバル変数。初期値はハート。

//座標とサイズを取得
function get_Size_Coords(event){
  //クリックした座標の取得
  var x = event.offsetX;
  var y = event.offsetY;
  console.log('クリックした箇所の座標：', x, y);
  //クリック時のハートマーク表示
  const heart = document.createElement('div');
  heart.innerHTML = '&#128147;';
  heart.style.position = 'absolute';
  heart.style.top = y + 'px';
  heart.style.left = x + 'px';
  document.body.appendChild(heart);
  setTimeout(function() {
    document.body.removeChild(heart);
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

$('img').click(function(event) {
  get_Size_Coords(event)
});


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
      const original_Width = image.naturalWidth;
      const original_Height = image.naturalHeight;
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
        const heart = document.createElement('div');//追加する要素を生成
        heart.innerHTML = '&#128147;';
        heart.style.position = 'absolute';
        heart.style.top = original_X + 'px';
        heart.style.left = original_Y + 'px';
        document.body.appendChild(heart);
      }
      // 変数に格納したHTMLを出力
      document.getElementById('container').innerHTML = html;
    },
    error: function(response) {
      console.log('データの取得に失敗しました');
    },
  });
}

// //ページ読み込み時に実行
// function onLoad() {
//   receiveCoordsFromServer();
// }

// window.onload = onLoad;


const button = document.getElementById('button');
$('button').click(function() {
  receiveCoordsFromServer();
});





// //座標計算
// $('img').click(function(event) {
//     const x = event.offsetX;
//     const y = event.offsetY;
//     const image = document.getElementById('img');
//     const original_Width = image.naturalWidth;
//     const original_Height = image.naturalHeight;
//     const Width = image.width;
//     const Height = image.height;
//     const original_X = x * (original_Width / Width);
//     const original_Y = y * (original_Height / Height);
//     console.log('画像サイズWidth', Width, '画像サイズoriginal_Width', original_Width);
//     console.log('クリックした箇所の座標：', x, y,  '計算後の座標', original_X, original_Y);

//   //クリックしたときの画像サイズも記録
//   //ブラウザで開いたときにDBから値をとってきて
//   //DBの位置と画像サイズを見て、今開いた人の画像サイズを見て、ハートマークを表示できる。
//   //例） Aさん（x:23, y:45, image.width:300）
//   //Bさん（width:600）
//   //Bさんの画面上ではx:46, y:90の位置に表示されるってことになる
// });



// //データベースからデータを取得する
// $('img').click(function(event) {
//   DisplayHeartOnScreen();
//   receiveCoordsFromServer();
//   });

//   //ハートマークを画像上に表示する
//   function DisplayHeartOnScreen(){
//     const image = document.getElementById('img');
//     image.addEventListener('click', function(event) {
//       const x = event.offsetX;
//       const y = event.offsetY;
//       const heart = document.createElement('div');
//       heart.innerHTML = '&#128147;';
//       heart.style.position = 'absolute';
//       heart.style.top = y + 'px';
//       heart.style.left = x + 'px';
//       document.body.appendChild(heart);
    
//       setTimeout(function() {
//         document.body.removeChild(heart);
//       }, 1000);
//     });
//   }

//   // サーバーから座標を受信する関数
//   function receiveCoordsFromServer() {
//     $.ajax({
//       url: 'server/',
//       type: 'GET',
//       success: function(response) { 
//         console.log(response);
//         console.log('要素数：' + response.length)
//         let html = '';
//         console.log(response[0])
//         for(let i = 0; i < response.length; i++){
//           let htmlParts = '<p>' + response[i] + '</p>';
//           html += htmlParts;
//         }
//         // 変数に格納したHTMLを出力
//         document.getElementById('container').innerHTML = html;
//       },
//       error: function(response) {
//         console.log('データの取得に失敗しました');
//       },
//     });
//   }


  // success: function(response) { 
  //   var response_stringify = JSON.stringify(response); //JSONをオブジェクトから文字列に変換
  //   var response_json = JSON.parse(response_stringify); //文字列からオブジェクトに変換
  //   let html = '';
  //   var response_coordsX, response_coordsY;
  //   for(let i = 0; i < response_json.length; i++){
  //     response_coordsX = response_json[i]['coords_x'];
  //     response_coordsY = response_json[i]['coords_x'];
  //     console.log(response_coordsX, response_coordsY)
  //     // console.log(response[i]);
  //     // console.log(response[i].coords_x);
  //     let htmlParts = '<p>' + i + '番目のx座標：' + response_coordsX + ', y座標：' + response_coordsY + '</p>'
  //     html += htmlParts;
  //   }
