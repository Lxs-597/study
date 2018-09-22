import './index.scss'
console.log('hello webpack')
document.getElementById('app')
  .textContent = 'aaabbbcccddd'


// 热更新
if (module.hot) {
  module.hot.accept()
}