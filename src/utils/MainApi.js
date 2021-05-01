import {BASE_URL} from "./config";

class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  getSearchId() {
    return fetch(`${this._baseUrl}/search`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
  }

  getTickets(SearchId) {
    return fetch(`${this._baseUrl}/tickets?searchId=${SearchId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject((res.json()));
      })
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
});

export default mainApi;
