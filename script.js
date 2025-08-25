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

// Load top games on homepage
async function loadTopGames() {
    const data = await loadGamesData();
    if (!data) return;
    
    const topGameIds = data.topGames;
    const games = data.games;
    
    // Find games by ID
    const topGames = topGameIds.map(id => games.find(game => game.id === id));
    
    // Load rank 1 (first place)
    const rank1Element = document.getElementById('rank-1-game');
    if (rank1Element && topGames[0]) {
        const game = topGames[0];
        rank1Element.querySelector('img').src = game.thumbnail;
        rank1Element.querySelector('img').alt = game.name;
        rank1Element.querySelector('h3').textContent = game.name;
        rank1Element.querySelector('.play-btn').onclick = () => openModal(game.name, game.instructions, game.path);
    }
    
    // Load rank 2 (second place)
    const rank2Element = document.getElementById('rank-2-game');
    if (rank2Element && topGames[1]) {
        const game = topGames[1];
        rank2Element.querySelector('img').src = game.thumbnail;
        rank2Element.querySelector('img').alt = game.name;
        rank2Element.querySelector('h3').textContent = game.name;
        rank2Element.querySelector('.play-btn').onclick = () => openModal(game.name, game.instructions, game.path);
    }
    
    // Load rank 3 (third place)
    const rank3Element = document.getElementById('rank-3-game');
    if (rank3Element && topGames[2]) {
        const game = topGames[2];
        rank3Element.querySelector('img').src = game.thumbnail;
        rank3Element.querySelector('img').alt = game.name;
        rank3Element.querySelector('h3').textContent = game.name;
        rank3Element.querySelector('.play-btn').onclick = () => openModal(game.name, game.instructions, game.path);
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

// Search functionality
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('active');
    
    if (searchBar.classList.contains('active')) {
        document.getElementById('searchInput').focus();
    }
}

// Smooth scrolling for navigation
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
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

// Basic search functionality for landing page
document.addEventListener('DOMContentLoaded', function() {
    // Load top games
    loadTopGames();
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', async function() {
            const query = this.value.toLowerCase();
            const results = document.getElementById('searchResults');
            results.innerHTML = '';
            
            if (query.length > 0) {
                if (!gamesData) {
                    await loadGamesData();
                }
                
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
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const stars = document.querySelector('.stars');
    if (stars) {
        stars.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});