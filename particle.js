class Particle {
	constructor(x, y) {
		this.color = colors[Math.floor(random(colors.length))];
		this.pos = new p5.Vector(x, y);
		this.lastPos = new p5.Vector(x, y);
		this.size = random(1, 5);
		this.speed = (random(0.1, 0.5) * (random() > 0.5 ? -1 : 1))*2;
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
