// // 画像をクリックした時に座標を取得する
// $('img').click(function(event) {
//     var x = event.offsetX;
//     var y = event.offsetY;
//     console.log('座標取得成功', x, y);
  
//     // 座標をサーバーに送信する
//     sendCoordsToServer(x, y);
//   });
  
//   // サーバーに座標を送信する関数
//   function sendCoordsToServer(x, y) {
//     // var csrf_token = $('input[name="csrfmiddlewaretoken"]').val();
//     $.ajax({
//       url: 'view/',
//       type: 'POST',
//       dataType: 'json',
//       // headers: {
//       //   'X_CSRFToken': getCsrfToken()
//       // },
//       data: {
//         coords_x: x,
//         coords_y: y,
//       },
//       success: function(response) { 
//         console.log('座標の送信に成功しました');
//       },
//       error: function(response) {
//         console.log('座標の送信に失敗しました');
//       },
//     });
//   }

// function getCsrfToken(){
//   var csrf_token = document.getElementsByName('srfmiddlewaretoken')[0].value;
//   return csrf_token;
// }



$('img').click(function(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const image = document.getElementById('img');
    const original_Width = image.naturalWidth;
    const original_Height = image.naturalHeight;
    const Width = image.width;
    const Height = image.height;
    const original_X = x * (original_Width / Width);
    const original_Y = y * (original_Height / Height);
    console.log('画像サイズWidth', Width, '画像サイズoriginal_Width', original_Width);
    console.log('クリックした箇所の座標：', x, y,  '計算後の座標', original_X, original_Y);

  //クリックしたときの画像サイズも記録
  //ブラウザで開いたときにDBから値をとってきて
  //DBの位置と画像サイズを見て、今開いた人の画像サイズを見て、ハートマークを表示できる。
  //例） Aさん（x:23, y:45, image.width:300）
  //Bさん（width:600）
  //Bさんの画面上ではx:46, y:90の位置に表示されるってことになる
});


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















// function getCoords(event){
//     var x = event.offsetX;
//     var y = event.offsetY;
//     console.log("座標取得成功", x, y);
//     sendCoords(x, y);
// }

// function sendCoords(x,y){
//     $.ajax({
//         url: '/view/', //送信先のURL
//         type: 'POST', //HTTPメソッドを指定
//         dataType: 'json',
//         data: {
//             'coords_x': x,  //送信するデータ
//             'cooord_y': y,
//         },
//         success: function(response){    //response変数は、サーバーから返されたレスポンスのjavascriptのオブジェクト
//             console.log('いいね送信成功');  //通信成功時の処理
//         },
//         error: function(response){
//             console.log('いいね送信失敗');  //通信失敗時の処理
//         }
//     })
// }



// 　　// api_good関数が設定されたaタグがクリックされたら、非同期通信でgoodのカウントを1増やし画面に結果を反映する
// function api_good() {
//     // いいねの数を増やす記事idをJavaScriptに渡す処理
//     // var api_url = "{% url 'blog:api_good' post.pk %}";
//     // var btn = document.getElementById("good_count");
//     // 非同期通信をするための関数をインタンス化する
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = function () {
// 　      // 非同期通信が完了したら以下のifが処理される。request.readyState === 4部分が非同期処理完了を意味している
//         if (request.readyState === 4 && request.status === 200) {
//             var received_data = JSON.parse(request.responseText);
//             // // 画面にいいねの数を反映する
//             // btn.innerText = received_data.good;
//             // 画面をリロードするまでボタンを押せなくする処理
//             document.getElementById("good-a").removeAttribute( "onclick" );
//         }
//     }
//     request.open("GET",api_url);
//     request.send();
// }