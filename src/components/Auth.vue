<template>
  <div id="firebaseui-auth-container" />
</template>

<script>
import { firebase, firebaseuiApp } from '../helpers/firebase';

export default {
  name: 'auth',
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    firebaseuiApp.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // tosUrl: '/tos',
      // privacyPolicyUrl: '/privacy',
      callbacks: {
        signInSuccessWithAuthResult: () => false,
        uiShown: () => {
          this.loading = false;
        },
      },
    });
  },
};
</script>

<style lang="postcss">
@import '../../node_modules/firebaseui/dist/firebaseui.css';

#firebaseui-auth-container {
  min-width: 200px;

  & .mdl-card {
    box-shadow: none;
  }
  & .firebaseui-callback-indicator-container {
    min-height: 200px;
    background-image: url("/static/images/loading.svg");

    & .mdl-progress {
      display: none;
    }
  }
}
</style>
