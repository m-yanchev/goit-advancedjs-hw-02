import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { showErrorMessage } from "./messages";

const refs = {
	startButton: document.querySelector('[data-start]'),
	datetimePicker: document.querySelector('#datetime-picker'),
	days: document.querySelector('[data-days]'),
	hours: document.querySelector('[data-hours]'),
	minutes: document.querySelector('[data-minutes]'),
	seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;

const futureValidation = date => date > new Date();

const onPickerClose = selectedDates => {
	if (!futureValidation(selectedDates[0])) {
		showErrorMessage('Please choose a date in the future');
  }
};

const onPickerChange = selectedDates => {
	if (futureValidation(selectedDates[0])) {
	  userSelectedDate = selectedDates[0];
	  refs.startButton.disabled = false;
	} else {
	  refs.startButton.disabled = true;
	}
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onPickerClose,
	onChange: onPickerChange,
};

flatpickr("#datetime-picker", options);

let timerId = null;

const convertMs = ms => {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const days = Math.floor(ms / day);
	const hours = Math.floor((ms % day) / hour);
	const minutes = Math.floor(((ms % day) % hour) / minute);
	const seconds = Math.floor((((ms % day) % hour) % minute) / second);

	return { days, hours, minutes, seconds };
};

const pad = value => String(value).padStart(2, '0');

const showDate = ({ days, hours, minutes, seconds }) => {
	refs.days.textContent = pad(days);
	refs.hours.textContent = pad(hours);
	refs.minutes.textContent = pad(minutes);
	refs.seconds.textContent = pad(seconds);
};

const updateTimer = () => {
	const diff = userSelectedDate - Date.now();
	if (diff <= 0) {
		stopTimer();
		return;
	}
	showDate(convertMs(diff));
};

const stopTimer = () => {
  clearInterval(timerId);
  refs.datetimePicker.disabled = false;
};

const startTimer = () => {
  refs.startButton.disabled = true;
  refs.datetimePicker.disabled = true;
	timerId = setInterval(updateTimer, 1000);
};

refs.startButton.disabled = true;
refs.startButton.addEventListener('click', startTimer);
