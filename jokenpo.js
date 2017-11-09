		

		var pcPont = 0;
		var playerPont = 0;

		var pName = '';

		var placar = new Array();

		var players = {};

		var partidas = {};

		var gameTime = 0;

		var gameRounds = 0;

		var timeCounter;

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

			gameTime = 0;

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
					placar[placar.length] = new Array(pName, 0, 0, 0, 0);

					$('#roundsShow').text("Partidas: 0");
					$('#timeShow').text("Tempo: 0");
					$('#pcPontuation').text(0);
					$('#playerPontuation').text(0);
				}
				else {

					var i = hasInArray(placar);
					playerPont = placar[i][1];
					pcPont = placar[i][2];
					gameRounds = placar[i][3];
					gameTime = placar[i][4];
					

					$('#roundsShow').text("Partidas: "+gameTime);
					$('#timeShow').text("Tempo: "+gameTime);
					$('#pcPontuation').text(pcPont);
					$('#playerPontuation').text(playerPont);

				}
			} else {
				$("#pPlacar").text(pName);
				placar[placar.length] = new Array(pName, 0, 0, 0, 0);

				$('#roundsShow').text("Partidas: 0");
				$('#timeShow').text("Tempo: 0");
				$('#pcPontuation').text(0);
				$('#playerPontuation').text(0);
			}

		}

		function timeAdd() {
		    gameTime += 1;

		    for (var i = 0; i < placar.length; i++) {
				if (placar[i][0] == pName) {
					placar[i][4] = gameTime;
					break;
				}
			}

			$('#timeShow').text("Tempo: "+gameTime);
		}

		function timeStop() {
		    clearInterval(timeCounter);
		}

		function showScores(){

			if (typeof placar[0] !== 'undefined' && placar[0] !== null) {
				document.getElementById("telaInicial").style.display = "none";
				document.getElementById("telaJogo").style.display = "none";

				document.getElementById("scoresTable").style.display = "block";

				$('#mytable > tbody >tr').remove();

				for (var i = 0, len = placar.length; i < len; i++) {
				  $('#mytable').find('tbody').append("<tr><td>"+placar[i][0]+"</td><td>"+placar[i][1]+"</td><td>"+placar[i][2]+"</td><td>"+placar[i][3]+"</td><td>"+placar[i][4]+"</td></tr>");
				}

				//placar.forEach(insertRows);
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
			pcPlay = Math.floor((Math.random() * 3) + 1);

			if (pcPlay == 1) {
				$('#pcHand').attr('src', 'img/pedra.png'); 
			} else if (pcPlay == 2) {
				$('#pcHand').attr('src', 'img/papel.png');
			} else if (pcPlay == 3) {
				$('#pcHand').attr('src', 'img/tesoura.png');
			}

			if (clicked_id == 'pedra') {
				$('#playerHand').attr('src', 'img/pedra.png'); 
			} else if (clicked_id == 'papel') {
				$('#playerHand').attr('src', 'img/papel.png');
			} else if (clicked_id == 'tesoura') {
				$('#playerHand').attr('src', 'img/tesoura.png');
			}

			if (pcPlay == 1) {
				if (clicked_id == "pedra") {
					pcPont += 1;
					$('#pcPontuation').text(pcPont);	
					playerPont += 1;
					$('#playerPontuation').text(playerPont);	
				}else if (clicked_id == 'papel') {
					playerPont += 3;
					$('#playerPontuation').text(playerPont);	
				} else if (clicked_id == 'tesoura') {
					pcPont += 3;
					$('#pcPontuation').text(pcPont);	
				}				
			}else if (pcPlay == 2) {
				if (clicked_id == 'pedra') {
					pcPont += 3;
					$('#pcPontuation').text(pcPont);	
				}else if (clicked_id == 'papel') {
					pcPont += 1;
					$('#pcPontuation').text(pcPont);	
					playerPont += 1;
					$('#playerPontuation').text(playerPont);	
				} else if (clicked_id == 'tesoura') {
					playerPont += 3;
					$('#playerPontuation').text(playerPont);	
				}
			} else if (pcPlay == 3) {
				if (clicked_id == 'pedra') {
					playerPont += 3;
					$('#playerPontuation').text(playerPont);	
				}else if (clicked_id == 'papel') {
					pcPont += 3;
					$('#pcPontuation').text(pcPont);	
				} else if (clicked_id == 'tesoura') {
					pcPont += 1;
					$('#pcPontuation').text(pcPont);	
					playerPont += 1;
					$('#playerPontuation').text(playerPont);	
				}
			}

			gameRounds += 1;


			$('#roundsShow').text(gameRounds);

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

			partidas[pName] = new Array(clicked_id, options[pcPlay-1])

		}