const Vue = require('../../lib/vue')
const $ = require('../../lib/jquery')

var vm = new Vue({
  mounted () {
    $('#settings').html('settings')
  }
}).$mount('#app')
