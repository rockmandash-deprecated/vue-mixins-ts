<template>
  <mixin-mouse-position-at-page></mixin-mouse-position-at-page>
</template>

<script lang="ts">
import mixinMousePositionAtPage from '../../src/mixins/sensors/mixinMousePositionAtPage/Example.vue'

import Vue from 'vue'
export default Vue.extend({
  components: {
    mixinMousePositionAtPage
  }
})
</script>
