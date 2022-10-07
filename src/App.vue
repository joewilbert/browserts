<template>
  <!-- <Gestures /> -->
  <div class="top">
    <button @click="goHome()">Home</button>
    <!-- add search bar  -->
    <input
      type="text"
      id="search"
      placeholder="Search"
      v-on:keyup.enter="onEnter"
    />
    <button @click="goTo()">Go To</button>
    <button @click="goBack()">Back</button>
    <button @click="goForward()">Forward</button>
    <button @click="reload()">Reload</button>
    <button @click="stop()">Stop</button>
  </div>
  <div id="web-container"></div>
  <!-- <webview
    id="foo"
    src="https://www.github.com/"
    style="display: inline-flex; width: 640px; height: 480px"
    preload="file://./preload.js"
  >
  </webview> -->
</template>

<script>
// import Gestures from './components/Gestures.vue'
// NOTE: remote is deprecated and should be replaced with @electron/remote
// https://github.com/electron/remote
// const remote = require("electron").remote;
// const path = require("path");
// let preloadFile = "file://" + require("path").resolve("src/preload.js");

// import remote from "@electron/remote";
import path from "path";
let preloadFile = "file://" + path.resolve("src/preload.js");

const createWebview = () => {
  const webview = document.createElement("webview");
  webview.setAttribute("src", "https://www.jwilbert.com");
  webview.setAttribute("style", "width: 100%; height: 100%;");
  webview.setAttribute("nodeintegration", "true");
  webview.setAttribute("preload", preloadFile);
  webview.setAttribute("webpreferences", "contextIsolation: false");
  return webview;
};
export default {
  name: "App",
  components: {
    // Gestures
  },
  data() {
    return {
      webview: createWebview(),
    };
  },
  mounted() {
    const webContainer = document.getElementById("web-container");
    webContainer.appendChild(this.webview);
    // open webview dev tools
    this.webview.addEventListener("dom-ready", () => {
      this.webview.openDevTools();
    });
  },
  methods: {
    goHome() {
      this.webview.loadURL("https://www.jwilbert.com");
    },
    fuckAround() {
      console.log("of");
    },
    goTo() {
      const url = document.getElementById("search").value;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        this.webview.setAttribute("src", "https://" + url);
      } else {
        this.webview.setAttribute("src", url);
      }
    },
    goBack() {
      this.webview.goBack();
    },
    goForward() {
      this.webview.goForward();
    },
    reload() {
      this.webview.reload();
    },
    stop() {
      this.webview.stop();
    },
    onEnter: function () {
      this.goTo();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  margin: 0;
  padding: 0;
}
webview {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 90% !important;
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
  background-color: #ccc;
  padding: 0;
  margin: 0;
}
</style>
