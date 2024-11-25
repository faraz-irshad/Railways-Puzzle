let username = document.querySelector("#username");
let rules_btn = document.querySelector(".rules_btn");
let start_screen = document.querySelector(".container");
let rules_div = document.querySelector(".rules_div");
let close_btn = document.querySelector(".close_btn");
let game_body = document.querySelector(".game_body");
let start_btn = document.querySelector(".start_btn");
let user_data = document.querySelector(".user_data");
let game = document.querySelector(".game");

let usernameInput = document.querySelector("#username");
let userNameDisplay = document.querySelector("#user-name");
let timeElapsedDisplay = document.querySelector("#time-elapsed");

let selectedDifficulty;
let duplicated = [];
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

rules_btn.addEventListener("click", () => {
    start_screen.hidden = true;
    rules_div.hidden = false;
});

close_btn.addEventListener("click", () => {
    rules_div.hidden = true;
    start_screen.hidden = false;
});

const tiles = [
    { name: "bridge_rail", image: "pics/tiles/bridge_rail.png", type: "rail", angle: 0 },
    { name: "bridge", image: "pics/tiles/bridge.png", type: "terrain", angle: 0 },
    { name: "curve_rail", image: "pics/tiles/curve_rail.png", type: "rail", angle: 0 },
    { name: "empty", image: "pics/tiles/empty.png", type: "terrain", angle: 0 },
    { name: "mountain_rail", image: "pics/tiles/mountain_rail.png", type: "rail", angle: 0 },
    { name: "mountain", image: "pics/tiles/mountain.png", type: "terrain", angle: 0 },
    { name: "oasis", image: "pics/tiles/oasis.png", type: "terrain", angle: 0 },
    { name: "straight_rail", image: "pics/tiles/straight_rail.png", type: "rail", angle: 0 }
];

const maps5x5 = [
    [
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }],
        [{ name: "bridge", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 180, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 270, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }]
    ],
    [
        [{ name: "oasis", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 180, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 180, clicks: 0 }],
        [{ name: "bridge", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }, { name: "mountain", angle: 270, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }]
    ],
    [
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 180, clicks: 0 }, { name: "bridge", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }]
    ],
    [
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "bridge", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 90, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }, { name: "mountain", angle: 270, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }]
    ],
    [
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "bridge", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 270, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 180, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }]
    ]
];

const maps7x7 = [
    [
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 90, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "bridge", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 270, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "mountain", angle: 270, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }]
    ],
    [
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "bridge", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 180, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 0, clicks: 0 }],
        [{ name: "mountain", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }]
    ],
    [
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 0, clicks: 0 }],
        [{ name: "oasis", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 270, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }, { name: "mountain", angle: 270, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "bridge", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }, { name: "mountain", angle: 270, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }]
    ],  
    [
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 180, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 270, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 180, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "bridge", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 270, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }]
    ],
    [
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "bridge", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 90, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "oasis", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "mountain", angle: 180, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "bridge", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }],
        [{ name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }, { name: "empty", angle: 0, clicks: 0 }]
    ]
];

function getTileData(name) {
    return tiles.find(tile => tile.name == name);
}

function displayMap(map) {
    const gameDiv = document.querySelector('.game');
    gameDiv.innerHTML = '';

    let row_count = 0
    let column_count = 0
    let map_length = map.length

    map.forEach(row => {
        row_count += 1
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('map-row');
        
        row.forEach(tileObject => {

            column_count += 1
            const tileData = getTileData(tileObject.name);
            const tileDiv = document.createElement('div');
            tileDiv.classList.add('tile');
            tileDiv.classList.add(`tile-${map_length}-${row_count}-${column_count}`);
            
            if (tileData) {
                tileDiv.style.backgroundImage = `url(${tileData.image})`;
                tileDiv.style.transform = `rotate(${tileObject.angle}deg)`;
            }
            
            rowDiv.appendChild(tileDiv);
        });

        column_count = 0
        
        gameDiv.appendChild(rowDiv);
    });
}

let startTime;
let timerInterval;

start_btn.addEventListener("click", () => {
    selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value;

    start_screen.hidden = true;
    game_body.hidden = false;
    user_data.hidden = false;
    game.hidden = false;

    userNameDisplay.textContent = usernameInput.value || "Guest";

    startTime = Date.now();
    timerInterval = setInterval(updateTime, 1000);
    let random_option;

    let row_count = 0;
    let column_count = 0;

    if (selectedDifficulty == "5x5") {
        random_option = maps5x5[Math.floor(Math.random() * maps5x5.length)];
        displayMap(random_option);

        for (let i = 0; i < random_option.length; i++) {
            duplicated.push([]);
            for (let j = 0; j < random_option.length; j++) {
                duplicated[i].push({name: random_option[i][j].name, angle: random_option[i][j].angle, exit_1: null, exit_2: null})
            }
        }

        random_option.forEach(row => {
            row_count += 1
            row.forEach(tile => {
                column_count += 1
                let tileclass = document.querySelector(`.tile-5-${row_count}-${column_count}`)
        
                if (tileclass) {
                    tileclass.addEventListener("click", (event) => {
                        let class_name = event.target.classList[1];
                        let x = getTileCoordinates(class_name)[0];
                        let y = getTileCoordinates(class_name)[1];

                        if (tile.name == "empty") {
                            tile.clicks = (tile.clicks + 1) % 7;

                            const tileData = getTileData(rail_sequence[tile.clicks].name);
                            
                            if (tileData) {
                                tileclass.style.backgroundImage = `url(${tileData.image})`;
                                tileclass.style.transform = `rotate(${rail_sequence[tile.clicks].angle}deg)`;
                            }

                            duplicated[x - 1][y - 1] = {name: rail_sequence[tile.clicks].name, angle: rail_sequence[tile.clicks].angle, exit_1: null, exit_2: null};
                            if (end_game()) {
                                displayWinningScreen()
                            }
                        } else if (tile.name == "mountain") {
                            tile.clicks = (tile.clicks + 1) % 2

                            if (tile.clicks == 1) {
                                tileclass.style.backgroundImage = `url(${getTileData('mountain_rail').image})`;
                                tileclass.style.transform = `rotate(${tile.angle}deg)`;

                                duplicated[x - 1][y - 1] = {name: 'mountain_rail', angle: tile.angle, exit_1: null, exit_2: null};
                                if (end_game()) {
                                    displayWinningScreen()
                                }
                            } else {
                                tileclass.style.backgroundImage = `url(${getTileData('mountain').image})`;
                                tileclass.style.transform = `rotate(${tile.angle}deg)`;

                                duplicated[x - 1][y - 1] = {name: 'mountain', angle: tile.angle, exit_1: null, exit_2: null};
                                if (end_game()) {
                                    displayWinningScreen()
                                }
                            }
                        } else if (tile.name == "bridge") {
                            tile.clicks = (tile.clicks + 1) % 2

                            if (tile.clicks == 1) {
                                tileclass.style.backgroundImage = `url(${getTileData('bridge_rail').image})`;
                                tileclass.style.transform = `rotate(${tile.angle}deg)`;

                                duplicated[x - 1][y - 1] = {name: 'bridge_rail', angle: tile.angle, exit_1: null, exit_2: null}; 
                                if (end_game()) {
                                    displayWinningScreen()
                                }                               
                            } else {
                                tileclass.style.backgroundImage = `url(${getTileData('bridge').image})`;
                                tileclass.style.transform = `rotate(${tile.angle}deg)`;

                                duplicated[x - 1][y - 1] = {name: 'bridge', angle: tile.angle, exit_1: null, exit_2: null};
                                if (end_game()) {
                                    displayWinningScreen()
                                }
                            }
                        }   
                    });
                }
            });
            column_count = 0;
        });
        row_count = 0;
    } else if (selectedDifficulty == "7x7") {
        random_option = maps7x7[Math.floor(Math.random() * maps7x7.length)];
        displayMap(random_option);

        duplicated  = random_option;

        random_option.forEach(row => {

            row_count += 1
            row.forEach(tile => {
                column_count += 1
                let tileclass = document.querySelector(`.tile-7-${row_count}-${column_count}`)

                if (tileclass) {
                    tileclass.addEventListener("click", (event) => {
                        let class_name = event.target.classList[1];
                        let x = getTileCoordinates(class_name)[0];
                        let y = getTileCoordinates(class_name)[1];

                        if (tile.name == "empty") {
                            tile.clicks = (tile.clicks + 1) % 7;

                            const tileData = getTileData(rail_sequence[tile.clicks].name);
                            
                            if (tileData) {
                                tileclass.style.backgroundImage = `url(${tileData.image})`;
                                tileclass.style.transform = `rotate(${rail_sequence[tile.clicks].angle}deg)`;
                            }

                            duplicated[x - 1][y - 1] = {name: rail_sequence[tile.clicks].name, angle: rail_sequence[tile.clicks].angle, exit_1: null, exit_2: null};
                            if (end_game()) {
                                displayWinningScreen()
                            }
                        } else if (tile.name == "mountain") {
                            tile.clicks = (tile.clicks + 1) % 2

                            if (tile.clicks == 1) {
                                tileclass.style.backgroundImage = `url(${getTileData('mountain_rail').image})`;
                                tileclass.style.transform = `rotate(${tile.angle}deg)`;

                                duplicated[x - 1][y - 1] = {name: 'mountain_rail', angle: tile.angle, exit_1: null, exit_2: null};
                                if (end_game()) {
                                    displayWinningScreen()
                                }
                            } else {
                                tileclass.style.backgroundImage = `url(${getTileData('mountain').image})`;
                                tileclass.style.transform = `rotate(${tile.angle}deg)`;

                                duplicated[x - 1][y - 1] = {name: 'mountain', angle: tile.angle, exit_1: null, exit_2: null};
                                if (end_game()) {
                                    displayWinningScreen()
                                }
                            }
                        } else if (tile.name == "bridge") {
                            tile.clicks = (tile.clicks + 1) % 2

                            if (tile.clicks == 1) {
                                tileclass.style.backgroundImage = `url(${getTileData('bridge_rail').image})`;
                                tileclass.style.transform = `rotate(${tile.angle}deg)`;

                                duplicated[x - 1][y - 1] = {name: 'bridge_rail', angle: tile.angle, exit_1: null, exit_2: null}; 
                                if (end_game()) {
                                    displayWinningScreen()
                                }                               
                            } else {
                                tileclass.style.backgroundImage = `url(${getTileData('bridge').image})`;
                                tileclass.style.transform = `rotate(${tile.angle}deg)`;

                                duplicated[x - 1][y - 1] = {name: 'bridge', angle: tile.angle, exit_1: null, exit_2: null};
                                if (end_game()) {
                                    displayWinningScreen()
                                }
                            }
                        }   
                    });
                }
                
            });
            column_count = 0;
        });
    }
});

function updateTime() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timeElapsedDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}    

const rail_sequence = [
    { name: "empty", angle: 0 },
    { name: "straight_rail", angle: 0 },      
    { name: "straight_rail", angle: 90 },     
    { name: "curve_rail", angle: 0 },        
    { name: "curve_rail", angle: 90 },       
    { name: "curve_rail", angle: 180 },      
    { name: "curve_rail", angle: 270 },                    
];

function getTileCoordinates(str) {
    const parts = str.split('-');  
    const x = parseInt(parts[2], 10);  
    const y = parseInt(parts[3], 10); 
    
    return [x, y];
}

function end_game() {
    for (let i = 0; i < duplicated.length; i++) {
        for (let j = 0; j < duplicated.length; j++) {
            if (duplicated[i][j].name == 'empty' || duplicated[i][j].name == 'mountain' || duplicated[i][j].name == 'bridge') {
                return false
            }
        }
    }

    add_exit_points_to_duplicated();
    return validateExits(duplicated);
}

function validateExits(map) {
    add_exit_points_to_duplicated();

    const rows = map.length;
    const cols = map[0].length;

    const oppositeExit = {
        left: 'right',
        right: 'left',
        up: 'down',
        down: 'up',
        none: 'none'
    };

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const tile = map[i][j];
            const exits = [tile.exit_1, tile.exit_2];

            for (let k = 0; k < exits.length; k++) {
                const exit = exits[k];
                let neighbor;
                let expectedExit;

                if (exit === 'left') {
                    if (j > 0) {
                        neighbor = map[i][j - 1];
                        expectedExit = oppositeExit[exit];
                        if (neighbor.exit_1 !== expectedExit && neighbor.exit_2 !== expectedExit) {
                            console.log(`Mismatch at (${i}, ${j}): Expected '${expectedExit}' on neighbor (${i}, ${j - 1})`);
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else if (exit === 'right') {
                    if (j < cols - 1) {
                        neighbor = map[i][j + 1];
                        expectedExit = oppositeExit[exit];
                        if (neighbor.exit_1 !== expectedExit && neighbor.exit_2 !== expectedExit) {
                            console.log(`Mismatch at (${i}, ${j}): Expected '${expectedExit}' on neighbor (${i}, ${j + 1})`);
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else if (exit === 'up') {
                    if (i > 0) {
                        neighbor = map[i - 1][j];
                        expectedExit = oppositeExit[exit];
                        if (neighbor.exit_1 !== expectedExit && neighbor.exit_2 !== expectedExit) {
                            console.log(`Mismatch at (${i}, ${j}): Expected '${expectedExit}' on neighbor (${i - 1}, ${j})`);
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else if (exit === 'down') {
                    if (i < rows - 1) {
                        neighbor = map[i + 1][j];
                        expectedExit = oppositeExit[exit];
                        if (neighbor.exit_1 !== expectedExit && neighbor.exit_2 !== expectedExit) {
                            console.log(`Mismatch at (${i}, ${j}): Expected '${expectedExit}' on neighbor (${i + 1}, ${j})`);
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

function add_exit_points_to_duplicated() {
    for (let i = 0; i < duplicated.length; i++) {
        for (let j = 0; j < duplicated.length; j++) {
            let output = exit_points(duplicated[i][j])
            if (output != undefined) {
                duplicated[i][j].exit_1 = output[0];
                duplicated[i][j].exit_2 = output[1];
            }
        }
    }
}

function exit_points(tile) {
    if (tile.name == 'straight_rail' || tile.name == 'bridge_rail') {
        if (tile.angle == 0) {
            return ['up', 'down']
        } else {
            return ['left', 'right']
        }
    }
    else if (tile.name == 'mountain_rail' || tile.name == 'curve_rail') {
        if (tile.angle == 0) {
            return ['down', 'right']
        } else if (tile.angle == 90) {
            return ['left', 'down']
        } else if (tile.angle == 180) {
            return ['left', 'up']
        } else if (tile.angle == 270) {
            return ['up', 'right']
        }
    }
    else if (tile.name == 'oasis'){
        return ['none', 'none']
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayWinningScreen() {
    await sleep(1000);
    
    const winningScreen = document.createElement('div');
    winningScreen.classList.add('winning-screen');

    const message = document.createElement('h2');
    message.textContent = "Congratulations! You've won!";
    message.style.color = '#c3a455';  
    message.style.fontSize = '2rem';
    message.style.marginBottom = '10px';
    winningScreen.appendChild(message);

    const username = usernameInput.value || "Guest";
    const userNameDisplay = document.createElement('p');
    userNameDisplay.textContent = `User: ${username}`;
    userNameDisplay.style.color = '#7a875a';
    userNameDisplay.style.fontWeight = 'bold';
    winningScreen.appendChild(userNameDisplay);

    const difficulty = selectedDifficulty;
    const difficultyDisplay = document.createElement('p');
    difficultyDisplay.textContent = `Difficulty: ${difficulty}`;
    difficultyDisplay.style.color = '#7a875a';
    difficultyDisplay.style.fontWeight = 'bold';
    winningScreen.appendChild(difficultyDisplay);

    const timeElapsed = timeElapsedDisplay.textContent;
    const timeDisplay = document.createElement('p');
    timeDisplay.textContent = `Time Elapsed: ${timeElapsed}`;
    timeDisplay.style.color = '#7a875a';
    timeDisplay.style.fontWeight = 'bold';
    winningScreen.appendChild(timeDisplay);

    leaderboard.push({ username, difficulty, timeElapsed });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    winningScreen.style.position = 'fixed';
    winningScreen.style.top = '50%';
    winningScreen.style.left = '50%';
    winningScreen.style.transform = 'translate(-50%, -50%)';
    winningScreen.style.backgroundColor = '#f2f2e9';  
    winningScreen.style.border = '2px solid #c3a455';
    winningScreen.style.padding = '30px';
    winningScreen.style.borderRadius = '10px';
    winningScreen.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
    winningScreen.style.textAlign = 'center';
    winningScreen.style.zIndex = '1000';

    const restartButton = document.createElement('button');
    restartButton.textContent = "Restart Game";
    restartButton.style.marginTop = '20px';
    restartButton.style.padding = '10px 20px';
    restartButton.style.border = 'none';
    restartButton.style.borderRadius = '5px';
    restartButton.style.backgroundColor = '#7a7a7a';
    restartButton.style.color = '#ffffff';
    restartButton.style.cursor = 'pointer';
    restartButton.addEventListener('click', () => {
        location.reload();
    });
    winningScreen.appendChild(restartButton);

    const leaderboardButton = document.createElement('button');
    leaderboardButton.textContent = "Leader Board";
    leaderboardButton.style.marginTop = '20px';
    leaderboardButton.style.marginLeft = '10px';
    leaderboardButton.style.padding = '10px 20px';
    leaderboardButton.style.border = 'none';
    leaderboardButton.style.borderRadius = '5px';
    leaderboardButton.style.backgroundColor = '#7a7a7a';
    leaderboardButton.style.color = '#ffffff';
    leaderboardButton.style.cursor = 'pointer';
    leaderboardButton.addEventListener('click', displayLeaderboard);
    winningScreen.appendChild(leaderboardButton);

    document.body.appendChild(winningScreen);
}

function displayLeaderboard() {
    const existingLeaderboard = document.querySelector('.leaderboard-screen');
    if (existingLeaderboard) existingLeaderboard.remove();

    const leaderboardScreen = document.createElement('div');
    leaderboardScreen.classList.add('leaderboard-screen');

    const title = document.createElement('h2');
    title.textContent = "Leader Board";
    title.style.color = '#c3a455';
    title.style.fontSize = '2rem';
    title.style.marginBottom = '10px';
    leaderboardScreen.appendChild(title);

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    const headerRow = document.createElement('tr');
    ['User', 'Difficulty', 'Time'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        th.style.color = '#7a875a';
        th.style.padding = '10px';
        th.style.borderBottom = '2px solid #c3a455';
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    leaderboard.forEach(entry => {
        const row = document.createElement('tr');
        [entry.username, entry.difficulty, entry.timeElapsed].forEach(text => {
            const td = document.createElement('td');
            td.textContent = text;
            td.style.padding = '10px';
            td.style.color = '#7a7a7a';
            row.appendChild(td);
        });
        table.appendChild(row);
    });
    leaderboardScreen.appendChild(table);

    leaderboardScreen.style.position = 'fixed';
    leaderboardScreen.style.top = '50%';
    leaderboardScreen.style.left = '50%';
    leaderboardScreen.style.transform = 'translate(-50%, -50%)';
    leaderboardScreen.style.backgroundColor = '#f2f2e9';
    leaderboardScreen.style.border = '2px solid #c3a455';
    leaderboardScreen.style.padding = '30px';
    leaderboardScreen.style.borderRadius = '10px';
    leaderboardScreen.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
    leaderboardScreen.style.textAlign = 'center';
    leaderboardScreen.style.zIndex = '1000';

    const closeButton = document.createElement('button');
    closeButton.textContent = "Close";
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.backgroundColor = '#7a7a7a';
    closeButton.style.color = '#ffffff';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => leaderboardScreen.remove());
    leaderboardScreen.appendChild(closeButton);

    document.body.appendChild(leaderboardScreen);
}
