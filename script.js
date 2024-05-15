const currentTime = document.querySelector("h1");
const content = document.querySelector(".content");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#setAlarmBtn");

let alarmTime;
let isAlarmSet = false;
const ringtone = new Audio("alarm.mp3");

// Populate hour select menu
for (let i = 12; i > 0; i--) {
  let formattedI = i < 10 ? `0${i}` : i;
  let option = `<option value="${formattedI}">${formattedI}</option>`;
  selectMenu[0].insertAdjacentHTML("beforeend", option);
}

// Populate minute select menu
for (let i = 59; i >= 0; i--) {  // Include 0 minute
  let formattedI = i < 10 ? `0${i}` : i;
  let option = `<option value="${formattedI}">${formattedI}</option>`;
  selectMenu[1].insertAdjacentHTML("beforeend", option);
}

// Populate AM/PM select menu
let ampmOptions = ["AM", "PM"];
ampmOptions.forEach(ampm => {
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].insertAdjacentHTML("beforeend", option);
});

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm = "AM";
  
  if (h >= 12) {
    ampm = "PM";
    h = h > 12 ? h - 12 : h;
  }
  
  h = h == 0 ? 12 : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  
  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
  
  if (alarmTime === `${h}:${m} ${ampm}` && isAlarmSet) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    ringtone.currentTime = 0;
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    isAlarmSet = false;
  } else {
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
      alert("Please select a valid time to set Alarm!");
    } else {
      alarmTime = time;
      isAlarmSet = true;
      content.classList.add("disable");
      setAlarmBtn.innerText = "Clear Alarm";
    }
  }
}

setAlarmBtn.addEventListener("click", setAlarm);
