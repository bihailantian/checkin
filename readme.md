# Checkin

GitHub Actions 实现 [GLaDOS][glados] 自动签到



## 使用说明

1. Fork 这个仓库

1. 登录 [GLaDOS][glados] 获取 [Cookie][cookie]

   1.打开 GLaDOS 签到页面 打开浏览器「开发者工具」(快捷键 F12 或 Ctrl+Shift+I), 切换到「网络 Network」

   2.点击一下GLODOS页面的签到，然后在标签页 找到名字为 status 这一行, 点击打开详情, 在「请求头 Request」找到 Cookie, 格式类似 koa:sess=xxxxxx; koa:sess.sig=xxxxxx, 复制出来备用

1. 添加 Cookie 到 Secret `GLADOS`

   打开 GitHub 仓库设置 Settings → Secrets and variables → Actions → New repository secret, 按照提示填写完成后保存

   Name: GLADOS

   Secret: 前面获取的 GLaDOS Cookie 值


1. 启用 Actions, 每天北京时间 00:10 自动签到

1. 如需推送通知, 可用 [PushPlus][pushplus], 添加 Token 到 Secret `NOTIFY`

[glados]: https://github.com/glados-network/GLaDOS
[pushplus]: https://www.pushplus.plus/
[cookie]:https://blog.csdn.net/xiaoxian666/article/details/136748500
