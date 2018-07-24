<style lang="css">
.headmsg {
    font-style: italic;
    font-weight: lighter;
}
h3 {
    text-align: left;
    font-weight: 300;
}
html {
  background-color: #C0C0C0;
}
</style>

<template lang="html">
  <div id="edit-post-image">
    <h3>Edit Post Image</h3>
    <div class="row">
      <form @submit.prevent="updatePost" class="col s12">
        <div class="row">
          <div class="input-field col s12">
              <input type="text" v-model="userName" required>
          </div>
          <div class="input-field col s12">
              <input type="text" v-model="url" required>
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
  name: 'edit-post-image',
  data () {
    return {
      url: "",
      userName: "",
    }
  },
  beforeRouteEnter (to, from, next) {
      db.collection('flutter_data').where('url' , '==', to.params.url).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.userName = doc.data().userName
            vm.url = doc.data().url
          })
        })
      })
    },
    watch: {
      "$route": "fetchData"
    },
    methods: {
      fetchData () {
        db.collection('flutter_data').where('url', '==', this.$route.params.url).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.url = doc.data().url
            this.userName = doc.data().userName
          })
        })
      },
      updatePost () {
        db.collection('flutter_data').where('url', '==', this.$route.params.url).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              url: this.url,
              userName: this.userName
            }).then(() => {
                this.$router.push({name: 'view-post-image', params: {url: this.url}})
            })
          })
        })
      }
    }
}
</script>

<style lang="css">
</style>
