/*
 * @Author: Lqf
 * @Date: 2022-01-09 20:28:29
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-09 20:49:17
 * @Description: 我添加了修改
 */

const queue: any[] = []

let isFlushPending = false
let p = Promise.resolve()

export function nextTick(fn) {
  return fn ? p.then(fn) : p
}

export function queueJobs(job) {
  if (!queue.includes(job)) {
    queue.push(job)
  }

  queueFlush()
}

function queueFlush() {
  if (isFlushPending) return
  isFlushPending = true

  nextTick(flushJobs)
}

function flushJobs() {
  isFlushPending = false
  let job
  while ((job = queue.shift())) {
    job && job()
  }
}
