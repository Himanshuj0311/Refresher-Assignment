const API_URL = 'http://localhost:3000'; // Update with your actual API URL
const rowsPerPage = 10;
let players = [];
let teams = [];
let currentPage = 1;

async function fetchPlayerData() {
    try {
        const response = await fetch(`${API_URL}/players`);
        if (!response.ok) {
            throw new Error('Failed to fetch player data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching player data:', error);
    }
}

async function fetchTeamData() {
    try {
        const response = await fetch(`${API_URL}/teams`);
        if (!response.ok) {
            throw new Error('Failed to fetch team data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching team data:', error);
    }
}

function populateFilters() {
    const nationalitySelect = document.getElementById('nationality');
    const teamSelect = document.getElementById('team');

    const nationalities = [...new Set(players.map(player => player.nationality))];
    const teams = [...new Set(players.map(player => player.teamCode))];

    nationalitySelect.innerHTML = `<option value="">All</option>${nationalities.map(n => `<option value="${n}">${n}</option>`).join('')}`;
    teamSelect.innerHTML = `<option value="">All</option>${teams.map(t => `<option value="${t}">${t}</option>`).join('')}`;
}

function filterAndSortPlayers() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const nationalityFilter = document.getElementById('nationality').value;
    const teamFilter = document.getElementById('team').value;
    const sortBy = document.getElementById('sort').value;

    let filteredPlayers = players.filter(player =>
        (searchQuery === '' || player.name.toLowerCase().includes(searchQuery)) &&
        (nationalityFilter === '' || player.nationality === nationalityFilter) &&
        (teamFilter === '' || player.teamCode === teamFilter)
    );

    filteredPlayers.sort((a, b) => {
        switch (sortBy) {
            case 'totalRuns':
                return b.totalRuns - a.totalRuns;
            case 'sixes':
                return b.sixes - a.sixes;
            case 'fours':
                return b.fours - a.fours;
            case 'strikeRate':
                return b.strikeRate - a.strikeRate;
            default:
                return 0;
        }
    });

    return filteredPlayers;
}

function renderTable() {
    const tbody = document.createElement('tbody');
    const filteredPlayers = filterAndSortPlayers();
    const paginatedPlayers = filteredPlayers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    paginatedPlayers.forEach((player, index) => {
        const team = teams.find(t => t.code === player.teamCode);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${(currentPage - 1) * rowsPerPage + index + 1}</td>
            <td><img src="https://scores.iplt20.com/ipl/playerimages/${player.name}.png?v=4" alt="${player.name}" style="width: 50px;"> ${player.name}</td>
            <td><img src="${team.logo}" alt="${team.code}" style="width: 50px;"> ${team.code}</td>
            <td>${player.totalRuns}</td>
            <td>${player.fours}</td>
            <td>${player.sixes}</td>
            <td>${player.strikeRate}</td>
            <td>${player.fiftyPlusRuns}</td>
            <td>${player.centuries}</td>
        `;
        tbody.appendChild(row);
    });

    const table = document.querySelector('#player-table table') || document.createElement('table');
    table.innerHTML = `
        <thead>
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
        </thead>
    `;
    table.appendChild(tbody);
    document.getElementById('player-table').innerHTML = '';
    document.getElementById('player-table').appendChild(table);

    renderPaginationControls(filteredPlayers.length);
}

function renderPaginationControls(totalRows) {
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const paginationControls = document.getElementById('pagination-controls');

    paginationControls.innerHTML = Array.from({ length: totalPages }, (_, i) => `
        <button class="pagination-button" data-page="${i + 1}">${i + 1}</button>
    `).join('');

    document.querySelectorAll('.pagination-button').forEach(button => {
        button.addEventListener('click', (event) => {
            currentPage = parseInt(event.target.getAttribute('data-page'));
            renderTable();
        });
    });
}

document.getElementById('search').addEventListener('input', renderTable);
document.getElementById('nationality').addEventListener('change', renderTable);
document.getElementById('team').addEventListener('change', renderTable);
document.getElementById('sort').addEventListener('change', renderTable);

(async function() {
    players = await fetchPlayerData();
    teams = await fetchTeamData();
    populateFilters();
    renderTable();
})();
