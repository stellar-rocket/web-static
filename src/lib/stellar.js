
export default class Stellar {
  moneyFactor () {
    return 10000000
  }

  formatLumens (stroops) {
    // 1 stroop = 0.0000001 lumen
    // 1 lumen = 10000000 stroop

    let format = window.localStorage.getItem('params:formatLumens') || 'stroops'

    let limit = (this.moneyFactor()) / 100

    let text
    if (format === 'lumens') {
      text = `${Math.floor(stroops / limit) / 100} Lumens`
    } else {
      text = `${stroops} Stroops`
    }

    return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  getUnit () {
    return window.localStorage.getItem('params:formatLumens') || 'stroops'
  }
}
