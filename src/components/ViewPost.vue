<template>
  <div id="view-post">
    <ul class="collection with-header">
      <li class="collection-header">
        <h1>Message : "{{title}}"</h1>
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
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'view-post',
  data () {
    return {
      userID: null,
      userName: null,
      userlikers: 0,
      title: null
    }
  },
  beforeRouteEnter (to, from, next) {
      db.collection('flutter_data').where('title' , '==', to.params.title).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.userID = doc.data().userID
            vm.userName = doc.data().userName
            vm.userlikers = doc.data().userlikers
            vm.title = doc.data().title
          })
        })
      })
    },
    watch: {
      "$route": "fetchData"
    },
    methods: {
      fetchData () {
        db.collection('flutter_data').where('title', '==', this.$route.params.title).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.userID = doc.data().userID
            this.userName = doc.data().userName
            this.userlikers = doc.data().userlikers
            this.title = doc.data().title
          })
        })
      },
      deletePost () {
        if(confirm('Are you sure ?')) {
          db.collection('flutter_data').where('title', '==', this.$route.params.title).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push('/');
            })
          })
        }
      }
    }
}
</script>

<style lang="css">
</style>
