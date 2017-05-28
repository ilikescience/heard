require('../styles/main.css');
if(module.hot) module.hot.accept();

const firebase = require('firebase');
const moment = require('moment');

firebase.initializeApp({
    apiKey: 'AIzaSyAbABNhd1zsSIYro6urkTABkLQTiO4OpRY',
    authDomain: 'heard-city.firebaseapp.com',
    databaseURL: 'https://heard-city.firebaseio.com',
    projectId: 'heard-city',
    storageBucket: 'heard-city.appspot.com',
    messagingSenderId: '413327345982'
});

const database = firebase.database();

const retrieveData = database.ref('/masterSheet').once('value').then((snapshot) => snapshot.val());

const render = (data) => {
    const wrapper = document.querySelector('.sessions');
    for (const row in data) {
        // we don't want the first row
        if(row === '0')
            continue;
        const session = document.createElement('div');
        session.classList.add('session');
        const sessionDate = moment(data[row][0]).format('dddd, MMMM Do YYYY');
        const sessionClient = data[row][7];
        const sessionAgency = data[row][10];
        const sessionProject = data[row][11];
        session.innerHTML = `
        <div class="session--date">
            ${sessionDate}
        </div>
        <div class="session--info">
            <h2>${sessionClient} - ${sessionProject}</h2>
            <h3>${sessionAgency}</h3>
        </div>
        `;
        wrapper.appendChild(session);
    }
};

retrieveData.then((data) => {
    render(data);
});
