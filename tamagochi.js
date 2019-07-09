function Tamagochi (nickname = 'tamagochi') {
  this.nickname = nickname

  this.satiety = 100
  this.changeSatiety = (value) => {
    this.satiety += value
    if (this.satiety > 100) this.satiety = 100
  }

  this.mood = 50
  this.changeMood = (value) => {
    this.mood += value
    if (this.mood > 100) this.mood = 100
  }

  this.sleep = 100
  this.changeSleep = (value) => {
    this.sleep += value
    if (this.sleep > 100) this.sleep = 100
  }

  this.water = 100
  this.changeWater = (value) => {
    this.water += value
    if (this.water > 100) this.water = 100
  }

  this.goWalk = () => {
    console.log(`${this.nickname} is walking now...`)
    return new Promise(resolve => {
      setTimeout(() => {
        this.changeMood(30)
        this.changeSleep(-10)
        this.changeSatiety(-20)
        resolve(this.getStatus())
      }, 2000)
    })
  }

  this.changeNickname = (nickname) => {
    this.nickname = nickname
    return `Now your tamagochi nickname is ${this.nickname}`
  }

  this.getStatus = () => {
    return `Status of ${nickname}:
  -satiety: ${this.satiety}%
  -mood: ${this.mood}%
  -sleep: ${this.sleep}%
  -water: ${this.water}%`
  }

  this.goToSleep = () => {
    console.log(`${this.nickname} is sleeping now...`)
    return new Promise(resolve => {
      setTimeout(() => {
        this.changeSleep(60)
        this.changeWater(-20)
        resolve(this.getStatus())
      }, 4000)
    })
  }

  this.drink = () => {
    this.changeWater(30)
    return this.getStatus()
  }
}

const jordan = new Tamagochi('Jordan')

console.log(jordan.getStatus())
jordan.goWalk().then(result => {
  console.log(result)
})
console.log(jordan.drink())
