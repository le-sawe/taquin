var board_size = 4;
var vide_position_x;
var vide_position_y;
var board_interface = document.getElementById('board');
var board =[[],];
var nombre_de_deplacement =0;
var counter = document.getElementById('counter');
var start_time =false;
var core_interface =document.getElementById('core');
var board_width=40*(board_size)+2*(board_size)+board_size*2;
var board_height=40*(board_size)+2*(board_size)+50;
function startgame(){
    nombre_de_deplacement =0
    //create board game ------------------
    // create board numbers 
    var board_numbers=[];
    for(var i=0; i<Math.pow(board_size,2);i=i+1){
        board_numbers[i]=i;// arrange the number from 0 to boardsize**2
    }  
    var the_new_list =[]; // instant variable to make the random order number list
    // arrange the numbers on the board_numbers in a random way
    for(var j=0; j<Math.pow(board_size,2);j++){
        var the_random_number=get_random_between(0,board_numbers.length );
        the_new_list.push(board_numbers[the_random_number]);
        board_numbers.splice(the_random_number,1);
    }
    board_numbers= the_new_list; // update the value of the board_numbers
    // put those number on the board
    
    for(var i=0; i<board_size;i++){
            board[i]=[];      
    }
    for(var i=0; i<board_size;i++){
        for(var j=0; j<board_size;j++){
            board[i][j]=board_numbers[j+(board_size*i)];
            if (board_numbers[j+(board_size*i)] ==0) {vide_position_x=j;vide_position_y=i;}
        }
    }
    
    // Print the board
    
    core_interface.style.width= board_width;
    core_interface.style.height= board_height;
    for(var i=0; i<board_size;i++){
        for(var j=0; j<board_size;j++){
            if (board[i][j]==0){
                board_interface.innerHTML+='<button class="vide_square" id="'+i+','+j+'" onclick="vide_to('+i+','+j+');">0</button>';
            }else{
                board_interface.innerHTML+='<button class="square" id="'+i+','+j+'" onclick="vide_to('+i+','+j+');">'+board[i][j]+'</button>';
            }
        }
        
    }
    counter.innerHTML=nombre_de_deplacement;
    
}
function board_refresh(){
    
    
    board_interface.innerHTML="";
    
    for(var i=0; i<board_size;i++){
        for(var j=0; j<board_size;j++){
            if (board[i][j]==0){
                board_interface.innerHTML+='<button class="vide_square" id="'+i+','+j+'" onclick="vide_to('+i+','+j+');">0</button>';
            }else{
                board_interface.innerHTML+='<button class="square" id="'+i+','+j+'" onclick="vide_to('+i+','+j+');">'+board[i][j]+'</button>';
            }        }
        
    }
    counter.innerHTML=nombre_de_deplacement;
}
function vide_to(y,x){    
    if (x == vide_position_x &&(y +1 == vide_position_y || y -1 == vide_position_y )||y == vide_position_y && ( x -1 == vide_position_x|| x +1 == vide_position_x)){
        board[vide_position_y][vide_position_x] = board[y][x];
        board[y][x] =0;    
        vide_position_x =x;
        vide_position_y = y;
        nombre_de_deplacement +=1;
        start_time_now();
        board_refresh();
        check_win();
    }  
}
function get_random_between(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  var totalSeconds = 0;

  function start_time_now(){
    if(start_time==false)  setInterval(setTime, 1000);
    start_time=true;

    }

  function setTime() {
    ++totalSeconds;
    if(start_time==true){
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }
  }
  
function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

function check_win(){
    var instant =0;
    for(var i=0; i<board_size;i++){
        for(var j=0; j<board_size;j++){
            if (board[i][j] != instant)return false; 
            instant+=1;  
        }
    }
    start_time=false;
    board_interface.className = "win";
    board_interface.innerHTML = "<button class='win_button' width='100%' height='100%' onclick ='history.go(0)'>Succes !!! <br> "+ pad(parseInt(totalSeconds / 60))+"m : "+ pad(totalSeconds % 60)+"s <br> "+ nombre_de_deplacement+" mouvements <br> Cliquer ici pour demarrer nouveau jeu !!!</button>";
    board_interface.style.width= board_width;
    board_interface.style.height= board_height-50;
    return true;
  }

















