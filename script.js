const canvas = document.getElementById("meuCanvas");
const ctx = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Variáveis X
const xArrayValues = [10, 30, 20, 40, 50, 60];
const xSortedArray = [...xArrayValues].sort((a, b) => a - b);

const startValueX = 100;
const endValueX = 700;
const stepX = (endValueX - startValueX) / (xSortedArray.length - 1);

// Posiciona os valores no eixo X
const xArrayPositions = xSortedArray.map(
  (_, index) => startValueX + index * stepX
);

// Ajusta a ordem do xArray
const xArray = xArrayValues.map((value) => {
  const sortedIndex = xSortedArray.indexOf(value);
  return xArrayPositions[sortedIndex];
});

// Variáveis Y
const yArrayValues = [10, 20, 30, 40, 50, 60];
const ySortedArray = [...yArrayValues].sort((a, b) => a - b);

const startValueY = 450;
const endValueY = 50;
const stepY = (startValueY - endValueY) / (ySortedArray.length - 1);

// Posiciona os valores no eixo Y
const yArrayPositions = ySortedArray.map(
  (_, index) => startValueY - index * stepY
);

// Ajusta a ordem do yArray
const yArray = yArrayValues.map((value) => {
  const sortedIndex = ySortedArray.indexOf(value);
  return yArrayPositions[sortedIndex];
});

function main() {
  drawGraphic();
  drawValuesLabel(xArrayPositions, yArray, xSortedArray);
  drawValues(xArray, yArray);
}

function drawGraphic() {
  // Eixo X
  ctx.beginPath();
  ctx.strokeStyle = "gray";
  ctx.moveTo(canvasWidth / 2 - 300, (canvasHeight * 3) / 4);
  ctx.lineTo(canvasWidth / 2 + 300, (canvasHeight * 3) / 4);
  ctx.stroke();

  // Seta Eixo X
  ctx.beginPath();
  ctx.strokeStyle = "gray";
  ctx.moveTo(canvasWidth / 2 + 300, (canvasHeight * 3) / 4);
  ctx.lineTo(canvasWidth / 2 + 280, (canvasHeight * 3) / 4 - 10);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "gray";
  ctx.moveTo(canvasWidth / 2 + 300, (canvasHeight * 3) / 4);
  ctx.lineTo(canvasWidth / 2 + 280, (canvasHeight * 3) / 4 + 10);
  ctx.stroke();

  // Eixo Y
  ctx.beginPath();
  ctx.strokeStyle = "gray";
  ctx.moveTo(canvasWidth / 2 - 300, (canvasHeight * 3) / 4);
  ctx.lineTo(canvasWidth / 2 - 300, canvasHeight / 4 - 100);
  ctx.stroke();

  // Seta Eixo Y
  ctx.beginPath();
  ctx.strokeStyle = "gray";
  ctx.moveTo(canvasWidth / 2 - 300, canvasHeight / 4 - 100);
  ctx.lineTo(canvasWidth / 2 - 290, canvasHeight / 4 - 80);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "gray";
  ctx.moveTo(canvasWidth / 2 - 300, canvasHeight / 4 - 100);
  ctx.lineTo(canvasWidth / 2 - 310, canvasHeight / 4 - 80);
  ctx.stroke();
}

function drawPoint(x, y, size = 2) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
}

function drawPath(xStart, yStart, xEnd, yEnd) {
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.moveTo(xStart, yStart);
  ctx.lineTo(xEnd, yEnd);
  ctx.stroke();
}

function drawValuesLabel(x, y, xValues) {
  if (x.length !== y.length) {
    alert("Erro: Os arrays 'x' e 'y' devem ter o mesmo comprimento.");
  }

  for (let j = 0; j <= x.length; j++) {
    ctx.beginPath();
    ctx.strokeStyle = "gray";
    ctx.moveTo(x[j], (canvasHeight * 3) / 4);
    ctx.lineTo(x[j], (canvasHeight * 3) / 4 + 10);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(xValues[j], x[j], (canvasHeight * 3) / 4 + 25);
  }
}

function drawValues(x, y) {
  if (x.length !== y.length) {
    alert("Erro: Os arrays 'x' e 'y' devem ter o mesmo comprimento.");
  }

  // Definir os limites do gráfico (espaço utilizável no canvas)
  const canvasStartX = canvasWidth / 2 - 300;
  const canvasEndX = canvasWidth / 2 + 300;
  const canvasStartY = canvasHeight / 4 - 100;
  const canvasEndY = (canvasHeight * 3) / 4;

  // Encontrar os limites mínimos e máximos nos arrays
  const minXvalue = Math.min(...x);
  const maxXvalue = Math.max(...x);
  const minYvalue = Math.min(...y);
  const maxYvalue = Math.max(...y);

  // Encontrar Limites do Gráfico
  const xLimit = canvasWidth / 2 - 300;
  const yLimit = (canvasHeight * 3) / 4;

  for (let i = 0; i < x.length; i++) {
    drawPoint(x[i], y[i]);
    if (i === x.length - 1) {
      continue;
    }

    if (
      x[i] < xLimit ||
      x[i] > canvasWidth / 2 + 300 ||
      y[i] > yLimit ||
      y[i] < canvasHeight / 4 - 100 ||
      x[i + 1] < xLimit ||
      x[i + 1] > canvasWidth / 2 + 300 ||
      y[i + 1] > yLimit ||
      y[i + 1] < canvasHeight / 4 - 100
    ) {
      alert(
        "Pontos fora dos limites: \n" +
          "x[i]: " +
          x[i] +
          ", y[i]: " +
          y[i] +
          "\n" +
          "x[i+1]: " +
          x[i + 1] +
          ", y[i+1]: " +
          y[i + 1]
      );
      break;
    }

    drawPath(x[i], y[i], x[i + 1], y[i + 1]);
  }
}

main();
