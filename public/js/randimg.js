// Random Image Script
// copyright 9th September 2008 by Stephen Chapman
// http://javascript.about.com
// permission to use this Javascript on your web page is granted
// provided that all of the code below in this script (including these
// comments) is used without any alteration
function randObject(im, w, h, t, ary, type) {
    this.type = type;
    this.t = t * 1000;
    this.m1 = [];
    this.m2 = [];
    for (var i = ary.length - 1; i >= 0; i--) {
        if (this.type === "image") {
            this.m1[i] = document.createElement('img');
            this.m1.src = ary[i][type];
        }
        else {
            this.m1[i] = document.createElement('span');
            this.m1.innerHTML = ary[i][type];
        }
        this.m2[i] = ary[i];
    }
    this.d = document.getElementById(im);
    if (this.type === "image") {
        this.m = document.createElement('img');
    }
    else {
        this.m = document.createElement('span');
    }
    this.m.width = w;
    this.m.height = h;
    this.m.alt = 'random image';
    if (this.type === 'image') {
        this.m.src = ary[Math.floor(Math.random() * ary.length)][this.type];
    }
    else {
        this.m.innerHTML = ary[Math.floor(Math.random() * ary.length)][this.type];
    }
    this.d.appendChild(this.m);
}

function replaceObj(self) {
    if (self.type === "image") {
        self.m.src = self.m2[Math.floor(Math.random() * self.m2.length)][self.type];
    }
    else {
        self.m.innerHTML = self.m2[Math.floor(Math.random() * self.m2.length)][self.type];
    }
    self.d.appendChild(self.m);
    setTimeout(function () {
        replaceObj(self)
    }, self.t);

}




function randImg(im, w, h, t, ary) {
    this.t = t * 1000;
    this.m1 = [];
    this.m2 = [];
    for (var i = ary.length - 1; i >= 0; i--) {
        this.m1[i] = document.createElement('img');
        this.m1.src = ary[i];
        this.m2[i] = ary[i];
    }
    this.d = document.getElementById(im);
    this.m = document.createElement('img');
    this.m.width = w;
    this.m.height = h;
    this.m.alt = 'random image';
    this.m.src = ary[Math.floor(Math.random() * ary.length)];
    this.d.appendChild(this.m);
}

function replaceImg(self) {
    self.m.src = self.m2[Math.floor(Math.random() * self.m2.length)];
    self.d.appendChild(self.m);
    setTimeout(function () {
        replaceImg(self)
    }, self.t);
}