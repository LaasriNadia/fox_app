export const ICONS = ["fish", "poop", "weather"];
export const SCENES = ["day", "rain"];
export const TICK_RATE = 3000;
export const RAIN_CHANCE = 0.2;
export const DAY_LENGTH = 60;
export const NIGHT_LENGTH = 5;
export const getNextHungerTime = (clock) =>
    Math.floor(Math.random() * 3) + 8 + clock;
export const getNextDieTime = (clock) =>
    Math.floor(Math.random() * 3) + 3 + clock;
export const getNextPoopTime = (clock) =>
    Math.floor(Math.random() * 3) + 8 + clock;


export const modFox = function modFox(state) {
    document.querySelector(".fox").className = `fox fox-${state}`;
};
export const modScene = function modScene(state) {
    document.querySelector(".game").className = `game ${state}`;
};
export const togglePoopBag = function togglePoopBag(show) {
    document.querySelector(".poop-bag").classList.toggle("hidden", !show);
};
export const writeModal = function writeModal(text = "") {
    document.querySelector(
        ".modal"
    ).innerHTML = `<div class="modal-inner">${text}</div>`;
};