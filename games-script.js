// Global games data
let gamesData = null;

// Load games data
async function loadGamesData() {
    try {
        const response = await fetch('games-data.json');
        gamesData = await response.json();
        return gamesData;
    } catch (error) {
        console.error('Error loading games data:', error);
        return null;
    }
}

// Generate game cards
async function generateGameCards() {
    const data = await loadGamesData();
    if (!data) return;
    
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = ''; // Clear existing content
    
    data.games.forEach((game, index) => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.name}">
            <h3>${game.name}</h3>
            <button class="play-btn" onclick="openModal('${game.name}', '${game.instructions.replace(/'/g, "\\'")}', '${game.path}')">Играй</button>
        `;
        gamesGrid.appendChild(gameCard);
    });
}

// Search functionality for games page
async function searchGames() {
    if (!gamesData) {
        await loadGamesData();
    }
    
    const query = document.getElementById('searchInput').value.toLowerCase();
    const results = document.getElementById('searchResults');
    results.innerHTML = '';
    
    if (query.length > 0) {
        const filtered = gamesData.games.filter(game => 
            game.name.toLowerCase().includes(query)
        );
        
        if (filtered.length > 0) {
            filtered.forEach(game => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.textContent = game.name;
                item.onclick = function() {
                    openModal(game.name, game.instructions, game.path);
                    toggleSearch();
                };
                results.appendChild(item);
            });
        } else {
            const noResults = document.createElement('div');
            noResults.className = 'search-result-item';
            noResults.textContent = 'Няма намерени игри';
            noResults.style.color = '#888';
            results.appendChild(noResults);
        }
    }
}

// Game modal functionality
function openModal(title, instructions, gamePath = 'games/snake.html') {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalInstructions').textContent = instructions;
    document.getElementById('gameModal').classList.add('active');
    
    document.getElementById('continueBtn').onclick = function() {
        window.open(gamePath, '_blank');
        closeModal();
    };
}

function closeModal() {
    document.getElementById('gameModal').classList.remove('active');
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Search toggle
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('active');
    
    if (searchBar.classList.contains('active')) {
        document.getElementById('searchInput').focus();
    }
}

// Close search when clicking outside
document.addEventListener('click', function(event) {
    const searchContainer = document.querySelector('.search-container');
    const searchBar = document.getElementById('searchBar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!searchContainer.contains(event.target)) {
        searchBar.classList.remove('active');
    }
    
    // Close mobile menu when clicking outside
    if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    generateGameCards();
});