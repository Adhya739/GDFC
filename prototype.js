
/*---------------------------
INPUT ELEMENTS
---------------------------*/

const inputs = {

pitot_speed: document.getElementById("pitot_speed"),
gps_speed: document.getElementById("gps_speed"),
altitude: document.getElementById("altitude"),
vertical_speed: document.getElementById("vertical_speed"),
pitch: document.getElementById("pitch"),
roll: document.getElementById("roll"),
heading: document.getElementById("heading"),

accel_x: document.getElementById("accel_x"),
accel_y: document.getElementById("accel_y"),
accel_z: document.getElementById("accel_z"),

gyro_x: document.getElementById("gyro_x"),
gyro_y: document.getElementById("gyro_y"),
gyro_z: document.getElementById("gyro_z"),

pressure: document.getElementById("pressure"),
temperature: document.getElementById("temperature"),

latitude: document.getElementById("latitude"),
longitude: document.getElementById("longitude")

};


/*---------------------------
OUTPUTS
---------------------------*/

const prediction=document.getElementById("prediction");

const confidence=document.getElementById("confidence");

const latency=document.getElementById("latency");

const backup=document.getElementById("backup_sensor");

const mode=document.getElementById("control_mode");

const priority=document.getElementById("priority");

const logs=document.getElementById("systemLogs");


/*---------------------------
BUTTONS
---------------------------*/

const normalBtn=document.getElementById("normalBtn");

const pitotBtn=document.getElementById("pitotBtn");

const gpsBtn=document.getElementById("gpsBtn");

const imuBtn=document.getElementById("imuBtn");

const resetBtn=document.getElementById("resetBtn");

const predictBtn=document.getElementById("predictBtn");


/*---------------------------
SYSTEM LOG
---------------------------*/

function addLog(message){

const now=new Date();

const time=now.toLocaleTimeString();

const div=document.createElement("div");

div.innerHTML="<strong>"+time+"</strong> : "+message;

logs.prepend(div);

}


/*---------------------------
SET VALUES
---------------------------*/

function fillInputs(data){

Object.keys(data).forEach(key=>{

inputs[key].value=data[key];

});

}


/*---------------------------
NORMAL FLIGHT
---------------------------*/

const normalFlight={

pitot_speed:280,

gps_speed:281,

altitude:35000,

vertical_speed:0,

pitch:2,

roll:1,

heading:90,

accel_x:0.01,

accel_y:0,

accel_z:1,

gyro_x:0.02,

gyro_y:0.01,

gyro_z:0.03,

pressure:238,

temperature:-45,

latitude:19.076,

longitude:72.877

};


/*---------------------------
PITOT FAILURE
---------------------------*/

const pitotFailure={

pitot_speed:95,

gps_speed:281,

altitude:35000,

vertical_speed:0,

pitch:2,

roll:1,

heading:90,

accel_x:0.01,

accel_y:0,

accel_z:1,

gyro_x:0.02,

gyro_y:0.01,

gyro_z:0.03,

pressure:238,

temperature:-45,

latitude:19.076,

longitude:72.877

};


/*---------------------------
GPS FAILURE
---------------------------*/

const gpsFailure={

pitot_speed:280,

gps_speed:48,

altitude:35000,

vertical_speed:0,

pitch:2,

roll:1,

heading:90,

accel_x:0.01,

accel_y:0,

accel_z:1,

gyro_x:0.02,

gyro_y:0.01,

gyro_z:0.03,

pressure:238,

temperature:-45,

latitude:19.076,

longitude:72.877

};


/*---------------------------
IMU FAILURE
---------------------------*/

const imuFailure={

pitot_speed:280,

gps_speed:281,

altitude:35000,

vertical_speed:0,

pitch:24,

roll:17,

heading:90,

accel_x:2.1,

accel_y:1.8,

accel_z:4.2,

gyro_x:3.2,

gyro_y:2.7,

gyro_z:4.8,

pressure:238,

temperature:-45,

latitude:19.076,

longitude:72.877

};


/*---------------------------
BUTTON EVENTS
---------------------------*/

normalBtn.onclick=()=>{

fillInputs(normalFlight);

addLog("Normal Flight Loaded");

};


pitotBtn.onclick=()=>{

fillInputs(pitotFailure);

addLog("Pitot Failure Scenario Loaded");

};


gpsBtn.onclick=()=>{

fillInputs(gpsFailure);

addLog("GPS Failure Scenario Loaded");

};


imuBtn.onclick=()=>{

fillInputs(imuFailure);

addLog("IMU Drift Scenario Loaded");

};


resetBtn.onclick=()=>{

Object.values(inputs).forEach(input=>{

input.value="";

});

prediction.innerHTML="Waiting...";

confidence.innerHTML="--";

latency.innerHTML="--";

backup.innerHTML="--";

mode.innerHTML="NORMAL";

priority.innerHTML="LOW";

addLog("System Reset");

};

/*---------------------------
CHARTS
---------------------------*/

const speedCtx = document.getElementById("speedChart").getContext("2d");
const altitudeCtx = document.getElementById("altitudeChart").getContext("2d");
const confidenceCtx = document.getElementById("confidenceChart").getContext("2d");

/* AIRSPEED CHART */

const speedChart = new Chart(speedCtx,{
type:"line",

data:{

labels:["T1","T2","T3","T4","T5"],

datasets:[

{

label:"Pitot",

data:[280,281,282,280,281],

borderColor:"#ff4d4f",

backgroundColor:"rgba(255,77,79,.15)",

tension:.4,

fill:true

},

{

label:"GPS",

data:[281,281,282,281,280],

borderColor:"#19d3ff",

backgroundColor:"rgba(25,211,255,.15)",

tension:.4,

fill:true

}

]

},

options:{

responsive:true,

plugins:{

legend:{

labels:{color:"white"}

}

},

scales:{

x:{ticks:{color:"white"}},

y:{ticks:{color:"white"}}

}

}

});


/* ALTITUDE CHART */

const altitudeChart = new Chart(altitudeCtx,{

type:"line",

data:{

labels:["T1","T2","T3","T4","T5"],

datasets:[{

label:"Altitude",

data:[35000,35010,34995,35005,35000],

borderColor:"#00d26a",

backgroundColor:"rgba(0,210,106,.2)",

fill:true,

tension:.4

}]

},

options:{

responsive:true,

plugins:{

legend:{

labels:{color:"white"}

}

},

scales:{

x:{ticks:{color:"white"}},

y:{ticks:{color:"white"}}

}

}

});


/* CONFIDENCE CHART */

const confidenceChart=new Chart(confidenceCtx,{

type:"doughnut",

data:{

labels:["Confidence","Remaining"],

datasets:[{

data:[96,4],

backgroundColor:[

"#19d3ff",

"#18324f"

],

borderWidth:0

}]

},

options:{

plugins:{

legend:{

labels:{color:"white"}

}

}

}

});


/*---------------------------
UPDATE SENSOR TABLE
---------------------------*/

function updateSensors(){

document.getElementById("pitot_reading").innerHTML=inputs.pitot_speed.value;

document.getElementById("gps_reading").innerHTML=inputs.gps_speed.value;

document.getElementById("pressure_reading").innerHTML=inputs.pressure.value;

}


/*---------------------------
SAFE HOLD
---------------------------*/

function activateSafeHold(){

document.getElementById("pitch_hold").innerHTML="ACTIVE";

document.getElementById("roll_hold").innerHTML="ACTIVE";

document.getElementById("heading_hold").innerHTML="ACTIVE";

document.getElementById("altitude_hold").innerHTML="ACTIVE";

document.getElementById("pitch_hold").className="active";

document.getElementById("roll_hold").className="active";

document.getElementById("heading_hold").className="active";

document.getElementById("altitude_hold").className="active";

}


/*---------------------------
NORMAL MODE
---------------------------*/

function deactivateSafeHold(){

document.getElementById("pitch_hold").innerHTML="Inactive";

document.getElementById("roll_hold").innerHTML="Inactive";

document.getElementById("heading_hold").innerHTML="Inactive";

document.getElementById("altitude_hold").innerHTML="Inactive";

}


/*---------------------------
PILOT GUIDANCE
---------------------------*/

function updateGuidance(list){

const guide=document.getElementById("pilot_guidance");

guide.innerHTML="";

list.forEach(item=>{

const li=document.createElement("li");

li.innerHTML=item;

guide.appendChild(li);

});

}


/*---------------------------
UPDATE CHARTS
---------------------------*/

function updateCharts(){

speedChart.data.datasets[0].data=[
280,
281,
282,
inputs.pitot_speed.value,
inputs.pitot_speed.value
];

speedChart.data.datasets[1].data=[
281,
281,
281,
inputs.gps_speed.value,
inputs.gps_speed.value
];

speedChart.update();

altitudeChart.data.datasets[0].data=[
35000,
35010,
34990,
inputs.altitude.value,
inputs.altitude.value
];

altitudeChart.update();

}


/*---------------------------
ANIMATION
---------------------------*/

function showLoading(){

prediction.innerHTML="Processing...";

confidence.innerHTML="--";

latency.innerHTML="--";

}


/*---------------------------
DISPLAY AI RESULT
---------------------------*/

function showPrediction(result){

prediction.innerHTML=result.prediction;

confidence.innerHTML=result.confidence+" %";

latency.innerHTML=result.latency+" ms";

backup.innerHTML=result.backup_sensor;

mode.innerHTML=result.mode;

priority.innerHTML=result.priority;

confidenceChart.data.datasets[0].data=[
result.confidence,
100-result.confidence
];

confidenceChart.update();

updateGuidance(result.guidance);

updateSensors();

updateCharts();

if(result.mode==="SAFE HOLD"){

activateSafeHold();

}else{

deactivateSafeHold();

}

addLog("Prediction : "+result.prediction);

}


/*---------------------------
DEMO MODE
(works before Flask backend)
---------------------------*/

function localPrediction(){

const pitot=parseFloat(inputs.pitot_speed.value);

const gps=parseFloat(inputs.gps_speed.value);

const pitch=parseFloat(inputs.pitch.value);

const roll=parseFloat(inputs.roll.value);


if(Math.abs(pitot-gps)>80){

return{

prediction:"Pitot Failure",

confidence:98,

latency:6,

backup_sensor:"GPS",

mode:"SAFE HOLD",

priority:"HIGH",

guidance:[

"Ignore Pitot Airspeed",

"Use GPS Airspeed",

"Maintain Heading",

"Prepare Manual Recovery"

]

};

}


if(gps<100){

return{

prediction:"GPS Failure",

confidence:97,

latency:5,

backup_sensor:"Pitot",

mode:"SAFE HOLD",

priority:"HIGH",

guidance:[

"Ignore GPS",

"Use Pitot",

"Monitor IMU",

"Contact ATC"

]

};

}


if(Math.abs(pitch)>20 || Math.abs(roll)>15){

return{

prediction:"IMU Drift",

confidence:95,

latency:7,

backup_sensor:"Sensor Fusion",

mode:"SAFE HOLD",

priority:"HIGH",

guidance:[

"Cross Check IMU",

"Monitor Aircraft Attitude",

"Maintain Manual Control"

]

};

}


return{

prediction:"Normal Flight",

confidence:99,

latency:4,

backup_sensor:"None",

mode:"NORMAL",

priority:"LOW",

guidance:[

"Aircraft Stable",

"Continue Monitoring"

]

};

}

/*---------------------------
FLASK API CONFIG
---------------------------*/

const API_URL = "http://127.0.0.1:5000/predict";

/*-------------------------------------------------
GET INPUT VALUES
--------------------------------------------------*/

function getInputData(){

return{

pitot_speed: Number(inputs.pitot_speed.value),
gps_speed: Number(inputs.gps_speed.value),
altitude: Number(inputs.altitude.value),
vertical_speed: Number(inputs.vertical_speed.value),

pitch: Number(inputs.pitch.value),
roll: Number(inputs.roll.value),
heading: Number(inputs.heading.value),

accel_x: Number(inputs.accel_x.value),
accel_y: Number(inputs.accel_y.value),
accel_z: Number(inputs.accel_z.value),

gyro_x: Number(inputs.gyro_x.value),
gyro_y: Number(inputs.gyro_y.value),
gyro_z: Number(inputs.gyro_z.value),

pressure: Number(inputs.pressure.value),
temperature: Number(inputs.temperature.value),

latitude: Number(inputs.latitude.value),
longitude: Number(inputs.longitude.value)

};

}

/*-------------------------------------------------
VALIDATION
--------------------------------------------------*/

function validateInputs(){

for(const key in inputs){

if(inputs[key].value===""){

alert("Please fill all 17 input fields.");

return false;

}

}

return true;

}

/*-------------------------------------------------
UPDATE SENSOR HEALTH
--------------------------------------------------*/

function updateSensorHealth(result){

document.getElementById("pitot_status").innerHTML=result.sensor_health?.pitot || "🟢 Healthy";

document.getElementById("gps_status").innerHTML=result.sensor_health?.gps || "🟢 Healthy";

document.getElementById("imu_status").innerHTML=result.sensor_health?.imu || "🟢 Healthy";

document.getElementById("pressure_status").innerHTML=result.sensor_health?.pressure || "🟢 Healthy";

}

/*-------------------------------------------------
UPDATE FEATURE IMPORTANCE
--------------------------------------------------*/

function updateFeatureImportance(importance){

if(!importance) return;

/*
Later you can dynamically update the
bars returned by Random Forest SHAP or
Feature Importance.
*/

}

/*-------------------------------------------------
UPDATE STATS
--------------------------------------------------*/

function updateStats(result){

document.getElementById("accuracy").innerHTML=result.accuracy || "96.4%";

document.getElementById("latencyCard").innerHTML=result.latency+" ms";

}

/*-------------------------------------------------
CALL ML MODEL
--------------------------------------------------*/

async function callModel(){

if(!validateInputs()) return;

showLoading();

const data=getInputData();

try{

const response=await fetch(API_URL,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

});

if(!response.ok){

throw new Error("Backend Error");

}

const result=await response.json();

showPrediction(result);

updateSensorHealth(result);

updateFeatureImportance(result.feature_importance);

updateStats(result);

addLog("Edge AI Prediction Completed");

}
catch(error){

console.warn("Backend not available.");

addLog("Backend Offline - Running Demo Mode");

const result=localPrediction();

showPrediction(result);

}

}

/*-------------------------------------------------
RUN BUTTON
--------------------------------------------------*/

predictBtn.addEventListener("click",callModel);

/*-------------------------------------------------
AUTO UPDATE SENSOR TABLE
--------------------------------------------------*/

Object.values(inputs).forEach(input=>{

input.addEventListener("input",()=>{

updateSensors();

});

});

/*-------------------------------------------------
INITIALIZE DASHBOARD
--------------------------------------------------*/

window.onload=function(){

fillInputs(normalFlight);

updateSensors();

updateCharts();

prediction.innerHTML="Ready";

confidence.innerHTML="--";

latency.innerHTML="--";

backup.innerHTML="None";

mode.innerHTML="NORMAL";

priority.innerHTML="LOW";

updateGuidance([

"System Initialized",

"Waiting for Edge AI Prediction"

]);

addLog("Grounded AI Flight Control Started");

addLog("Edge Device Connected");

addLog("Telemetry Ready");

};

/*-------------------------------------------------
AUTO LOG EVERY 10 SECONDS
--------------------------------------------------*/

setInterval(()=>{

const messages=[

"Monitoring Aircraft Sensors",

"Edge AI Waiting",

"Telemetry Received",

"Checking Sensor Health",

"Monitoring Flight Parameters"

];

const msg=messages[Math.floor(Math.random()*messages.length)];

addLog(msg);

},10000);

/*-------------------------------------------------
SIMULATE LIVE TELEMETRY
(Only Demo Mode)
--------------------------------------------------*/

setInterval(()=>{

if(inputs.pitot_speed.value==="") return;

let p=parseFloat(inputs.pitot_speed.value);

let g=parseFloat(inputs.gps_speed.value);

let a=parseFloat(inputs.altitude.value);

p+=Math.random()*2-1;

g+=Math.random()*2-1;

a+=Math.random()*20-10;

inputs.pitot_speed.value=p.toFixed(1);

inputs.gps_speed.value=g.toFixed(1);

inputs.altitude.value=Math.round(a);

updateCharts();

updateSensors();

},3000);

/*-------------------------------------------------
CONSOLE
--------------------------------------------------*/

console.log("======================================");
console.log(" GDFC EDGE AI PROTOTYPE READY");
console.log(" Tata Technologies InnoVent 2027");
console.log(" Frontend Initialized");
console.log("======================================");
