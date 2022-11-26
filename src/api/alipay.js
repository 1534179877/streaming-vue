import ajax from './ajax'

export const alipay = (data) => ajax('/pay/alipay', data, 'post')

export const checkpay = (data) => ajax('/pay/paycallback', data, 'post')

export const sendgift = (data) => ajax('/live/sendgift', data, 'post')
