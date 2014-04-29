// when page loads call spacebrew setup function 
$(window).on("load", setupSpacebrew);

// Spacebrew Object
var sb
    , app_name = "sound-around"
    , values = {};

var arrow;
var mapped = map( obj.x, -10, 10, 0, 1024);
sb.send( "accelX", "range", mapped );
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
    sb.addPublish("alpha", "range", "500");
    sb.addPublish("beta", "range", "500");
    sb.addPublish("gamma", "range", "500");
    //sb.addSubscribe("slider1", "range");

    // override Spacebrew events - this is how you catch events coming from Spacebrew
    //sb.onRangeMessage = onRangeMessage;
    //sb.onOpen = onOpen;

    // connect to spacbrew
    sb.connect();
    
    gyro.frequency = 50;
    gyro.startTracking( onAccelerometer );
    
};

// o.x, o.y, o.z for accelerometer
// o.alpha, o.beta, o.gamma for gyro
function onAccelerometer( obj ){
  //put acel dat here to rotate arrow 
  // 1 -get the html element  
  // 2 - set 
  
  //the style
    //set our arrow variable
    arrow = document.getElementById("red");
    arrow.style.webkitTransform = "rotate(" + (obj.x * 180) + "deg)"
  
    var x = obj.x * 1;
    x = Math.round(x);
    
    var y = obj.y * 1;
    y = Math.round(y);
    
    var z = obj.z * 1;
    z = Math.round(z);
    
    var alpha = obj.alpha * 1;
    alpha = Math.round(alpha);
    
    var beta = obj.beta * 1;
    beta = Math.round(beta);
    
    var gamma = obj.gamma * 1;
    gamma = Math.round(gamma);
    
    sb.send("accelX", "range", x.toString() );
    sb.send("accelY", "range", y.toString() );
    sb.send("accelZ", "range", z.toString() );
    
    sb.send("alpha", "range", alpha.toString() );
    sb.send("beta", "range", beta.toString() );
    sb.send("gamma", "range", gamma.toString() );
    
}