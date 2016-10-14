/*jshint esversion: 6 */
//buttens declaration
var saveButton, delButton;
var stop;
stop = {};
//form declaration
var description = document.querySelector('#description');
var time = document.querySelector('#time');

//Table related declarations
var table, tableBody, TableRows;

//butten initialization
saveButton = document.querySelector('#saveButton');
delButton = document.querySelector('#delButton');

//Reminder declaration
var reminder;
//Reminder initialization
reminder = (window.localStorage.reminder && JSON.parse(window.localStorage.reminder)) || [];

//Table initialization
table = document.querySelector('#table');
tableBody = table.querySelector('tbody');
TableRows = tableBody.querySelectorAll('tr');

//Code
saveButton.addEventListener('click', () => {
    saveReminder();
    description.value = "";
    time.value = "";
});

delButton.addEventListener('click', () => {
    stopNotif(stop);
});

if (window.localStorage.reminder) {
    show();
}

document.addEventListener('DOMContentLoaded', function() {
    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chrome.');
        return;
    }
});


function saveReminder() {
    let Reminder = {
        description: description.value,
        time: time.value
    };

    if (isNaN(Reminder.time) || Reminder.time === "") {
        Reminder.time = 10;
        alert("That's not a number, defaulting to 10 seconds");
    }
    if (description.value === "") {
        Reminder.description = "Default";
    }
    stop = setTimeout(() => {
        reminder.push(Reminder);
        window.localStorage.reminder = JSON.stringify(reminder);
        console.log(Reminder.description);
        if (window.Notification && Notification.permission !== "denied") {
            Notification.requestPermission(function(status) { // status is "granted", if accepted by user
                var n = new Notification('Reminder', {
                    body: Reminder.description,
                });
                n.onclick = function() {
                    window.open(window.location.href);
                };
            });
        }
        showOne(Reminder);
    }, Reminder.time * 1000);
}

function show() {

    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    let p = reminder;
    p.forEach(function(reminder, index) {
        var tRow = document.createElement('tr');
        var tNum = document.createElement('td');
        var tDesc = document.createElement('td');
        var tTime = document.createElement('td');
        var tDel = document.createElement('td');
        var input = document.createElement('input');

        tDesc.className = "text-justify";
        tTime.className = "text-justify";

        input.type = "checkbox";

        input.addEventListener('change', (event) => {
            deleteReminder(reminder);
        });

        tNum.textContent = String(index + 1);

        tDesc.textContent = reminder.description;

        tTime.textContent = reminder.time;

        tDel.appendChild(input);

        tRow.appendChild(tNum);
        tRow.appendChild(tDesc);
        tRow.appendChild(tTime);
        tRow.appendChild(tDel);

        tableBody.appendChild(tRow);
    });
}

function showOne(remind) {
    var tRow = document.createElement('tr');
    var tNum = document.createElement('td');
    var tDesc = document.createElement('td');
    var tTime = document.createElement('td');
    var tDel = document.createElement('td');
    var input = document.createElement('input');

    tDesc.className = "text-justify";
    tTime.className = "text-justify";

    input.type = "checkbox";

    input.addEventListener('change', (event) => {
        deleteReminder(remind);
    });

    tNum.textContent = String(reminder.length);

    tDesc.textContent = remind.description;

    tTime.textContent = remind.time;

    tDel.appendChild(input);

    tRow.appendChild(tNum);
    tRow.appendChild(tDesc);
    tRow.appendChild(tTime);
    tRow.appendChild(tDel);

    tableBody.appendChild(tRow);
}

function deleteReminder(rem) {
    let index = reminder.indexOf(rem);
    reminder.splice(index, 1);
    window.localStorage.reminder = JSON.stringify(reminder);
    show();
}

function stopNotif(notif) {
    if (notif !== undefined && notif !== {}) {
        clearTimeout(notif);
    }
}

export function a() {

}
