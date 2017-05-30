<template>
  <div id="app">
    <enrollment />

    <footer id="footer" class="align-center">
      <header>
        <small>Copyright &copy; 2016 Campbell School of Highland Dance</small>
      </header>
    </footer>
  </div>
</template>

<script>
import smoothScroll from 'smooth-scroll';
import Enrollment from './components/Enrollment';

export default {
  name: 'app',
  mounted() {
    smoothScroll.init({ selector: 'a' });
  },
  components: {
    Enrollment,
  },
};
</script>

<style lang="postcss">
@import './variables.css';

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
  max-width: 800px;
  margin-top: -20px;
  margin-bottom: -20px;

  & > * {
    margin: 20px;
  }
}
.flex-rows {
  display: flex;
  flex-direction: column;
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
}
html,
body {
  background-color: var(--lightest);
  color: var(--dark);
  font-family: 'Roboto', sans-serif;
  padding: 0;
  margin: 0;
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
nav {
  @apply --heading;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: none;
  line-height: 2;
  margin-top: 60px;

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
section,
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
    max-width: 600px;
  }
}
#footer {
  font-size: 12px;
  padding: 20px;
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
      content: '…';
      width: 0;
      height: 1em;
      line-height: .45em;
      font-size: 2em;
      margin-left: -1em;
      cursor: pointer;
    }
  }
}
.input,
input,
textarea,
.btn,
button,
select {
  display: inline-block;
  appearance: none;
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
button {
  &.input {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    background: var(--lightest);
  }
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

#top {
  min-height: 75vh;

  & header {
    width: 100%;
    max-width: 600px;
  }
  & img {
    width: 100%;
  }
}
#classes {
  & .classes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;

    & article {
      margin-bottom: 40px;

      @media (min-width: 640px) {
        flex-basis: 48%;
      }
    }
  }
  & hr {
    margin-top: 0;
  }
}

#instructors {
  & article {
    & h3 {
      margin-top: 5px;
    }

    @media (min-width: 600px) {
      display: flex;

      & figure {
        padding-right: 40px;
      }
      &.right {
        text-align: right;

        & figure {
          order: 2;
          padding-right: 0;
          padding-left: 40px;
        }
      }
    }
  }
}

.photos-loading {
  display: none;
}
#instafeed {
  & > * {

    & img {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }
    & a {
      display: inline-block;
      border: solid 1px var(--light);
      border-radius: 3px;
      overflow: hidden;
    }
    & figcaption {
      font-size: 13px;
      margin-top: 10px;
    }

    @media (min-width: 600px) {
      flex-basis: calc(50% - 40px);
    }
  }
}
</style>
