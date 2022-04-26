// 封装fetch

export default function request(url, options) {
  const defaultOptions = {
    credentials: "include",
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method) {
    newOptions.method = newOptions.method.toUpperCase();
  }
  if (typeof newOptions.params === "object") {
    const queryString = Object.keys(newOptions.params)
      .map((it) => {
        const v = newOptions.params[it];
        if (typeof v !== "undefined" && v !== null) {
          return `${it}=${encodeURIComponent(v)}`;
        }
        return;
      })
      .filter((it) => it)
      .join("&");

    url += (url.indexOf("?") === -1 ? "?" : "&") + queryString;
    delete newOptions.params;
  }
  if (
    newOptions.method === "POST" ||
    newOptions.method === "PUT" ||
    newOptions.method === "DELETE"
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...newOptions.headers,
      };
      if (typeof newOptions.body === "object") {
        newOptions.body = JSON.stringify(newOptions.body);
      }
    } else {
      newOptions.headers = {
        Accept: "application/json",
        ...newOptions.headers,
      };
    }
  }

  return new Promise((resolve, reject) => {
    fetch(url, newOptions)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.success || res.status === 10000) {
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          return;
        }
        reject(err);
      });
  });
}
