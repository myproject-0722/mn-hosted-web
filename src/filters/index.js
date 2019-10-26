import moment from 'moment'
import { stringify } from 'querystring';
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter (num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * 时间格式化
 * @param {String} value
 */
export function timeFormat (value) {
  return value === null ? '' : moment(value).format('YYYY-MM-DD HH:mm:ss')
}

export function dateFormat (value) {
  return value === null ? '' : moment(value).format('YYYY-MM-DD')
}

/**
 * 返回节点安装状态
 * @param {number} step
 */
export function nodeStep (step) {
  let status = ''
  switch (true) {
    case step === 0 || step === '0':
      status = '初始化'
      break
    case step === 1 || step === '1':
      status = '创建VPS'
      break
    case step === 2 || step === '2':
      status = '配置环境'
      break
    case step === 3 || step === '3':
      status = '启动程序'
      break
    case step === 4 || step === '4':
      status = '同步区块'
      break
    case step === 100 || step === '100':
      status = '安装完成'
      break
    default:
      status = '未知'
      break
  }
  return status
}

/**
 * 支付方式
 * @param {number} val
 */
export function payWay (val) {
  let status = ''
  switch (true) {
    case val === -1 || val === '-1':
      status = '预消费'
      break
    case val === 1 || val === '1':
      status = '支付宝'
      break
    case val === 2 || val === '2':
      status = '微信'
      break
    case val === 3 || val === '3':
      status = '余额'
      break
    default:
      status = '未知'
      break
  }
  return status
}

/**
 * 支付状态
 * @param {number} val
 */
export function payStatus (val) {
  let status = ''
  switch (true) {
    case val === 0 || val === '0':
      status = '待支付'
      break
    case val === 1 || val === '1':
      status = '已支付'
      break
    case val === -1 || val === '-1':
      status = '已取消'
      break
    case val === -2 || val === '-2':
      status = '已失效'
      break
    default:
      status = '未知'
      break
  }
  return status
}

/**
 * 结算方式
 * @param {number} val
 */
export function productType (val) {
  let status = ''
  switch (true) {
    case val === 0 || val === '0':
      status = '按天'
      break
    case val === 1 || val === '1':
      status = '按月'
      break
    case val === 2 || val === '2':
      status = '按年'
      break
    default:
      status = '未知'
      break
  }
  return status
}

/**
 * 基金类型
 * @param {number} val
 */
export function fundType (val) {
  let status = ''
  switch (true) {
    case val === 1 || val === '1':
      status = '绩效基金'
      break
    case val === 2 || val === '2':
      status = '生态基金'
      break
    case val === 3 || val === '3':
      status = '技术基金'
      break
    default:
      status = '未知类型'
      break
  }
  return status
}

/**
 * JSON转String
 * @param {JSON} val 
 */
export function map2String(val) {
  if(val != null && val != ''){
    return stringify(val)
  }else {
    return null
  }
}