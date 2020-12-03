<template>
  <div id="app">
    <div class="header">
      <router-link to="/">
        <div class="logo">
          <img src="/telescope.png" alt="Telescope" style="width:50px" />
        </div>
      </router-link>
      <div class="title">
        <h1>Contemplative Exploration</h1>
      </div>
    </div>

    <nav class="navbar navbar-expand-lg navbar-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Gallery</router-link>
          </li>

          <li class="nav-item">
            <!-- <a class="nav-link" href="#">Features</a> -->
            <router-link class="nav-link" to="/upload">Upload</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/thought">Thought-Stream</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/hi">Hi</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <p>2020 &#169; Kallie</p>
      <a target="blank" href="https://github.com/obliquify/creativeproj4am.git">Reposit</a>
    </div>
  </div>
</template>

<style>
#app {
  font-family: "Courier", monospace-serif;
  background-color: #f9e7e7;
}
html {
  box-sizing: border-box;
}

body {
  font-family: "Courier", monospace-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #f9e7e7;
  color: #636564;
  justify-content: center;
  align-items: center;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 45px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  display: flex;
  justify-content: center;
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #faf9f9;
  font-size: 12px;
}

.footer a {
  color: #000;
  margin-left: 50px;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}

.logo {
  padding: 40px;
}

.navbar {
  background-color: #faf9f9;
}
</style>
