

function showInfo(i){
  // var c = this.querySelector('.hanzi-char').innerHTML
  var infoDOM = document.getElementById('info')
  console.log(i);
  infoDOM.innerHTML = '<p>' + hanzi[i].pinyin + '</p><h1>' + hanzi[i].hanzi + '</h1><p>' + hanzi[i].translation +'</p><div class="hanzi-buttons"><div class="button correct" onclick="correct(this)"><i class="fa fa-check" aria-hidden="true"></i></div><div class="button wrong" onclick="wrong(this)"><i class="fa fa-times" aria-hidden="true"></i></div></div>'
  infoDOM.style.top = y + 'px'
  infoDOM.style.left = x + 'px'
  infoDOM.style.opacity = 1
}


function loadGrid(){
  var appDOM = document.getElementById('app')
  for (var i = 0; i < hanzi.length; i++) {
    (function () {
      var itemDOM = document.createElement('div');
      itemDOM.className = 'hanzi-item';
      itemDOM.id = i;

      // Hardcoded difficulties
      if(i <= 2000){itemDOM.style.background = 'rgba(180,180,180,1)'}
      if(i <= 922){itemDOM.style.background = 'rgba(200,200,200,1)'}
      if(i <= 222){itemDOM.style.background = 'rgba(230,230,230,1)'}
      if(i <= 102){itemDOM.style.background = 'rgba(255,255,255,1)'}

      var rowLength = 20

      var test = i

      itemDOM.addEventListener("click", function(){showInfo(test)});

      itemDOM.addEventListener("mouseover", function(){
        scale(this, 1.8)

        // SURROUNDING TILES
        var id = parseInt(this.id)

        // same row
        scale(document.getElementById(id+1), 1.3)
        scale(document.getElementById(id-1), 1.3)

        // top row
        scale(document.getElementById(id-rowLength-1), 1.3)
        scale(document.getElementById(id-rowLength), 1.3)
        scale(document.getElementById(id-rowLength+1), 1.3)

        // bottom row
        scale(document.getElementById(id+rowLength-1), 1.3)
        scale(document.getElementById(id+rowLength), 1.3)
        scale(document.getElementById(id+rowLength+1), 1.3)
      });

      itemDOM.addEventListener("mouseout", function(){
        scale(this, 1)
        var id = parseInt(this.id)

        // same row
        scale(document.getElementById(id+1), 1)
        scale(document.getElementById(id-1), 1)

        // top row
        scale(document.getElementById(id-rowLength-1), 1)
        scale(document.getElementById(id-rowLength), 1)
        scale(document.getElementById(id-rowLength+1), 1)

        // bottom row
        scale(document.getElementById(id+rowLength-1), 1)
        scale(document.getElementById(id+rowLength), 1)
        scale(document.getElementById(id+rowLength+1), 1)
      });

      itemDOM.innerHTML = '<div class="hanzi-char">' + hanzi[i].hanzi + '</div><div class="hanzi-shade"></div><div class="hanzi-content"></div>'
      appDOM.append(itemDOM)
      if( (i+1) % rowLength == 0){
        var hrDOM = document.createElement('div');
        appDOM.append(hrDOM)
      }
    }()); // immediate invocation
  }
}

function scale(el, weight){
  if(!weight){weight = 1}
  el.style.transform = 'scale(' + 1 * weight + ')'
  el.style.zIndex = 10 * weight
  var clr = 255 - weight * 40
  el.querySelector('.hanzi-shade').style.opacity = weight - 1
}

loadGrid()







// MOUSE POSITION
var x = null;
var y = null;

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);

function onMouseUpdate(e) {
  x = e.pageX;
  y = e.pageY - window.pageYOffset;
}

function getMouseX() { return x; }
function getMouseY() { return y; }

function correct(e){
  document.getElementById('info').style.opacity = 0;
}

function wrong(e){
  document.getElementById('info').style.opacity = 0;
}
