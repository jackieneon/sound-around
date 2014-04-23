// when page loads call spacebrew setup function 
$(window).on("load", setupSpacebrew);

// Spacebrew Object
var sb
    , app_name = "sound-around"
    , values = {};

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
    
    //gyro.frequency = 500;
    gyro.startTracking( onAccelerometer );
};

// o.x, o.y, o.z for accelerometer
// o.alpha, o.beta, o.gamma for gyro
function onAccelerometer( obj ){
    
    obj.y 
    obj.z
    
    sb.send("accelX", "range", ""+ obj.x );
    sb.send("accelY", "range", ""+ obj.y );
    
}