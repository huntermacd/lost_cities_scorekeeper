// objects
function Player(player){
    this.yellow = {
        score: 0,
        score_display: document.getElementById(player + '_yellow_display'),
        started: false,
        wager: 1,
        wager_display: document.getElementById(player + '_yellow_wager')
    },
    this.blue = {
        score: 0,
        score_display: document.getElementById(player + '_blue_display'),
        started: false,
        wager: 1,
        wager_display: document.getElementById(player + '_blue_wager')
    },
    this.white = {
        score: 0,
        score_display: document.getElementById(player + '_white_display'),
        started: false,
        wager: 1,
        wager_display: document.getElementById(player + '_white_wager')
    },
    this.green = {
        score: 0,
        score_display: document.getElementById(player + '_green_display'),
        started: false,
        wager: 1,
        wager_display: document.getElementById(player + '_green_wager')
    },
    this.red = {
        score: 0,
        score_display: document.getElementById(player + '_red_display'),
        started: false,
        wager: 1,
        wager_display: document.getElementById(player + '_red_wager')
    },
    this.total = function(){
        return this.yellow.score + this.blue.score + this.white.score + this.green.score + this.red.score;
    },
    this.total_display = document.getElementById(player + '_total')
};

var player_1 = new Player('p1');
var player_2 = new Player('p2');

// displays
var all_displays = document.getElementsByClassName('display');
var turn = document.getElementById('turn');
var buttons = document.getElementById('buttons');

// wagers
var all_wagers = document.getElementsByClassName('wager_display');

// pluses
var all_pluses = document.getElementsByClassName('button_card');

for (var i = 0; i < all_pluses.length; i++) {
    all_pluses[i].addEventListener('click', store_ref, false);
};

// numbers
var all_numbers = document.getElementsByClassName('number_button');

for (var i = 0; i < all_numbers.length; i++) {
    all_numbers[i].addEventListener('click', get_num, false);
};

// other buttons
var new_game = document.getElementById('new_game');
new_game.addEventListener('click', start_new_game, false);

var end_turn = document.getElementById('end_turn');
end_turn.addEventListener('click', turn_end, false);

var reset_row = document.getElementById('reset_row');
reset_row.addEventListener('click', row_reset, false);

var undo_button = document.getElementById('undo');
undo_button.addEventListener('click', undo, false);
undo_button.style.visibility = "hidden";

var wager = document.getElementById('wager');
wager.addEventListener('click', add_wager, false);

var bonus = document.getElementById('bonus');
bonus.addEventListener('click', add_bonus, false);

var all_function_buttons = document.getElementsByClassName('function_button');

// globals
var current_player;
var current_color;
var current_num;
var previous_score;
var previous_wager;
var previous_started;

// functions
function start_new_game(){
    window.location.reload();
}

function turn_end(){
    if (turn.innerHTML === "ONE"){
        turn.innerHTML = "TWO";
        buttons.style.transform = 'rotate(180deg)';
    } else {
        turn.innerHTML = "ONE";
        buttons.style.transform = 'rotate(0deg)';
    }
    hide_numbers();
    undo_button.style.visibility = "hidden";
}

function row_reset(){
    var current = current_player[current_color];
    current["score"] = 0;
    current["score_display"].innerHTML = current["score"];
    update_total();
    current["wager"] = 1;
    current["wager_display"].innerHTML = 'x' + current["wager"];
    current["started"] = false;
    hide_numbers();
}

function undo(){
    var current = current_player[current_color];
    current["score"] = previous_score;
    current["score_display"].innerHTML = previous_score;
    current["wager"] = previous_wager;
    current["wager_display"].innerHTML = 'x' + previous_wager;
    current["started"] = previous_started;
    update_total();
    undo_button.style.visibility = "hidden";
}

function hide_numbers(){
    for (var i = 0; i < all_numbers.length; i++) {
        all_numbers[i].style.visibility = 'hidden';
    };
    for (var i = 0; i < all_function_buttons.length; i++) {
        all_function_buttons[i].style.visibility = 'hidden';
    };
}

function show_numbers(){
    for (var i = 0; i < all_numbers.length; i++) {
        all_numbers[i].style.visibility = 'visible';
    };
    for (var i = 0; i < all_function_buttons.length; i++) {
        all_function_buttons[i].style.visibility = 'visible';
    };
}

function add_wager(){
    start_expedition();
    hide_numbers();
    var current = current_player[current_color];
    current["wager"] += 1;
    current["wager_display"].innerHTML = 'x' + current["wager"];
    current["score"] -= 20;
    current["score_display"].innerHTML = current["score"];
    update_total();
}

function add_bonus(){
    hide_numbers();
    var current = current_player[current_color];
    current["score"] += 20;
    current["score_display"].innerHTML = current["score"];
    update_total();
}

function store_ref(e){
    current_player = eval(e.target.dataset.player);
    current_color = e.target.dataset.color;
    previous_score = current_player[current_color]["score"];
    previous_wager = current_player[current_color]["wager"];
    previous_started = current_player[current_color]["started"];
    show_numbers();
    undo_button.style.visibility = "visible";
}

function get_num(e){
    current_num = parseInt(e.target.dataset.num);
    hide_numbers();
    calculate(current_player, current_color, current_num);
}

function calculate(player, color, num){
    start_expedition();
    player[color]["score"] += (num * player[color]["wager"]);
    player[color]["score_display"].innerHTML = player[color]["score"];
    update_total();
}

function start_expedition(){
    var current = current_player[current_color];
    if (current["started"] === false){
        current["score"] -= 20;
        current["started"] = true;
        current["score_display"].innerHTML = current["score"];
        update_total();
    }
}

function update_total(){
    current_player["total_display"].innerHTML = 'Total: ' + current_player["total"]();
}

// init
hide_numbers();

/*
1 user taps new game to clear all values
2 user taps a plus or minus button
3 numbers/wager/bonus buttons show
4 user taps an option
5 score is is updated accordingly for that specific row
    if row is being added to for the very first time, subtract 20 (multiplied by (number of wagers * 2))
*/
