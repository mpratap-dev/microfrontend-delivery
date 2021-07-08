export const getQueryParamsFromURL = () => {
  if (window.location.search) {
    var search = window.location.search.substring(1);
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  }
  return {};
};

export const serialize = (obj) => {
  return Object.entries(obj)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
};
