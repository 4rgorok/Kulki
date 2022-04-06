import {Kulki} from './kulki';
  
  
let nowa:Kulki
document.addEventListener('DOMContentLoaded', (event) => {
      
    reset()
    document.getElementById("restart").onclick=function(){
        reset()
    }
   document.getElementById("zmien").onclick=function()
   {
       nowa.lol(nowa.inLine)
   }
}); 
export function reset():void
{
    
    document.getElementById("punkty").innerHTML="Punkty: 0"
   nowa=new Kulki(9,5)
   
}

 
      
    