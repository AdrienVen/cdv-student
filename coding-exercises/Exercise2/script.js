function getData(){
    let data_obj =[{
            "timestamp": "2021-01-31T17:20:20.798Z",
            "identity": "International students",
            "frequentations": 1,
            "comfort": 3,
            "interaction": 1,
            "culture": 1,
            "evolution": 2
        },
        {
            "timestamp": "2021-01-31T18:46:28.362Z",
            "identity": "International students",
            "frequentations": 2,
            "comfort": 3,
            "interaction": 1,
            "culture": 3,
            "evolution": 3
        },
        {
            "timestamp": "2021-01-31T22:34:05.143Z",
            "identity": "International students",
            "frequentations": 3,
            "comfort": 3,
            "interaction": 1,
            "culture": 2,
            "evolution": 2
        },
        {
            "timestamp": "2021-02-01T01:21:48.831Z",
            "identity": "International students",
            "frequentations": 1,
            "comfort": 3,
            "interaction": 1,
            "culture": 1,
            "evolution": 1
        },
        {
            "timestamp": "2021-02-01T01:36:27.504Z",
            "identity": "Chinese students",
            "frequentations": 2,
            "comfort": 2,
            "interaction": 1,
            "culture": 3,
            "evolution": 1
        },
        {
            "timestamp": "2021-02-01T01:42:17.277Z",
            "identity": "Chinese students",
            "frequentations": 3,
            "comfort": 3,
            "interaction": 1,
            "culture": 2,
            "evolution": 2
        },
        {
            "timestamp": "2021-02-01T01:42:38.454Z",
            "identity": "Chinese students",
            "frequentations": 3,
            "comfort": 3,
            "interaction": 2,
            "culture": 1,
            "evolution": 1
        },
        {
            "timestamp": "2021-02-01T18:21:26.397Z",
            "identity": "International students",
            "frequentations": 1,
            "comfort": 3,
            "interaction": 2,
            "culture": 2,
            "evolution": 3
        },
        {
            "timestamp": "2021-02-01T18:45:43.205Z",
            "identity": "International students",
            "frequentations": 1,
            "comfort": 3,
            "interaction": 1,
            "culture": 2,
            "evolution": 3
        },
        {
            "timestamp": "2021-02-01T19:09:37.211Z",
            "identity": "International students",
            "frequentations": 2,
            "comfort": 3,
            "interaction": 3,
            "culture": 1,
            "evolution": 1
        },
        {
            "timestamp": "2021-02-02T09:14:56.008Z",
            "identity": "Chinese students",
            "frequentations": 2,
            "comfort": 2,
            "interaction": 1,
            "culture": 2,
            "evolution": 1
        },
        {
            "timestamp": "2021-02-02T09:15:01.332Z",
            "identity": "Chinese students",
            "frequentations": 1,
            "comfort": 2,
            "interaction": 2,
            "culture": 3,
            "evolution": 3
        },
        {
            "timestamp": "2021-02-02T09:15:24.052Z",
            "identity": "Chinese students",
            "frequentations": 1,
            "comfort": 3,
            "interaction": 1,
            "culture": 1,
            "evolution": 1
        },
        {
            "timestamp": "2021-02-02T15:28:07.164Z",
            "identity": "International students",
            "frequentations": 3,
            "comfort": 3,
            "interaction": 1,
            "culture": 2,
            "evolution": 2
        }]
    return data_obj;
}

function averageData(){
    let data_obj = getData();
    let data_avg = {
        frequentations: 0,
        comfort: 0,
        interaction: 1,
        culture: 2,
        evolution: 2
    }
    let intl = 0;
    for (let i=0; i < data_obj.length; i++){
        if (data_obj[i].identity === "International students"){
            intl+=1;
        }
        data_avg.frequentations += data_obj[i].frequentations/data_obj.length
        data_avg.comfort += data_obj[i].comfort/data_obj.length
        data_avg.interaction += data_obj[i].interaction/data_obj.length
        data_avg.culture += data_obj[i].culture/data_obj.length
        data_avg.evolution += data_obj[i].evolution/data_obj.length

    }
    return data_avg;
}

function drawCube(canvas, ctx, val, offset){
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    let color0 = 'rgb(' + r + ',' + g + ',' + b + ')';
    let color1 = 'rgb(' + r + ',' + g + ',' + b + ')';
    let color2 = 'rgb(' + r + ',' + g + ',' + b + ')';
    let x = 90 + (window.innerWidth / 16 + window.innerWidth / 5.5 * offset);
    let y = 500;
    let wx = window.innerWidth / 16;
    let wy = window.innerWidth / 16;
    let h = 8*val;

    // LINE MODE
    ctx.lineJoin = "round";

    // left face
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - wx, y - wx * 0.5);
    ctx.lineTo(x - wx, y - h - wx * 0.5);
    ctx.lineTo(x, y - h * 1);
    ctx.closePath();
    ctx.fillStyle = color2;
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
    ctx.fill();

    // right face
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + wy, y - wy * 0.5);
    ctx.lineTo(x + wy, y - h - wy * 0.5);
    ctx.lineTo(x, y - h * 1);
    ctx.closePath();
    ctx.fillStyle = color1;
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
    ctx.fill();

    // center face
    ctx.beginPath();
    ctx.moveTo(x, y - h);
    ctx.lineTo(x - wx, y - h - wx * 0.5);
    ctx.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
    ctx.lineTo(x + wy, y - h - wy * 0.5);
    ctx.closePath();
    ctx.fillStyle = color0;
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
    ctx.fill();
}

function drawLines(ctx, tallest){
    ctx.beginPath();
    ctx.moveTo(50, 500);
    ctx.lineTo(125 + (window.innerWidth / 16 + window.innerWidth / 7 * 5), 500);
    ctx.closePath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(50, tallest);
    ctx.lineTo(125 + (window.innerWidth / 16 + window.innerWidth / 7 * 5), tallest);
    ctx.closePath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
    ctx.fill();
}

function drawCubes(){
    let data_avg = Object.values(averageData());
    var canvas = document.getElementById("b_canvas")
    var ctx = canvas.getContext('2d');
    let tallest = 0;
    canvas.width  = window.innerWidth;
    canvas.height = 500;

    for (let i = 0; i < data_avg.length; i++){
        drawCube(canvas, ctx, data_avg[i] * 10 ,i)
        if (data_avg[i]*10 > tallest){
            tallest = data_avg[i]*10;
        }
    }
    drawLines(ctx, tallest)
}