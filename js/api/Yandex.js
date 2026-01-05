/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {

  static HOST = 'https://cloud-api.yandex.net/v1/disk';
  static headers = {
    'Authorization': `OAuth ${this.getToken()}`,
    'Content-Type': 'application/json',
  };

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken() {

    let tokenYandexDisk = localStorage.getItem('TokenYandexDisk');
    
    if (!tokenYandexDisk) {
      tokenYandexDisk = prompt('Введите OAUth-токен от Яндекс.Диска');
      localStorage.setItem('TokenYandexDisk', tokenYandexDisk);
    };
    return tokenYandexDisk; 
  };

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback) {

    createRequest({
      method: 'POST',
      url: 'https://cloud-api.yandex.net/v1/disk/resources/upload',
      data: {'path': path, 'url': url},
      headers: this.headers,
      callback: callback,
    });
  };

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback) {

    createRequest({
      method: 'DELETE',
      url: 'https://cloud-api.yandex.net/v1/disk/resources',
      data: {'path': path},
      headers: this.headers,
      callback: callback,
    });
  };

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback) {

    createRequest({
      method: 'GET',
      url: 'https://cloud-api.yandex.net/v1/disk/resources/files',
      headers: this.headers,
      data: {media_type: 'image', limit: 1000},
      callback: callback,
    });
  };

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url) {

    const link = document.createElement('a');
    link.href = url;
    link.click();
  };
};