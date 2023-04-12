const image = document.getElementById('img');
image.addEventListener('click', function(event) {
  const x = event.clientX;
  const y = event.clientY;
  const heart = document.createElement('div');
  heart.innerHTML = '&#128147;';
  heart.style.position = 'absolute';
  heart.style.top = y + 'px';
  heart.style.left = x + 'px';
  document.body.appendChild(heart);

  setTimeout(function() {
    document.body.removeChild(heart);
  }, 1000);
});