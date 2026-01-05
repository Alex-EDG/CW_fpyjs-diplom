/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  // Можно статически задать VK токен здесь, но лучше по запросу (с последующим хранением в localStorage)
  static ACCESS_TOKEN = '';

  //* Базовый URL для запросов к VK API
  static API_URL = 'https://api.vk.ru/method';

  //* Версия API VK
  static API_VERSION = '5.199';

  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback) {

    this.lastCallback = callback;

    if (this.ACCESS_TOKEN.length === 0 || !this.ACCESS_TOKEN) {
      this.ACCESS_TOKEN = this.getToken();
    };

    const script = document.createElement('script');
    script.id = 'vk__response'
    script.src = `${this.API_URL}/photos.get?owner_id=${id}&album_id=profile&access_token=${this.ACCESS_TOKEN}&v=${this.API_VERSION}&callback=VK.processData`;
    document.body.append(script);
  };

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result) {

    document.getElementById('vk__response').remove();
    const photosList = [];

    if (!result || !result.response || !result.response.items) {
      alert('Ошибка при получении данных!');
      return;
    };

    if (result.response) {

      const photos = result.response.items;

      if (photos.length === 0) {
        alert(`У пользователя с id=${id} фотографии профиля отсутствуют`);
      };
    } else if (result.error) {
      alert(`Ошибка: "${result.error.error_msg}"`);
    };

    // Выбор максимального размера фото
    for (const item of result.response.items) {
      let sizes = item.sizes;
      let maxSize = sizes.reduce((prev, current) => {
        const prevArea = prev.width * prev.height;
        const currentArea = current.width * current.height;
        return prevArea > currentArea ? prev : current;
      });
      photosList.push(maxSize.url);
    };
    this.lastCallback(photosList);
    this.lastCallback = () => {};
  };

  /**
   * Метод формирования и сохранения токена для VK API
  */
  static getToken() {

    if (!localStorage.getItem('TokenVK')) {
      let tokenVK = prompt('Введите OAUth-токен VK');
      localStorage.setItem('TokenVK', tokenVK);
      return tokenVK;
    } else {
      return localStorage.getItem('TokenVK');
    };    
  };
};