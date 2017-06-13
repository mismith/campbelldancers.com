import moment from 'moment-mini';
import {
  firebase,
  db,
} from '@/helpers/firebase';
import Auth from '@/components/Auth';

export default {
  data() {
    return {
      userRaw: {},
      user: firebase.auth().currentUser,
    };
  },
  methods: {
    loginAnonymously() {
      return firebase.auth().signInAnonymously();
    },
    logout() {
      return firebase.auth().signOut();
    },
  },
  created() {
    // handle user
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;

      if (user) {
        this.$bindAsObject('userRaw', db.child(`users/${user.uid}`));
        // store/update user info
        const providerData = {
          ...user.providerData[0],
          _loggedin: moment().format(),
        };
        this.$firebaseRefs.userRaw.update(providerData);

        this.$emit('login');
      } else {
        this.$emit('logout');
      }
    });
  },
  components: {
    Auth,
  },
};
