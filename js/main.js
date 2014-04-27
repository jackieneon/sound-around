// when page loads call spacebrew setup function 
$(window).on("load", setupSpacebrew);

// Spacebrew Object
var sb
    , app_name = "sound-around"
    , values = {};

var arrow;

/**
 * setupSpacebrew Function that creates and configures the connection to the Spacebrew server.
 * 				  It is called when the page loads.
 */
function setupSpacebrew (){
    var random_id = "0000" + Math.floor(Math.random() * 10000);

    app_name = app_name + ' ' + random_id.substring(random_id.length-4);

    console.log("Setting up spacebrew connection");
    
    sb = new Spacebrew.Client();

    sb.name(app_name);

    // configure the publication and subscription feeds
    sb.addPublish("accelX", "range", "500");
    sb.addPublish("accelY", "range", "500");
    sb.addPublish("accelZ", "range", "500");
    
    //sb.addSubscribe("slider1", "range");

    // override Spacebrew events - this is how you catch events coming from Spacebrew
    //sb.onRangeMessage = onRangeMessage;
    //sb.onOpen = onOpen;

    // connect to spacbrew
    sb.connect();
    
    gyro.frequency = 50;
    gyro.startTracking( onAccelerometer );
    
    //set our arrow variable
    arrow = document.getElementById("red");
};

// o.x, o.y, o.z for accelerometer
// o.alpha, o.beta, o.gamma for gyro
function onAccelerometer( obj ){

  //put acel dat here to rotate arrow 
  // 1 -get the html element  
  // 2 - set 
  
  //the style
  arrow.style.webkitTransform = "rotate(" + (obj.y * 18) + "deg)"
  
    var x = obj.x * 1000;
    x = Math.round(x);
    
    var y = obj.y * 1000;
    y = Math.round(y);
    
    var z = obj.z * 1000;
    z = Math.round(z);
    
    sb.send("accelX", "range", x.toString() );
    sb.send("accelY", "range", y.toString() );
    sb.send("accelZ", "range", z.toString() );
    
}