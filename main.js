const glados = async () => {
  const cookie = process.env.GLADOS
  if (!cookie) {
    console.error('GLADOS secret is not configured')
    return
  }

  try {
    const headers = {
      cookie,
      referer: 'https://glados.cloud',
      'user-agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
    }

    const checkinResponse = await fetch('https://glados.cloud/api/user/checkin', {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: '{"token":"glados.cloud"}',
    })
    const checkin = await checkinResponse.json()
    console.log(`签到接口 HTTP 状态码: ${checkinResponse.status}`)
    console.log('签到接口响应:', JSON.stringify(checkin))

    const statusResponse = await fetch('https://glados.cloud/api/user/status', {
      method: 'GET',
      headers,
    })
    const status = await statusResponse.json()
    console.log(`状态接口 HTTP 状态码: ${statusResponse.status}`)
    console.log('状态接口响应:', JSON.stringify(status))

    return [
      'Checkin OK',
      `${checkin.message}`,
      `Left Days ${Number(status.data.leftDays)}`,
    ]
  } catch (error) {
    console.error('签到请求失败:', error)
    return [
      'Checkin Error',
      `${error}`,
      `<${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}>`,
    ]
  }
}

const notify = async (contents) => {
  const token = process.env.NOTIFY
  if (!token || !contents) {
    if (!token) console.log('NOTIFY secret is not configured; skip notification')
    if (!contents) console.log('没有可发送的签到结果')
    return
  }

  const response = await fetch('https://www.pushplus.plus/send', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      token,
      title: contents[0],
      content: contents.join('<br>'),
      template: 'markdown',
    }),
  })

  console.log(`PushPlus 通知 HTTP 状态码: ${response.status}`)
  console.log('PushPlus 通知响应:', await response.text())
}

const main = async () => {
  console.log('开始执行签到任务')
  const result = await glados()

  if (result) {
    console.log('最终签到结果:', result.join(' | '))
  } else {
    console.log('未生成签到结果')
  }

  await notify(result)
  console.log('签到任务执行完成')
}

main().catch((error) => {
  console.error('执行失败:', error)
  process.exitCode = 1
})
