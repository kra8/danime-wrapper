
window.addEventListener('load', () => {
  // danime の popupLogin ログインが正常に動作しないので、それの回避策
  window.popupLogin = window.appLogin

  // ipcにて値を連携
  const userID = window.getCookieParam('user_id')
  const ipcRenderer = require('electron').ipcRenderer;
  ipcRenderer.sendToHost('pong', userID);
})
