// Glenforest Activity Points Awards Calculator JS

const steps = [
    renderWelcomeStep,
    renderGradeStep,
    renderClubsCountStep,
    renderClubsNamesStep,
    renderYearlyDataStep,
    renderResultsStep
];

let currentStep = 0;
let formData = {
    wantsDescription: false,
    gradeStarted: 9,
    clubsCount: 0,
    clubNames: [],
    yearsAtGFSS: 0,
    yearlyData: [] // [{ courses, marks, average, passed, awards, clubHours: [] }]
};

const form = document.getElementById('activityPointsForm');
const resultsContainer = document.getElementById('resultsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showStep(idx) {
    form.innerHTML = '';
    resultsContainer.innerHTML = '';
    steps[idx]();
    prevBtn.style.display = idx === 0 ? 'none' : 'inline-block';
    nextBtn.textContent = idx === steps.length - 1 ? 'Finish' : 'Next';
}

prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        }
    } else if (currentStep === steps.length - 1) {
        if (validateStep(currentStep)) {
            displayResults();
        }
    }
});

function renderWelcomeStep() {
    form.innerHTML = `
        <p>Welcome! This tool calculates your Glenforest Activity Points and awards. Would you like a brief description of the system?</p>
        <label><input type="radio" name="desc" value="yes"> Yes</label>
        <label><input type="radio" name="desc" value="no" checked> No</label>
        <div id="descText" style="display:none; margin-top:10px;"></div>
    `;
    form.querySelectorAll('input[name="desc"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            formData.wantsDescription = e.target.value === 'yes';
            document.getElementById('descText').style.display = formData.wantsDescription ? 'block' : 'none';
            if (formData.wantsDescription) {
                document.getElementById('descText').innerText =
                    `The Glenforest Points System recognizes a student’s contribution to all aspects of school life throughout their years at Glenforest Secondary School.\n\nCo-curricular Points are awarded for participation in school activities such as clubs, sports teams, and councils. One point is awarded per hour of the activity, up to a maximum of 75 points per club per year. Academic Points are awarded in the year of graduation. Students receive 1/4 point for each passing mark on their transcript. Graduation Awards are presented to graduates who have earned all 3 certificates (300+ points) and include academic points.`;
            }
        });
    });
}

function renderGradeStep() {
    form.innerHTML = `
        <label>In what grade did you begin going to Glenforest Secondary School?
            <select id="gradeStarted">
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>
        </label>
    `;
    document.getElementById('gradeStarted').value = formData.gradeStarted;
    document.getElementById('gradeStarted').addEventListener('change', (e) => {
        formData.gradeStarted = parseInt(e.target.value);
        formData.yearsAtGFSS = 13 - formData.gradeStarted;
    });
    // Set years at GFSS
    formData.yearsAtGFSS = 13 - formData.gradeStarted;
}

function renderClubsCountStep() {
    form.innerHTML = `
        <label>How many clubs/teams/councils were you a part of at Glenforest?
            <input type="number" id="clubsCount" min="0" max="20" value="${formData.clubsCount}">
        </label>
    `;
    document.getElementById('clubsCount').addEventListener('input', (e) => {
        formData.clubsCount = parseInt(e.target.value) || 0;
        formData.clubNames = Array(formData.clubsCount).fill('');
    });
}

function renderClubsNamesStep() {
    let html = '';
    for (let i = 0; i < formData.clubsCount; i++) {
        html += `<label>Club/Team/Council #${i + 1} Name: <input type="text" class="clubName" data-idx="${i}" value="${formData.clubNames[i] || ''}"></label><br/>`;
    }
    form.innerHTML = html || '<p>No clubs/teams/councils entered.</p>';
    form.querySelectorAll('.clubName').forEach(input => {
        input.addEventListener('input', (e) => {
            const idx = parseInt(e.target.getAttribute('data-idx'));
            formData.clubNames[idx] = e.target.value;
        });
    });
}

let yearlyStepIndex = 0;
function renderYearlyDataStep() {
    // If not initialized, fill yearlyData
    if (formData.yearlyData.length !== formData.yearsAtGFSS) {
        formData.yearlyData = Array(formData.yearsAtGFSS).fill(null).map(() => ({
            courses: 0,
            marks: [],
            average: 0,
            passed: 0,
            awards: 0,
            clubHours: Array(formData.clubsCount).fill(0)
        }));
    }
    // Render for each year
    let html = '';
    for (let i = 0; i < formData.yearsAtGFSS; i++) {
        html += `<fieldset style="margin-bottom:20px;"><legend>Grade ${formData.gradeStarted + i}</legend>
            <label>How many courses did you take? <input type="number" min="0" max="20" class="courses" data-idx="${i}" value="${formData.yearlyData[i].courses}"></label><br/>
            <label>How many courses did you pass? <input type="number" min="0" max="20" class="passed" data-idx="${i}" value="${formData.yearlyData[i].passed}"></label><br/>
            <label>Enter your average for this grade: <input type="number" min="0" max="100" class="average" data-idx="${i}" value="${formData.yearlyData[i].average}"></label><br/>
            <label>How many Gryphon Pride Awards did you win? <input type="number" min="0" max="10" class="awards" data-idx="${i}" value="${formData.yearlyData[i].awards}"></label><br/>
        `;
        if (formData.clubsCount > 0) {
            for (let j = 0; j < formData.clubsCount; j++) {
                html += `<label>Hours in ${formData.clubNames[j] || 'Club ' + (j+1)} (max 75): <input type="number" min="0" max="75" class="clubHours" data-year="${i}" data-club="${j}" value="${formData.yearlyData[i].clubHours[j] || 0}"></label><br/>`;
            }
        }
        html += '</fieldset>';
    }
    form.innerHTML = html;
    // Add listeners
    form.querySelectorAll('.courses').forEach(input => {
        input.addEventListener('input', (e) => {
            const idx = parseInt(e.target.getAttribute('data-idx'));
            formData.yearlyData[idx].courses = parseInt(e.target.value) || 0;
        });
    });
    form.querySelectorAll('.passed').forEach(input => {
        input.addEventListener('input', (e) => {
            const idx = parseInt(e.target.getAttribute('data-idx'));
            formData.yearlyData[idx].passed = parseInt(e.target.value) || 0;
        });
    });
    form.querySelectorAll('.average').forEach(input => {
        input.addEventListener('input', (e) => {
            const idx = parseInt(e.target.getAttribute('data-idx'));
            formData.yearlyData[idx].average = parseFloat(e.target.value) || 0;
        });
    });
    form.querySelectorAll('.awards').forEach(input => {
        input.addEventListener('input', (e) => {
            const idx = parseInt(e.target.getAttribute('data-idx'));
            formData.yearlyData[idx].awards = parseInt(e.target.value) || 0;
        });
    });
    form.querySelectorAll('.clubHours').forEach(input => {
        input.addEventListener('input', (e) => {
            const year = parseInt(e.target.getAttribute('data-year'));
            const club = parseInt(e.target.getAttribute('data-club'));
            formData.yearlyData[year].clubHours[club] = parseInt(e.target.value) || 0;
        });
    });
}

function renderResultsStep() {
    form.innerHTML = '<p>Click Finish to see your results!</p>';
}

function validateStep(idx) {
    // Add validation as needed
    return true;
}

function displayResults() {
    // Calculate points and awards
    let totalPoints = 0;
    let totalAverage = 0;
    let pointsPerGrade = [];
    let awardsPerGrade = [];
    let clubPoints = 0;
    let academicPoints = 0;
    let awardPoints = 0;
    let years = formData.yearsAtGFSS;
    for (let i = 0; i < years; i++) {
        let year = formData.yearlyData[i];
        // Academic points: (average * passed) / 4
        academicPoints = (year.average * year.passed) / 4;
        // Award points: awards * 30
        awardPoints = year.awards * 30;
        // Club points: sum of hours (max 75 per club)
        clubPoints = year.clubHours.reduce((a, b) => a + Math.min(b, 75), 0);
        let gradePoints = academicPoints + awardPoints + clubPoints;
        pointsPerGrade.push(gradePoints);
        awardsPerGrade.push(year.awards);
        totalPoints += gradePoints;
        totalAverage += year.average;
    }
    totalAverage = totalAverage / years;
    // Determine award
    let awardMsg = '';
    if (totalPoints >= 1600) {
        awardMsg = 'You get an acrylic plaque! Congratulations, you have achieved the highest reward possible!';
    } else if (totalPoints >= 1200) {
        awardMsg = 'You get a large GFSS Medallion in a case!';
    } else if (totalPoints >= 800) {
        awardMsg = 'You get a GFSS medallion on a ribbon!';
    } else if (totalPoints >= 300) {
        awardMsg = 'You get a gold certificate!';
    } else if (totalPoints >= 200) {
        awardMsg = 'You get a silver certificate!';
    } else if (totalPoints >= 100) {
        awardMsg = 'You get a bronze certificate!';
    } else {
        awardMsg = 'You get nothing.';
    }
    // Show results
    resultsContainer.innerHTML = `
        <h2>Results</h2>
        <p><strong>Total Points:</strong> ${totalPoints.toFixed(2)}</p>
        <p><strong>Total Average:</strong> ${totalAverage.toFixed(2)}</p>
        <p><strong>Award:</strong> ${awardMsg}</p>
        <h3>Points Per Grade</h3>
        <ul>${pointsPerGrade.map((p, i) => `<li>Grade ${formData.gradeStarted + i}: ${p.toFixed(2)}</li>`).join('')}</ul>
    `;
}

// Initialize
showStep(currentStep);