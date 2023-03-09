import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { defineNuxtPlugin } from '#app'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('dayjs', dayjs)
})

declare module '#app' {
  interface NuxtApp {
    $dayjs: typeof dayjs
 }
}