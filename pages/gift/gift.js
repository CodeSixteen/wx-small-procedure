Page({
  data: {
    myAudioSrc: 'http://m801.music.126.net/20211231003819/db4337134c3fdfb512d9847e3351f6aa/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/5198607933/cf1c/e0ed/917c/c9942294cbfe88f24f8e7b4ea62e3f2a.mp3',
    musicClass: 'music_box',
    showMusic: true,
    musicStop: false,
    innerAudioContext: null,
    self: {},
    timer: null,
    pageY: 0,
    showWelcome: false,
    isToWish: false,
    showWish: false,
    isToFireworks: false,
    showFireWorks: false,
    showHiText: false,
    showGirlText: false,
    showHappyNewYearText: false,
    showNextBtnText: false,
    showNewYearText: false,
    showLuckyText: false,
    showArriveText: false,
    showToFireworksBtn: false
  },
  onShow() {
    this.setData({
      showWelcome: true
    })
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.loop = true
    innerAudioContext.src = this.data.myAudioSrc
    innerAudioContext.onPlay(() => {})
    innerAudioContext.onError((res) => {
      this.setData({
        musicStop: true,
        showMusic: false
      })
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    this.setData({
      innerAudioContext
    })
  },
  stopMusic() {
    if (this.data.musicStop) {
      this.data.innerAudioContext.play()
      this.setData({
        musicStop: false
      })
    } else {
      this.data.innerAudioContext.pause()
      this.setData({
        musicStop: true
      })
    }
  },
  showHi() {
    this.setData({
      showHiText: true
    })
  },
  showGirl() {
    this.setData({
      showGirlText: true
    })
  },
  showHappyNewYear() {
    this.setData({
      showHappyNewYearText: true
    })
  },
  showNextBtn() {
    this.setData({
      showNextBtnText: true,
      isToWish: true
    })
  },
  toWelcome() {
    this.setData({
      showWelcome: true,
      isToWish: false,
      showWish: false,
      showFireWorks: false,
      showHiText: false,
      showGirlText: false,
      showHappyNewYearText: false,
      showNextBtnText: false,
      showNewYearText: false,
      showLuckyText: false,
      showArriveText: false,
      showToFireworksBtn: false
    })
  },
  showNewYear() {
    // 显示新的一年
    this.setData({
      showNewYearText: true
    })
  },
  showLucky() {
    this.setData({
      showLuckyText: true
    })
  },
  showArrive() {
    this.setData({
      showArriveText: true
    })
  },
  showToFireworks() {
    this.setData({
      isToFireworks: true,
      showToFireworksBtn: true
    })
  },
  playFireworks(e) {
    var rand = function (rMi, rMa) {
      return ~~((Math.random() * (rMa - rMi + 1)) + rMi);
    }
    const self = this.data.self;
    self.mx = e.touches[0].x - 0;
    self.my = e.touches[0].y - 0;
    self.currentHue = rand(self.hueMin, self.hueMax);
    self.createFireworks(self.cw / 2, self.ch, self.mx, self.my);
  },
  loadFireworks() {
    const query = wx.createSelectorQuery()
    query.select('#fireworks')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const rand = function (rMi, rMa) {
          return ~~((Math.random() * (rMa - rMi + 1)) + rMi);
        }
        const hitTest = function (x1, y1, w1, h1, x2, y2, w2, h2) {
          return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);
        };
        const requestAnimFrame = function (a) {
          setTimeout(a, 1E3 / 60)
        };
        const self = this.data.self;
        const that = this;
        const systemInfo = wx.getSystemInfoSync()
        self.canvas = res[0].node
        self.ctx = self.canvas.getContext('2d')
        self.cw = systemInfo.screenWidth
        self.ch = systemInfo.screenHeight
        self.canvas.width = systemInfo.screenWidth
        self.canvas.height = systemInfo.screenHeight

        self.particles = [];
        self.partCount = 150;
        self.fireworks = [];
        self.mx = self.cw / 2;
        self.my = self.ch / 2;
        self.currentHue = 30;
        self.partSpeed = 5;
        self.partSpeedVariance = 10;
        self.partWind = 50;
        self.partFriction = 5;
        self.partGravity = 1;
        self.hueMin = 0;
        self.hueMax = 360;
        self.fworkSpeed = 4;
        self.fworkAccel = 10;
        self.hueVariance = 30;
        self.flickerDensity = 25;
        self.showShockwave = true;
        self.showTarget = false;
        self.clearAlpha = 25;

        self.ctx.lineCap = 'round';
        self.ctx.lineJoin = 'round';
        self.lineWidth = 1;

        self.createParticles = function (x, y, hue) {
          var countdown = self.partCount;
          while (countdown--) {
            var newParticle = {
              x: x,
              y: y,
              coordLast: [{
                  x: x,
                  y: y
                },
                {
                  x: x,
                  y: y
                },
                {
                  x: x,
                  y: y
                }
              ],
              angle: rand(0, 360),
              speed: rand(((self.partSpeed - self.partSpeedVariance) <= 0) ? 1 : self.partSpeed - self.partSpeedVariance, (self.partSpeed + self.partSpeedVariance)),
              friction: 1 - self.partFriction / 100,
              gravity: self.partGravity / 2,
              hue: rand(hue - self.hueVariance, hue + self.hueVariance),
              brightness: rand(50, 80),
              alpha: rand(40, 100) / 100,
              decay: rand(10, 50) / 1000,
              wind: (rand(0, self.partWind) - (self.partWind / 2)) / 25,
              lineWidth: self.lineWidth
            };
            self.particles.push(newParticle);
          }
        };

        self.updateParticles = function () {
          var i = self.particles.length;
          while (i--) {
            var p = self.particles[i];
            var radians = p.angle * Math.PI / 180;
            var vx = Math.cos(radians) * p.speed;
            var vy = Math.sin(radians) * p.speed;
            p.speed *= p.friction;

            p.coordLast[2].x = p.coordLast[1].x;
            p.coordLast[2].y = p.coordLast[1].y;
            p.coordLast[1].x = p.coordLast[0].x;
            p.coordLast[1].y = p.coordLast[0].y;
            p.coordLast[0].x = p.x;
            p.coordLast[0].y = p.y;

            p.x += vx;
            p.y += vy;
            p.y += p.gravity;

            p.angle += p.wind;
            p.alpha -= p.decay;

            if (!hitTest(0, 0, self.cw, self.ch, p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2) || p.alpha < .05) {
              self.particles.splice(i, 1);
            }
          };
        };

        self.drawParticles = function () {
          var i = self.particles.length;
          while (i--) {
            var p = self.particles[i];

            var coordRand = (rand(1, 3) - 1);
            self.ctx.beginPath();
            self.ctx.moveTo(Math.round(p.coordLast[coordRand].x), Math.round(p.coordLast[coordRand].y));
            self.ctx.lineTo(Math.round(p.x), Math.round(p.y));
            self.ctx.closePath();
            var randAlpha = rand(50, 100) / 100;
            var red = rand(0, 255);
            var green = rand(0, 255);
            var blue = rand(0, 255);
            self.ctx.fillStyle = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + randAlpha + ')';
            self.ctx.stroke();

            if (self.flickerDensity > 0) {
              var inverseDensity = 50 - self.flickerDensity;
              if (rand(0, inverseDensity) === inverseDensity) {
                self.ctx.beginPath();
                self.ctx.arc(Math.round(p.x), Math.round(p.y), rand(p.lineWidth, p.lineWidth + 3) / 2, 0, Math.PI * 2, false)
                self.ctx.closePath();
                self.ctx.fillStyle = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + randAlpha + ')';

                self.ctx.fill();
              }
            }
          };
        };


        self.createFireworks = function (startX, startY, targetX, targetY) {
          var newFirework = {
            x: startX,
            y: startY,
            startX: startX,
            startY: startY,
            hitX: false,
            hitY: false,
            coordLast: [{
                x: startX,
                y: startY
              },
              {
                x: startX,
                y: startY
              },
              {
                x: startX,
                y: startY
              }
            ],
            targetX: targetX,
            targetY: targetY,
            speed: self.fworkSpeed,
            angle: Math.atan2(targetY - startY, targetX - startX),
            shockwaveAngle: Math.atan2(targetY - startY, targetX - startX) + (90 * (Math.PI / 180)),
            acceleration: self.fworkAccel / 100,
            hue: self.currentHue,
            brightness: rand(50, 80),
            alpha: rand(50, 100) / 100,
            lineWidth: self.lineWidth
          };
          self.fireworks.push(newFirework);
        };

        self.updateFireworks = function () {
          var i = self.fireworks.length;

          while (i--) {
            var f = self.fireworks[i];
            self.ctx.lineWidth = f.lineWidth;

            const vx = Math.cos(f.angle) * f.speed;
            const vy = Math.sin(f.angle) * f.speed;
            f.speed *= 1 + f.acceleration;
            f.coordLast[2].x = f.coordLast[1].x;
            f.coordLast[2].y = f.coordLast[1].y;
            f.coordLast[1].x = f.coordLast[0].x;
            f.coordLast[1].y = f.coordLast[0].y;
            f.coordLast[0].x = f.x;
            f.coordLast[0].y = f.y;

            if (f.startX >= f.targetX) {
              if (f.x + vx <= f.targetX) {
                f.x = f.targetX;
                f.hitX = true;
              } else {
                f.x += vx;
              }
            } else {
              if (f.x + vx >= f.targetX) {
                f.x = f.targetX;
                f.hitX = true;
              } else {
                f.x += vx;
              }
            }

            if (f.startY >= f.targetY) {
              if (f.y + vy <= f.targetY) {
                f.y = f.targetY;
                f.hitY = true;
              } else {
                f.y += vy;
              }
            } else {
              if (f.y + vy >= f.targetY) {
                f.y = f.targetY;
                f.hitY = true;
              } else {
                f.y += vy;
              }
            }

            if (f.hitX && f.hitY) {
              self.createParticles(f.targetX, f.targetY, f.hue);
              self.fireworks.splice(i, 1);
            }
          };
        };

        self.drawFireworks = function () {
          var i = self.fireworks.length;
          self.ctx.globalCompositeOperation = 'lighter';
          while (i--) {
            var f = self.fireworks[i];
            self.ctx.lineWidth = f.lineWidth;

            var coordRand = (rand(1, 3) - 1);
            self.ctx.beginPath();
            self.ctx.moveTo(Math.round(f.coordLast[coordRand].x), Math.round(f.coordLast[coordRand].y));
            self.ctx.lineTo(Math.round(f.x), Math.round(f.y));
            self.ctx.closePath();
            var randAlpha = rand(50, 100) / 100;
            var red = rand(0, 255);
            var green = rand(0, 255);
            var blue = rand(0, 255);
            self.ctx.strokeStyle = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + randAlpha + ')';
            self.ctx.stroke();

            if (self.showTarget) {
              self.ctx.save();
              self.ctx.beginPath();
              self.ctx.arc(Math.round(f.targetX), Math.round(f.targetY), rand(1, 8), 0, Math.PI * 2, false)
              self.ctx.closePath();
              self.ctx.lineWidth = 1;
              self.ctx.stroke();
              self.ctx.restore();
            }

            if (self.showShockwave) {
              self.ctx.save();
              self.ctx.translate(Math.round(f.x), Math.round(f.y));
              self.ctx.rotate(f.shockwaveAngle);
              self.ctx.beginPath();
              self.ctx.arc(0, 0, 1 * (f.speed / 5), 0, Math.PI, true);
              var randAlpha = rand(50, 100) / 100;
              var red = rand(0, 255);
              var green = rand(0, 255);
              var blue = rand(0, 255);
              self.ctx.strokeStyle = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + randAlpha + ')';
              self.ctx.lineWidth = f.lineWidth;
              self.ctx.stroke();
              self.ctx.restore();
            }
          };
        };

        self.canvasLoop = function () {
          requestAnimFrame(self.canvasLoop, self.canvas);
          self.ctx.globalCompositeOperation = 'destination-out';
          self.ctx.fillStyle = 'rgba(0,0,0,' + self.clearAlpha / 100 + ')';
          self.ctx.fillRect(0, 0, self.cw, self.ch);
          self.updateFireworks();
          self.updateParticles();
          self.drawFireworks();
          self.drawParticles();
          that.setData({
            self: self
          })
        };
        that.setData({
          self: self
        })
        self.canvasLoop();

        const timer = setInterval(function () {
          self.createFireworks(375 / 2, 812, rand(30, 360), rand(10, 400));
        }, 1000)
        that.setData({
          timer
        })
      })
  },
  toFireworks() {
    if (!this.data.isToFireworks) return
    this.setData({
      isToFireworks: false,
      showWish: false,
      showFireWorks: true,
      showNewYearText: false,
      showLuckyText: false,
      showArriveText: false,
      showToFireworksBtn: false
    })
    this.loadFireworks()
  },
  toWish() {
    if (!this.data.isToWish) return
    this.setData({
      showWish: true,
      showWelcome: false,
      showHiText: false,
      showGirlText: false,
      showHappyNewYearText: false,
    })
  },
  touchScreenStart(e) {
    const pageY = e.changedTouches[0].y || e.changedTouches[0].pageY
    this.setData({
      pageY
    })
  },
  touchScreenEnd(e) {
    const pageY = e.changedTouches[0].y || e.changedTouches[0].pageY
    if (pageY > this.data.pageY) {
      if (this.data.showWish) {
        // 祝福页下拉
        if (pageY - this.data.pageY > 100) {
          this.toWelcome()
        }
        return
      }
      if (this.data.showFireWorks) {
        // 烟花页下拉
        if (pageY - this.data.pageY > 100) {
          if (this.data.timer) {
            clearInterval(this.data.timer)
          }
          this.setData({
            showFireWorks: false,
            showWish: true,
            showNewYearText: false,
            showLuckyText: false,
            showArriveText: false,
            timer: null
          })
        }
      }
    } else {
      if (this.data.showWelcome) {
        // 欢迎页上滑
        this.toWish()
        return
      }
      if (this.data.showWish && this.data.pageY - pageY > 100) {
        this.toFireworks()
      }
    }
  }
})