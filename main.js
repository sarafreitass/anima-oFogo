//Visual: 
// Visual Designer: Sara
// Referência: https://openprocessing.org/sketch/757060
// Fenômeno associado: Os piores incêndios florestais do Brasil em 2022.
/* Proposta poética: A representação do modelo se mostra quase como uma pintura, demonstrada por cores fortes e locais de movimentos
bem determinados por suas partículas, levando em consideração a base de dados que utiliza variáveis como localização (refletida na 
composição pelo espaço da tela que a partícula ocupa) e intensidade do fogo (refletida na composição pela cor da partícula), a 
representação demonstrou-se ideal para enfatizar a sensação de vários incêndios interagindo e existindo no mesmo espaço.*/

// Sonoro:
// Sound designer: 
// Referência: <link, algoritmo…
// Fenômeno 
// Proposta poética: 


p5.disableFriendlyErrors = true; // disables FES, significant speed up
p5.Vector.distSq = (v, u) => Math.pow(v.x - u.x, 2) + Math.pow(v.y - u.y, 2);

var intensity; 
var colors = [];
var particles=[];
var particleAdded = [];
var maxBrightness;
let createParticleDelay = 1; // Tempo de atraso entre a criação de cada partícula
let lastParticleCreatedTime = 0; // Armazena o tempo da última partícula criada
let organizedParticles = [];
var controlador = 0;
let particleIndex = 0; // Variável para controlar a partícula a ser desenhada
var minValueFRP = 0;
var maxValueFRP = 0;



function preload() {
	//my table is comma separated value "csv"
	//and has a header specifying the columns labels
	table = loadTable('modis_2022_Brazil_filtro.csv', 'csv', 'header');
}

let scale = 0.05;

function setup() {
	
	// Obtenha o maior valor de brilho
	maxBrightness = float(table.getString(0, 'brightness'));
	// Imprimir o valor de maxBrightness no console
	console.log("O valor de maxBrightness é: " + maxBrightness);
	//organizeParticlesByDate();
	createCanvas(windowWidth, windowHeight);

	/*for (const record of records) {
		const frp = parseFloat(record.frp); // Supondo que 'frp' é o nome da coluna no CSV
	  
		if (!isNaN(frp)) { // Certifique-se de que o valor de frp seja numérico
		  if (frp < minValue) {
			minValueFRP = frp; // Novo valor mínimo encontrado
		  }
		  if (frp > maxValue) {
			maxValueFRP = frp; // Novo valor máximo encontrado
		  }
		}
	  }*/

	for (let k = 0; k < table.getRowCount(); k++) {
			
		// Cálculo da intensidade com base no valor de brilho
		const brightnessValue = float(table.getString(k, 'brightness'));
		//const intensity = map(brightnessValue, 0, maxBrightness, 1, 3);
		const intensity = map(brightnessValue, 0, maxBrightness, 1, 2);
		
		/*if (intensity >= 0 && intensity < 1) {
			colors = ["#231858", "#260C90", "#0066C7", "#33FFC9", "#0FFF8E"];  //tons de azul
		  } else if (intensity >= 1 && intensity < 2) {
			colors = ["#4E1858", "#690C90", "#8400C7", "#F033FF", "#AB0FFF"]; //tons de roxo
		  } else if (intensity >= 2 && intensity < 3) {
			colors = ["#581845", "#900C3F", "#C70039", "#FF5733", "#FFC30F"]; //tons alaranjados
		  } else {
			colors = ["#585618", "#90790C", "#C7BF00", "#FFF533", "#FFC30F"]; //tons alaranjados
		  }*/

		  if (intensity >= 1 && intensity < 1.3) {
			colors = ["#231858", "#260C90", "#0066C7", "#33FFC9", "#0FFF8E"];  //tons de azul
		  } else if (intensity >= 1.3 && intensity < 1.6) {
			colors = ["#4E1858", "#690C90", "#8400C7", "#F033FF", "#AB0FFF"]; //tons de roxo
		  } else if (intensity >= 1.6 && intensity < 1.9) {
			colors = ["#581845", "#900C3F", "#C70039", "#FF5733", "#FFC30F"]; //tons alaranjados
		  } else if (intensity >= 1.9 && intensity <= 2){
			colors = ["#585618", "#90790C", "#C7BF00", "#FFF533", "#FFC30F"]; //tons alaranjados
		  }

	console.log(intensity);
		  
	pos_x = ((int(table.getString(k, 1)) - (-38.86))/(-73.99 - (-38.86)))*windowWidth
	pos_y = ((int(table.getString(k, 0)) - (-28.63))/(5.29 - (-28.63)))*windowHeight
	date = table.getString(k, 'acq_date');
	frp = table.getString(k, 'frp');
	//var normalizedFrp = (frp - minValueFRP) / (maxValueFRP - minValueFRP) * (10 - 1) + 1; //escalona os valores de frp entre 1 e 10


	for (let i = 0; i < 10; i++) //cria uma particula na tela por incendio florestal
	//cria a ideia de pontos de dispersão a partir do ponto da tela e cresce aleatoriamente 
		particles.push(new Particle(pos_x - width / 2 + random(-100, 100), pos_y - height / 2 + random(-100, 100), date));
	}
	//organizar particles por data para os incendios aparecerem em ordem cronológica
		particles.sort((a, b) => a.date.localeCompare(b.date));


}

function draw() {
		// the color palette changes depending on the distance from the user's coordinates to a fire focus
		/*for (let k = 0; k < table.getRowCount(); k++) {
			
			// Cálculo da intensidade com base no valor de brilho
			const brightnessValue = float(table.getString(k, 'brightness'));
			const intensity = map(brightnessValue, 0, maxBrightness, 1, 3);
			
			if (intensity >= 0 && intensity < 1) {
				colors = ["#231858", "#260C90", "#0066C7", "#33FFC9", "#0FFF8E"];
			  } else if (intensity >= 1 && intensity < 2) {
				colors = ["#4E1858", "#690C90", "#8400C7", "#F033FF", "#AB0FFF"];
			  } else if (intensity >= 2 && intensity < 3) {
				colors = ["#581845", "#900C3F", "#C70039", "#FF5733", "#FFC30F"];
			  } else {
				colors = ["#585618", "#90790C", "#C7BF00", "#FFF533", "#FFC30F"];
			  }
			  
		pos_x = ((int(table.getString(k, 1)) - (-38.86))/(-73.99 - (-38.86)))*windowWidth
		pos_y = ((int(table.getString(k, 0)) - (-28.63))/(5.29 - (-28.63)))*windowHeight
		date = table.getString(k, 'acq_date');
		for (let i = 0; i < 1; i++) //cria uma particula na tela por incendio florestal
		//cria a ideia de pontos de dispersão a partir do ponto da tela e cresce aleatoriamente 
			particles.push(new Particle(pos_x - width / 2 + random(-100, 100), pos_y - height / 2 + random(-100, 100), date));
		}
		
		
		if (controlador == 0){
			//organizar particles por data para os incendios aparecerem em ordem cronológica
			particles.sort((a, b) => a.date.localeCompare(b.date));
			controlador = 1;
		}*/
		
		
		//for (const particle of organizedParticles) particle.update();
	/*if (millis() - lastParticleCreatedTime > createParticleDelay) {
		for (const particle of particles) particle.update();
		noStroke();
		fill("#1A06330A"); //cor da tela
		rect(0, 0, width, height);
		
		translate(width / 2, height / 2); //centralizar tudo
		//for (const particle of organizedParticles) particle.draw();
		// Crie uma partícula
		const curtime = millis();
		lastParticleCreatedTime = curtime;	

		for (const particle of particles) particle.draw();
	}*/


	  noStroke();
	  fill("#1A06330A"); // Cor da tela
	  //fill("#E0E0E0"); // Uma cor de cinza claro
	  rect(0, 0, width, height);
	
	  translate(width / 2, height / 2); // Centralize tudo
	  
	  for (const particle of particleAdded) particle.update();
	  for (const particle of particleAdded) particle.draw();
	  
	  const curParticle = particles[particleIndex];
	  //for (const particle of particles) particle.update();
	  
	  if (particleIndex < particles.length){
		  // Desenhe apenas a partícula atual
		  //quanto mais tempo vc der para a particula no createParticuleDelay mas ela vai se movimentar de forma bonita na tela
		  //vc pode mudar isso tbm no speed
		curParticle.update();
		curParticle.draw();
		particleAdded.push(particles[particleIndex]);
		if (millis() - lastParticleCreatedTime > createParticleDelay) {
		const curtime = millis();
		lastParticleCreatedTime = curtime;
		particleIndex++;
	}}
	
	  
	}
	

console.log(particles);

class Particle {
	constructor(x, y) {
		this.color = colors[Math.floor(random(colors.length))];
		this.pos = new p5.Vector(x, y);
		this.lastPos = new p5.Vector(x, y);
		//this.size = random(1, 5);
		this.size = random(3, 5);
		//this.speed = (random(0.1, 0.5) * (random() > 0.5 ? -1 : 1))*2;
		this.speed = (random(0.03, 0.1) * (random() > 0.1 ? -1 : 0.01))*2;
		//this.speed = 0.009;
		//adicionar novo atributo para organizar a lista por data
		this.date = date;
		this.frp = frp;
	}
	
	update() {
		this.lastPos.set(this.pos);
		this.pos.x += this.speed * Math.cos(this.pos.y * scale) * this.pos.x * scale;
		this.pos.y += this.speed * Math.sin(this.pos.x * scale) * this.pos.y * scale;
	}
	
	draw() {
		strokeWeight(this.size);
		stroke(this.color);
		line(this.pos.x, this.pos.y, this.lastPos.x, this.lastPos.y);
	}
}

