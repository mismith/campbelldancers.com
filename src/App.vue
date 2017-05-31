<template>
  <div id="app">
    <header id="header" class="align-center" :class="{menu: $route.name !== 'home'}">
      <div>
        <header>
          <h1>
            <router-link to="/">
              <img src="/static/images/logo.svg" alt="Campbell School of Highland Dance" />
            </router-link>
          </h1>
        </header>
        <nav>
          <router-link to="/#about">About</router-link>
          <router-link to="/#instructors">Instructors</router-link>
          <router-link to="/#classes">Classes</router-link>
          <router-link to="/#contact">Contact</router-link>
        </nav>
      </div>
    </header>

    <router-view />

    <footer id="footer" class="align-center">
      <header>
        <div>Campbell School of Highland Dance &nbsp;&bull;&nbsp; 2016&ndash;2017</div>
      </header>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  // data() {
  //   return {
  //     scrollTop: 0,
  //   };
  // },
  // methods: {
  //   handleScroll(e) {
  //     this.scrollTop = e.target.scrollingElement.scrollTop;
  //   },
  // },
  // mounted() {
  //   window.addEventListener('scroll', this.handleScroll);
  // },
  // beforeDestroy() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // },
};
</script>

<style lang="postcss">
@import 'variables.css';

@font-face {
  font-family: 'novecento_sans_widebook';
  src: url('/static/fonts/novecentosanswide-book-webfont.woff2') format('woff2'),
       url('/static/fonts/novecentosanswide-book-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.bg-tartan {
  border-top: double 3px var(--accent);
  border-bottom: double 3px var(--accent);
  background-image: url(/static/images/bg-tartan.jpg);
}
.card {
  padding: 5px 10px;
  border-radius: 3px;
}
.align-center {
  text-align: center;
}
.align-left {
  text-align: left;
}
.flex-cols {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: var(--medium);
  margin-top: -20px;
  margin-bottom: -20px;

  & > * {
    margin: 20px;
  }
}
.flex-rows {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-left: -5px;
  margin-right: -5px;

  & > * {
    margin: 5px;
  }
}
.two-inputs {
  display: flex;
  flex-wrap: wrap;
  margin: -5px;

  & > * {
    width: auto;
    flex-grow: 1;
    margin: 5px;
  }
}
.call-to-action {
  margin-top: 40px;
}

* {
  box-sizing: border-box;
  flex-shrink: 0;
}
html,
body {
  background-color: var(--lightest);
  color: var(--dark);
  font-family: 'Roboto', sans-serif;
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
a {
  color: currentColor;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
h2 {
  margin-bottom: 40px;
  border-top: double 3px var(--accent);
  border-bottom: double 3px var(--accent);
  padding: 5px 10px;
}
h3 {
  margin-bottom: 5px;

  & + h4 {
    margin-top: 0;
  }
}
h5 {
  margin: 0;
}
h6 {
  margin: 0;
}
hr {
  max-width: 100px;
  border: 0;
  border-bottom: double 3px var(--accent);
  margin: 40px auto;
}
figure {
  margin: 0;
}

label {
  &.selectable {
    display: inline-flex;
    align-items: center;
    width: 100%;

    &:after {
      content: '';
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-top-color: var(--dark);
      border-top-width: 8px;
      border-bottom-width: 0;
      margin-left: -1.25em;
    }
  }
}
.input,
input,
textarea,
.btn,
button,
select,
textarea {
  display: inline-block;
  appearance: none;
  background: var(--lightest);
  padding: 5px 8px;
  border: solid 1px var(--light);
  border-radius: 3px;

  &:disabled {
    opacity: .5;
    cursor: not-allowed;
  }
}
textarea {
  min-height: 80px;
  resize: vertical;
}
.btn {
  @apply --heading;
  background-color: var(--dark);
  color: var(--light);
  padding: 10px 20px;
  cursor: pointer;

  &:not(:disabled) {
    &:hover {
      color: var(--accent);
      border-color: var(--accent);
      text-decoration: none;
    }
  }
}
.btn-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  color: inherit;
  line-height: 1em;
  font-size: 36px;
  letter-spacing: 0;
  padding: 0;
  border: 0;
  margin: -2px 5px;
  opacity: .75;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}
.btn-add {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  opacity: .75;
  cursor: pointer;

  & big {
    font-size: 40px;
    line-height: 1;
    margin: -3px 20px 0 0;
  }
  & small {
    width: 100%;
    font-size: 10px;
    text-align: center;
    margin: 3px auto;
  }
  &:hover {
    opacity: 1;
    text-decoration: none;
  }
  &:active {
    color: var(--accent);
  }
}
.table {
  display: inline-table;
  border: 0;
  
  & td {
    padding: 5px 0;

    &:first-child {
      vertical-align: top;
      text-align: right;
      font-weight: bold;
      padding-right: 10px;
    }
  }
  & ul {
    padding-left: 20px;
  }
}
form {
  & .input,
  & input,
  & textarea,
  & select {
    width: 100%;
  }
  & .table td:first-child {
    padding-top: 10px; /* @HACK */
  }
}
iframe {
  max-width: 100%;
  border: solid 1px var(--light);
  border-radius: 5px;
}

section,
#header > div,
#footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 40px 80px;

  & > header {
    @apply --heading;
  }
  & > div {
    max-width: var(--small);
  }
}
#header {
  min-height: 75vh;

  & header {
    width: 100%;
    max-width: var(--small);

    & h1 {
      margin-bottom: 60px;

      & img {
        width: 100%;
        max-height: 60vh;
        vertical-align: middle;
      }
    }
  }
  & nav {
    @apply --heading;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: none;
    line-height: 2;

    & a {
      margin: 5px;

      &:not(:last-child) {
        &:after {
          content: "•";
          display: inline-block;
          color: var(--accent);
          margin-left: .5em;
        }
      }
    }
  }

  &.menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    min-height: 0;
    background-color: var(--lightest);
    border-bottom: 3px double var(--accent);

    & > div {
      flex-direction: row;
      min-height: var(--header-height);
      padding: 0;
      margin: 0 auto;

      & header {
        width: auto;

        & h1 {
          margin: 0 24px;
          
          & a {
            display: block;

            & img {
              width: auto;
              height: 36px;
            }
          }
        }
      }
      & nav {
        font-size: 12px;
      }
    }
    & + * {
      margin-top: var(--header-height);
    }
  }
}
#footer {
  font-size: 10px;
  padding: 24px;
  margin-top: auto;
}
</style>