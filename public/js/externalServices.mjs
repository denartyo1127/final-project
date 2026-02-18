async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {
    this.path = "./services.json";
  }

  async getServices() {
    const response = await fetch(this.path);
    const data = await convertToJson(response);
    return data;
  }
}