const toNumber = val => {
  let num = parseFloat(val)

  return isNaN(num) ? val : num
}

const isNumber = val => typeof val === 'number'

const getDecimalLength = num => {
  const interception = num.toString().split('.')[1]
  return interception ? interception.length : 0
}

const createCalculator = () => {
  class Calculation {
    static validateParameters(params) {
      if (!params.length) return 0

      const isVerificationBy = params.every(param => isNumber(toNumber(param)))

      if (!isVerificationBy) throw new Error('包含不能转换为数字的参数')
    }

    addition(...args) {
      Calculation.validateParameters(args)
    }

    multiply(...args) {
      Calculation.validateParameters(args)

      if (args.length === 1) return args[0]

      let power = 0
      let product = 1

      for (let i = 0; i < args.length; i++) {
        const temp = args[i].toString()

        power += getDecimalLength(args[i])
        product *= Number(temp.replace('.', ''))
      }

      return product / 10 ** power
    }
  }

  return new Calculation()
}

const caculator = createCalculator()

let result = caculator.multiply(2.01, 100, '1.1')

console.log(result)
console.log(2.01 * 100)

