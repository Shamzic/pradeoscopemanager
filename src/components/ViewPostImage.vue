<template>
  <div id="view-post-image">
    <ul class="collection with-header">
      <li class="collection-header">
        <h1>URL : "{{url}}"</h1>
      </li>
      <li class="collection-item">
        Posted by <i>"{{userName}}"</i>
      </li>
      <li class="collection-item">
          Number of likes : {{userlikers.length}}
      </li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button class="btn red" @click="deletePost">Delete</button>
    <div class="fixed-action-btn">
      <template v-i="url">
      <router-link v-bind:to="{name: 'edit-post-image', params: {url: url}}" class="btn-floating btn-large green">
        <i class="fa fa-pencil"></i>
      </router-link>
    </template>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'view-post-image',
  data () {
    return {
      userID: null,
      userName: null,
      userlikers: 0,
      url: "",
    }
  },
  beforeRouteEnter (to, from, next) {
      db.collection('flutter_data').where('url' , '==', to.params.url).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.userID = doc.data().userID
            vm.userName = doc.data().userName
            vm.userlikers = doc.data().userlikers
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
            this.userID = doc.data().userID
            this.userName = doc.data().userName
            this.userlikers = doc.data().userlikers
            this.url = doc.data().url
          })
        })
      },
      deletePost () {
        if(confirm('Are you sure ?')) {
          db.collection('flutter_data').where('url', '==', this.$route.params.url).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push('/Dashboard');
            })
          })
        }
      }
    }
}
</script>

<style lang="css">
</style>
