<template>
  <router-link v-if="country === 'AU'" to="/enroll" class="btn">Enroll</router-link>
  <a v-else href="https://dancestudio-pro.com/online/campbelldancers" target="_blank" class="btn">Enroll</a>
</template>

<script>
export default {
  name: 'EnrollButton',
};
</script>
