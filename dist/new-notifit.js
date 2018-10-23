;(function(global) {

  function Notif(options) {
    return new Notif.init(options)
  }

  var defaults = {
    type: 'default',
    position: 'right',
    msg: 'Huston, we\'ve got a problem.',
    opacity: 1,
    zindex: null,
    callback: null,
    clickable: false
  }

  Notif.prototype = {
    version: '1.0.0',
    constructor: Notif,

    // ... prototype methods
    construct: function() {
      var id = 'notifit-' + Date.now()
      var div = document.createElement('div')
      div.id = id
    }
  }

  Notif.init = function(options) {
    // ... constructor function
    var self = this
    var config = options || defaults
  }

  Notif.init.prototype = Notif.prototype

  // finally expose the `Notif` function globally
  global.Notif = Notif
}(window))