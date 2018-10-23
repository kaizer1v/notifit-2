;(function(global, document) {

  function Notif(options) {
    return new Notif.init(options)
  }

  var defaults = {
    type: 'default',
    position: 'right',
    msg: 'Huston, we\'ve got a problem.',
    selector: 'body',
    opacity: 1,
    zindex: null,
    callback: null,
    clickable: false
  }

  var id = 'notifit-' + Date.now()

  var elem = {}

  function addClass(elem, cls) {
    if(elem.classList) {
      elem.classList.add(cls)
    } else {
      elem.className += ' ' + cls
    }
    return this
  }

  function construct(config) {
    // get the selector provided as a container
    var container = document.querySelector(config.selector)
    // create a `div`
    var div = document.createElement('div')
    div.id = id
    // create a `p`
    var p = document.createElement('p')
    p.innerHTML = config.msg
    // put the `p` inside the `div`
    div.appendChild(p)
    // finally append it to the selector
    container.appendChild(div)
    // add some css
    addClass(div, 'notifit')
    // assign it to the private var to refer to it later
    elem = div
  }

  Notif.prototype = {
    version: '1.0.0',
    constructor: Notif,

    // ... prototype methods
    setStyle: function(styles) {
      for(cssprop in styles) {
        elem.style[cssprop] = styles[cssprop]
      }
      return this
    },

    dimiss: function() {
      elem.parentNode.removeChild(elem)
      return this
    },

    // ... expose events (how to?)
  }

  Notif.init = function(options) {
    // merge the provided options with defaults
    var config = Object.assign(defaults, options)

    // construct the element
    construct(config)
  }

  Notif.init.prototype = Notif.prototype

  // finally expose the `Notif` function globally
  global.Notif = Notif
}(window, document))