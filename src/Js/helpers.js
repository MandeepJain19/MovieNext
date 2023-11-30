import { TIMEOUT_SEC } from "./config";
import preview from "./views/preview";
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};
export const getJSON = async function (url, options) {
  try {
    const res = await Promise.race([fetch(url, options), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.status_message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
// select parent of preview and add event listner to it for close btn
document.querySelector(".closeBtn").addEventListener("click", function (e) {
  document.querySelector(".preview-container").classList.toggle("hidden");
});
