<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import { firebase, firebaseuiApp } from '../helpers/firebase';

export default {
  name: 'auth',
  mounted() {
    firebaseuiApp.start('#firebaseui-auth-container', {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            size: 'invisible',
          },
        },
      ],
      tosUrl: '/tos',
      callbacks: {
        signInSuccess() {
          return false;
        },
      },
    });
  },
};
</script>

<style>
@import '../../node_modules/firebaseui/dist/firebaseui.css';
</style>
