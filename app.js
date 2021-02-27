"use strict";

const emptyChar = "#";

function createGridOfNElements(size) {
  const myGrid = [...Array(size)].map((e) => Array(size).fill(emptyChar));
  return myGrid;
}

function randomLetters(length) {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const randomLetter = () => randomLetters(1);

function fillEmptyChars(matrix) {
  const grid = matrix.length;

  console.log(grid);

  let newMatrix = [];
  for (var i = 0; i < grid; i++) {
    newMatrix[i] = new Array(grid);
  }

  for (let i = 0; i <= grid - 1; i++) {
    for (let j = 0; j <= grid - 1; j++) {
      if (matrix[i][j] == emptyChar) {
        newMatrix[i][j] = randomLetter().toUpperCase();
      } else {
        newMatrix[i][j] = matrix[i][j];
      }
    }
  }
  return newMatrix;
}

//  ------------ INSERTION ------------ //

function validateHorizontalInsertion(arr, str, col) {
  // if str does not fit in the grid, return.
  if (!(str.length <= arr.length - col)) return false;

  const colRange = col + str.length;
  const arrPortion = arr.slice(col, colRange);
  for (const [i, char] of arrPortion.entries()) {
    if (!(char === emptyChar || char === str[i])) {
      return false;
    }
    return true;
  }
}

const insertHorizontal = (matrix, str, row, col) => {
  console.log(`Horizontal insertion of -${str}- on row ${row} and col ${col}`);

  if (!validateHorizontalInsertion(matrix[row], str, col)) return matrix;

  let newMatrix = [...matrix];
  newMatrix[row].splice(col, str.length, ...[...str]);

  return newMatrix;
};

function validateVerticalInsertion(matrix, str, row, col) {
  // if str does not fit in the grid, return.
  if (!(str.length <= matrix.length - row)) return false;

  const rowRange = row + str.length;
  const rows = matrix.slice(row, rowRange);

  for (const [i, row] of rows.entries()) {
    if (!(row[col] === emptyChar || row[col] === str[i])) {
      return false;
    }
  }

  return true;
}

function insertVertical(matrix, str, row, col) {
  console.log(`Vertical insertion of -${str}- on row ${row} and col ${col}`);

  if (!validateVerticalInsertion(matrix, str, row, col)) return false;

  const newMatrix = [...matrix];

  const rowRange = row + str.length;
  const rows = newMatrix.slice(row, rowRange);
  rows.forEach((row, i) => row.splice(col, 1, str[i]));

  return newMatrix;
}

function validateDiagonalDownInsertion(matrix, str, row, col) {
  const matrixSize = matrix.length;
  // if str does not fit in the grid, return.
  if (!(str.length <= matrixSize - col && str.length <= matrixSize - row))
    return false;

  const rowRange = row + str.length;
  const rows = matrix.slice(row, rowRange);

  for (const [i, row] of rows.entries()) {
    if (!(row[col] === emptyChar || row[col] === str[i])) {
      return false;
    }
    col++;
  }
  return true;
}

function insertDiagonalDown(matrix, str, row, col) {
  console.log(
    `Diagonal down insertion of -${str}- on row ${row} and col ${col}`
  );

  if (!validateDiagonalDownInsertion(matrix, str, row, col)) return matrix;

  const newMatrix = [...matrix];

  const rowRange = row + str.length;

  const rows = newMatrix.slice(row, rowRange);

  rows.forEach(function (arr, i) {
    arr.splice(col, 1, str[i]);
    col++;
  });

  return newMatrix;
}

function validateDiagonalUpInsertion(matrix, str, row, col) {
  const matrixSize = matrix.length;

  if (!(str.length <= matrixSize - col && str.length - 1 <= row)) return false;

  const rowInfLimit = row + 1 - str.length;
  const rows = matrix.slice(rowInfLimit, row + rowInfLimit);

  const reversedStr = reverse(str);

  let initCol = col - 1 + str.length;
  for (const [i, row] of rows.entries()) {
    console.log(i, row, row[initCol], reversedStr[i]);
    if (!(row[initCol] === emptyChar || row[initCol] === reversedStr[i])) {
      return false;
    }
    initCol--;
  }

  return true;
}

function insertDiagonalUp(matrix, str, row, col) {
  console.log(`Diagonal up insertion of -${str}- on row ${row} and col ${col}`);

  if (!validateDiagonalUpInsertion(matrix, str, row, col)) return matrix;

  const newMatrix = [...matrix];

  const rowInfLimit = row + 1 - str.length;
  const rows = newMatrix.slice(rowInfLimit, row + rowInfLimit);

  const reversedStr = reverse(str);

  let initCol = col - 1 + str.length;
  rows.forEach((arr, i) => {
    arr.splice(initCol, 1, reversedStr[i]);
    initCol--;
  });

  return newMatrix;
}

// ------- UTILITIES ------- //

function toUpper(values) {
  let newValues = [];
  values.forEach((v) => {
    newValues = [...newValues, v.toUpperCase()];
  });
  return newValues;
}

function getValidValues(grid, values) {
  let newValues = [];
  values.forEach((v) => {
    if (v.length <= grid) {
      newValues = [...newValues, v];
    }
  });
  return newValues;
}

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function reverse(s) {
  return s.split("").reverse().join("");
}

function reverseSomeRandomValues(values) {
  let newValues = [];
  values.forEach((v) => {
    //value 0 or 1
    let r = Math.round(Math.random());
    if (r === 1) {
      newValues.push(reverse(v));
    } else {
      newValues.push(v);
    }
  });
  return newValues;
}

// --------- RANDOM INSERTION VALUES --------- //

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColForHorizontal(grid, value) {
  return Math.round(Math.random() * (grid - value.length));
}
function randomRowForHorizonal(grid) {
  return Math.round(Math.random() * (grid - 1));
}
function randomColForVertical(grid) {
  return Math.round(Math.random() * (grid - 1));
}
function randomRowForVertical(grid, value) {
  return Math.round(Math.random() * (grid - value.length));
}
function randomColForDiagonalDown(grid, value) {
  return Math.round(Math.random() * (grid - value.length));
}
function randomRowForDiagonalDown(grid, value) {
  return Math.round(Math.random() * (grid - value.length));
}
function randomColForDiagonalUp(grid, value) {
  return Math.round(Math.random() * (grid - value.length));
}
function randomRowForDiagonalUp(grid, value) {
  return randomIntFromInterval(value.length - 1, grid - 1);
}

function getRandomInsertionMode(randomNumber) {
  switch (randomNumber) {
    case 0:
      return insertHorizontal;
    case 1:
      return insertVertical;
    case 2:
      return insertDiagonalDown;
    case 3:
      return insertDiagonalUp;
  }
}

function getRandomCol(randomNumber) {
  switch (randomNumber) {
    case 0:
      return randomColForHorizontal;
      break;
    case 1:
      return randomColForVertical;
      break;
    case 2:
      return randomColForDiagonalDown;
      break;
    case 3:
      return randomColForDiagonalUp;
      break;
  }
}

function getRandomRow(randomNumber) {
  switch (randomNumber) {
    case 0:
      return randomRowForHorizonal;
      break;
    case 1:
      return randomRowForVertical;
      break;
    case 2:
      return randomRowForDiagonalDown;
      break;
    case 3:
      return randomRowForDiagonalUp;
      break;
  }
}

// ---------- MAIN FUNCTION ---------- //

function createSoup(grid, values) {
  let s = createGridOfNElements(grid);

  // All values to upper case
  const upperValues = toUpper(values);
  // Only values that fit on the matrix
  const validValues = getValidValues(grid, upperValues);
  // Shuffle values
  const shuffleValues = shuffle(validValues);
  // Reverse some values
  const reversedValues = reverseSomeRandomValues(shuffleValues);
  // Get only some values to make sure they'll fit on the matrix
  const limitValues = reversedValues.slice(0, grid / 1.2);

  let index = 0;
  let vueltas = 0;

  let erased = [];

  while (limitValues.length > 0 && vueltas != 200) {
    console.log("Elementos restantes: ", limitValues);
    // console.log('Elementos borrados: ', erased);
    console.log("Ronda nº:", vueltas);

    let v = limitValues[index];
    console.log("Elemento a insertar:", v);

    //value 0, 1, 2 or 3;
    let r = Math.round(Math.random() * 3);

    if (
      getRandomInsertionMode(r)(
        s,
        v,
        getRandomRow(r)(grid, v),
        getRandomCol(r)(grid, v)
      )
    ) {
      // erased.push(limitValues.splice(index,1));
      limitValues.splice(index, 1);
      console.log("Exito!!");
    } else {
      console.log("No se pudo..");
    }

    vueltas++;
    index++;

    if (index >= limitValues.length) {
      index = 0;
    }
    console.log(s);
  }

  // llenar espacios vacios con letras random
  ultimateSoup = fillEmptyChars(s);

  return ultimateSoup;
}

const values = [
  "pedro",
  "selene",
  "gaston",
  "tomas",
  "eugenia",
  "maria",
  "santiago",
  "gregorio",
  "victoria",
  "alberto",
  "antonella",
  "robertino",
  "guadalupe",
  "conrado",
  "javier",
  "angeles",
  "nicolas",
  "ulito",
  "mauricio",
];

let e = createGridOfNElements(9);

e = insertVertical(e, "eugenias", 0, 0);
// e = insertVertical(e, "otomos", 0, 4);
// e = insertVertical(e, "otomos", 3, 4);
// e = insertVertical(e, "moses", 3, 4);
// console.log(e);

e = insertHorizontal(e, "gaston", 1, 0);
e = insertHorizontal(e, "ogastonios", 1, 0);
e = insertHorizontal(e, "gas", 1, 5);
e = insertHorizontal(e, "gastonio", 2, 0);

insertDiagonalDown(e, "eugenia", 1, 1);
insertDiagonalDown(e, "seugenia", 0, 0);
insertDiagonalDown(e, "geniasa", 3, 3);

// checking overlaps:
// insertHorizontal(e, 'pepipo', 3, 3);
// insertDiagonalDown(e, 'pepipo', 3, 3 );
// insertVertical(e, 'pepipo', 1, 5);

e = insertDiagonalDown(e, "tomas", 2, 3);
e = insertDiagonalDown(e, "sara", 2, 2);
e = insertDiagonalDown(e, "ana", 5, 5);

// insertDiagonalUp(e, 'javier', 7, 0);
// e = insertDiagonalUp(e, "javi", 7, 0);
e = insertDiagonalUp(e, "mozo", 4, 1);
e = insertDiagonalUp(e, "moto", 4, 1);
console.log("");
console.log(e);

// for (let i = 9, j = 5; i >= 5 || j <= 10; i--, j++) {
//     console.log(i, j);
// };

// s = createSoup(13, values);
// console.log(s);
