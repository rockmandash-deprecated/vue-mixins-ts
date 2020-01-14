<template>
  <mixin-page-leave></mixin-page-leave>
</template>

<script lang="ts">
import mixinPageLeave from '../../src/mixins/sensors/mixinPageLeave/Example.vue'

import Vue from 'vue'
export default Vue.extend({
  components: {
    mixinPageLeave
  }
})
</script>
