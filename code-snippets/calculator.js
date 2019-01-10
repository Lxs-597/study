const toNumber = val => {
  let num = parseFloat(val)

  return isNaN(num) ? val : num
}

const isNumber = val => typeof val === 'number'

const getDecimalLength = num => {
  const interception = num.toString().split('.')[1]
  return interception ? interception.length : 0
}

const convertDecimal = decimal => +decimal.toString().replace('.', '').replace(/^0+/, '')

const createCalculator = () => {
  class Calculation {
    static validateParameters(params) {
      if (!params.length) return 0

      const isVerificationBy = params.every(param => isNumber(toNumber(param)))

      if (!isVerificationBy) throw new Error('包含不能转换为数字的参数')
    }

    addition(...args) {
      Calculation.validateParameters(args)

      const power = 10 ** Math.max(...args.map(getDecimalLength))
      const result = args.reduce((init, arg) => init + this.multiply(arg, power), 0)

      return result / power
    }

    subtraction(reduction, minuend) {
      Calculation.validateParameters([reduction, minuend])
    }

    multiply(...args) {
      Calculation.validateParameters(args)

      if (args.length === 1) return args[0]

      let power = 0
      let product = 1

      for (let i = 0; i < args.length; i++) {
        power += getDecimalLength(args[i])
        product *= convertDecimal(args[i])
      }

      return product / 10 ** power
    }

    division(divisor, dividend) {
      Calculation.validateParameters([divisor, dividend])

      if (toNumber(dividend) === 0) throw new Error('被除数不能为0')

      const power = 10 ** (getDecimalLength(dividend) - getDecimalLength(divisor))

      return convertDecimal(divisor) / convertDecimal(dividend) * power
    }
  }

  return new Calculation()
}

const caculator = createCalculator()

let result = caculator.addition(0.1, 0.2)
let result1 = caculator.multiply(0.1, 0.2)
let result2 = caculator.division(0.05, 0.0)

console.log(result)
console.log(result1)
console.log(result2)
