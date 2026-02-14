'use strict';

// ####################################################################
// NEW ROOM
// ####################################################################

const africanCities = [
  // Algeria
  "Algiers", "Oran", "Constantine",
  // Angola
  "Luanda", "Huambo", "Benguela",
  // Benin
  "Cotonou", "Porto-Novo", "Parakou",
  // Botswana
  "Gaborone", "Francistown", "Maun",
  // Burkina Faso
  "Ouagadougou", "Bobo-Dioulasso", "Koudougou",
  // Burundi
  "Bujumbura", "Gitega", "Muyinga",
  // Cabo Verde
  "Praia", "Mindelo", "Santa Maria",
  // Cameroon
  "Yaoundé", "Douala", "Garoua",
  // Central African Republic
  "Bangui", "Bimbo", "Berbérati",
  // Chad
  "N'Djamena", "Moundou", "Sarh",
  // Comoros
  "Moroni", "Mitsamiouli", "Fomboni",
  // Congo (Brazzaville)
  "Brazzaville", "Pointe-Noire", "Dolisie",
  "Nkayi",
  "Ouesso",
  "Owando",
  "Impfondo",
  "Loandjili",
  "Gamboma",
  "Ewo",
  "Mossaka",
  "Oyo",
  "Makoua",
  "Sibiti",
  "Kinkala",
  "Lekana",
  "Loubomo",
  "Madingou",
  "Mossendjo",
  "Moembe",
  "Fleuve-Congo",
  "Alima",
  "Sangha",
  "Kouilou",
  "Ogooue",
  "Likouala",
  "Mayombe",
  "Ntokou-Pikounda",
  "OdzalaKokoua",
  "Lefini",
  "ConkouatiDouli",
  "TchiambaNzassi",
  "Lefini",
  "Itanga",
  "Bateke",
  "Ngombe",
  // Congo (Kinshasa)
  "Kinshasa", "Lubumbashi", "Mbuji-Mayi",
  // Djibouti
  "Djibouti", "Ali-Sabieh", "Tadjoura",
  // Egypt
  "Cairo", "Alexandria", "Giza",
  // Equatorial Guinea
  "Malabo", "Bata", "Ebebiyin",
  // Eritrea
  "Asmara", "Keren", "Massawa",
  // Eswatini
  "Mbabane", "Manzini", "Lobamba",
  // Ethiopia
  "Addis Ababa", "Dire-Dawa", "Mekelle",
  // Gabon
  "Libreville", "Port-Gentil", "Franceville",
  // The Gambia
  "Banjul", "Serrekunda", "Brikama",
  // Ghana
  "Accra", "Kumasi", "Tamale",
  // Guinea
  "Conakry", "Nzerekore", "Kankan",
  // Guinea-Bissau
  "Bissau", "Bafata", "Gabu",
  // Ivory Coast
  "Abidjan", "Yamoussoukro", "Bouake",
  // Kenya
  "Nairobi", "Mombasa", "Kisumu",
  // Lesotho
  "Maseru", "Teyateyaneng", "Mafeteng",
  // Liberia
  "Monrovia", "Gbarnga", "Bensonville",
  // Libya
  "Tripoli", "Benghazi", "Misrata",
  // Madagascar
  "Antananarivo", "Toamasina", "Fianarantsoa",
  // Malawi
  "Lilongwe", "Blantyre", "Mzuzu",
  // Mali
  "Bamako", "Sikasso", "Timbuktu",
  // Mauritania
  "Nouakchott", "Nouadhibou", "Kiffa",
  // Mauritius
  "Port-Louis", "Beau-Bassin-Rose-Hill", "Vacoas-Phoenix",
  // Morocco
  "Rabat", "Casablanca", "Marrakech",
  // Mozambique
  "Maputo", "Matola", "Beira",
  // Namibia
  "Windhoek", "Swakopmund", "Walvis-Bay",
  // Niger
  "Niamey", "Zinder", "Maradi",
  // Nigeria
  "Lagos", "Abuja", "Kano",
  // Rwanda
  "Kigali", "Butare", "Gisenyi",
  // São Tomé and Príncipe
  "Sao-Tome", "Santana", "Trindade",
  // Senegal
  "Dakar", "Thies", "Saint-Louis",
  // Seychelles
  "Victoria", "Anse Royale", "Beau-Vallon",
  // Sierra Leone
  "Freetown", "Bo", "Kenema",
  // Somalia
  "Mogadishu", "Hargeisa", "Bosaso",
  // South Africa
  "Johannesburg", "Cape-Town", "Durban",
  // South Sudan
  "Juba", "Malakal", "Wau",
  // Sudan
  "Khartoum", "Omdurman", "Port-Sudan",
  // Tanzania
  "Dodoma", "Dar-es-Salaam", "Mwanza",
  // Togo
  "Lome", "Sokode", "Kara",
  // Tunisia
  "Tunis", "Sfax", "Sousse",
  // Uganda
  "Kampala", "Gulu", "Mbarara",
  // Zambia
  "Lusaka", "Ndola", "Kitwe",
  // Zimbabwe
  "Harare", "Bulawayo", "Chitungwiza"
];

function getRandomNumber(length) {
    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function generateAfricanRoomName() {
    let africanCity = africanCities[Math.floor(Math.random() * africanCities.length)];
    let num = getRandomNumber(3);
    return africanCity + num;
}
// ####################################################################
// TYPING EFFECT
// ####################################################################

let i = 0;
let txt = generateAfricanRoomName();
let speed = 100;

function typeWriter() {
    if (i < txt.length) {
        roomName.value += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

const roomName = document.getElementById('roomName');
if (roomName) {
    roomName.value = '';
    typeWriter();
}

// ####################################################################
// LANDING | NEW ROOM
// ####################################################################

const lastRoomContainer = document.getElementById('lastRoomContainer');
const lastRoom = document.getElementById('lastRoom');
const lastRoomName = window.localStorage.lastRoom ? window.localStorage.lastRoom : '';
if (lastRoomContainer && lastRoom && lastRoomName) {
    lastRoomContainer.style.display = 'inline-flex';
    lastRoom.setAttribute('href', '/join/' + lastRoomName);
    lastRoom.innerText = lastRoomName;
}

const genRoomButton = document.getElementById('genRoomButton');
const joinRoomButton = document.getElementById('joinRoomButton');
const adultCnt = document.getElementById('adultCnt');

if (genRoomButton) {
    genRoomButton.onclick = () => {
        genRoom();
    };
}

if (joinRoomButton) {
    joinRoomButton.onclick = () => {
        joinRoom();
    };
}

if (adultCnt) {
    adultCnt.onclick = () => {
        adultContent();
    };
}

document.getElementById('roomName').onkeyup = (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        joinRoom();
    }
};

function genRoom() {
    const roomInput = document.getElementById('roomName');
    roomInput.value = '';       // clear current value

    // Generate new African-style room name
    const newRoomName = generateAfricanRoomName();

    // Typing effect
    let i = 0;
    function typeWriter() {
        if (i < newRoomName.length) {
            roomInput.value += newRoomName.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
}

function getUUID4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
    );
}

function joinRoom() {
    const roomName = filterXSS(document.getElementById('roomName').value);
    if (roomName) {
        window.location.href = '/join/' + roomName;
        window.localStorage.lastRoom = roomName;
    } else {
        alert('Room name empty!\nPlease pick a room name.');
    }
}

function adultContent() {
    if (
        confirm(
            '18+ WARNING! ADULTS ONLY!\n\nExplicit material for viewing by adults 18 years of age or older. You must be at least 18 years old to access to this site!\n\nProceeding you are agree and confirm to have 18+ year.',
        )
    ) {
        window.open('https://luvlounge.ca', '_blank');
    }
}

// #########################################################
// PERMISSIONS
// #########################################################

const qs = new URLSearchParams(window.location.search);
const room_id = filterXSS(qs.get('room_id'));
const message = filterXSS(qs.get('message'));
const showMessage = document.getElementById('message');
console.log('Allow Camera or Audio', {
    room_id: room_id,
    message: message,
});
if (showMessage) showMessage.innerHTML = message;
