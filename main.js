song = "";

status = "";
objects = [];


function preload()
{
    song = loadSound("alert.mp3") 
}
function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Objects Detecting";
}
 

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}
 
function gotResult(error, results)
{
    if(error)
    {
        console.error();
    }
    else{
        console.log(results);
        objects = results;
    }
}


function draw()
{
    image(video, 0, 0, 380, 380);


    if(status != "")
    {
        
    objectDetector.detect(video, gotResult);

        for(i = 0 ; i < objects.length ; i++)
        {
            document.getElementById("status").innerHTML = "Objects Detected";
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);
             stroke(r, g, b);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
            if(objects[i].label == "person")
            {
                song.stop();
                document.getElementById("Baby_found_or_NotFound").innerHTML = "Baby found";
            }

         else {
            document.getElementById("Baby_found_or_NotFound").innerHTML = "Baby not found";
            song.play();
        }
            
        }


    if(objects.length == 0)
    {
        document.getElementById("Baby_found_or_NotFound").innerHTML = "Baby not found";
        song.play();
    }
    
    }
}