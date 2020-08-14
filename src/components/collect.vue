<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    songSheetId: {
      type: Number
    },
    songId: {
      type: Number
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
</style>
