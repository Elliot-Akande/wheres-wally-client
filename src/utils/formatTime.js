function formatTime(time) {
  const mins = Math.floor(time / 60)
    .toString()
    .padStart(2, 0);
  const secs = (time % 60).toString().padStart(2, 0);
  const string = `${mins}:${secs}`;

  return string;
}

export default formatTime;
