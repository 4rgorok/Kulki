"use strict";
exports.__esModule = true;
var queue_1 = require("./queue");
var Kulki = /** @class */ (function () {
    function Kulki(n, x) {
        this.divy = [];
        this.tab = new Array();
        this.zablokuj = false;
        this.licznikKulek = x;
        this.inLine = 3;
        this.nastKolor = new Array(3);
        this.punkty = 0;
        this.n = n;
        this.x = x;
        this.p1 = -1;
        this.q1 = -1;
        this.p2 = -1;
        this.q2 = -1;
        this.z1 = -1;
        this.z2 = -1;
        this.losujNastepneKolory();
        for (var i = 0; i < n; i++) {
            this.divy.push(new Array(this.n));
            var tab2 = new Array();
            for (var i2 = 0; i2 < n; i2++) {
                tab2.push(0);
            }
            this.tab.push(tab2);
        }
        this.narysujPole();
        this.wylosujSciany();
    }
    Kulki.prototype.wylosujSciany = function () {
        //
        var kolory = ["blue", "red", "black", "green", "gray"];
        var rand = 0;
        while (rand < this.x) {
            var x1 = Math.floor(Math.random() * this.n);
            var y1 = Math.floor(Math.random() * this.n);
            if (this.tab[x1][y1] == 0) {
                this.tab[x1][y1] = -1;
                var kul = document.createElement("div");
                kul.className = "kulka";
                var rand2 = Math.floor(Math.random() * kolory.length);
                kul.style.backgroundColor = kolory[rand2];
                //kul.style.backgroundImage="url('./grafiki/"+kolory[rand2]+".png')"
                this.divy[x1][y1].appendChild(kul);
                rand++;
            }
        }
    };
    Kulki.prototype.wypiszTablice = function () {
        for (var i = 0; i < this.n; i++) {
            var a = "";
            for (var i2 = 0; i2 < this.n; i2++) {
                if (this.tab[i][i2] == -1)
                    a += "X ";
                else if (this.tab[i][i2] == -2)
                    a += "P ";
                else if (this.tab[i][i2] == -3)
                    a += "K ";
                else if (this.tab[i][i2] == -4)
                    a += ". ";
                else
                    a += this.tab[i][i2].toString() + " ";
            }
            console.log(a + "\n");
        }
    };
    Kulki.prototype.znajdzSciezke = function () {
        var q = new queue_1.Queue();
        var t = [this.p1, this.q1, 1];
        q.push(t);
        this.z1 = -1;
        while (!q.isEmpty()) {
            var z = q.pop();
            if (z[0] == this.p2 && z[1] == this.q2) {
                this.z1 = this.p2;
                this.z2 = this.q2;
                this.tab[z[0]][z[1]] = z[2];
                break;
            }
            if (this.inRange(z[0] + 1, z[1])) {
                if (this.tab[z[0] + 1][z[1]] == 0) {
                    this.tab[z[0] + 1][z[1]] = z[2];
                    var t2 = [z[0] + 1, z[1], z[2] + 1];
                    q.push(t2);
                }
            }
            if (this.inRange(z[0] - 1, z[1])) {
                if (this.tab[z[0] - 1][z[1]] == 0) {
                    this.tab[z[0] - 1][z[1]] = z[2];
                    var t2 = [z[0] - 1, z[1], z[2] + 1];
                    q.push(t2);
                }
            }
            if (this.inRange(z[0], z[1] + 1)) {
                if (this.tab[z[0]][z[1] + 1] == 0) {
                    this.tab[z[0]][z[1] + 1] = z[2];
                    var t2 = [z[0], z[1] + 1, z[2] + 1];
                    q.push(t2);
                }
            }
            if (this.inRange(z[0], z[1] - 1)) {
                if (this.tab[z[0]][z[1] - 1] == 0) {
                    this.tab[z[0]][z[1] - 1] = z[2];
                    var t2 = [z[0], z[1] - 1, z[2] + 1];
                    q.push(t2);
                }
            }
        }
    };
    Kulki.prototype.inRange = function (ox, oy) {
        if (ox < 0 || oy < 0 || ox >= this.n || oy >= this.n)
            return false;
        else
            return true;
    };
    Kulki.prototype.narysujSciezke = function () {
        if (this.z1 != -1) {
            var fin = this.tab[this.z1][this.z2];
            var poz1 = this.z1;
            var poz2 = this.z2;
            fin--;
            this.sx = [];
            this.sy = [];
            while (fin > 0) {
                this.tab[poz1][poz2] = -4;
                this.sx.push(poz1);
                this.sy.push(poz2);
                this.divy[poz1][poz2].style.backgroundImage = "url('./grafiki/h.png')";
                fin--;
                if (this.inRange(poz1 + 1, poz2)) {
                    if (this.tab[poz1 + 1][poz2] == fin) {
                        poz1++;
                        continue;
                    }
                }
                if (this.inRange(poz1 - 1, poz2)) {
                    if (this.tab[poz1 - 1][poz2] == fin) {
                        poz1--;
                        continue;
                    }
                }
                if (this.inRange(poz1, poz2 + 1)) {
                    if (this.tab[poz1][poz2 + 1] == fin) {
                        poz2++;
                        continue;
                    }
                }
                if (this.inRange(poz1, poz2 - 1)) {
                    if (this.tab[poz1][poz2 - 1] == fin) {
                        poz2--;
                        continue;
                    }
                }
            }
            this.sx.push(this.p1);
            this.sy.push(this.q1);
            var sx = this.sx;
            var sy = this.sy;
            for (var i = 0; i < sx.length; i++) {
                if (i == 0) {
                    this.divy[sx[i]][sy[i]].style.backgroundImage = "url('./grafiki/kon.png')";
                    var t = 0;
                    if (sx[i + 1] < sx[i])
                        t = 2;
                    if (sx[i + 1] > sx[i])
                        t = 0;
                    if (sy[i + 1] < sy[i])
                        t = 1;
                    if (sy[i + 1] > sy[i])
                        t = 3;
                    //console.log(t)
                    this.divy[sx[i]][sy[i]].style.transform = "rotate(" + 90 * t + "deg)";
                }
                else if (i != sx.length - 1) {
                    this.divy[sx[i]][sy[i]].style.transform = "rotate(0deg)";
                    if (sx[i + 1] != sx[i])
                        this.divy[sx[i]][sy[i]].style.backgroundImage = "url('./grafiki/v.png')";
                    else
                        this.divy[sx[i]][sy[i]].style.backgroundImage = "url('./grafiki/h.png')";
                    if (sx[i - 1] != sx[i + 1] && sy[i - 1] != sy[i + 1]) {
                        this.divy[sx[i]][sy[i]].style.backgroundImage = "url('./grafiki/r.png')";
                        var t = 0;
                        if (sy[i] == sy[i + 1] && sx[i] < sx[i + 1]) {
                            if (sy[i - 1] > sy[i])
                                t = 0;
                            else
                                t = 1;
                        }
                        if (sy[i] == sy[i + 1] && sx[i] > sx[i + 1]) {
                            if (sy[i - 1] > sy[i])
                                t = 3;
                            else
                                t = 2;
                        }
                        if (sx[i] == sx[i + 1] && sy[i] > sy[i + 1]) {
                            if (sx[i - 1] > sx[i])
                                t = 1;
                            else
                                t = 2;
                        }
                        if (sx[i] == sx[i + 1] && sy[i] < sy[i + 1]) {
                            if (sx[i - 1] > sx[i])
                                t = 0;
                            else
                                t = 3;
                        }
                        this.divy[sx[i]][sy[i]].style.transform = "rotate(" + 90 * t + "deg)";
                    }
                }
            }
        }
        for (var i_1 = 0; i_1 < this.n; i_1++) {
            for (var i2 = 0; i2 < this.n; i2++) {
                if (this.tab[i_1][i2] > 0)
                    this.tab[i_1][i2] = 0;
                else if (this.tab[i_1][i2] == -4)
                    this.tab[i_1][i2] = 0;
            }
        }
    };
    Kulki.prototype.narysujPole = function () {
        var div = document.getElementById("cont");
        div.innerHTML = "";
        div.style.width = 51 * this.n + "px";
        div.style.height = 51 * this.n + "px";
        //div.style.border="5px solid black"
        div.style.position = "absolute";
        div.style.top = "30px";
        div.style.left = "100px";
        var _loop_1 = function (i) {
            var _loop_2 = function (i2) {
                var div2 = document.createElement("div");
                this_1.divy[i][i2] = div2;
                div2.className = "maly";
                div2.style.width = "50px";
                div2.style.height = "50px";
                div2.style.border = "1px solid black";
                div2.style.position = "absolute";
                div2.style.backgroundColor = "white";
                div2.style.top = 51 * i + "px";
                div2.style.left = 51 * i2 + "px";
                var that = this_1;
                div2.onclick = function () {
                    if (that.tab[i][i2] == -1 && !that.zablokuj) {
                        that.divy[i][i2].style.backgroundColor = "lightgray";
                        if (that.p1 == -1) {
                            that.p1 = i;
                            that.q1 = i2;
                        }
                        else {
                            if (!(that.p1 == i && that.q1 == i2))
                                that.divy[that.p1][that.q1].style.backgroundColor = "white";
                            that.p1 = i;
                            that.q1 = i2;
                        }
                    }
                    else if (that.tab[i][i2] == 0 && !that.zablokuj) {
                        if (that.z1 != -1) {
                            that.tab[i][i2] = -1;
                            that.p1 = -1;
                            that.q1 = -1;
                            that.p2 = -1;
                            that.q2 = -1;
                            that.z1 = -1;
                            that.z2 = -1;
                            for (var ii = 0; ii < that.n; ii++) {
                                for (var ii2 = 0; ii2 < that.n; ii2++) {
                                    that.divy[ii][ii2].style.backgroundImage = "";
                                    that.divy[ii][ii2].style.transform = "";
                                }
                            }
                            var lel = that.sx.length - 1;
                            that.zablokuj = true;
                            var int = setInterval(function () {
                                var temp = that.divy[that.sx[lel]][that.sy[lel]].children[0];
                                that.divy[that.sx[lel]][that.sy[lel]].removeChild(temp);
                                that.divy[that.sx[lel]][that.sy[lel]].style.backgroundColor = "white";
                                that.tab[that.sx[lel]][that.sy[lel]] = 0;
                                that.divy[that.sx[lel - 1]][that.sy[lel - 1]].appendChild(temp);
                                lel--;
                                if (lel == 0) {
                                    clearInterval(int);
                                    that.sprawdzPunkty(false, i, i2);
                                }
                            }, 40);
                        }
                    }
                };
                div2.onmouseover = function () {
                    for (var ii = 0; ii < that.n; ii++) {
                        for (var ii2 = 0; ii2 < that.n; ii2++) {
                            that.divy[ii][ii2].style.backgroundImage = "";
                            that.divy[ii][ii2].style.transform = "";
                        }
                    }
                    if (that.tab[i][i2] == 0) {
                        if (that.p1 != -1) {
                            that.p2 = i;
                            that.q2 = i2;
                            that.znajdzSciezke();
                            that.narysujSciezke();
                        }
                    }
                };
                div.appendChild(div2);
            };
            for (var i2 = 0; i2 < this_1.n; i2++) {
                _loop_2(i2);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.n; i++) {
            _loop_1(i);
        }
        document.body.appendChild(div);
    };
    Kulki.prototype.sprawdzPunkty = function (czy, x, y) {
        if (czy) {
            this.serioSprawdz(x, y);
        }
        else {
            if (this.serioSprawdz(x, y))
                this.spwan();
            else
                this.zablokuj = false;
        }
    };
    Kulki.prototype.serioSprawdz = function (x, y) {
        var _this = this;
        var nvG = x;
        var nvD = x;
        var nhP = y;
        var nhL = y;
        var pg = 0;
        var ld = 0;
        var pd = 0;
        var lg = 0;
        var licz = 0;
        var color = this.divy[x][y].children[0].getAttribute("style");
        while (nvG > 0 && this.divy[nvG - 1][y].children.length != 0 && color == this.divy[nvG - 1][y].children[0].getAttribute("style"))
            nvG--;
        while (nvD + 1 < this.n && this.divy[nvD + 1][y].children.length != 0 && color == this.divy[nvD + 1][y].children[0].getAttribute("style"))
            nvD++;
        while (nhL > 0 && this.divy[x][nhL - 1].children.length != 0 && color == this.divy[x][nhL - 1].children[0].getAttribute("style"))
            nhL--;
        while (nhP + 1 < this.n && this.divy[x][nhP + 1].children.length != 0 && color == this.divy[x][nhP + 1].children[0].getAttribute("style"))
            nhP++;
        while (y + pg + 1 < this.n && x - pg > 0 && this.divy[x - pg - 1][y + pg + 1].children.length != 0 && color == this.divy[x - pg - 1][y + pg + 1].children[0].getAttribute("style"))
            pg++;
        while (y - ld > 0 && x + ld + 1 < this.n && this.divy[x + ld + 1][y - ld - 1].children.length != 0 && color == this.divy[x + ld + 1][y - ld - 1].children[0].getAttribute("style"))
            ld++;
        while (y + pd + 1 < this.n && x + pd + 1 < this.n && this.divy[x + pd + 1][y + pd + 1].children.length != 0 && color == this.divy[x + pd + 1][y + pd + 1].children[0].getAttribute("style"))
            pd++;
        while (y - lg > 0 && x - lg > 0 && this.divy[x - lg - 1][y - lg - 1].children.length != 0 && color == this.divy[x - lg - 1][y - lg - 1].children[0].getAttribute("style"))
            lg++;
        var mySet = new Set();
        if (pd + lg + 1 > this.inLine - 1)
            for (var i = -1 * lg; i <= pd; i++) {
                if (this.divy[x + i][y + i].children.length > 0) {
                    mySet.add(this.divy[x + i][y + i].children[0]);
                }
                this.tab[x + i][y + i] = 0;
            }
        if (pg + ld + 1 > this.inLine - 1)
            for (var i = -1 * ld; i <= pg; i++) {
                if (this.divy[x - i][y + i].children.length > 0) {
                    mySet.add(this.divy[x - i][y + i].children[0]);
                }
                this.tab[x - i][y + i] = 0;
            }
        if (nhP - nhL + 1 > this.inLine - 1)
            for (var i = nhL; i <= nhP; i++) {
                if (this.divy[x][i].children.length > 0) {
                    mySet.add(this.divy[x][i].children[0]);
                }
                this.tab[x][i] = 0;
            }
        if (nvD - nvG + 1 > this.inLine - 1)
            for (var i = nvG; i <= nvD; i++) {
                if (this.divy[i][y].children.length > 0) {
                    mySet.add(this.divy[i][y].children[0]);
                }
                this.tab[i][y] = 0;
            }
        var arr = Array.from(mySet);
        licz += arr.length;
        if (licz == 0) {
            return true;
        }
        else {
            this.zablokuj = true;
            var control_1 = 0;
            var timer_1 = setInterval(function () {
                for (var i = 0; i < arr.length; i++) {
                    arr[i].style.borderRadius = 50 - 10 * control_1 + "px";
                    arr[i].style.width = 50 - 10 * control_1 + "px";
                    arr[i].style.height = 50 - 10 * control_1 + "px";
                    arr[i].style.top = 0 + 5 * control_1 + "px";
                    arr[i].style.left = 0 + 5 * control_1 + "px";
                }
                control_1++;
                if (control_1 == 6) {
                    console.log(control_1);
                    for (var i = 0; i < arr.length; i++) {
                        arr[i].remove();
                    }
                    clearInterval(timer_1);
                    _this.punkty += licz;
                    _this.licznikKulek -= licz;
                    document.getElementById("punkty").innerHTML = "Punkty: " + _this.punkty;
                    return false;
                }
            }, 50);
        }
    };
    Kulki.prototype.spwan = function () {
        var _this = this;
        this.licznikKulek += 3;
        if (this.licznikKulek >= this.n * this.n) {
            document.getElementById("restart").click();
            alert("KONIEC GRY\nWYNIK: " + this.punkty + "pkt");
            return;
        }
        var rand = 0;
        var temp = new Array(6);
        var kolory = ["blue", "red", "black", "green", "gray"];
        while (rand < 3) {
            var x1 = Math.floor(Math.random() * this.n);
            var y1 = Math.floor(Math.random() * this.n);
            if (this.tab[x1][y1] == 0) {
                this.tab[x1][y1] = -1;
                temp[rand * 2] = x1;
                temp[rand * 2 + 1] = y1;
                rand++;
            }
        }
        rand = 0;
        this.zablokuj = true;
        var int = setInterval(function () {
            var kul = document.createElement("div");
            kul.className = "kulka";
            kul.style.backgroundColor = kolory[_this.nastKolor[rand]];
            //kul.style.backgroundImage="url('./grafiki/"+kolory[this.nastKolor[rand]]+".png')"
            _this.divy[temp[rand * 2]][temp[rand * 2 + 1]].appendChild(kul);
            rand++;
            if (rand == 3) {
                clearInterval(int);
                for (var i = 0; i < 3; i++)
                    _this.sprawdzPunkty(true, temp[i * 2], temp[i * 2 + 1]);
                _this.losujNastepneKolory();
                _this.zablokuj = false;
            }
        }, 200);
    };
    Kulki.prototype.losujNastepneKolory = function () {
        var kolory = ["blue", "red", "black", "green", "gray"];
        for (var i = 0; i < 3; i++) {
            var randomik = Math.floor(Math.random() * kolory.length);
            this.nastKolor[i] = randomik;
            //document.getElementById("kont").getElementsByClassName("kulkaM")[i].setAttribute("style", "background-image:url('./grafiki/"+kolory[randomik]+".png')")
            document.getElementById("kont").getElementsByClassName("kulkaM")[i].setAttribute("style", "background-color:" + kolory[randomik]);
        }
    };
    return Kulki;
}());
;
var nowa;
document.addEventListener('DOMContentLoaded', function (event) {
    reset();
});
function reset() {
    document.getElementById("punkty").innerHTML = "Punkty: 0";
    nowa = new Kulki(10, 5);
}
