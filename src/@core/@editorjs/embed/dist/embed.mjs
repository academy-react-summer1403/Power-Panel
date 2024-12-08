(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode('.embed-tool--loading .embed-tool__caption{display:none}.embed-tool--loading .embed-tool__preloader{display:block}.embed-tool--loading .embed-tool__content{display:none}.embed-tool__preloader{display:none;position:relative;height:200px;box-sizing:border-box;border-radius:5px;border:1px solid #e6e9eb}.embed-tool__preloader:before{content:"";position:absolute;z-index:3;left:50%;top:50%;width:30px;height:30px;margin-top:-25px;margin-left:-15px;border-radius:50%;border:2px solid #cdd1e0;border-top-color:#388ae5;box-sizing:border-box;animation:embed-preloader-spin 2s infinite linear}.embed-tool__url{position:absolute;bottom:20px;left:50%;transform:translate(-50%);max-width:250px;color:#7b7e89;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.embed-tool__content{width:100%}.embed-tool__caption{margin-top:7px}.embed-tool__caption[contentEditable=true][data-placeholder]:before{position:absolute;content:attr(data-placeholder);color:#707684;font-weight:400;opacity:0}.embed-tool__caption[contentEditable=true][data-placeholder]:empty:before{opacity:1}.embed-tool__caption[contentEditable=true][data-placeholder]:empty:focus:before{opacity:0}@keyframes embed-preloader-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}')),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
const g = {
  vimeo: {
    regex: /(?:http[s]?:\/\/)?(?:www.)?(?:player.)?vimeo\.co(?:.+\/([^\/]\d+)(?:#t=[\d]+)?s?$)/,
    embedUrl: "https://player.vimeo.com/video/<%= remote_id %>?title=0&byline=0",
    html: '<iframe style="width:100%;" height="320" frameborder="0"></iframe>',
    height: 320,
    width: 580
  },
  youtube: {
    regex: /(?:https?:\/\/)?(?:www\.)?(?:(?:youtu\.be\/)|(?:youtube\.com)\/(?:v\/|u\/\w\/|embed\/|watch))(?:(?:\?v=)?([^#&?=]*))?((?:[?&]\w*=\w*)*)/,
    embedUrl: "https://www.youtube.com/embed/<%= remote_id %>",
    html: '<iframe style="width:100%;" height="320" frameborder="0" allowfullscreen></iframe>',
    height: 320,
    width: 580,
    id: ([o, t]) => {
      if (!t && o)
        return o;
      const i = {
        start: "start",
        end: "end",
        t: "start",
        // eslint-disable-next-line camelcase
        time_continue: "start",
        list: "list"
      };
      return t = t.slice(1).split("&").map((e) => {
        const [s, n] = e.split("=");
        return !o && s === "v" ? (o = n, null) : !i[s] || n === "LL" || n.startsWith("RDMM") || n.startsWith("FL") ? null : `${i[s]}=${n}`;
      }).filter((e) => !!e), o + "?" + t.join("&");
    }
  },
  coub: {
    regex: /https?:\/\/coub\.com\/view\/([^\/\?\&]+)/,
    embedUrl: "https://coub.com/embed/<%= remote_id %>",
    html: '<iframe style="width:100%;" height="320" frameborder="0" allowfullscreen></iframe>',
    height: 320,
    width: 580
  },
  vine: {
    regex: /https?:\/\/vine\.co\/v\/([^\/\?\&]+)/,
    embedUrl: "https://vine.co/v/<%= remote_id %>/embed/simple/",
    html: '<iframe style="width:100%;" height="320" frameborder="0" allowfullscreen></iframe>',
    height: 320,
    width: 580
  },
  imgur: {
    regex: /https?:\/\/(?:i\.)?imgur\.com.*\/([a-zA-Z0-9]+)(?:\.gifv)?/,
    embedUrl: "http://imgur.com/<%= remote_id %>/embed",
    html: '<iframe allowfullscreen="true" scrolling="no" id="imgur-embed-iframe-pub-<%= remote_id %>" class="imgur-embed-iframe-pub" style="height: 500px; width: 100%; border: 1px solid #000"></iframe>',
    height: 500,
    width: 540
  },
  gfycat: {
    regex: /https?:\/\/gfycat\.com(?:\/detail)?\/([a-zA-Z]+)/,
    embedUrl: "https://gfycat.com/ifr/<%= remote_id %>",
    html: `<iframe frameborder='0' scrolling='no' style="width:100%;" height='436' allowfullscreen ></iframe>`,
    height: 436,
    width: 580
  },
  "twitch-channel": {
    regex: /https?:\/\/www\.twitch\.tv\/([^\/\?\&]*)\/?$/,
    embedUrl: "https://player.twitch.tv/?channel=<%= remote_id %>",
    html: '<iframe frameborder="0" allowfullscreen="true" scrolling="no" height="366" style="width:100%;"></iframe>',
    height: 366,
    width: 600
  },
  "twitch-video": {
    regex: /https?:\/\/www\.twitch\.tv\/(?:[^\/\?\&]*\/v|videos)\/([0-9]*)/,
    embedUrl: "https://player.twitch.tv/?video=v<%= remote_id %>",
    html: '<iframe frameborder="0" allowfullscreen="true" scrolling="no" height="366" style="width:100%;"></iframe>',
    height: 366,
    width: 600
  },
  "yandex-music-album": {
    regex: /https?:\/\/music\.yandex\.ru\/album\/([0-9]*)\/?$/,
    embedUrl: "https://music.yandex.ru/iframe/#album/<%= remote_id %>/",
    html: '<iframe frameborder="0" style="border:none;width:540px;height:400px;" style="width:100%;" height="400"></iframe>',
    height: 400,
    width: 540
  },
  "yandex-music-track": {
    regex: /https?:\/\/music\.yandex\.ru\/album\/([0-9]*)\/track\/([0-9]*)/,
    embedUrl: "https://music.yandex.ru/iframe/#track/<%= remote_id %>/",
    html: '<iframe frameborder="0" style="border:none;width:540px;height:100px;" style="width:100%;" height="100"></iframe>',
    height: 100,
    width: 540,
    id: (o) => o.join("/")
  },
  "yandex-music-playlist": {
    regex: /https?:\/\/music\.yandex\.ru\/users\/([^\/\?\&]*)\/playlists\/([0-9]*)/,
    embedUrl: "https://music.yandex.ru/iframe/#playlist/<%= remote_id %>/show/cover/description/",
    html: '<iframe frameborder="0" style="border:none;width:540px;height:400px;" width="540" height="400"></iframe>',
    height: 400,
    width: 540,
    id: (o) => o.join("/")
  },
  codepen: {
    regex: /https?:\/\/codepen\.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
    embedUrl: "https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2",
    html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
    height: 300,
    width: 600,
    id: (o) => o.join("/embed/")
  },
  instagram: {
    regex: /https?:\/\/www\.instagram\.com\/p\/([^\/\?\&]+)\/?.*/,
    embedUrl: "https://www.instagram.com/p/<%= remote_id %>/embed",
    html: '<iframe width="400" height="505" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
    height: 505,
    width: 400
  },
  twitter: {
    regex: /^https?:\/\/(www\.)?(?:twitter\.com|x\.com)\/.+\/status\/(\d+)/,
    embedUrl: "https://platform.twitter.com/embed/Tweet.html?id=<%= remote_id %>",
    html: '<iframe width="600" height="600" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
    height: 300,
    width: 600,
    id: (o) => o[1]
  },
  pinterest: {
    regex: /https?:\/\/([^\/\?\&]*).pinterest.com\/pin\/([^\/\?\&]*)\/?$/,
    embedUrl: "https://assets.pinterest.com/ext/embed.html?id=<%= remote_id %>",
    html: "<iframe scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; min-height: 400px; max-height: 1000px;'></iframe>",
    id: (o) => o[1]
  },
  facebook: {
    regex: /https?:\/\/www.facebook.com\/([^\/\?\&]*)\/(.*)/,
    embedUrl: "https://www.facebook.com/plugins/post.php?href=https://www.facebook.com/<%= remote_id %>&width=500",
    html: "<iframe scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; min-height: 500px; max-height: 1000px;'></iframe>",
    id: (o) => o.join("/")
  },
  aparat: {
    regex: /(?:http[s]?:\/\/)?(?:www.)?aparat\.com\/v\/([^\/\?\&]+)\/?/,
    embedUrl: "https://www.aparat.com/video/video/embed/videohash/<%= remote_id %>/vt/frame",
    html: '<iframe width="600" height="300" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
    height: 300,
    width: 600
  },
  miro: {
    regex: /https:\/\/miro.com\/\S+(\S{12})\/(\S+)?/,
    embedUrl: "https://miro.com/app/live-embed/<%= remote_id %>",
    html: '<iframe width="700" height="500" style="margin: 0 auto;" allowFullScreen frameBorder="0" scrolling="no"></iframe>'
  },
  github: {
    regex: /https?:\/\/gist.github.com\/([^\/\?\&]*)\/([^\/\?\&]*)/,
    embedUrl: 'data:text/html;charset=utf-8,<head><base target="_blank" /></head><body><script src="https://gist.github.com/<%= remote_id %>" ><\/script></body>',
    html: '<iframe width="100%" height="350" frameborder="0" style="margin: 0 auto;"></iframe>',
    height: 300,
    width: 600,
    id: (o) => `${o.join("/")}.js`
  }
};
function u(o, t, i) {
  var e, s, n, r, a;
  t == null && (t = 100);
  function l() {
    var h = Date.now() - r;
    h < t && h >= 0 ? e = setTimeout(l, t - h) : (e = null, i || (a = o.apply(n, s), n = s = null));
  }
  var d = function() {
    n = this, s = arguments, r = Date.now();
    var h = i && !e;
    return e || (e = setTimeout(l, t)), h && (a = o.apply(n, s), n = s = null), a;
  };
  return d.clear = function() {
    e && (clearTimeout(e), e = null);
  }, d.flush = function() {
    e && (a = o.apply(n, s), n = s = null, clearTimeout(e), e = null);
  }, d;
}
u.debounce = u;
var w = u;
class m {
  /**
   * @param {{data: EmbedData, config: EmbedConfig, api: object}}
   *   data — previously saved data
   *   config - user config for Tool
   *   api - Editor.js API
   *   readOnly - read-only mode flag
   */
  constructor({ data: t, api: i, readOnly: e }) {
    this.api = i, this._data = {}, this.element = null, this.readOnly = e, this.data = t;
  }
  /**
   * @param {EmbedData} data - embed data
   * @param {RegExp} [data.regex] - pattern of source URLs
   * @param {string} [data.embedUrl] - URL scheme to embedded page. Use '<%= remote_id %>' to define a place to insert resource id
   * @param {string} [data.html] - iframe which contains embedded content
   * @param {number} [data.height] - iframe height
   * @param {number} [data.width] - iframe width
   * @param {string} [data.caption] - caption
   */
  set data(t) {
    if (!(t instanceof Object))
      throw Error("Embed Tool data should be object");
    const { service: i, source: e, embed: s, width: n, height: r, caption: a = "" } = t;
    this._data = {
      service: i || this.data.service,
      source: e || this.data.source,
      embed: s || this.data.embed,
      width: n || this.data.width,
      height: r || this.data.height,
      caption: a || this.data.caption || ""
    };
    const l = this.element;
    l && l.parentNode.replaceChild(this.render(), l);
  }
  /**
   * @returns {EmbedData}
   */
  get data() {
    if (this.element) {
      const t = this.element.querySelector(`.${this.api.styles.input}`);
      this._data.caption = t ? t.innerHTML : "";
    }
    return this._data;
  }
  /**
   * Get plugin styles
   *
   * @returns {object}
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      container: "embed-tool",
      containerLoading: "embed-tool--loading",
      preloader: "embed-tool__preloader",
      caption: "embed-tool__caption",
      url: "embed-tool__url",
      content: "embed-tool__content"
    };
  }
  /**
   * Render Embed tool content
   *
   * @returns {HTMLElement}
   */
  render() {
    if (!this.data.service) {
      const a = document.createElement("div");
      return this.element = a, a;
    }
    const { html: t } = m.services[this.data.service], i = document.createElement("div"), e = document.createElement("div"), s = document.createElement("template"), n = this.createPreloader();
    i.classList.add(this.CSS.baseClass, this.CSS.container, this.CSS.containerLoading), e.classList.add(this.CSS.input, this.CSS.caption), i.appendChild(n), e.contentEditable = !this.readOnly, e.dataset.placeholder = this.api.i18n.t("Enter a caption"), e.innerHTML = this.data.caption || "", s.innerHTML = t, s.content.firstChild.setAttribute("src", this.data.embed), s.content.firstChild.classList.add(this.CSS.content);
    const r = this.embedIsReady(i);
    return i.appendChild(s.content.firstChild), i.appendChild(e), r.then(() => {
      i.classList.remove(this.CSS.containerLoading);
    }), this.element = i, i;
  }
  /**
   * Creates preloader to append to container while data is loading
   *
   * @returns {HTMLElement}
   */
  createPreloader() {
    const t = document.createElement("preloader"), i = document.createElement("div");
    return i.textContent = this.data.source, t.classList.add(this.CSS.preloader), i.classList.add(this.CSS.url), t.appendChild(i), t;
  }
  /**
   * Save current content and return EmbedData object
   *
   * @returns {EmbedData}
   */
  save() {
    return this.data;
  }
  /**
   * Handle pasted url and return Service object
   *
   * @param {PasteEvent} event - event with pasted data
   */
  onPaste(t) {
    const { key: i, data: e } = t.detail, { regex: s, embedUrl: n, width: r, height: a, id: l = (c) => c.shift() } = m.services[i], d = s.exec(e).slice(1), h = n.replace(/<%= remote_id %>/g, l(d));
    this.data = {
      service: i,
      source: e,
      embed: h,
      width: r,
      height: a
    };
  }
  /**
   * Analyze provided config and make object with services to use
   *
   * @param {EmbedConfig} config - configuration of embed block element
   */
  static prepare({ config: t = {} }) {
    const { services: i = {} } = t;
    let e = Object.entries(g);
    const s = Object.entries(i).filter(([r, a]) => typeof a == "boolean" && a === !0).map(([r]) => r), n = Object.entries(i).filter(([r, a]) => typeof a == "object").filter(([r, a]) => m.checkServiceConfig(a)).map(([r, a]) => {
      const { regex: l, embedUrl: d, html: h, height: c, width: p, id: f } = a;
      return [r, {
        regex: l,
        embedUrl: d,
        html: h,
        height: c,
        width: p,
        id: f
      }];
    });
    s.length && (e = e.filter(([r]) => s.includes(r))), e = e.concat(n), m.services = e.reduce((r, [a, l]) => a in r ? (r[a] = Object.assign({}, r[a], l), r) : (r[a] = l, r), {}), m.patterns = e.reduce((r, [a, l]) => (r[a] = l.regex, r), {});
  }
  /**
   * Check if Service config is valid
   *
   * @param {Service} config - configuration of embed block element
   * @returns {boolean}
   */
  static checkServiceConfig(t) {
    const { regex: i, embedUrl: e, html: s, height: n, width: r, id: a } = t;
    let l = i && i instanceof RegExp && e && typeof e == "string" && s && typeof s == "string";
    return l = l && (a !== void 0 ? a instanceof Function : !0), l = l && (n !== void 0 ? Number.isFinite(n) : !0), l = l && (r !== void 0 ? Number.isFinite(r) : !0), l;
  }
  /**
   * Paste configuration to enable pasted URLs processing by Editor
   *
   * @returns {object} - object of patterns which contain regx for pasteConfig
   */
  static get pasteConfig() {
    return {
      patterns: m.patterns
    };
  }
  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Checks that mutations in DOM have finished after appending iframe content
   *
   * @param {HTMLElement} targetNode - HTML-element mutations of which to listen
   * @returns {Promise<any>} - result that all mutations have finished
   */
  embedIsReady(t) {
    let e = null;
    return new Promise((s, n) => {
      e = new MutationObserver(w.debounce(s, 450)), e.observe(t, {
        childList: !0,
        subtree: !0
      });
    }).then(() => {
      e.disconnect();
    });
  }
}
export {
  m as default
};
