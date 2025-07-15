import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.querySelector('#datetime-picker');
const startBTN = document.querySelector('[data-start]');
const daysE1 = document.querySelector('[data-days]');
const hourE1 = document.querySelector('[data-hours]');
const minutesE1 = document.querySelector('[data-minutes]');
const secondsE1 = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerId = null;


startBTN.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

function updateTimer(){
    const now = new Date();
    const timeOff = userSelectedDate - now;
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  datetimePicker.disabled = true;
  startBtn.disabled = true;

  updateTimer();
  timerId = setInterval(updateTimer, 1000);
});
