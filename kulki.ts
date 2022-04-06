import {Queue} from './queue';
import {reset} from './script';
import {changeInRow} from './decorators';
export class Kulki
  {
    private zablokuj:boolean
    private sx:Array<number>
    private sy:Array<number>
    private licznikKulek:number
    public inLine:number
    readonly kolIl:number
    private n:number;
    private x:number;
    private p1:number;
    private q1:number
    private p2:number;
    private q2:number
    private z1:number;
    private z2:number;
    private nastKolor:Array<number>
    private punkty:number;
    private divy:HTMLDivElement[][]=[]
    private tab:number[][] = new Array();
      
      constructor(n:number,x:number)
      {
          
          this.zablokuj=false
          this.licznikKulek=x
          this.inLine=3
          this.kolIl=5
          this.nastKolor=new Array(3)
          this.punkty=0;
          this.n =n;
          this.x =x;
          this.p1=-1;
          this.q1=-1;
          this.p2=-1;
          this.q2=-1;
          this.z1=-1;
          this.z2=-1;
          this.losujNastepneKolory()
          for(let i:number=0;i<n;i++)
          {
              this.divy.push(new Array(this.n))
              let tab2:number[]= new Array();
              for(let i2:number=0;i2<n;i2++)
              {
                  tab2.push(0)  
              }
              this.tab.push(tab2);
          }
          
          this.narysujPole()
          this.wylosujSciany()
          
          
          
          
      }
      wylosujSciany():void
      {
        //
        let kolory:string[]=["blue","red","black","green","darkorchid"]
          let rand:number=0;
          while(rand<this.x)
          {
              let x1=Math.floor(Math.random()*this.n)
              let y1=Math.floor(Math.random()*this.n)
              if(this.tab[x1][y1]==0)
              {
                  this.tab[x1][y1]=-1;
                  let kul:HTMLDivElement=document.createElement("div")
                  kul.className="kulka"
                  let rand2:number=Math.floor(Math.random()*kolory.length)
                  kul.style.backgroundColor=kolory[rand2]
                  //kul.style.backgroundImage="url('./grafiki/"+kolory[rand2]+".png')"
                  this.divy[x1][y1].appendChild(kul)
                  rand++
              }
          }
          
      }
      wypiszTablice():void
      {
          for(let i:number=0;i<this.n;i++)
          {
              let a:string=""
              for(let i2:number=0;i2<this.n;i2++)
              {
                  if(this.tab[i][i2]==-1)a+="X "
                  else if(this.tab[i][i2]==-2)a+="P "
                  else if(this.tab[i][i2]==-3)a+="K "
                  else if(this.tab[i][i2]==-4)a+=". "
                  else a+=this.tab[i][i2].toString()+" "
              }
          console.log(a+"\n")
          }
         
      }
      znajdzSciezke():void
      {
         
          let q=new Queue()
          let t:[number,number,number]=[this.p1,this.q1,1]
          q.push(t)
          this.z1=-1
          while(!q.isEmpty())
          {
              let z=q.pop()!
                if(z[0]==this.p2&&z[1]==this.q2)
                {
                    this.z1=this.p2
                    this.z2=this.q2
                    this.tab[z[0]][z[1]]=z[2]
                    
                    break;
                }
              if(this.inRange(z[0]+1,z[1]))
              {
                  if(this.tab[z[0]+1][z[1]]==0)
                  {
                      this.tab[z[0]+1][z[1]]=z[2]
                      let t2:[number,number,number]=[z[0]+1,z[1],z[2]+1]
                      q.push(t2)  
                  }
                  
              }
              if(this.inRange(z[0]-1,z[1]))
              {
                  if(this.tab[z[0]-1][z[1]]==0)
                  {
                      this.tab[z[0]-1][z[1]]=z[2]
                      let t2:[number,number,number]=[z[0]-1,z[1],z[2]+1]
                      q.push(t2)  
                  }
                  
              }
              if(this.inRange(z[0],z[1]+1))
              {
                  if(this.tab[z[0]][z[1]+1]==0)
                  {
                      this.tab[z[0]][z[1]+1]=z[2]
                      let t2:[number,number,number]=[z[0],z[1]+1,z[2]+1]
                      q.push(t2)  
                  }
                  
              }
              if(this.inRange(z[0],z[1]-1))
              {
                  if(this.tab[z[0]][z[1]-1]==0)
                  {
                      this.tab[z[0]][z[1]-1]=z[2]
                      let t2:[number,number,number]=[z[0],z[1]-1,z[2]+1]
                      q.push(t2)  
                  }
                 
              }
          }
      }
      @changeInRow
      lol(num:number):string
      {
          let licz:number=0
          if(num==3)
          { 
              this.inLine=5
              return "EASY"
          }
          else this.inLine=3
          for(let i:number=0;i<9;i++)
          {
              for(let i2:number=0;i2<9;i2++)if(this.divy[i][i2].childNodes[0])
              {
                  licz++
                  this.sprawdzPunkty(true,i,i2,true)
              }
          }
          setTimeout(() => {
              for(let i:number=0;i<9;i++)
          {
              for(let i2:number=0;i2<9;i2++)if(this.divy[i][i2].childNodes[0])
              {
                  licz--
                  
              }
          }
          this.punkty+=licz
        this.licznikKulek-=licz
        document.getElementById("punkty").innerHTML="Punkty: "+this.punkty
        this.zablokuj=false
          }, 1000);
          
          return "HARD"
      }
      inRange(ox:number,oy:number):boolean
      {
          if(ox<0||oy<0||ox>=this.n||oy>=this.n)return false
          else return true
      }
      narysujSciezke():void
      {
        if(this.z1!=-1)
        {  
        let fin=this.tab[this.z1][this.z2]
          let poz1=this.z1
          let poz2=this.z2
          fin--
          this.sx=[]
          this.sy=[]
          while(fin>0)
          {
              this.tab[poz1][poz2]=-4
              this.sx.push(poz1)
              this.sy.push(poz2)
              this.divy[poz1][poz2].style.backgroundImage="url('./grafiki/h.png')"
              fin--
              if(this.inRange(poz1+1,poz2))
              {
                  if(this.tab[poz1+1][poz2]==fin)
                  {
                      poz1++
                      continue
                  }
              }
              if(this.inRange(poz1-1,poz2))
              {
                  if(this.tab[poz1-1][poz2]==fin)
                  {
                      poz1--
                      continue
                  }
              }
              if(this.inRange(poz1,poz2+1))
              {
                  if(this.tab[poz1][poz2+1]==fin)
                  {
                      poz2++
                      continue
                  }
              }
              if(this.inRange(poz1,poz2-1))
              {
                  if(this.tab[poz1][poz2-1]==fin)
                  {
                      poz2--
                      continue
                  }
              }
              
          }
          this.sx.push(this.p1)
          this.sy.push(this.q1)
          let sx:Array<number>=this.sx
          let sy:Array<number>=this.sy
          for(let i:number=0;i<sx.length;i++)
          {
                if(i==0)
                {
                    this.divy[sx[i]][sy[i]].style.backgroundImage="url('./grafiki/kon.png')"
                    let t=0
                    if(sx[i+1]<sx[i])t=2
                    if(sx[i+1]>sx[i])t=0
                    if(sy[i+1]<sy[i])t=1
                    if(sy[i+1]>sy[i])t=3
                    //console.log(t)
                    this.divy[sx[i]][sy[i]].style.transform="rotate("+90*t+"deg)"
                }
                else if(i!=sx.length-1)
                {
                    this.divy[sx[i]][sy[i]].style.transform="rotate(0deg)"
                  
                    if(sx[i+1]!=sx[i])this.divy[sx[i]][sy[i]].style.backgroundImage="url('./grafiki/v.png')"
                    else this.divy[sx[i]][sy[i]].style.backgroundImage="url('./grafiki/h.png')"

                    if(sx[i-1]!=sx[i+1]&&sy[i-1]!=sy[i+1])
                    {
                        this.divy[sx[i]][sy[i]].style.backgroundImage="url('./grafiki/r.png')"
                        let t:number=0
                        if(sy[i]==sy[i+1]&&sx[i]<sx[i+1])
                        {
                            
                            if(sy[i-1]>sy[i])t=0
                            else t=1 
                        }
                        if(sy[i]==sy[i+1]&&sx[i]>sx[i+1])
                        {
                            if(sy[i-1]>sy[i])t=3
                            else t=2
                        }
                        if(sx[i]==sx[i+1]&&sy[i]>sy[i+1])
                        {
                            if(sx[i-1]>sx[i])t=1
                            else t=2
                        }
                        if(sx[i]==sx[i+1]&&sy[i]<sy[i+1])
                        {
                            if(sx[i-1]>sx[i])t=0
                            else t=3
                        }
                        this.divy[sx[i]][sy[i]].style.transform="rotate("+90*t+"deg)"
                    }
                    
                }
          }
        }
          for(let i:number=0;i<this.n;i++)
          {
              for(let i2:number=0;i2<this.n;i2++)
              {
                  if(this.tab[i][i2]>0)this.tab[i][i2]=0
                  else if(this.tab[i][i2]==-4)this.tab[i][i2]=0
              }
          }

      }
      narysujPole():void
      {
          let div:HTMLElement=document.getElementById("cont")
          div.innerHTML=""
          div.style.width=51*this.n+"px"
          div.style.height=51*this.n+"px"
          //div.style.border="5px solid black"
          div.style.position="absolute"
          div.style.top="30px"
          div.style.left="200px"
          for(let i:number=0;i<this.n;i++)
          {
              for(let i2:number=0;i2<this.n;i2++)
              {
                let div2:HTMLDivElement=document.createElement("div")
                this.divy[i][i2]=div2
                div2.className="maly"
                div2.style.width="50px"
                div2.style.height="50px"
                div2.style.border="1px solid black"
                div2.style.position="absolute"
                div2.style.backgroundColor="white"
                div2.style.top=51*i+"px"
                div2.style.left=51*i2+"px"
                let that=this
                div2.onclick=function()
                {
                    if(that.tab[i][i2]==-1&&!that.zablokuj)
                    {
                      
                        if(that.q1==i2&&that.p1==i)
                        {
                            (that.divy[i][i2].childNodes[0] as HTMLElement).style.opacity=""
                            console.log(that.divy[i][i2].childNodes,that.q1,that.p1)
                            that.p1=-1
                            that.q1=-1
                            that.z1=-1
                        }
                        else 
                        {
                            for(let iii=0;iii<that.n;iii++)
                            {
                                for(let iii2=0;iii2<that.n;iii2++)
                                {
                                    if(that.divy[iii][iii2].childNodes[0])(that.divy[iii][iii2].childNodes[0] as HTMLElement).style.opacity=""
                                    
                                }   
                            }
                            (that.divy[i][i2].childNodes[0] as HTMLElement).style.opacity="50%"
                            //console.log(that.divy[i][i2].childNodes[0])
                            if(that.p1==-1)
                            {
                                that.p1=i
                                that.q1=i2
                                
                            }
                            else
                            {
                                if(!(that.p1==i&&that.q1==i2))(that.divy[that.p1][that.q1].childNodes[0] as HTMLElement).style.opacity=""
                                that.p1=i
                                that.q1=i2
                            }
                        }

                    }
                    else if(that.tab[i][i2]==0&&!that.zablokuj)
                    {
                        
                        if(that.z1!=-1)
                        {
                            that.tab[i][i2]=-1
                            that.p1=-1
                            that.q1=-1
                            that.p2=-1
                            that.q2=-1
                            that.z1=-1
                            that.z2=-1
                            for(let ii=0;ii<that.n;ii++)
                            {
                                for(let ii2=0;ii2<that.n;ii2++)
                                {
                                    that.divy[ii][ii2].style.backgroundImage=""
                                    that.divy[ii][ii2].style.transform=""
                                }   
                            }
                            let lel:number=that.sx.length-1
                            that.zablokuj=true
                                let int:any=setInterval(() => {
                                    (that.divy[that.sx[lel]][that.sy[lel]].childNodes[0] as HTMLElement).style.opacity=""
                                    let temp:any=that.divy[that.sx[lel]][that.sy[lel]].children[0]
                                that.divy[that.sx[lel]][that.sy[lel]].removeChild(temp)
                                
                                that.tab[that.sx[lel]][that.sy[lel]]=0
                                that.divy[that.sx[lel-1]][that.sy[lel-1]].appendChild(temp)
                                lel--
                                if(lel==0)
                                {
                                    
                                    clearInterval(int)
                                    that.sprawdzPunkty(false,i,i2,false)
                                    
                                }
                                }, 40);
                                
                            
                            
                            
                            
                            
                        }
                        
                    }
                    
                }
                div2.onmouseover=function()
                {
                    for(let ii=0;ii<that.n;ii++)
                    {
                        for(let ii2=0;ii2<that.n;ii2++)
                        {
                            that.divy[ii][ii2].style.backgroundImage=""
                            that.divy[ii][ii2].style.transform=""
                        }   
                    }
                    if(that.tab[i][i2]==0)
                    {
                        if(that.p1!=-1)
                        {
                            that.p2=i
                            that.q2=i2
                            
                            that.znajdzSciezke()
                            that.narysujSciezke()
                            
                        }
                        
                    }
                }
                div.appendChild(div2)
              }
          }
          document.body.appendChild(div)
          
      }
      sprawdzPunkty(czy:boolean,x:number,y:number,qq:boolean):void
      {
        if(czy)
        {
            this.serioSprawdz(x,y,qq)
        }
        else
        {
            if(this.serioSprawdz(x,y,qq))this.spwan()
            else this.zablokuj=false
        }
        
      }
      serioSprawdz(x:number,y:number,qq:boolean):boolean
      {
        let nvG:number=x
        let nvD:number=x

        let nhP:number=y
        let nhL:number=y

        let pg:number=0
        let ld:number=0

        let pd:number=0
        let lg:number=0
        let licz:number=0
     
        let color:string=this.divy[x][y].children[0].getAttribute("style")
        while(nvG>0&&this.divy[nvG-1][y].children.length!=0&&color==this.divy[nvG-1][y].children[0].getAttribute("style"))nvG--
        while(nvD+1<this.n&&this.divy[nvD+1][y].children.length!=0&&color==this.divy[nvD+1][y].children[0].getAttribute("style"))nvD++
        
        while(nhL>0&&this.divy[x][nhL-1].children.length!=0&&color==this.divy[x][nhL-1].children[0].getAttribute("style"))nhL--
        while(nhP+1<this.n&&this.divy[x][nhP+1].children.length!=0&&color==this.divy[x][nhP+1].children[0].getAttribute("style"))nhP++

        while(y+pg+1<this.n&&x-pg>0&&this.divy[x-pg-1][y+pg+1].children.length!=0&&color==this.divy[x-pg-1][y+pg+1].children[0].getAttribute("style"))pg++
        while(y-ld>0&&x+ld+1<this.n&&this.divy[x+ld+1][y-ld-1].children.length!=0&&color==this.divy[x+ld+1][y-ld-1].children[0].getAttribute("style"))ld++
        
        while(y+pd+1<this.n&&x+pd+1<this.n&&this.divy[x+pd+1][y+pd+1].children.length!=0&&color==this.divy[x+pd+1][y+pd+1].children[0].getAttribute("style"))pd++
        while(y-lg>0&&x-lg>0&&this.divy[x-lg-1][y-lg-1].children.length!=0&&color==this.divy[x-lg-1][y-lg-1].children[0].getAttribute("style"))lg++
        let mySet = new Set();
        if(pd+lg+1>this.inLine-1)for(let i:number=-1*lg;i<=pd;i++)
        {
            if(this.divy[x+i][y+i].children.length>0)
            {
                mySet.add(this.divy[x+i][y+i].children[0])
            }
            this.tab[x+i][y+i]=0
        }
        if(pg+ld+1>this.inLine-1)for(let i:number=-1*ld;i<=pg;i++)
        {
           
            if(this.divy[x-i][y+i].children.length>0)
            {  
                mySet.add(this.divy[x-i][y+i].children[0])
            }
            this.tab[x-i][y+i]=0
        }
        if(nhP-nhL+1>this.inLine-1)for(let i:number=nhL;i<=nhP;i++)
        {
            
            if(this.divy[x][i].children.length>0)
            { 
                mySet.add(this.divy[x][i].children[0])
            }
            this.tab[x][i]=0
        }
        if(nvD-nvG+1>this.inLine-1)for(let i:number=nvG;i<=nvD;i++)
        {
           
            if(this.divy[i][y].children.length>0)
            {
                mySet.add(this.divy[i][y].children[0])
            }

            this.tab[i][y]=0
        }
        
        let arr:any=Array.from(mySet)
        licz+=arr.length
        if(licz==0)
        {
            return true
        }
        else
        {
            this.zablokuj=true
            let control:number=0
            let timer:any=setInterval(() => {
                    for(let i:number=0;i<arr.length;i++)
                    {
                        arr[i].style.borderRadius=50-10*control+"px"
                        arr[i].style.width=50-10*control+"px"
                        arr[i].style.height=50-10*control+"px"
                        arr[i].style.top=0+5*control+"px"
                        arr[i].style.left=0+5*control+"px"
                    }
                   
                    control++
                    if(control==6)
                    {
                        console.log(control)
                        for(let i:number=0;i<arr.length;i++)
                        {
                            arr[i].remove()
                        }
                        clearInterval(timer)
                        if(qq==false)
                        {
                            this.punkty+=licz
                            this.licznikKulek-=licz
                            document.getElementById("punkty").innerHTML="Punkty: "+this.punkty
                        }
                        return false
                    }
                
            }, 50);
            
        }
      }
      spwan():void
      {
        this.licznikKulek+=3
        if(this.licznikKulek>=this.n*this.n)
        {
            reset()
            //document.getElementById("restart").click()
            alert("KONIEC GRY\nWYNIK: "+this.punkty+"pkt")
            return 
        }
          let rand:number=0;
          let temp:Array<number>=new Array(6)
          let kolory:string[]=["blue","red","black","green","darkorchid"]
          while(rand<3)
          {
              let x1=Math.floor(Math.random()*this.n)
              let y1=Math.floor(Math.random()*this.n)
              
              
              if(this.tab[x1][y1]==0)
              {
                  this.tab[x1][y1]=-1;
                  temp[rand*2]=x1
                  temp[rand*2+1]=y1
                  rand++
              }
          }
          rand=0
          this.zablokuj=true
          let int:any=setInterval(() => {
                let kul:HTMLDivElement=document.createElement("div")
                kul.className="kulka"
                kul.style.backgroundColor=kolory[this.nastKolor[rand]]
                //kul.style.backgroundImage="url('./grafiki/"+kolory[this.nastKolor[rand]]+".png')"
                
                this.divy[temp[rand*2]][temp[rand*2+1]].appendChild(kul)
                rand++
                if(rand==3)
                {
                    clearInterval(int)
                    for(let i:number=0;i<3;i++)this.sprawdzPunkty(true,temp[i*2],temp[i*2+1],false)
                    this.losujNastepneKolory()
                    this.zablokuj=false
                }
          }, 200);
          
      }
      losujNastepneKolory():void
      {
        let kolory:string[]=["blue","red","black","green","darkorchid"]
          for(let i:number=0;i<3;i++)
          {
            let randomik:number=Math.floor(Math.random()*kolory.length)
            this.nastKolor[i]=randomik
            //document.getElementById("kont").getElementsByClassName("kulkaM")[i].setAttribute("style", "background-image:url('./grafiki/"+kolory[randomik]+".png')")
            document.getElementById("kont").getElementsByClassName("kulkaM")[i].setAttribute("style", "background-color:"+kolory[randomik])
        }
        
        
      }
      
  };