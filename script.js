/* =========================================================
   BTB – BRATISLAVA-BRICKSBURG AIRPORT
   Hlavné dáta stránky
========================================================= */


/* =========================================================
   AEROLINKY
========================================================= */

const aerolines = [
    {
        code: "BBA",
        name: "Bricksburg Airways",
        country: "Bricksburg",
        description: "Hlavná letecká spoločnosť BTB"
    },
    {
        code: "BA",
        name: "BrickAir",
        country: "Slovensko",
        description: "Regionálna letecká spoločnosť"
    },
    {
        code: "SKY",
        name: "SkyBricks",
        country: "Európa",
        description: "Medzinárodná letecká spoločnosť"
    },
    {
        code: "BEX",
        name: "Bricksburg Express",
        country: "Bricksburg",
        description: "Express a business doprava"
    },
    {
        code: "AIR",
        name: "AIR Bricks",
        country: "Slovensko",
        description: "Moderná nízkonákladová aerolinka"
    },
    {
        code: "NOVA",
        name: "Nova Aviation",
        country: "Európa",
        description: "Medzinárodné spojenia"
    }
];


/* =========================================================
   LETY
========================================================= */

const flights = [
    {
        id: 1,
        number: "BBA241",
        type: "departure",
        time: "06:40",
        destination: "London",
        airline: "Bricksburg Airways",
        gate: "A1",
        status: "On Time"
    },

    {
        id: 2,
        number: "BA102",
        type: "departure",
        time: "07:15",
        destination: "Bratislava",
        airline: "BrickAir",
        gate: "A2",
        status: "Boarding"
    },

    {
        id: 3,
        number: "SKY510",
        type: "arrival",
        time: "07:35",
        destination: "Paris",
        airline: "SkyBricks",
        gate: "A3",
        status: "On Time"
    },

    {
        id: 4,
        number: "BEX311",
        type: "departure",
        time: "08:20",
        destination: "Madrid",
        airline: "Bricksburg Express",
        gate: "A4",
        status: "On Time"
    },

    {
        id: 5,
        number: "AIR708",
        type: "arrival",
        time: "09:05",
        destination: "Vienna",
        airline: "AIR Bricks",
        gate: "A5",
        status: "Landed"
    },

    {
        id: 6,
        number: "NOVA420",
        type: "departure",
        time: "09:45",
        destination: "Amsterdam",
        airline: "Nova Aviation",
        gate: "A1",
        status: "On Time"
    },

    {
        id: 7,
        number: "BBA318",
        type: "arrival",
        time: "10:20",
        destination: "London",
        airline: "Bricksburg Airways",
        gate: "A2",
        status: "On Time"
    },

    {
        id: 8,
        number: "SKY701",
        type: "departure",
        time: "11:00",
        destination: "Barcelona",
        airline: "SkyBricks",
        gate: "A3",
        status: "Delayed"
    },

    {
        id: 9,
        number: "BA450",
        type: "arrival",
        time: "12:15",
        destination: "Prague",
        airline: "BrickAir",
        gate: "A4",
        status: "On Time"
    },

    {
        id: 10,
        number: "BEX900",
        type: "departure",
        time: "13:30",
        destination: "Rome",
        airline: "Bricksburg Express",
        gate: "A5",
        status: "On Time"
    },

    {
        id: 11,
        number: "AIR620",
        type: "arrival",
        time: "14:10",
        destination: "Berlin",
        airline: "AIR Bricks",
        gate: "A1",
        status: "On Time"
    },

    {
        id: 12,
        number: "NOVA555",
        type: "departure",
        time: "15:25",
        destination: "Copenhagen",
        airline: "Nova Aviation",
        gate: "A2",
        status: "On Time"
    }
];


/* =========================================================
   ULOŽENIE / NAČÍTANIE
========================================================= */

const STORAGE_KEY = "btb_airport_flights";

let currentFlights = loadFlights();

function loadFlights() {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {

        try {
            return JSON.parse(saved);
        }

        catch (error) {
            console.warn("Nepodarilo sa načítať uložené lety.");
        }
    }

    return JSON.parse(JSON.stringify(flights));
}

function saveFlights() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(currentFlights)
    );
}


/* =========================================================
   ELEMENTY
========================================================= */

const flightTableBody =
    document.getElementById("flightTableBody");

const departureCount =
    document.getElementById("departureCount");

const arrivalCount =
    document.getElementById("arrivalCount");

const destinationCount =
    document.getElementById("destinationCount");

const flightSearch =
    document.getElementById("flightSearch");

const flightType =
    document.getElementById("flightType");

const toast =
    document.getElementById("toast");

const flightModal =
    document.getElementById("flightModal");


/* =========================================================
   STAV LETU – CSS
========================================================= */

function getStatusClass(status) {

    return status
        .toLowerCase()
        .replace(/\s+/g, "-");
}


/* =========================================================
   ZOBRAZENIE LETOV
========================================================= */

let activeFilter = "all";

function renderFlights() {

    const searchValue =
        flightSearch.value.trim().toLowerCase();

    const selectedType =
        flightType.value;

    const filteredFlights =
        currentFlights.filter(flight => {

            const matchesFilter =
                activeFilter === "all" ||
                flight.type === activeFilter;

            const matchesType =
                selectedType === "all" ||
                flight.type === selectedType;

            const searchableText =
                [
                    flight.number,
                    flight.destination,
                    flight.airline,
                    flight.gate,
                    flight.status
                ]
                .join(" ")
                .toLowerCase();

            const matchesSearch =
                searchableText.includes(searchValue);

            return (
                matchesFilter &&
                matchesType &&
                matchesSearch
            );
        });

    flightTableBody.innerHTML = "";

    if (filteredFlights.length === 0) {

        flightTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-row">
                    Žiadny let nezodpovedá vyhľadávaniu.
                </td>
            </tr>
        `;

        return;
    }

    filteredFlights.forEach(flight => {

        const row =
            document.createElement("tr");

        row.className = "flight-row";

        row.innerHTML = `
            <td>
                <strong>${flight.time}</strong>
            </td>

            <td>
                <span class="flight-number">
                    ${flight.number}
                </span>
            </td>

            <td>
                ${flight.type === "departure" ? "🛫" : "🛬"}
                ${flight.destination}
            </td>

            <td>
                ${flight.airline}
            </td>

            <td>
                <strong>${flight.gate}</strong>
            </td>

            <td>
                <span class="status status-${getStatusClass(flight.status)}">
                    ${flight.status}
                </span>
            </td>
        `;

        row.addEventListener("click", () => {
            openFlightModal(flight);
        });

        flightTableBody.appendChild(row);
    });

    updateCounters();
}


/* =========================================================
   POČÍTADLÁ
========================================================= */

function updateCounters() {

    const departures =
        currentFlights.filter(
            flight => flight.type === "departure"
        ).length;

    const arrivals =
        currentFlights.filter(
            flight => flight.type === "arrival"
        ).length;

    const destinations =
        new Set(
            currentFlights.map(
                flight => flight.destination
            )
        ).size;

    departureCount.textContent = departures;
    arrivalCount.textContent = arrivals;
    destinationCount.textContent = destinations;
}


/* =========================================================
   FILTRE
========================================================= */

document
    .querySelectorAll(".flight-tab")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".flight-tab")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            activeFilter =
                button.dataset.filter;

            renderFlights();
        });
    });


document
    .getElementById("searchFlightBtn")
    .addEventListener("click", renderFlights);

flightSearch.addEventListener(
    "input",
    renderFlights
);

flightType.addEventListener(
    "change",
    renderFlights
);


/* =========================================================
   DETAIL LETU
========================================================= */

function openFlightModal(flight) {

    document.getElementById(
        "modalFlightNumber"
    ).textContent = flight.number;

    document.getElementById(
        "modalDestination"
    ).textContent = flight.destination;

    document.getElementById(
        "modalTime"
    ).textContent = flight.time;

    document.getElementById(
        "modalAirline"
    ).textContent = flight.airline;

    document.getElementById(
        "modalGate"
    ).textContent = flight.gate;

    document.getElementById(
        "modalType"
    ).textContent =
        flight.type === "departure"
            ? "Odlet"
            : "Prílet";

    document.getElementById(
        "modalStatus"
    ).textContent = flight.status;

    flightModal.classList.add("open");

    flightModal.dataset.flightId =
        flight.id;
}


document
    .getElementById("modalClose")
    .addEventListener("click", closeFlightModal);


flightModal.addEventListener(
    "click",
    event => {

        if (event.target === flightModal) {
            closeFlightModal();
        }
    }
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeFlightModal();
        }
    }
);


function closeFlightModal() {
    flightModal.classList.remove("open");
}


/* =========================================================
   TTS
========================================================= */

function speak(text) {

    if (!("speechSynthesis" in window)) {

        showToast(
            "TTS nie je v tomto zariadení podporované."
        );

        return;
    }

    window.speechSynthesis.cancel();

    const utterance =
        new SpeechSynthesisUtterance(text);

    utterance.lang = "sk-SK";
    utterance.rate = 0.92;
    utterance.pitch = 1;

    window.speechSynthesis.speak(
        utterance
    );
}


function flightAnnouncement(flight) {

    const direction =
        flight.type === "departure"
            ? "odlet do"
            : "prílet z";

    return `
        Let ${flight.number},
        ${direction} ${flight.destination}.
        Aerolinka ${flight.airline}.
        Gate ${flight.gate}.
        Aktuálny stav: ${flight.status}.
    `;
}


document
    .getElementById("modalSpeak")
    .addEventListener("click", () => {

        const id =
            Number(flightModal.dataset.flightId);

        const flight =
            currentFlights.find(
                item => item.id === id
            );

        if (flight) {
            speak(flightAnnouncement(flight));
        }
    });


document
    .getElementById("speakBtn")
    .addEventListener("click", () => {

        speak(
            "Vitajte na letisku Bratislava-Bricksburg. " +
            "Prajem vám príjemnú cestu."
        );
    });


/* =========================================================
   AEROLINKY
========================================================= */

const airlineGrid =
    document.getElementById("airlineGrid");

function renderAirlines() {

    airlineGrid.innerHTML = "";

    aerolines.forEach(airline => {

        const card =
            document.createElement("div");

        card.className = "airline-card";

        card.innerHTML = `
            <div class="airline-logo">
                ${airline.code}
            </div>

            <div>
                <h3>${airline.name}</h3>
                <p>${airline.country}</p>
                <p>${airline.description}</p>
            </div>
        `;

        airlineGrid.appendChild(card);
    });
}


/* =========================================================
   ADMIN – PRIDANIE LETU
========================================================= */

document
    .getElementById("addFlightBtn")
    .addEventListener("click", () => {

        const number =
            document
                .getElementById("adminFlight")
                .value
                .trim()
                .toUpperCase();

        const destination =
            document
                .getElementById("adminDestination")
                .value
                .trim();

        const type =
            document
                .getElementById("adminType")
                .value;

        const time =
            document
                .getElementById("adminTime")
                .value;

        const gate =
            document
                .getElementById("adminGate")
                .value
                .trim()
                .toUpperCase();

        const status =
            document
                .getElementById("adminStatus")
                .value;

        if (
            !number ||
            !destination ||
            !time ||
            !gate
        ) {

            showToast(
                "Vyplňte všetky údaje letu."
            );

            return;
        }

        const newFlight = {

            id:
                Date.now(),

            number,

            type,

            time,

            destination,

            airline:
                "Bricksburg Airways",

            gate,

            status
        };

        currentFlights.push(
            newFlight
        );

        saveFlights();

        renderFlights();

        document
            .getElementById("adminMessage")
            .textContent =
            `Let ${number} bol pridaný.`;

        clearAdminFields();

        showToast(
            `Let ${number} bol úspešne pridaný.`
        );
    });


function clearAdminFields() {

    document.getElementById(
        "adminFlight"
    ).value = "";

    document.getElementById(
        "adminDestination"
    ).value = "";

    document.getElementById(
        "adminTime"
    ).value = "";

    document.getElementById(
        "adminGate"
    ).value = "";
}


/* =========================================================
   RESET LETOV
========================================================= */

document
    .getElementById("resetFlightsBtn")
    .addEventListener("click", () => {

        currentFlights =
            JSON.parse(
                JSON.stringify(flights)
            );

        saveFlights();

        renderFlights();

        document
            .getElementById("adminMessage")
            .textContent =
            "Predvolené lety boli obnovené.";

        showToast(
            "Lety boli obnovené."
        );
    });


/* =========================================================
   GATE MAP
========================================================= */

document
    .querySelectorAll(".map-gate")
    .forEach(gate => {

        gate.addEventListener(
            "click",
            () => {

                const gateNumber =
                    gate.dataset.gate;

                const flightsAtGate =
                    currentFlights.filter(
                        flight =>
                            flight.gate === gateNumber
                    );

                if (
                    flightsAtGate.length === 0
                ) {

                    showToast(
                        `Gate ${gateNumber}: momentálne bez letu.`
                    );

                    return;
                }

                const names =
                    flightsAtGate
                        .map(
                            flight =>
                                `${flight.number} – ${flight.destination}`
                        )
                        .join(" | ");

                showToast(
                    `Gate ${gateNumber}: ${names}`
                );
            }
        );
    });


/* =========================================================
   DARK MODE
========================================================= */

const themeBtn =
    document.getElementById("themeBtn");

const savedTheme =
    localStorage.getItem(
        "btb_theme"
    );

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀";
}


themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );

        const isDark =
            document.body.classList.contains(
                "dark"
            );

        localStorage.setItem(
            "btb_theme",
            isDark
                ? "dark"
                : "light"
        );

        themeBtn.textContent =
            isDark
                ? "☀"
                : "☾";
    }
);


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("nav");

menuBtn.addEventListener(
    "click",
    () => {

        nav.classList.toggle("open");

        menuBtn.textContent =
            nav.classList.contains("open")
                ? "×"
                : "☰";
    }
);


document
    .querySelectorAll(".nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove(
                    "open"
                );

                menuBtn.textContent = "☰";
            }
        );
    });


/* =========================================================
   JAZYKOVÉ TLAČIDLO
========================================================= */

let englishMode = false;

document
    .getElementById("languageBtn")
    .addEventListener(
        "click",
        () => {

            englishMode =
                !englishMode;

            document
                .getElementById(
                    "languageBtn"
                )
                .textContent =
                englishMode
                    ? "EN"
                    : "SK";

            showToast(
                englishMode
                    ? "English mode is ready for the next translation layer."
                    : "Slovenský režim."
            );
        }
    );


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        toastTimer
    );

    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3500
        );
}


/* =========================================================
   SIMULOVANÁ PREVÁDZKA
========================================================= */

function simulateAirportOperations() {

    const boardingFlights =
        currentFlights.filter(
            flight =>
                flight.status === "Boarding"
        );

    if (
        boardingFlights.length === 0
    ) {
        return;
    }

    const flight =
        boardingFlights[
            Math.floor(
                Math.random() *
                boardingFlights.length
            )
        ];

    flight.status =
        "Departed";

    saveFlights();

    renderFlights();

    showToast(
        `${flight.number} opustil gate ${flight.gate}.`
    );
}


/*
    Každých 60 sekúnd môže simulácia
    posunúť boarding let na Departed.
*/

setInterval(
    simulateAirportOperations,
    60000
);


/* =========================================================
   AKTUÁLNY ČAS
========================================================= */

function updateAirportTime() {

    const now =
        new Date();

    document.title =
        `BTB | ${now.toLocaleTimeString(
            "sk-SK",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        )} | Bratislava-Bricksburg`;
}

setInterval(
    updateAirportTime,
    1000
);


/* =========================================================
   START
========================================================= */

renderAirlines();
renderFlights();
updateAirportTime();

console.log(
    "BTB Airport system initialized."
);
