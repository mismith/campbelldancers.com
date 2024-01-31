<template>
  <a :href="country === 'AU' ? 'https://google.com/form/f/abc123' : 'https://dancestudio-pro.com/online/campbelldancers'" target="_blank" class="btn">Enroll</a>
</template>

<script>
export default {
  name: 'EnrollButton',
};
</script>
