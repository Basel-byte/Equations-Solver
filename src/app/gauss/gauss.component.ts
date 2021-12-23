import { Component, OnInit } from '@angular/core';
import {Hash} from "../hash";
@Component({
  selector: 'app-gauss',
  templateUrl: './gauss.component.html',
  styleUrls: ['./gauss.component.css']
})
export class GaussComponent implements OnInit {
  hash:Hash;
  precision!:number;
  answer=false;
  hid=false
  nw!: boolean;
  arr!:string[];
  uniqe=false
  inf=false
  noSolu=false
  show=false;
  solve!:number[][];
  solution!:number[]
  ElimnationTime=0;
  BacsubtutionTime=0;


  constructor() {
    this.hash=new Hash();
  }
  ngOnInit(): void {
  }
  // arr = new Array(3).fill(0)
  number = new Array(3).fill(0).map(() => new Array(5).fill(0));

  fun(){
    this.arr = new Array(this.hash.numberofUn).fill(0)
    for(let  i=0;i<this.hash.numberofUn;i++){
      console.log((<HTMLInputElement>document.getElementById(""+i)).value + "fun")
      this.arr[i] = (<HTMLInputElement>document.getElementById(""+i)).value
      console.log(this.arr[i])
    }
    console.log(this.arr)
    this.show=false
    this.precision=parseInt((<HTMLInputElement>document.getElementById("inputPre")).value)
    if(isNaN(this.precision)){
      this.precision=7
    }
    this.nw=true
    this.hash.expressionEvaluate(this.arr);

    console.log("                    ee")
    console.log(this.hash.cofficient)

    this.gaussSolver(this.hash.cofficient)
    console.log(this.hash.cofficient)
    this.answer=true
  }

  func(){
    this.hash.numberofUn=parseInt((<HTMLInputElement>document.getElementById("inputN")).value)

    console.log(this.hash.numberofUn);
    if(isNaN(this.hash.numberofUn) || this.hash.numberofUn < 1){
      return
    }

    this.hid=true
    this.arr=new Array(this.hash.numberofUn).fill(0)
    this.show=true
  }
  getBigestInrow(arr:number[]):number{
    let index=0
    let max=arr[0]
    for(let i=1;i<arr.length-1;i++){
      if(arr[i]>max){
        max=arr[i]
        index=i
      }
    }
    return index;

  }
  getBigestCoulmnIN(arr:number[][],pivot:number){
    let max=arr[pivot][pivot]
    let index=pivot
    for(let i=pivot+1;i<arr.length;i++){
      if(arr[i][pivot]>max){
        max=arr[i][pivot]
        index=i
      }
    }
    return index;
  }
  pivotAndscale(arr:number[][],pivot:number){
    let temp= new Array(arr.length).fill(0).map(() => new Array(arr[0].length).fill(0));
    for(let i=0;i<arr.length;i++){
      for(let j=0;j<arr[0].length;j++){
        temp[i][j]=arr[i][j];
        temp[i][j]= Math.abs(temp[i][j])
      }
    }
    for(let i=pivot;i<arr.length;i++){
      let max = temp[i][this.getBigestInrow(temp[i])]
      for(let j=0;j<arr.length;j++){
        temp[i][j]=temp[i][j]/max
      }
    }
    let n=this.getBigestCoulmnIN(temp,pivot)
    console.log("TTTTTTTT")
    console.log(temp)
    if(n==pivot){
      return
    }
    else{
      console.log("pivoooooooooot")
      let before= new Array(arr.length).fill(0).map(() => new Array(arr[0].length).fill(0));

      for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[0].length;j++){
          before[i][j]=arr[i][j];
        }
      }

      console.log(temp)
      let temp1=arr[pivot]
      console.log(temp1)
      arr[pivot]=arr[n]
      arr[n]=temp1
      for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[0].length;j++){
          temp[i][j]=arr[i][j];
        }
      }

      console.log(temp)
    }

  }

  gaussSolver(arr:number[][]){
    let arrr= new Array(arr.length).fill(0).map(() => new Array(arr[0].length).fill(0));
    for(let i=0;i<arr.length;i++){
      for(let j=0;j<arr[0].length;j++){
        arrr[i][j]=arr[i][j];
      }
    }
    console.log(arr)
    console.warn(arrr)
    let st =Date.now();
    for(let i=0;i<this.hash.numberofUn-1;i++){
      this.pivotAndscale(arrr,i)
      for(let j=i+1;j<this.hash.numberofUn;j++){
        if(arrr[i][i]==0){
          this.backSubs(arrr)
          return
        }
        let factor = parseFloat((arrr[j][i]/arrr[i][i]).toPrecision(this.precision));
        console.log(factor)
        for(let k=i;k<this.hash.numberofUn+1;k++){
          arrr[j][k]=parseFloat((arrr[j][k]-factor*arrr[i][k]).toPrecision(this.precision));
        }
        arrr[j][i]=0
      }


    }
    this.ElimnationTime=Date.now() -st;
    this.solve= new Array(arrr.length).fill(0).map(() => new Array(arrr[0].length).fill(0));
    for(let i=0;i<arrr.length;i++){
      for(let j=0;j<arrr[0].length;j++){
        this.solve[i][j]=arrr[i][j]
      }
    }
    this.backSubs(arrr)
    console.log(this.solve);
    console.log("sssssssssssssss")
  }
  hasSolution(arr:number[][]):string{
    let Inf=false
    for(let i=0;i<arr.length;i++){
      let rawZ=true
      for(let j=0;j<arr.length;j++){
        if(arr[i][j]!=0){
          rawZ=false
          break
        }
      }
      if((arr[i][this.hash.numberofUn]!=0&&rawZ)||(this.hash.keys.length>this.hash.numberofUn)||(this.hash.keys.indexOf('')>-1)){
        return 'hasNosolution';
      }
      if((arr[i][this.hash.numberofUn]==0&&rawZ)||(this.hash.keys.length<this.hash.numberofUn)){
        Inf=true
      }

    }
    if(Inf){
      return 'infinity';
    }
    else{
      return 'unique'
    }
  }

  backSubs(arr:number[][]){

    console.log("stttttttttttttttttt")
    if(this.hasSolution(arr)==='hasNosolution'){
      console.log('hasNosolution')
      this.noSolu=true
      return
    }
    if(this.hasSolution(arr)==='infinity'){
      console.log("infinity")
      this.inf=true
      return
    }
    else{
      this.uniqe=true
      console.log("unique")
      // var st= window.performance.now()*Math.pow(10,5)
      this.solution = new Array(this.hash.numberofUn).fill(0)
      for(let i=arr.length-1;i>=0;i--){
        for(let j=i+1;j<arr.length;j++){
          arr[i][arr.length]= parseFloat((arr[i][arr.length]-arr[i][j]*this.solution[j]).toPrecision(this.precision))
        }
        this.solution[i]=parseFloat((arr[i][arr.length]/arr[i][i]).toPrecision(this.precision))
      }
      // var end= window.performance.now()*Math.pow(10,5)
      // this.BacsubtutionTime=(end-st);
      // console.log(st)
      // console.log(end)
      console.log(this.BacsubtutionTime)
      console.log(this.solution)
    }
  }


}
/*
4x0+6x1+2x2-2x3=8
2x0+5x2-2x3=4
-4x0-3x1-5x2+4x3=1
8x0+18x1-2x2+3x3=40
*/

