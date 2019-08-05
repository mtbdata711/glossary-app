export class Fetcher {
  constructor(url = "https://cyf-glossary-api.glitch.me/api") {
    this.url = url;
  }
  // Getter
  get getURL() {
    return this.url;
  }

  async fetchTermByPath(props) {
    const {
      match: { params }
    } = props;
    const url = `${this.url}/singleterm?term=${params.query}`;
    //console.log(url);
    var response = await fetch(url);
    response = await response.json();
    return response;
  }

  async fetchTermsByParams(props) {
    const {
      match: { params }
    } = props;
    const url = `${this.url}/search?query=${params.query}`;
    var response = await fetch(url);
    response = await response.json();
    return response;
  }

  async fetchTermsBySlug(slug) {
    const url = `${this.url}/search?query=${slug}`;
    var response = await fetch(url);
    response = await response.json();
    return response;
  }

async fetchHistoryById(id) {
  const url = `${this.url}/gethistory?id=${id}`;
  var response = await fetch(url);
  response = await response.json();
  return response;
}

async fetchUserSavedTerms(userId) {
  const url = `${this.url}/getusersaved?user=${userId}`;
  var response = await fetch(url);
  response = await response.json();
  return response;
}

async fetchTermsByUser(userId) {
  const url = `${this.url}/getuserterms?id=${userId}`;
  var response = await fetch(url);
  response = await response.json();
  return response;
}

slugify = input => {
  const output = input.toLowerCase();
  return output.replace(/\W/g, "");
};


}