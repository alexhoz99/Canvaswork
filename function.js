
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');

//Aquí defino la función del circulo y sus variables
function Circle(x, y, dx, dy, radius) {
    this.x = x;  // eje x
    this.y = y;  // eje y
    this.dx = dx; // x velocidad
    this.dy = dy; // y velocidad
    this.radius = radius; // radio del circulo (tamaño)

    this.draw = function () {
        context.beginPath(); //crea una nueva ruta para dibujar y editar el estilo
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.strokeStyle = 'blue';
        context.stroke();
        context.fillStyle = 'red';
        context.fill();
    
    }

    //Esta función lo que hace es que con unos condicionales asignemos el punto donde la bola choca con el hancho y el alto y así cambiar el rumbo
    //llama a una función, que tiene dos condicionales(if)S
    this.update = function () {
        // si x + el radio > innerWidth o x - el radio < 0 entonces this.dx = this.dx
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        // si y + el radio > innerHeight o y - el radio < 0 entonces this.dy = this.dy
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }

}

var circleArray = [];
//for (var i=0; i<100;i++) { 
//lo que hace es que va a recorrer el bucle hasta que la i valga 100, teniendo un valor inicial de 0 e incrememntando en uno 
for (var i = 0; i < 50; i++) { //cantidad de bolas 
    var radius = 30; //tamaño de la bola
    var x = Math.random() * (innerWidth - radius * 2) + radius; // zona de spawn izquierda, derecha
    var y = Math.random() * (innerHeight - radius * 2) + radius; //zona de spawn arriba, abajo
    var dx = (Math.random() - 0.5);  //velocidad movimiento hacía la izquierda y derecha
    var dy = (Math.random() - 0.5); //velocidad movimiento arriba y abajo 
    circleArray.push(new Circle(x, y, dx, dy, radius)); // ejecuta nuevos circulas en diferentes valores para que se muevan en direcciones
  //diferentes y nueva localización
}

function animate() { // Función que anima a las bolas
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
animate();


