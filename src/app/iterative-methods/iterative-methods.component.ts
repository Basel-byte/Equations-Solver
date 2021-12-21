import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iterative-methods',
  templateUrl: './iterative-methods.component.html',
  styleUrls: ['./iterative-methods.component.css']
})
export class IterativeMethodsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  jacobiMethod(a: number[][], intialGuess: number[], noOfIterations: number, eTolerance: number, precis: number) {
    let jacobiMethodResults = new Array<Array<number>>()
    jacobiMethodResults.push(intialGuess)
    let tempArray = new Array<number>(intialGuess.length)
    let relativeError = eTolerance
    if (noOfIterations != -1) {
      for (let count = 0; count < noOfIterations; count++) {
        console.log(intialGuess)
        for (let i = 0; i < intialGuess.length; i++) {
          tempArray[i] = 0
          for (let j = 0; j < intialGuess.length; j++) {
            if (j != i) {
              console.log(a[i][j] * intialGuess[j])
              tempArray[i] += a[i][j] * intialGuess[j]
            }
          }
          tempArray[i] = (a[i][a[0].length - 1] - tempArray[i]) / a[i][i]
          if (count == noOfIterations - 1)
            tempArray[i] = Number(tempArray[i].toPrecision(precis))
        }
        intialGuess = Array.from(tempArray)
        jacobiMethodResults.push(intialGuess)
      }
    } else {
      while (relativeError >= eTolerance) {
        console.log(intialGuess)
        relativeError = 0
        for (let i = 0; i < intialGuess.length; i++) {
          tempArray[i] = 0
          for (let j = 0; j < intialGuess.length; j++) {
            if (j != i) {
              console.log(a[i][j] * intialGuess[j])
              tempArray[i] += a[i][j] * intialGuess[j]
            }
          }
          tempArray[i] = (a[i][a[0].length - 1] - tempArray[i]) / a[i][i]
          relativeError = Math.max(relativeError, (tempArray[i] - intialGuess[i]) / tempArray[i] * 100)
          if (relativeError < eTolerance)
            tempArray[i] = Number(tempArray[i].toPrecision(precis))
        }
        intialGuess = Array.from(tempArray)
        jacobiMethodResults.push(intialGuess)
      }


    }
    console.log(jacobiMethodResults)
    return jacobiMethodResults
  }

  gaussSiedel(a: number[][], intialGuess: number[], noOfIterations: number, eTolerance: number, precis: number) {
    let gaussSiedelResults = new Array<Array<number>>()
    gaussSiedelResults.push(intialGuess)
    let relativeError = eTolerance
    let tempArray
    if (noOfIterations != -1) {
      for (let count = 0; count < noOfIterations; count++) {
        tempArray = Array.from(intialGuess)
        console.log(intialGuess)
        for (let i = 0; i < intialGuess.length; i++) {
          tempArray[i] = 0
          for (let j = 0; j < intialGuess.length; j++) {
            if (j != i) {
              console.log(a[i][j] * tempArray[j])
              tempArray[i] += a[i][j] * tempArray[j]
            }
          }
          tempArray[i] = (a[i][a[0].length - 1] - tempArray[i]) / a[i][i]
          if (count == noOfIterations - 1)
            tempArray[i] = Number(tempArray[i].toPrecision(precis))
        }
        intialGuess = Array.from(tempArray)
        gaussSiedelResults.push(intialGuess)
      }
    } else {
      while (relativeError >= eTolerance) {
        console.log(intialGuess)
        relativeError = 0
        tempArray = Array.from(intialGuess)
        for (let i = 0; i < intialGuess.length; i++) {
          tempArray[i] = 0
          for (let j = 0; j < intialGuess.length; j++) {
            if (j != i) {
              console.log(a[i][j] * tempArray[j])
              tempArray[i] += a[i][j] * tempArray[j]
            }
          }
          tempArray[i] = (a[i][a[0].length - 1] - tempArray[i]) / a[i][i]
          relativeError = Math.max(relativeError, (tempArray[i] - intialGuess[i]) / tempArray[i] * 100)
          if (relativeError < eTolerance)
            tempArray[i] = Number(tempArray[i].toPrecision(precis))
        }
        intialGuess = Array.from(tempArray)
        gaussSiedelResults.push(intialGuess)
      }

    }
    console.log(gaussSiedelResults)
    return gaussSiedelResults
  }

}
