/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  const {url, method = 'GET', data = {}, callback} = options;

  if (!url) {
    console.error('URL не указан');
    if (callback) callback(new Error('URL не указан'), null);
    return;
  };

  // Формируем URL с параметрами для запроса
  let fullUrl = url;

  if (Object.keys(data).length > 0) {
    const params = new URLSearchParams(data).toString();
    fullUrl = `${url}?${params}`;
  };

  xhr.addEventListener('load', () => {

    return {success: true, user: callback(xhr.response)}; // {success: true, user: Object}
  });

  xhr.addEventListener('error', (error) => {

    return {success: callback(new Error(error || 'Ошибка запроса')), user: null};
  });

  try {

    xhr.open(method, fullUrl);

    if (options.headers) {
      for (const [header, value] of Object.entries(options.headers)) {
        xhr.setRequestHeader(header, value);
      };
    };
    xhr.send();
  } catch (err) {
    console.error(err);
    alert(err);
  };
};