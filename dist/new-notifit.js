;(function(global, document) {

  function Notif(options) {
    return new Notif.init(options)
  }

  var _docWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

  var _defaults = {
    type: 'default',
    position: 'right',
    msg: 'Huston, we\'ve got a problem.',
    selector: 'body',
    opacity: 1,
    zindex: null,
    callback: null,
    clickable: false
  }

  var _id = 'notifit-' + Date.now()

  var _elem = {}

  var _config = {}

  var _types = ['default', 'error', 'info', 'warning']

  var _positions = ['left', 'center', 'right']

  function _addClass(elem, cls) {
    if(elem.classList) {
      elem.classList.add(cls)
    } else {
      elem.className += ' ' + cls
    }
    return this
  }

  function _construct(config) {
    // get the selector provided as a container
    var container = document.querySelector(config.selector)
    // create a `div`
    var div = document.createElement('div')
    div.id = _id
    // create a `p`
    var p = document.createElement('p')
    p.innerHTML = config.msg
    // put the `p` inside the `div`
    div.appendChild(p)
    // finally append it to the selector
    container.appendChild(div)
    // vanilla css
    _addClass(div, 'notifit')
    // assign the type based class provided by config
    if(_types.indexOf(config.type) !== -1) {
      _addClass(div, config.type)
    }
    // assign it to the private var to refer to it later
    _elem = div
  }

  Notif.prototype = {
    version: '1.0.0',
    constructor: Notif,

    // ... prototype methods
    style: function(propsObj) {
      for(cssprop in propsObj) {
        _elem.style[cssprop] = propsObj[cssprop]
      }
      return this
    },

    position: function(pos) {
      var styles = {}
      var notifWidth = parseFloat(window.getComputedStyle(_elem).getPropertyValue('width'))
      if(_positions.indexOf(pos) !== -1) {
        if(pos === 'center') {
          styles.left = parseInt((_docWidth / 2) - (notifWidth / 2), 10) + 'px'
        } else {
          styles[_config.position] = 10 + 'px'
        }
        this.style(styles)
      }
      return this
    },

    show: function() {
      // TODO: check if the notif object already exists
      _construct(_config)
      return this
    },

    dismiss: function() {
      _elem.parentNode.removeChild(_elem)
      return this
    },

    type: function(cls) {
      if(_types.indexOf(cls) !== -1) {
        _addClass(_elem, cls)
      }
      return this
    }

    // ... expose events (how to?)
  }

  Notif.init = function(options) {
    // merge the provided options with defaults
    var config = Object.assign(_defaults, options)
    // construct the element
    _construct(config)
    // assign config to the private variable for later use
    _config = config
  }

  Notif.init.prototype = Notif.prototype

  // finally expose the `Notif` function globally
  global.Notif = Notif
}(window, document))