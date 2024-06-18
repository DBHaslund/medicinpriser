const base = 'http://api.medicinpriser.dk/v1/';
const namePoint = base + '/produkter/';
const ingredientPoint = base + 'produkter/virksomtstof/';
const detailPoint = base + 'produkter/detaljer/';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export async function FetchMeds(query: string) {
  try {
    const response = await fetch(`${namePoint}${query}`, {
      method: 'GET',
      headers,
    });

    let json = await response.json();

    if (json.length === 0) {
      const response = await fetch(`${ingredientPoint}${query}`, {
        method: 'GET',
        headers,
      });

      json = await response.json();
    }
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDetails(vnr: string | string[]) {
  try {
    if (typeof vnr === 'string') {
      const response = await fetch(`${detailPoint}${vnr}`, {
        method: 'GET',
        headers,
      });

      let json = await response.json();

      return json;
    } else if (Array.isArray(vnr)) {
      const list = [];

      for (let i = 0; i < vnr.length; i++) {
        const response = await fetch(`${detailPoint}${vnr[i]}`, {
          method: 'GET',
          headers,
        });

        let json = await response.json();

        list.push(json);
      }

      return list;
    }
  } catch (error) {
    console.log(error);
  }
}
