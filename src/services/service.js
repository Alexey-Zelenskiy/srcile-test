export default class Service {
  constructor() {
    this._apiBase = 'http://alex.devel.softservice.org/'
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`);
    }
    return await res.json();
  };


  getBalance = async () => {
   return  await this.getResource(`testapi/`);
  };

}
