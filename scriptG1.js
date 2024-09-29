// Constant values to HTML elements by ID 'name'
const rateInput = document.getElementById('rate'); //user input Rate

const moneyDisplay = document.getElementById('money'); //money counter display
const toe = document.getElementById('toe'); //Start time display
const timerDisplay = document.getElementById('timerD'); // timer display
const taxRateDisplay = document.getElementById('taxD1');

const startButton = document.getElementById('startButton'); // start button
const resetButton = document.getElementById('resetButton'); // reset button
const stopButton = document.getElementById('stopButton');// stop button

const moreStatsContainer = document.querySelector('.stat-container');// Container that loads on start
const startContainer = document.querySelector('.loadOnStart');// Container that load when start is clicked

// Setting inital states of containers.
moreStatsContainer.classList.add('disabled'); //Hides more stats container or end click
startContainer.classList.add('disabled'); // Hides the start click container

// Variables to track state of
let startTime = 0, elapsedTime = 0, moneyPerSecond = 0, totalMoney = 0, timerInterval;
let toestring = 'empty';
let taxPercentage;

// Add event listener to the Start button
startButton.addEventListener('click', () => {
    moneyPerSecond = parseFloat(rateInput.value) / 3600;

    // Only start if the rate is a valid number
    if (!isNaN(moneyPerSecond) && moneyPerSecond > 0) {
        document.querySelector('.loadOnStart').classList.remove('disabled');//Show money counter
        startTime = Date.now();  // Reset start time to now
        timerInterval = setInterval(update, 66);  // Update both money and timer every 10ms

        startButton.disabled = true; // Hides start button
        stopButton.disabled = false; // Shows end button

        if (toestring === 'empty') {
            toestring = formatDate(new Date());
            toe.textContent = toestring;
        } else {
            toe.textContent = toestring;
        }

    } else {
        alert("You should'nt be paying your employer.");
    }
});

// Add event listener to Reset button
resetButton.addEventListener('click', () => {
    startContainer.classList.add('disabled');
    moreStatsContainer.classList.add('disabled');// Hides more stats container
    startButton.disabled = false; //Shows start button
    stopButton.disabled = true; //Hides end button

    clearInterval(timerInterval);
    startTime = 0;
    totalMoney = 0;
    elapsedTime = 0;
    moneyDisplay.textContent = '0.00';
    timerDisplay.textContent = '00:00:00';
    toestring = 'empty';
    toe.textContent = '';
});

// Add event listener to Stop button
stopButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    toestring = toestring;

    // Update totalMoney with the money earned in this session
    let currentElapsedTime = (Date.now() - startTime) / 1000;  // Time in seconds since last start
    totalMoney += currentElapsedTime * moneyPerSecond;  // Add to totalMoney

    elapsedTime += currentElapsedTime;  // Save total elapsed time for future use
    startButton.disabled = false; // Shows start button
    stopButton.disabled = true; // Hides stop button
    document.querySelector('.stat-container').classList.remove('disabled'); // Shows more stats container

    taxFind(rateInput.value);
    taxRateDisplay.textContent = taxPercentage.toString().slice(-2);
});

// Function to update money, timer
function update() {
    let currentElapsedTime = (Date.now() - startTime) / 1000;  // Time since the last start
    let currentMoney = totalMoney + (currentElapsedTime * moneyPerSecond);  // Add the earned money
    moneyDisplay.textContent = currentMoney.toFixed(2);  // Update the money display
    timerDisplay.textContent = formatTime(currentElapsedTime + elapsedTime);  // Show total time
}


// Helper function to formate the date
function formatDate(date) {
    let year = date.getFullYear().toString().slice(-2);// year in 2 number form
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensures 2-digit month
    let day = date.getDate().toString().padStart(2, '0'); // Ensures 2-digit day
    let hours24 = date.getHours().toString().padStart(2, '0'); // Ensures 2-digit hour
    let hours12 = hours24 % 12 || 12;
    let ampm = hours24 >= 12 ? 'PM' : 'AM';
    let minutes = date.getMinutes().toString().padStart(2, '0'); // Ensures 2-digit minutes
    let seconds = date.getSeconds().toString().padStart(2, '0'); // Ensures 2-digit seconds

    return `${month}/${day}/${year} ${hours12}:${minutes} ${seconds} ${ampm}`
}

function taxFind(hourlyRate){
    let yearRate = hourlyRate * 2080;
    let tB1 = 11601; // Tax Bracket 1 12%
    let tB2 = 47151; // Tax Bracket 2 22%
    let tB3 = 100526; // Tax Bracket 3 24%
    let tB4 = 191951; // Tax Bracket 4 32%
    let tB5 = 243726; // Tax Bracket 5 35%
    let tB6 = 609351; // Tax Bracket 6 37%

    console.log('The yearly rate is: ' + yearRate);

    if (yearRate >= tB6) {
        taxPercentage = 0.37;
        

        //log
        console.log('your in the 6th or highest bracket');
        
    
    }else if (yearRate >= tB5) {
        taxPercentage = 0.35;
        

        //log
        
        console.log('your in the 5th bracket');

    }else if (yearRate >= tB4) {
        taxPercentage = 0.32;
        

        //log
        
        console.log('your in the 4th bracket');

    }else if (yearRate >= tB3) {
        taxPercentage = 0.24;
        

        //log
        
        console.log('your in the 3rd bracket');

    }else if (yearRate >= tB2) {
        taxPercentage = 0.22;
        

        //log
        
        console.log('your in the 2nd bracket');

    }else if (yearRate >= tB1) {
        taxPercentage = 0.12;
        

        //log
        
        console.log('your in the 1st bracket');

    }else if (yearRate < tB1) {
        taxPercentage = 0.10;
        

        //log
        
        console.log('Your in the 0 bracket');

    }else {
        

        //log
        
        console.log('!FUCKED!');
    }
}

// Helper function to format time into HH:MM:SS
function formatTime(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
