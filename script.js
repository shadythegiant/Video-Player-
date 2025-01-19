const player = document.querySelector(".player");
const video = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const speed = document.querySelector(".player-speed");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");

//

// Play & Pause ----------------------------------- //
function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}
function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
}
// Progress Bar ---------------------------------- //

function dispayTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

function updateProgress() {
  const Vduration = video.duration;
  let VcurrenTime = video.currentTime;

  progressBar.style.width = `${(VcurrenTime / Vduration) * 100}%`;

  currentTime.textContent = dispayTime(VcurrenTime) + "/";
  duration.textContent = dispayTime(Vduration);
}

function setProgress(e) {
  progressBar.style.width = `${(e.offsetX / e.target.offsetWidth) * 100}%`;
  video.currentTime = (e.offsetX / e.target.offsetWidth) * video.duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// volume Bar
function changeVolume(e) {
  let volume = e.offsetX / e.target.offsetWidth;

  if (volume < 0.1) volume = 0;
  if (volume > 0.9) volume = 1;
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  console.log(volume);

  if (volume > 0.7) volumeIcon.className = "fas fa-volume-up";
  if (volume < 0.7 && volume > 0) volumeIcon.className = "fas fa-volume-down ";
  if (volume === 0) volumeIcon.className = "fas fa-volume-off";

  lastVolume = volume;
}

function toggleMute() {
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.className = "fas fa-volume-off";
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    if (video.volume > 0.7) volumeIcon.className = "fas fa-volume-up";
    if (video.volume < 0.7 && video.volume > 0)
      volumeIcon.className = "fas fa-volume-down ";
  }
}
// Change Playback Speed -------------------- //

function changePlayBacKSpeed() {
  video.playbackRate = speed.value;
}
// Fullscreen ------------------------------- //

function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
}

let fullscreen = false;

// Toggle fullscreen
function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}
// Event Listeners
// --------------------

playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("ended", showPlayIcon);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);

progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changePlayBacKSpeed);
fullscreenBtn.addEventListener("click", toggleFullscreen);
