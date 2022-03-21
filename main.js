timer_counter = 0;

timer_check = 0;

drawn_sketch = 0;

answer_holder = 0;

score = 0;

function updateCanvas() {
    background("white")
    random_number = Math.floor(Math.random()*quick_draw_data_set.length)+1;
    console.log(quick_draw_data_set[random_number]);
    sketch = quick_draw_data_set[random_number];
    document.getElementById('sketch_name').innerHTML = 'Sketch to be Drawn' + sketch;
}

function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw() {
    check_sketch()
    if(drawn_sketch == sketch)
    {
        answer_holder = "set"
        scrore++;
        document.getElementById('score').innerHTML = 'Score: ' + score;
    }
    strokeWeight(13);

    stroke(0);

    if  (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResults)
}

function check_sketch()
{
    timer_counter++;
    document.getElementById('time').innerHTML = 'Timer: ' + timer_counter;
    console.log(timer_counter)
    if(timer_counter > 400)
    {
        timer_counter = 0;
        timer_check = "completed"
    }
    if(timer_check = "completed" || answer_holder == "set")
    {
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}

function gotResults(error, results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Label: ' + results[0].label;

    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}