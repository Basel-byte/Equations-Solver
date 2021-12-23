export class Hash{
  MyMap= new Map<string,number[]>();
  keys: Array<string>=[];
  numberofUn!:number;

  cofficient: Array<Array<any>> = [];
  theSolution: Array<number> = [];

  public add(key:string, value:number,numerEq:number){
    let arr:number[];
    if(key.charCodeAt(0)<58){
      this.theSolution[numerEq]=this.theSolution[numerEq]-parseFloat(key)
      return
    }
    if(this.MyMap.has(key)){
      if(numerEq<this.MyMap.get(key)!.length){
        console.log("===============================================================")
        this.MyMap.get(key)![numerEq]=this.MyMap.get(key)![numerEq]+value
        return
      }
      if(numerEq>this.MyMap.get(key)!.length){
        for(let i=this.MyMap.get(key)!.length;i<numerEq;i++){
          console.log("ffffffffffffff")
          this.MyMap.get(key)!.push(0)
        }

      }
      this.MyMap.get(key)!.push(value)
    }
    else{
      if(numerEq==0){
        this.MyMap.set(key,[value]);
      }
      else{
        this.MyMap.set(key,[0]);
        for(let i=this.MyMap.get(key)!.length;i<numerEq;i++){
          this.MyMap.get(key)!.push(0)
        }
        this.MyMap.get(key)!.push(value)
      }
      if(this.keys.length!=0){
        this.keys.push(key);}
      else {this.keys=[key]}
    }
  }
  expressionEvaluate(_arr: string[]){
    let splitPlus = new Array(this.numberofUn).fill(0);
    let max=0;
    let maxIndex=0;
    for(let i=0;i<_arr.length;i++){
      console.log("anssss")
      this.theSolution.push(parseFloat((_arr[i].split('='))[1]))
      if(isNaN(this.theSolution[i]))
        this.theSolution[i]=0
      console.log(this.theSolution[i])
      _arr[i]=_arr[i].split("-").join("+-")
      _arr[i]=_arr[i].split(" ").join("");
      console.log("reeeeeee")
      console.log(_arr[i])
      if(_arr[i].charCodeAt(0)=="+".charCodeAt(0))
      {
        _arr[i]= _arr[i].substring(1);
        console.log("eeeeeeeeeeee")
        console.log(_arr[i])
      }
      splitPlus[i]=((_arr[i].split('='))[0]).split("+")
      if(splitPlus[i].length>max){
        maxIndex=i;
        max=splitPlus[i].length;
      }
    }
    console.log(splitPlus)
    this.evaluateAllunknown(splitPlus)
    this.clculateArr();

    console.log(this.keys)
    console.log(this.cofficient)
  }
  getSubstring(sub:string):any[]{
    let index = 0;
    for (let i = 0; i < sub.length; i++) {
      const character = sub.charCodeAt(i);
      if((character>64 && character<91)||(character>96 && character<123)){
        index=i;
        break;
      }
    }
    if(index==1 && sub.includes('-',0)){
      return [sub.substring(index,sub.length),-1];
    }
    if(index==0){
      return [sub.substring(index,sub.length),1];
    }
    return [sub.substring(index,sub.length),sub.substring(0,index)];
  }
  evaluateAllunknown(_arr: string[][]){
    let answer = new Array(_arr.length).fill(0).map(() => new Array(_arr.length).fill(0));
    console.log(_arr)
    for(let i=0;i<_arr.length;i++){
      for(let j=0;j<_arr[i].length;j++){
        console.log(_arr[i][j])
        let temp=this.getSubstring(_arr[i][j])
        this.add(temp[0],parseFloat(temp[1]),i);
      }
    }
    for(let k of this.keys){
      if(this.MyMap.get(k)!.length!=this.numberofUn){
        for(let i=this.MyMap.get(k)!.length;i<this.numberofUn;i++){
          this.MyMap.get(k)!.push(0)
        }
      }
    }
  }

  clculateArr(){
    this.cofficient = new Array(this.numberofUn).fill(0).map(() => new Array(this.numberofUn+1).fill(0));
    console.log(this.MyMap)
    for(let k=0;k<this.keys.length;k++){
      for(let i=0;i<this.numberofUn;i++){
        this.cofficient[i][k]= this.MyMap.get(this.keys[k])![i]
      }
    }
    console.log(this.MyMap)
    for(let i=0;i<this.numberofUn;i++){
      this.cofficient[i][this.numberofUn]= this.theSolution[i]
    }
    if(this.keys.length!=this.numberofUn){
      console.error("errrrrrror")
    }
    this.MyMap.clear();
  }

  constructor(){   }
}
