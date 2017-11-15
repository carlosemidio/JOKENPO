
/* Varáveis do jogo */		
var pcPont = 0;
var playerPont = 0;
var placar = new Array();
var player = {};
var PC = {};
var partidas = new Array();
var gameTime = {};
var gameRounds = 0;
var timeCounter;
var startInterval = 0;
var partidaStart = {};

$("#playerInfo").submit(function(e){
    novoJogo();
    return false;
});


/* Objeto do tipo jogador */
function Jogador(nome, sexo, tipoJogador) {
	this.name = nome;
	this.sex = sexo;
	this.playerType = tipoJogador;

	/* Função que faz a escolha do PC */
	this.opcaoSelecionada = function () {
		var options = ["pedra", "papel", "tesoura"];
        if (this.playerType) {
        	return "";	
        }else{
        	return options[Math.floor((Math.random() * 3))];
        }
    };
}

/* Desabilita a tela do jogo e abilita a tela de formulário */
function sairJogo(){
	document.getElementById("telaInicial").style.display = "block";
	document.getElementById("telaJogo").style.display = "none";			

	timeStop();
}


/* Começa um no jogo apartir do zero e retoma o jogo do qual o jogador saiu */
function novoJogo() {

	/* Reinicializa as variáveis do jogo */
	player = new Jogador(document.getElementById("playerName").value, document.getElementById("playerSexo").value, true);
	pcPont = 0;
	playerPont = 0;
	player = new Jogador("","", true);
	PC = new Jogador("","", false);
	gameTime = {"h":0, "m":0,"s":0};
	partidaStart = {"h":0, "m":0,"s":0};
	timeCounter = setInterval(timeAdd, 1000);
	gameRounds = 0;
	player.name = document.getElementById("playerName").value;

	/* Desabilita as outras telas e abilita a tela do jogo */
	document.getElementById("telaInicial").style.display = "none";
	document.getElementById("scoresTable").style.display = "none";
	document.getElementById("telaJogo").style.display = "block";

	/* Reseta o formulário */
	$("#playerInfo").trigger('reset');
	
	/* Verifica se há partidas jogadas */
	if (typeof placar[0] !== 'undefined' && placar[0] !== null) {
		
		/* Verifica se o jogador já existe */
		if (hasInArray(placar) < 0) {
			/* Caso o jogador não exista ainda, ele é criado */
			placar[placar.length] = new Array(player.name, 0, 0, 0, gameTime);
		} else {
			/* Caso o jogador já exista, seus dados são carregados */
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
		}
	} else {
		/* Caso não haja partidas jogadas, a partida atual é adicionada */
		placar[placar.length] = new Array(player.name, 0, 0, 0, gameTime);
	}

	/* Seta os valores dos componentes visuais */
	$('#roundsShow').text("Partidas: "+gameRounds);
	$('#timeShow').text("Tempo: "+gameTime["h"]+":"+gameTime["m"]+":"+gameTime["s"]);
	$('#pcPontuation').text(pcPont);
	$('#playerPontuation').text(playerPont);
	$("#pPlacar").text(player.name);
}

/* Incrementa o tempo atual em 1 segundo */
function timeAdd() {
    gameTime["s"] += 1;

    /* Verifica se atingil 60 segundos */
    if (gameTime["s"] == 60) {
    	gameTime["s"] = 0;
    	gameTime["m"] += 1;

    	/* Verifica se atingil 60 minutos */
    	if (gameTime["m"] == 60) {
    		gameTime["m"] = 0;
    		gameTime["h"] += 1; 
    	}
    }

    /* Atualiza o tempo no placar */
    for (var i = 0; i < placar.length; i++) {
		if (placar[i][0] == player.name) {
			placar[i][4] = gameTime;
			break;
		}
	}

	/* Atualiza o tempo na tela de jogo */
	$('#timeShow').text("Tempo: "+gameTime["h"]+":"+gameTime["m"]+":"+gameTime["s"]);
}

/* Para o contador de tempo caso o jogador saia da partida */
function timeStop() {
    clearInterval(timeCounter);
}


/* Atualiza a tabela do placar */
function showScores(){
	/* Verifica se há partidas jogadas */
	if (typeof placar[0] !== 'undefined' && placar[0] !== null) {
		document.getElementById("telaInicial").style.display = "none";
		document.getElementById("telaJogo").style.display = "none";

		document.getElementById("scoresTable").style.display = "block";

		$('#mytable').empty();

		var str = "<tr style='background-color: #337ab7; color:white;'><th>Jogador</th><th>Pontuação</th><th>PC pontuação</th><th>Número de partidas</th><th>Tempo</th></tr>";		

		for (var i = 0, len = placar.length; i < len; i++) {
			str += "<tr style='background-color:#80aace; color:white;'><td data-toggle='collapse' data-target="+"#demo"+i+" class='collapsible' style='cursor:pointer;'>"+placar[i][0]+"</td><td>"+placar[i][1]+"</td><td>"+placar[i][2]+"</td><td>"+placar[i][3]+"</td><td>"+placar[i][4]['h']+":"+placar[i][4]['m']+":"+placar[i][4]['s']+"</td></tr>";

			str += "<tr class='collapse' id=demo"+i+"><td colspan='5'><div style='text-align:center;'>Detalhes das partidas, a coluna vermelha exibe os resultados das partidas</div>";

			if (typeof partidas[placar[i][0]] !== 'undefined' && partidas[placar[i][0]] !== null) {
				
				str += "<table><tr><th>Partida</th><th>"+placar[i][0]+"</th><th>PC</th><th style='background-color: red;'>Vencedor</th><th>Duração da partida</th></tr>";
				for (var j = 0; j < partidas[placar[i][0]].length; j++) {
					str += "<tr><td>"+(j+1)+"</td><td>"+partidas[placar[i][0]][j][0]+"</td><td>"+partidas[placar[i][0]][j][1]+"</td><td style='background-color: red;'>"+partidas[placar[i][0]][j][2]+"</td><td>"+partidas[placar[i][0]][j][3]+"</td></tr>";
				}
				str += "</table></div></td></tr>";	
			}else{
				str += "Não há partidas jogadas por esse jogador!</div></td></tr>";
			}
			
		}

		$('#mytable').append(str);

	}else{
		/* Se não houver partidas jogadas é emitido esse alerta */
		alert("Não há scores ainda!");
	}

}

/* Verifica se o jogador existe no placar */
function hasInArray(array) {	
	for (var i = array.length - 1; i >= 0; i--) {
		if (array[i][0] == player.name) {
			return i;
		}
	}
	return -1;
}


/* Abilita a tela inicial e desabilita as outras */
function backToInitial(){
	document.getElementById("telaJogo").style.display = "none";	
	document.getElementById("scoresTable").style.display = "none";
	document.getElementById("telaInicial").style.display = "block";
}

/* Verifica quem ganhou a partida e retorna o nome do vencedor ou "Empate" caso haja empate */
function Winner(value1, value2){
	if ( value1 == value2) {
		return "Empate";
	}else{
		if (value1 == "pedra") {
			if (value2 == "papel") {
				return "PC";
			}else{
				return player.name;
			}
		}else if (value1 == "papel") {
			if (value2 == "pedra") {
				return player.name;
			}else{
				return "PC";
			}
		}else if (value1 == "tesoura") {
			if (value2 == "papel") {
				return player.name;
			}else{
				return "PC";
			}
		}
	}

	return "";
}

/* Executa as jogadas dos jogadores e atualiza os resultados */
function jogada(clicked_id){
	if (document.getElementById("pedra").disabled == false) {
		var img = {"pedra":'img/pedra.png',
				   "papel":'img/papel.png',
			       "tesoura":'img/tesoura.png'
				  }

		var pcChoice = PC.opcaoSelecionada();

		$('#pcHandIMG').attr('src', img[pcChoice]); 
		$('#playerHandIMG').attr('src', img[clicked_id]);

		var pcResult = Winner(clicked_id, pcChoice);
		var playerResult = "";

		var audio = new Audio();

		if (pcResult == "PC") {
			pcResult = "Venceu";
			playerResult = "Perdeu";
			pcPont += 3;
			$('#pcHand > div > h2').css("color", "green");
			$('#playerHand > div > h2').css("color", "red");
			audio.src = "sounds/288900_felipejordani_jogo-de-luta-voz-do-apresentador_lose.mp3";
		}else if (pcResult == player.name) {
			pcResult = "Perdeu";
			playerResult = "Venceu";
			playerPont += 3;
			$('#pcHand > div > h2').css("color", "red");
			$('#playerHand > div > h2').css("color", "green");
			audio.src = "sounds/288900_felipejordani_jogo-de-luta-voz-do-apresentador_win.mp3";
		}else{
			playerResult = "Empate";
			$('#pcHand > div > h2').css("color", "blue");
			$('#playerHand > div > h2').css("color", "blue");	
			pcPont += 1;
			playerPont += 1;
			audio.src = "sounds/288900_felipejordani_jogo-de-luta-voz-do-apresentador_draw.mp3";
		}

		$('#pcPontuation').text(pcPont);
		$('#playerPontuation').text(playerPont);	
		$('#pcHand > div > h2').text(pcResult);
		$('#playerHand > div > h2').text(playerResult);
		
		audio.play();

		gameRounds += 1;


		$('#roundsShow').text("Partidas "+gameRounds);

		for (var i = 0; i < placar.length; i++) {
			if (placar[i][0] == player.name) {
				placar[i][1] = playerPont;
				placar[i][2] = pcPont;
				placar[i][3] = gameRounds;
				placar[i][4] = gameTime;
				break;
			}
		}

		

		var winner = "";

		if ($('#playerHand > div > h2').text() == "Venceu") {
			winner = player.name;
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

		if (typeof partidas[player.name] !== 'undefined' && partidas[player.name] !== null) {
			partidas[player.name].push([clicked_id, pcChoice, winner, horas+":"+minutos+":"+segundos]);
		}else{
			partidas[player.name] = Array([clicked_id, pcChoice, winner, horas+":"+minutos+":"+segundos]);
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