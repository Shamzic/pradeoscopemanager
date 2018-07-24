<template lang="html">
  <div id="new-post">
    <h3>New Post</h3>
    <div class="row">
      <form @submit.prevent="savePost" class="col s12">
        <div class="row">
          <div class="input-field col s12">
              <input type="text" v-model="userName" required>
              <label>Write the name of the user : </label>
          </div>
          <div class="input-field col s12">
              <input type="text" v-model="title" required>
              <label>Write your post : </label>
          </div>
          <button type="submit" class="btn blue">Send</button>
          <router-link to="/" class="btn grey">Cancel</router-link>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'new-post',
  data () {
    return {
      editing: false,
      like: 0,
      title: "",
      type: 'text',
      url: "",
      userID: "-CPZrBj_THIS_IS_A_TEST_QThvtd66",
      userName:"",
      userlikers: [],
    }
  },
  methods: {
    savePost () {
        db.collection('flutter_data').add({
          editing: false,
          like: 0,
          title: this.title,
          type: 'text',
          url: null,
          userID: "CPZrBj_THIS_IS_A_TEST_QThvtd66",
          userName: this.userName,
          userlikers: [],
        }).then(docRef => this.$router.push("/")).catch(error => console.log(err))
    }
  }
}
</script>

<style lang="css">
</style>
