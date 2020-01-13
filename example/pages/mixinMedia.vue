<template>
  <mixin-media></mixin-media>
</template>

<script lang="ts">
import mixinMedia from '../../src/mixins/sensors/mixinMedia/Example.vue'

import Vue from 'vue'
export default Vue.extend({
  components: {
    mixinMedia
  }
})
</script>
