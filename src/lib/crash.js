import Crypto from 'crypto-js'

export default class CrashLib {
  hmac (key, v) {
    var hmacHasher = Crypto.algo.HMAC.create(Crypto.algo.SHA256, key)
    return hmacHasher.finalize(v).toString()
  }

  calculateCrashPoint (seed) {
    var hash = this.hmac(seed, '000000000000000007a9a31ff7f07463d91af6b5454241d5faf282e5e0fe1b3a')
    // In 4 of 100 games the game crashes instantly.
    if (this.divisible(hash, 20)) {
      return 100
    }

    // Use the most significant 52-bit from the hash to calculate the crash point
    var h = parseInt(hash.slice(0, 52 / 4), 16)
    var e = Math.pow(2, 52)

    return Math.floor(((e - h / 50) / (e - h)) * 100)
  }

  divisible (hash, mod) {
    // So ABCDEFGHIJ should be chunked like  AB CDEF GHIJ
    // Considere le hash comme un grand nombre hexadecimal
    // Calcule si ce grand nombre est divisible par mod
    // decoupe le hash quatre par quatre et calcule si c'est modulo
    var val = 0

    var o = hash.length % 4
    for (let i = o > 0 ? o - 4 : 0; i < hash.length; i += 4) {
      val = ((val << 16) + parseInt(hash.substring(i, i + 4), 16)) % mod
    }
    return val === 0
  }
}
