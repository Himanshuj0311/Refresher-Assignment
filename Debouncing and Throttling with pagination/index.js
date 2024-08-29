const API_URL = 'http://localhost:3000'; // Update with your actual API URL
const PAGE_SIZE = 10;
let currentPage = 1;
let players = [];
let teams = [];

// Fetch player data from the API
async function fetchPlayerData() {
    try {
        const response = await fetch(`${API_URL}/players`);
        if (!response.ok) throw new Error('Failed to fetch player data');
        players = await response.json();
        updatePlayerTable();
    } catch (error) {
        console.error('Error fetching player data:', error);
    }
}

// Fetch team data from the API
async function fetchTeamData() {
    try {
        const response = await fetch(`${API_URL}/teams`);
        if (!response.ok) throw new Error('Failed to fetch team data');
        teams = await response.json();
        populateTeamFilter();
    } catch (error) {
        console.error('Error fetching team data:', error);
    }
}

// Populate the team filter dropdown
function populateTeamFilter() {
    const teamFilter = document.getElementById('team-filter');
    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team.code;
        option.textContent = team.name;
        teamFilter.appendChild(option);
    });
}

// Update the player table with filtered and paginated data
function updatePlayerTable() {
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Team</th>
            <th>Total Runs</th>
            <th>Fours</th>
            <th>Sixes</th>
            <th>Strike Rate</th>
            <th>Fifty Plus Runs</th>
            <th>Centuries</th>
        </tr>
    `;

    const filteredPlayers = getFilteredPlayers();
    const paginatedPlayers = filteredPlayers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    paginatedPlayers.forEach((player, index) => {
        const team = teams.find(team => team.code === player.teamCode);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${(currentPage - 1) * PAGE_SIZE + index + 1}</td>
            <td><img src="data:image/jpeg;base64,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" alt="${player.name}" style="width: 50px;"> ${player.name}</td>
            <td><img src="data:image/jpeg;base64,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" alt="${player.teamCode}" style="width: 50px;"> ${player.teamCode}</td>
            <td>${player.totalRuns}</td>
            <td>${player.fours}</td>
            <td>${player.sixes}</td>
            <td>${player.strikeRate}</td>
            <td>${player.fiftyPlusRuns}</td>
            <td>${player.centuries}</td>
        `;
        table.appendChild(row);
    });

    const playerTable = document.getElementById('player-table');
    playerTable.innerHTML = ''; // Clear previous content
    playerTable.appendChild(table);
    updatePaginationControls();
}

// Get filtered players based on search and team filter
function getFilteredPlayers() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const selectedTeam = document.getElementById('team-filter').value;

    return players.filter(player => {
        const matchesSearch = player.name.toLowerCase().includes(searchTerm);
        const matchesTeam = selectedTeam === '' || player.teamCode === selectedTeam;
        return matchesSearch && matchesTeam;
    });
}

// Update pagination controls based on current page and filtered data
function updatePaginationControls() {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage * PAGE_SIZE >= getFilteredPlayers().length;
    pageInfo.textContent = `Page ${currentPage}`;
}

// Handle pagination button clicks
function handlePagination(event) {
    if (event.target.id === 'prev-page' && currentPage > 1) {
        currentPage--;
    } else if (event.target.id === 'next-page') {
        currentPage++;
    }
    updatePlayerTable();
}

// Handle search input with debounce
function handleSearch(event) {
    debounce(() => {
        currentPage = 1; // Reset to the first page on search
        updatePlayerTable();
    }, 300)();
}

// Handle filter change
function handleFilterChange() {
    currentPage = 1; // Reset to the first page on filter change
    updatePlayerTable();
}

// Debounce function to limit the rate of function calls
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Attach event listeners to controls
document.getElementById('prev-page').addEventListener('click', handlePagination);
document.getElementById('next-page').addEventListener('click', handlePagination);
document.getElementById('search').addEventListener('input', handleSearch);
document.getElementById('team-filter').addEventListener('change', handleFilterChange);

// Initial data load
(async function() {
    await fetchPlayerData();
    await fetchTeamData();
})();
