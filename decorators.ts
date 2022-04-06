export function changeInRow(target: any, name: string, descriptor: any){
    var originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      var result = originalMethod.apply(this, args);
      if(result=="EASY")document.getElementById("mode").innerHTML=`Mode: HARD`
      else document.getElementById("mode").innerHTML=`Mode: EASY`
      document.getElementById("zmien").innerHTML=`Change to ${result}`
      
      console.log(`Zmien na ${result}`);
      return result;
    }
  }