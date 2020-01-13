<template>
  <mixin-window-size></mixin-window-size>
</template>

<script lang="ts">
import mixinWindowSize from '../../src/mixins/sensors/mixinWindowSize/Example.vue'

import Vue from 'vue'
export default Vue.extend({
  components: {
    mixinWindowSize
  }
})
</script>
