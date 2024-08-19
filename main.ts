// Define the types for the data structure
type Info = {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
};

type Character = {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
};

// Fetch the data from the Rick and Morty API
fetch('https://rickandmortyapi.com/api/character')
  .then((response) => response.json())
  .then((json: { info: Info; results: Character[] }) => {
    // Log the entire response to inspect the data structure
    console.log(json);

    // Iterate over the results array which contains character data
    json.results.forEach((character) => {
      // Log character details to the console
      console.log(`Name: ${character.name}`);
      console.log(`Species: ${character.species}`);
      console.log(`Image URL: ${character.image}`);
      console.log(`Number of Episodes: ${character.episode.length}`);
      console.log('-----------------------------');
    });

    // Display data in the HTML
    displayCharacterData(json.results);
  })
  .catch((error) => console.error('Error fetching data:', error));

// Function to display character data in the HTML
function displayCharacterData(characters: Character[]) {
  // Get the container element where the data will be displayed
  const container = document.getElementById('character-container');

  if (!container) {
    console.error('Character container not found in the HTML.');
    return;
  }

  // Clear the container before appending new content
  container.innerHTML = '';

  // Iterate over each character and create HTML elements to display the data
  characters.forEach((character) => {
    const characterElement = document.createElement('div');
    characterElement.style.border = '1px solid #ccc';
    characterElement.style.padding = '10px';
    characterElement.style.marginBottom = '10px';

    const nameElement = document.createElement('h2');
    nameElement.textContent = `Name: ${character.name}`;

    const speciesElement = document.createElement('p');
    speciesElement.textContent = `Species: ${character.species}`;

    const imageElement = document.createElement('img');
    imageElement.src = character.image;
    imageElement.alt = `${character.name}`;
    imageElement.style.width = '100px';

    const episodesElement = document.createElement('p');
    episodesElement.textContent = `Number of Episodes: ${character.episode.length}`;

    characterElement.appendChild(nameElement);
    characterElement.appendChild(speciesElement);
    characterElement.appendChild(imageElement);
    characterElement.appendChild(episodesElement);

    container.appendChild(characterElement);
  });
}
