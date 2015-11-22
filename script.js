// objects
var player_1 = {
    yellow: {
        score: 0,
        score_display: document.getElementById('p1_yellow_display'),
        started: false,
        wager: 1,
        wager_display: document.getElementById('p1_yellow_wager')
    }
}

// displays
var p1_yellow_display = document.getElementById('p1_yellow_display');
var p1_blue_display = document.getElementById('p1_blue_display');
var p1_white_display = document.getElementById('p1_white_display');
var p1_green_display = document.getElementById('p1_green_display');
var p1_red_display = document.getElementById('p1_red_display');

var p2_yellow_display = document.getElementById('p2_yellow_display');
var p2_blue_display = document.getElementById('p2_blue_display');
var p2_white_display = document.getElementById('p2_white_display');
var p2_green_display = document.getElementById('p2_green_display');
var p2_red_display = document.getElementById('p2_red_display');

var all_displays = document.getElementsByClassName('display');

// pluses and minuses
var p1_yellow_plus = document.getElementById('p1_yellow_plus');
var p1_blue_plus = document.getElementById('p1_blue_plus');
var p1_white_plus = document.getElementById('p1_white_plus');
var p1_green_plus = document.getElementById('p1_green_plus');
var p1_red_plus = document.getElementById('p1_red_plus');

var p1_yellow_minus = document.getElementById('p1_yellow_minus');
var p1_blue_minus = document.getElementById('p1_blue_minus');
var p1_white_minus = document.getElementById('p1_white_minus');
var p1_green_minus = document.getElementById('p1_green_minus');
var p1_red_minus = document.getElementById('p1_red_minus');

var p2_yellow_plus = document.getElementById('p2_yellow_plus');
var p2_blue_plus = document.getElementById('p2_blue_plus');
var p2_white_plus = document.getElementById('p2_white_plus');
var p2_green_plus = document.getElementById('p2_green_plus');
var p2_red_plus = document.getElementById('p2_red_plus');

var p2_yellow_minus = document.getElementById('p2_yellow_minus');
var p2_blue_minus = document.getElementById('p2_blue_minus');
var p2_white_minus = document.getElementById('p2_white_minus');
var p2_green_minus = document.getElementById('p2_green_minus');
var p2_red_minus = document.getElementById('p2_red_minus');

var all_pluses_minuses = document.getElementsByClassName('button_card');

for (var i = 0; i < all_pluses_minuses.length; i++) {
    all_pluses_minuses[i].addEventListener('click', store_ref, false);
};

// numbers

var button_2 = document.getElementById('button_2');
var button_3 = document.getElementById('button_3');
var button_4 = document.getElementById('button_4');
var button_5 = document.getElementById('button_5');
var button_6 = document.getElementById('button_6');
var button_7 = document.getElementById('button_7');
var button_8 = document.getElementById('button_8');
var button_9 = document.getElementById('button_9');
var button_10 = document.getElementById('button_10');
var wager = document.getElementById('wager');
var new_game = document.getElementById('new_game');
new_game.addEventListener('click', start_new_game, false);
var bonus = document.getElementById('bonus');

var all_numbers = document.getElementsByClassName('number_button');

for (var i = 0; i < all_numbers.length; i++) {
    all_numbers[i].addEventListener('click', get_num, false);
};

// globals
var current_player;
var current_color;
var current_operation;
var current_num;

// functions
function start_new_game(){
    for (var i = 0; i < all_displays.length; i++) {
        all_displays[i].children[0].innerHTML = 0;
    };
    hide_numbers();
}

function hide_numbers(){
    for (var i = 0; i < all_numbers.length; i++) {
        all_numbers[i].style.visibility = 'hidden';
    };
}

function show_numbers(){
    for (var i = 0; i < all_numbers.length; i++) {
        all_numbers[i].style.visibility = 'visible';
    };
}

function add_wager(){
    selected_row.children[0].innerHTML += '*';
    selected_row.innerHTML = parseInt(selected_row.innerHTML) + 10;
}

function store_ref(e){
    current_player = eval(e.target.dataset.player);
    current_color = e.target.dataset.color;
    current_operation = e.target.dataset.operation;
    show_numbers();
}

function get_num(e){
    current_num = parseInt(e.target.dataset.num);
    hide_numbers();
    calculate(current_player, current_color, current_operation, current_num);
}

function calculate(player, color, operation, num){
    var new_score = eval(player[color]["score"] + operation + num);
    player[color]["score"] = new_score;
    player[color]["score_display"].innerHTML = new_score;
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
