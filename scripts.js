document.addEventListener('DOMContentLoaded', function() {
    const saveProgressButton = document.getElementById('saveProgress');
    const loadProgressButton = document.getElementById('loadProgress');
    const levelUpButton = document.getElementById('levelUp');
    const pokemonNameDisplay = document.getElementById('pokemonName');
    const pokemonLevelDisplay = document.getElementById('pokemonLevel');

    let gameData = {
        trainer: {
            name: 'Ace',
            badges: 1
        },
        pokemon: [
            {
                name: 'Charmander',
                level: 3,
                hp: 20
            }
        ],
        inventory: [
            {
                item: 'Potion',
                quantity: 3
            },
            {
                item: 'Pokeball',
                quantity: 5
            }
        ]
    };

    function updateGameDisplay() {
        if (gameData.pokemon.length > 0) {
            pokemonNameDisplay.textContent = gameData.pokemon[0].name;
            pokemonLevelDisplay.textContent = gameData.pokemon[0].level;
        }
    }

    levelUpButton.addEventListener('click', function() {
        if (gameData.pokemon.length > 0) {
            gameData.pokemon[0].level += 1;
            updateGameDisplay();
        }
    });

    saveProgressButton.addEventListener('click', function() {
        fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameData)
        })
        .then(response => response.json())
        .then(data => console.log('Save success:', data))
        .catch(error => console.error('Error:', error));
    });

    loadProgressButton.addEventListener('click', function() {
        fetch('/api/load')
        .then(response => response.json())
        .then(data => {
            if (data.status !== 'error') {
                gameData = data;
                updateGameDisplay();
            } else {
                console.error('Error loading data:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Initialize display
    updateGameDisplay();
});