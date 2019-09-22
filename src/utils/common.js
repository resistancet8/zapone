export const serialize = obj => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      if (typeof obj[p] === "boolean" || obj[p] === 0 || obj[p]) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
  }
  return str.join("&");
};
