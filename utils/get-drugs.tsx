export default async function FetchDrugs(query: string) {
  const namePoint = 'http://api.medicinpriser.dk/v1/produkter/';
  const ingredientPoint =
    'http://api.medicinpriser.dk/v1/produkter/virksomtstof/';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

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
