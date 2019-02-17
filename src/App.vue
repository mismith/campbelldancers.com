<template>
  <div id="app">
    <header id="header" @click="menuToggled = false" class="align-center" :class="{toggled: menuToggled}">
      <div>
        <header @click="menuToggled = false">
          <h1>
            <router-link to="/">
              <img src="/static/images/icon.svg" alt="Campbell School of Highland Dance" />
            </router-link>
          </h1>
        </header>
        <aside class="heading" title="Campbell School of Highland Dance">
          <router-link to="/">CSHD</router-link>
        </aside>
        <nav>
          <router-link to="/#about">About</router-link>
          <router-link to="/#classes">Classes</router-link>
          <router-link to="/#contact">Contact</router-link>
          <router-link to="/enroll" class="btn">Enroll</router-link>
        </nav>
        <footer>
          <button @click.stop="menuToggled = !menuToggled"><i>Menu</i></button>
        </footer>
      </div>
    </header>

    <router-view />

    <footer id="footer" class="align-center">
      <header>
        <div><router-link to="/">Campbell School of Highland Dance</router-link> &nbsp;&bull;&nbsp; 2016&ndash;{{ year }}</div>
      </header>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      menuToggled: false,
      year: (new Date()).getFullYear(),
    };
  },
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
  border-top: double 3px var(--primary);
  border-bottom: double 3px var(--primary);
  background-image: url('/static/images/bg-tartan.jpg');
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
.align-justify {
  text-align: justify;
}
.color-accent {
  color: var(--primary);
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
    flex-shrink: 1;
    margin: 20px auto;

    @media (--small-min) {
      flex-basis: calc(50% - 40px);
      margin-left: 20px;
      margin-right: 20px;
    }
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
.heading {
  @apply --heading;
}
.ellipsis {
  @apply --ellipsis;
}
.call-to-action {
  margin-top: 40px;
}
.dimmed {
  opacity: .75;
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
h1,
h2,
h3,
h4,
h5,
h6 {
  @apply --heading;
}
h2 {
  margin-bottom: 40px;
  border-top: double 3px var(--primary);
  border-bottom: double 3px var(--primary);
  padding: 5px 10px;
}
h3 {
  margin-bottom: 5px;

  & + h4 {
    font-size: 14px;
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
  border-bottom: double 3px var(--primary);
  margin: 40px auto;
}
figure {
  margin: 0;
}
img {
  max-width: 100%;
  height: auto;
}

label.selectable,
.vdp-datepicker > div:first-child {
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
    pointer-events: none;
  }
}
.input,
input:not([type="checkbox"]),
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
      color: var(--primary);
      border-color: var(--primary);
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
    color: var(--primary);
  }
}
.btn-left {
  &:before {
    content: '';
    width: 0;
    height: 0;
    display: inline-block;
    border: 5px solid transparent;
    border-right: 10px solid currentColor;
    margin-right: 15px;
    margin-left: -5px;
  }
}
.btn-right {
  &:after {
    content: '';
    width: 0;
    height: 0;
    display: inline-block;
    border: 5px solid transparent;
    border-left: 10px solid currentColor;
    margin-left: 10px;
    margin-right: -5px;
  }
}

table {
  flex-shrink: 1;
}
.table {
  display: inline-table;
  border: 0;
  
  & th {
    text-transform: uppercase;
    font-weight: unset;
    white-space: nowrap;
  }
  & th,
  & td {
    padding: 5px 0;

    &:first-child {
      vertical-align: top;
      text-align: right;
      font-weight: bold;
      padding-right: 10px;
      white-space: nowrap;
    }
    &:last-child {
      text-align: left;
    }
  }
  & ul {
    padding-left: 20px;
    margin: 0;

    & li {
      margin-bottom: 10px;
    }
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
.timeslot {
  display: flex;
  flex-direction: column;
  background: rgba(var(--primary-rgb), .15);
  padding: 0 3px;
  border: 1px solid var(--primary) !important;
  border-radius: 3px;
  cursor: pointer;

  & small {
    font-size: 12px;
  }
  & div {
    & small {
      opacity: .5;
    }
  }

  &.disabled {
    opacity: .4;
    cursor: not-allowed;
  }
  &:not(.disabled, .active) {
    &:hover {
      background-color: rgba(var(--primary-rgb), .333);
    }
  }
  &.active {
    background: rgba(var(--primary-rgb), .666);
  }

  &.newbies {
    background-color: rgba(var(--accent-rgb), .15);
    border: 1px solid rgba(var(--accent-rgb), .5) !important;

    &:not(.disabled, .active) {
      &:hover {
        background-color: rgba(var(--accent-rgb), .333);
      }
    }
    &.active {
      background: rgba(var(--accent-rgb), .666);
    }
  }
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
  @media (--small-max) {
    padding-left: 20px;
    padding-right: 20px;
  }
}
#header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 0;
  background-color: var(--lightest);
  border-bottom: 3px double var(--primary);
  z-index: 1000;

  & > div {
    position: relative;
    flex-direction: row;
    min-height: var(--header-height);
    background-color: inherit;
    padding: 0;
    margin: 0 auto;
    z-index: 999;

    & > header {
      width: auto;

      & h1 {
        margin: 0 10px;
        
        & a {
          display: flex;

          & img {
            width: auto;
            height: 28px;
            vertical-align: middle;
          }
        }
      }
    }
    & > aside {
      display: none;
      font-weight: bolder;
      margin: auto;
    }
    & > nav {
      @apply --heading;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      flex-shrink: 1;
      max-width: none;
      font-size: 12px;

      & a {
        margin: 5px 20px;
      }
    }
    & > footer {
      display: none;
    }
  }
  & + * {
    margin-top: var(--header-height);
  }
  @media (--medium-max) {
    &:after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 100%;
      background-color: rgba(0,0,0,.5);
      opacity: 0;
      transition: opacity 300ms;
      z-index: 997;
    }
    & > div {
      & > nav {
        flex-direction: column;
        align-items: stretch;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: inherit;
        border-top: 3px double var(--primary);
        border-bottom: 3px double var(--primary);
        transition: all 300ms;
        transform: scale(1) rotate(0);
        transform-origin: 92.5% -10%;
        z-index: 998;

        & a {
          padding: 10px;
        }
      }
      & > aside {
        display: flex;
      }
      & > footer {
        display: flex;
        margin-right: 10px;

        & button {
          color: rgba(0,0,0,.5);
          border: 0; 

          & i {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 3px;
            width: 18px;
            background-color: currentColor;
            font-size: 0;
            margin: 9px 0;

            &:before,
            &:after {
              content: '';
              height: 3px;
              width: 100%;
              background-color: inherit;
              vertical-align: middle;
            }
            &:before {
              margin-top: -6px;
            }
            &:after {
              margin-bottom: -6px;
            }
          }
          &:hover {
            color: rgba(0,0,0,1);
          }
        }
      }
    }
    &.toggled {
      &:after {
        bottom: 0;
        opacity: 1;
      }
    }
    &:not(.toggled) {
      & > div {
        & > nav {
          transform: scale(0) rotate(-10deg);
          opacity: 0;
          pointer-events: none;
        }
      }
    }
  }
}
#footer {
  font-size: 10px;
  padding: 24px;
  border-top: 3px double var(--primary);
  margin-top: auto;
}
</style>
