		

var pcPont = 0;
var playerPont = 0;

var pName = '';

var placar = new Array();

var players = {};

var partidas = new Array();

var gameTime = {};

var gameRounds = 0;

var timeCounter;

var startInterval = 0;

var partidaStart = {};

function Jogador(_nome, _sexo, _tipoJogador) {
	this.Nome = _nome;
	this.Sexo = _sexo;
	this.TipoJogador = _tipoJogador;
}

function sairJogo(){
	document.getElementById("telaInicial").style.display = "block";

	document.getElementById("telaJogo").style.display = "none";			

	timeStop();
}


function novoJogo() {
	players[document.getElementById("playerName").value] = new Jogador(document.getElementById("playerName").value, document.getElementById("playerSexo").value, true);

	pcPont = 0;
	playerPont = 0;

	pName = '';

	gameTime = {"h":0, "m":0,"s":0};

	partidaStart = {"h":0, "m":0,"s":0};

	timeCounter = setInterval(timeAdd, 1000);
	
	gameRounds = 0;

	pName = document.getElementById("playerName").value;

	document.getElementById("telaInicial").style.display = "none";
	document.getElementById("scoresTable").style.display = "none";

	document.getElementById("telaJogo").style.display = "block";

	$("#playerInfo").trigger('reset');
	

	if (typeof placar[0] !== 'undefined' && placar[0] !== null) {

		if (hasInArray(placar) < 0) {
			$("#pPlacar").text(pName);
			placar[placar.length] = new Array(pName, 0, 0, 0, gameTime);

			$('#roundsShow').text("Partidas: 0");
			$('#timeShow').text("Tempo: "+gameTime["h"]+":"+gameTime["m"]+":"+gameTime["s"]);
			$('#pcPontuation').text(0);
			$('#playerPontuation').text(0);
		} else {

			var i = hasInArray(placar);
			playerPont = placar[i][1];
			pcPont = placar[i][2];
			gameRounds = placar[i][3];
			gameTime["h"] = placar[i][4]["h"];
			gameTime["m"] = placar[i][4]["m"];
			gameTime["s"] = placar[i][4]["s"];

			partidaStart["h"] = placar[i][4]["h"];
			partidaStart["m"] = placar[i][4]["m"];
			partidaStart["s"] = placar[i][4]["s"];

			$('#roundsShow').text("Partidas: "+gameRounds);
			$('#timeShow').text("Tempo: "+gameTime["h"]+":"+gameTime["m"]+":"+gameTime["s"]);
			$('#pcPontuation').text(pcPont);
			$('#playerPontuation').text(playerPont);

		}
	} else {
		$("#pPlacar").text(pName);
		placar[placar.length] = new Array(pName, 0, 0, 0, gameTime);

		$('#roundsShow').text("Partidas: 0");
		$('#timeShow').text("Tempo: "+gameTime["h"]+":"+gameTime["m"]+":"+gameTime["s"]);
		$('#pcPontuation').text(0);
		$('#playerPontuation').text(0);
	}

}

function timeAdd() {
    gameTime["s"] += 1;

    if (gameTime["s"] == 60) {
    	gameTime["s"] = 0;
    	gameTime["m"] += 1;
    	if (gameTime["m"] == 60) {
    		gameTime["m"] = 0;
    		gameTime["h"] += 1; 
    	}
    }

    for (var i = 0; i < placar.length; i++) {
		if (placar[i][0] == pName) {
			placar[i][4] = gameTime;
			break;
		}
	}

	$('#timeShow').text("Tempo: "+gameTime["h"]+":"+gameTime["m"]+":"+gameTime["s"]);
}

function timeStop() {
    clearInterval(timeCounter);
}

function showScores(){

	if (typeof placar[0] !== 'undefined' && placar[0] !== null) {
		document.getElementById("telaInicial").style.display = "none";
		document.getElementById("telaJogo").style.display = "none";

		document.getElementById("scoresTable").style.display = "block";

		$('#mytable').empty();

		var str = "<tr style='background-color: #337ab7; color:white;'><th>Jogador</th><th>Pontuação</th><th>PC pontuação</th><th>Número de partidas</th><th>Tempo</th></tr>";		

		for (var i = 0, len = placar.length; i < len; i++) {
			str += "<tr style='background-color:#80aace; color:white;'><td data-toggle='collapse' data-target="+"#demo"+i+" class='collapsible' style='cursor:pointer;'>"+placar[i][0]+"</td><td>"+placar[i][1]+"</td><td>"+placar[i][2]+"</td><td>"+placar[i][3]+"</td><td>"+placar[i][4]['h']+":"+placar[i][4]['m']+":"+placar[i][4]['s']+"</td></tr>";

			str += "<tr class='collapse' id=demo"+i+"><td colspan='5'><div style='text-align:center;'>Detalhes das partidas, a coluna vermelha exibe os resultados das partidas</div>";

			str += "<table><tr><th>Partida</th><th>"+placar[i][0]+"</th><th>PC</th><th style='background-color: #ff9999;'>Vencedor</th><th>Duração da partida</th></tr>";

			for (var j = 0; j < partidas[placar[i][0]].length; j++) {
				str += "<tr><td>"+(j+1)+"</td><td>"+partidas[placar[i][0]][j][0]+"</td><td>"+partidas[placar[i][0]][j][1]+"</td><td style='background-color: #ffcccc;'>"+partidas[placar[i][0]][j][2]+"</td><td>"+partidas[placar[i][0]][j][3]+"</td></tr>";
			}

			str += "</table></div></td></tr>";
		}

		$('#mytable').append(str);

	}else{
		alert("Não há scores ainda!");
	}

}


function hasInArray(array) {	
	for (var i = array.length - 1; i >= 0; i--) {
		if (array[i][0] == pName) {
			return i;
		}
	}

	return -1;
}

function backToInitial(){
	document.getElementById("telaJogo").style.display = "none";	
	document.getElementById("scoresTable").style.display = "none";

	document.getElementById("telaInicial").style.display = "block";
}


// A $( document ).ready() block.
function jogada(clicked_id){

	if (document.getElementById("pedra").disabled == false) {
		pcPlay = Math.floor((Math.random() * 3) + 1);

		if (pcPlay == 1) {
			$('#pcHandIMG').attr('src', 'img/pedra.png'); 
		} else if (pcPlay == 2) {
			$('#pcHandIMG').attr('src', 'img/papel.png');
		} else if (pcPlay == 3) {
			$('#pcHandIMG').attr('src', 'img/tesoura.png');
		}

		if (clicked_id == 'pedra') {
			$('#playerHandIMG').attr('src', 'img/pedra.png'); 
		} else if (clicked_id == 'papel') {
			$('#playerHandIMG').attr('src', 'img/papel.png');
		} else if (clicked_id == 'tesoura') {
			$('#playerHandIMG').attr('src', 'img/tesoura.png');
		}

		if (pcPlay == 1) {
			if (clicked_id == "pedra") {
				pcPont += 1;
				playerPont += 1;
				$('#pcPontuation').text(pcPont);	
				$('#pcHand > div > h2').text("Empate");
				$('#playerHand > div > h2').text("Empate");
				$('#playerPontuation').text(playerPont);

				$('#pcHand > div > h2').css("color", "blue");
				$('#playerHand > div > h2').css("color", "blue");

				var audio = new Audio();
				audio.src = "sounds/288900_felipejordani_jogo-de-luta-voz-do-apresentador_draw.mp3";
    			audio.play();

			}else if (clicked_id == 'papel') {
				playerPont += 3;
				$('#playerPontuation').text(playerPont);
				$('#playerHand > div > h2').text("Venceu");
				$('#pcHand > div > h2').text("Perdeu");

				$('#pcHand > div > h2').css("color", "red");
				$('#playerHand > div > h2').css("color", "green");

				var audio = new Audio();
				audio.src = "sounds/288900_felipejordani_jogo-de-luta-voz-do-apresentador_win.mp3";
    			audio.play();

			} else if (clicked_id == 'tesoura') {
				pcPont += 3;
				$('#pcPontuation').text(pcPont);
				$('#pcHand > div > h2').text("Venceu");
				$('#playerHand > div > h2').text("Perdeu");

				$('#pcHand > div > h2').css("color", "green");
				$('#playerHand > div > h2').css("color", "red");

				var audio = new Audio();
				audio.src = "sounds/288900_felipejordani_jogo-de-luta-voz-do-apresentador_lose.mp3";
    			audio.play();
			}				
		}else if (pcPlay == 2) {
			if (clicked_id == 'pedra') {
				pcPont += 3;
				$('#pcPontuation').text(pcPont);
				$('#pcHand > div > h2').text("Venceu");
				$('#playerHand > div > h2').text("Perdeu");	

				$('#pcHand > div > h2').css("color", "green");
				$('#playerHand > div > h2').css("color", "red");

				var audio = new Audio();
				audio.src = "sounds/288900_felipejordani_jogo-de-luta-voz-do-apresentador_lose.mp3";
    			audio.play();
			}else if (clicked_id == 'papel') {
				pcPont += 1;
				playerPont += 1;
				$('#pcPontuation').text(pcPont);
				$('#playerPontuation').text(playerPont);	
				$('#pcHand > div > h2').text("Empate");
				$('#playerHand > div > h2').text("Empate");

				$('#pcHand > div > h2').css("color", "blue");
				$('#playerHand > div > h2').css("color", "blue");

				var audio = new Audio();
				audio.src = "sounds/288900_felipejordani_jogo-de-luta-voz-do-apresentador_draw.mp3";
    			audio.play();
			} else if (clicked_id == 'tesoura') {
				playerPont += 3;
				$('#playerPontuation').text(playerPont);
				$('#playerHand > div > h2').text("Venceu");
				$('#pcHand > div > h2').text("Perdeu");

				$('#pcHand > div > h2').css("color", "red");
				$('#playerHand > div > h2').css("color", "green");

				var audio = new Audio();
				audio.src = "sounds/288900_felipejordani_jogo-de-luta-voz-do-apresentador_win.mp3";
    			audio.play();	
			}
		} else if (pcPlay == 3) {
			if (clicked_id == 'pedra') {
				playerPont += 3;
				$('#playerPontuation').text(playerPont);
				$('#playerHand > div > h2').text("Venceu");
				$('#pcHand > div > h2').text("Perdeu");

				$('#pcHand > div > h2').css("color", "red");
				$('#playerHand > div > h2').css("color", "green");

				var audio = new Audio();
				audio.src = "sounds/288900_felipejordani_jogo-de-luta-voz-do-apresentador_win.mp3";
    			audio.play();
			}else if (clicked_id == 'papel') {
				pcPont += 3;

				$('#pcPontuation').text(pcPont);
				$('#pcHand > div > h2').text("Venceu");
				$('#playerHand > div > h2').text("Perdeu");

				$('#pcHand > div > h2').css("color", "green");
				$('#playerHand > div > h2').css("color", "red");

				var audio = new Audio();
				audio.src = "sounds/288900_felipejordani_jogo-de-luta-voz-do-apresentador_lose.mp3";
    			audio.play();	
			} else if (clicked_id == 'tesoura') {
				pcPont += 1;
				playerPont += 1;
				$('#pcPontuation').text(pcPont);	
				$('#playerPontuation').text(playerPont);
				$('#pcHand > div > h2').text("Empate");
				$('#playerHand > div > h2').text("Empate");

				$('#pcHand > div > h2').css("color", "blue");
				$('#playerHand > div > h2').css("color", "blue");

				var audio = new Audio();
				audio.src = "sounds/288900_felipejordani_jogo-de-luta-voz-do-apresentador_draw.mp3";
    			audio.play();	
			}
		}

		gameRounds += 1;


		$('#roundsShow').text("Partidas "+gameRounds);

		for (var i = 0; i < placar.length; i++) {
			if (placar[i][0] == pName) {
				placar[i][1] = playerPont;
				placar[i][2] = pcPont;
				placar[i][3] = gameRounds;
				placar[i][4] = gameTime;
				break;
			}
		}

		var options = ["pedra", "papel", "tesoura"];

		var winner = "";

		if ($('#playerHand > div > h2').text() == "Venceu") {
			winner = pName;
		} else if ($('#playerHand > div > h2').text() == "Perdeu") {
			winner = "PC";
		} else if ($('#playerHand > div > h2').text() == "Empate") {
			winner = "Empate";
		}

		var horas = gameTime['h'] - partidaStart['h'];
		var minutos = 0;
		var segundos = 0;

		if (gameTime['m'] < partidaStart['m']) {
			horas -= 1;

			minutos = 60 - partidaStart['m'];

			minutos += gameTime['m'];
		}else{
			minutos = gameTime['m'] - partidaStart['m'];			
		}

		if (gameTime['s'] < partidaStart['s']) {
			minutos -= 1;

			segundos = 60 - partidaStart['s'];

			segundos += gameTime['s'];
		}else{
			segundos = gameTime['s'] - partidaStart['s'];			
		}


		partidaStart['h'] = gameTime['h'];
		partidaStart['m'] = gameTime['m'];
		partidaStart['s'] = gameTime['s'];

		if (typeof partidas[pName] !== 'undefined' && partidas[pName] !== null) {
			partidas[pName].push([clicked_id, options[pcPlay-1], winner, horas+":"+minutos+":"+segundos]);
		}else{
			partidas[pName] = Array([clicked_id, options[pcPlay-1], winner, horas+":"+minutos+":"+segundos]);
		}

		document.getElementById("pedra").disabled=true;
		document.getElementById("papel").disabled=true;
		document.getElementById("tesoura").disabled=true;
		 
		setTimeout(function(){
			$('#pcHand > div > h2').text("");
			$('#playerHand > div > h2').text(""); 
			$('#playerHandIMG').attr('src', 'img/interrogacao.jpg');
			$('#pcHandIMG').attr('src', 'img/interrogacao.jpg');

			document.getElementById("pedra").disabled=false;
			document.getElementById("papel").disabled=false;
			document.getElementById("tesoura").disabled=false; 
		}, 1000);
	}
}