export default function getLevenshteinDistance(searchedString: string, actualString: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i < searchedString.length + 1; i++) {
    matrix[i] = [];
    for (let j = 0; j < actualString.length + 1; j++) {
      if (i > 0) {
        matrix[i][j] = i;
        break;
      }
      if (matrix[0][0] === matrix[i][j]) matrix[i][j] = 0;
      else matrix[i][j] = j;
    }
  }

  for (let i = 1; i <= searchedString.length; i++) {
    for (let j = 1; j <= actualString.length; j++) {
      if (searchedString[j - 1] === actualString[i - 1]) matrix[i][j] = matrix[i - 1][j - 1];
      else {
        let editValue = 0;
        let previousValue = matrix[i][j - 1]; // Delete operation
        let diagonalValue = matrix[i - 1][j - 1]; // Replace operation
        let upperValue = matrix[i - 1][j]; // Insert operation

        if (previousValue < diagonalValue && previousValue < upperValue) editValue = previousValue;
        else if (diagonalValue < previousValue && diagonalValue < upperValue) editValue = diagonalValue;
        else editValue = upperValue;

        matrix[i][j] = editValue + 1;
      }
    }
  }
  // console.log(matrix);
  return matrix[searchedString.length][actualString.length];
}
