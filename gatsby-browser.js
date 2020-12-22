// Highlighting for code blocks
const path = require('path')
require('./src/common/less/bootstrap.less')
require('prism-themes/themes/prism-vsc-dark-plus.css')
// eslint-disable-next-line
const insertColorLess = () => {
  var link = document.createElement(`link`)
  link.type = `text/css`
  link.rel = `stylesheet/less`
  link.href = path.join(__dirname, './public/static/color.less')
  //rel="stylesheet"
  document.getElementsByTagName(`head`)[0].appendChild(link)
}
// eslint-disable-next-line
const injectLessScript = () => {
  function addJS(jsCode) {
    var script = document.createElement(`script`)
    script.type = `text/javascript`
    script.innerHTML = jsCode
    document.getElementsByTagName(`head`)[0].appendChild(script)
  }
  addJS(`
     window.less = {
        async: true,
        env: 'production'
      };
    `)
  addJS(`
      window.lessjs = (function(doc, script, id) {
        var js, fjs = doc.getElementsByTagName(script)[0], t = window.lessjs || {};
        if (doc.getElementById(id)) return lessjs;
        js = doc.createElement(script);
        js.id = id;
        js.src = "https://cdn.bootcdn.net/ajax/libs/less.js/2.7.2/less.min.js";
        fjs.parentNode.appendChild(js, fjs);
        t._e = [];
        t.ready = function(f) {
          t._e.push(f);
        };
        return t;
      })(document, "script", "lessjs");
    `)
}
let injectedLessScript = false

exports.onRouteUpdate = () => {
  if (!injectedLessScript) {
    // insertColorLess()
    // injectLessScript()
    injectedLessScript = true
  }
}
