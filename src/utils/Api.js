const baseUrl = 'http://localhost:3001';

export default class Api{
    constructor(options){
        this._url = baseUrl;
        this._headers = options.headers;
    }

    _processResponse = (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      }

      async getItems(){
        return fetch(baseUrl + '/items', {
            method: 'GET',
            headers: this._headers
        }).then(this._processResponse)
      }

      async addItem(name, imgUrl, weather){
        return fetch(baseUrl + '/items', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                imageUrl: imgUrl,
                weather: weather
            })
        }).then(this._processResponse)
      }

      async deleteItem(id){
        return fetch(baseUrl + `/items/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._processResponse)
      }
}