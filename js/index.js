//	responsive navbar
$(".handle").on('click',function(){
	$("nav ul").toggleClass('showing');
});

//	accordion on the navbar
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }
}


//	canvas 
var canvas=document.getElementById('canvas'),
	context=canvas.getContext("2d"),
	canvasbox=$("#canvasbox");

canvas.width=canvasbox.width();
canvas.height=canvasbox.height();

var radius=1;
var dragging=false;

context.lineWidth=2*radius;

canvas.addEventListener('mousedown',engage);
canvas.addEventListener('mouseup',disengage); 
canvas.addEventListener('mousemove',putPoint);

function putPoint(e)
{
	if(dragging)
	{
		var x=e.offsetX,
			y=e.offsetY;
		context.lineTo(x,y);
		context.stroke();
		//draws small circle of radius=radius at cursor position
		context.beginPath();
		context.arc(x,y,radius,0,Math.PI*2);
		context.fill();
		//drawing line between two circles
		context.beginPath();
		context.moveTo(x,y);
	}
}
function engage(e)
{
	dragging=true;
	putPoint(e);
}
function disengage()
{
	dragging=false;
	context.beginPath();
}

//	Controls

// Radius
var minRadius=1,
	maxRadius=25;
//slider
$( function() {
    $( "#slider" ).slider({
    	min:minRadius,
    	max:maxRadius,
    	slide:function(event,ui){
    		newRadius=ui.value;
    		$("#radval").text(newRadius);
    		if(newRadius<minRadius)
				newRadius=minRadius;
			else if(newRadius>maxRadius)
				newRadius=maxRadius;

			radius=newRadius;
			context.lineWidth=radius*2
    	}
    });
 });

//color picker
  $( function() {
    function hexFromRGB(r, g, b) {
      var hex = [
        r.toString( 16 ),
        g.toString( 16 ),
        b.toString( 16 )
      ];
      $.each( hex, function( nr, val ) {
        if ( val.length === 1 ) {
          hex[ nr ] = "0" + val;
        }
      });
      return hex.join( "" ).toUpperCase();
    }
    function refreshSwatch() {
    	var red = $( "#red" ).slider( "value" ),
        	green = $( "#green" ).slider( "value" ),
        	blue = $( "#blue" ).slider( "value" ),
        	hex = hexFromRGB( red, green, blue ),
        	color="#"+hex;
      	$( "#swatch" ).css( "background-color", color);
      	context.fillStyle=color;
		context.strokeStyle=color;

    }
 
    $( "#red, #green, #blue" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 255,
      value: 127,
      slide: refreshSwatch,
      change: refreshSwatch
    });
    $( "#red" ).slider( "value", 255 );
    $( "#green" ).slider( "value", 140 );
    $( "#blue" ).slider( "value", 60 );
  } );

function downloadCanvas(link, canvasId, filename)
{
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}
document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'test.png');
}, false);