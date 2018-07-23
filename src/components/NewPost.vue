<template lang="html">
  <div id="new-post">
    <h3>New Post</h3>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">

      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'new-post',
  data () {
    return {

    }
  }
}
</script>

<style lang="css">
</style>
