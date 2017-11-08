		

		var pcPont = 0;
		var playerPont = 0;

		var pName = '';

		var placar = new Array();

		var players = {};

		var partidas = {};

		function Jogador(_nome, _sexo, _tipoJogador) {
			this.Nome = _nome;
			this.Sexo = _sexo;
			this.TipoJogador = _tipoJogador;
		}

		function sairJogo(){
			document.getElementById("telaInicial").style.display = "block";

			document.getElementById("telaJogo").style.display = "none";			
		}


		function novoJogo() {
			players[document.getElementById("playerName").value] = new Jogador(document.getElementById("playerName").value, document.getElementById("playerSexo").value, true);

			pcPont = 0;
			playerPont = 0;

			pName = '';
			
			pName = document.getElementById("playerName").value;

			document.getElementById("telaInicial").style.display = "none";
			document.getElementById("scoresTable").style.display = "none";

			document.getElementById("telaJogo").style.display = "block";

			$("#playerInfo").trigger('reset');
			

			if (typeof placar[pName] !== 'undefined' && placar[pName] !== null) {
				if (placar.forEach(hasInArray) == false) {
					$("#pPlacar").text(pName);
					placar[pName] = new Array(pName, 0, 0);

					$('#pcPontuation').text(0);
					$('#playerPontuation').text(0);
				}
				else {
					playerPont = placar[pName][1];
					pcPont = placar[pName][2];

					$('#pcPontuation').text(pcPont);
					$('#playerPontuation').text(playerPont);
				}
			} else {
				$("#pPlacar").text(pName);
				placar[pName] = new Array(pName, 0, 0);

				$('#pcPontuation').text(0);
				$('#playerPontuation').text(0);
			}
		}

		function showScores(){

			if (typeof placar[pName] !== 'undefined' && placar[pName] !== null) {
				document.getElementById("telaInicial").style.display = "none";
				document.getElementById("telaJogo").style.display = "none";

				document.getElementById("scoresTable").style.display = "block";

				placar.forEach(insertRows());
			}else{
				alert("Não há scores ainda!");
			}

		}


		function insertRows(item, index) {	
			$('#mytable').find('tbody').append("<tr><td>"+item[item.name][0]+"</td><td>"+item[item.name][1]+"</td><td>"+item[item.name][2]+"</td></tr>"); 
		}


		function hasInArray(item, index) {	
			if (item.name == pName) {
				return true;
			}

			return false;
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

			placar[pName][1] = playerPont;
			placar[pName][2] = pcPont;

			var options = ["pedra", "papel", "tesoura"];

			partidas[pName] = new Array(clicked_id, options[pcPlay-1])

		}