<template>
  <div id="dashboard">
    <h3>Dashboard</h3>

    <ul class="collection with-header" >
      <li class="collection-header" value="" >
        <h4> Posts</h4>
      </li>
      <li v-for="post in posts" v-bind:key="post.title" class="collection-item">
        <p class="headmsg">
          <template v-if="post.type == 'text' ">
          <b>{{post.userName}}</b> has written :
          </template>
          <template v-if="post.type == 'image' ">
          <b>{{post.userName}}</b> has send an image :
          </template>
        </p>
        <p class="titlemsg">
          <div class="chip">{{post.title}}</div>
            <template v-if="post.title">
              <router-link class="secondary-content" v-bind:to="{name: 'view-post', params: {title: post.title}}">
                <i class="fa fa-eye"></i>
              </router-link>
            </template>
        </p>

      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'dashboard',
  data () {
    return {
      posts: []
    }
  },
  created () {

    db.collection('flutter_data').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
      //  console.log(doc.data());
        const data = {
          'id': doc.id,
          'userName': doc.data().userName,
          'title': doc.data().title,
          'like': doc.data().like,
          'url': doc.data().url,
          'type': doc.data().type,
          'userID': doc.data().userID,
          'userlikers': doc.data().userlikers
        }
        this.posts.push(data)
      })
    })
  }
}
</script>

<style lang="css">
.headmsg {
  font-style: italic;
  font-weight:lighter;
}
</style>
