const API_URL = 'http://localhost:3000'; // Update with your actual API URL

async function fetchMatchData(matchId) {
    try {
        const response = await fetch(`${API_URL}/matches/${matchId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch match data. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching match data:', error);
        return null; // Return null to handle error in UI
    }
}

async function updateMatchData(matchId, updatedData) {
    try {
        const response = await fetch(`${API_URL}/matches/${matchId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error(`Failed to update match data. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating match data:', error);
    }
}

function simulateBowling() {
    const run = Math.floor(Math.random() * 7); // Random runs between 0 to 6
    const isOut = Math.random() < 1 / 30; // Rough probability for a wicket
    return { run, isOut };
}

let isBowlingInProgress = false;

async function handleBowling(matchId) {
    if (isBowlingInProgress) {
        console.log('Bowling is already in progress.');
        return;
    }

    isBowlingInProgress = true;

    try {
        const matchData = await fetchMatchData(matchId);
        if (!matchData) {
            console.log('Match data is not available.');
            return;
        }

        const { currentFallScore, currentFallWickets, currentFallOvers, currentInnings } = matchData.currentSummary;
        const { run, isOut } = simulateBowling();

        let newScore = currentFallScore + run;
        let newWickets = isOut ? currentFallWickets + 1 : currentFallWickets;
        let newOvers = parseFloat(currentFallOvers) + 0.1;

        if (newOvers >= 6) {
            newOvers = (newOvers - 6).toFixed(1); // Reset overs after 6 balls
        } else {
            newOvers = newOvers.toFixed(1);
        }

        const updatedSummary = {
            currentFallScore: newScore,
            currentFallWickets: newWickets,
            currentFallOvers: newOvers,
            currentInnings: currentInnings // Keeping the same for simplicity
        };

        await updateMatchData(matchId, { currentSummary: updatedSummary });
        updateUI(newScore, newWickets, newOvers, currentInnings);
    } catch (error) {
        console.error('Error in handleBowling:', error);
    } finally {
        isBowlingInProgress = false;
    }
}

function updateUI(score, wickets, overs, innings) {
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('wickets').textContent = `Wickets: ${wickets}`;
    document.getElementById('overs').textContent = `Overs: ${overs}`;
    document.getElementById('innings').textContent = `Innings Status: ${innings}`;
}

document.getElementById('start-match').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default action if inside a form
    console.log('Start Match clicked');
    const matchId = 1; // Example match ID
    document.getElementById('bowl').style.display = 'block';
    handleBowling(matchId); // Initial call
});

document.getElementById('bowl').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default action if inside a form
    console.log('Bowl clicked');
    const matchId = 1; // Example match ID
    await handleBowling(matchId); // Simulate bowling
});
