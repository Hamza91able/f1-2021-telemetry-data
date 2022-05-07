import moment from "moment";

export const formatTime = (duration) => {
  const formatted = (duration / 1000).toFixed(3);
  const in_minutes = moment(duration).format("mm:ss");
  const mili_split = formatted.split(".")[1];
  return `${in_minutes}:${mili_split}`;
};
