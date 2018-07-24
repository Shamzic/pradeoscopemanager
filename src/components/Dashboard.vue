<template>
  <div id="dashboard">
    <div class="row">
      <div class="col s4">
        <ul class="collection with-header" >
          <li class="collection-header" value="" >
            <h4> Users connected</h4>
          </li>

          <li v-for="user in connected_users" v-bind:key="connected_users.userID" class="collection-item">
            <p class="headmsg">
              <template v-if="user.connected == true ">
                <b>{{user.userName}}</b> is online <i class="fa fa-circle text-red" style="color: #33cc00;font-size: 12px;"></i>
              </template>
              <template v-if="user.connected == false ">
                <b>{{user.userName}}</b> is offline <i class="fa fa-circle text-red" style="color: #cc0000;font-size: 12px;"></i>
              </template>
            </p>
          </li>

        </ul>
      </div>
    <div class="col s8">
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
              <p>
                <img :src='post.url' style="width:300px;height:300px;">
              </p>
          </template>
        </p>
        <template v-if="post.type == 'text' ">
        <p class="titlemsg">
          <div class="chip">{{post.title}}</div>
            <template v-if="post.title">
              <router-link class="secondary-content" v-bind:to="{name: 'view-post', params: {title: post.title}}">
                <i class="fa fa-eye"></i>
              </router-link>
            </template>
        </p>
        </template>
          <template v-if="post.type == 'image' ">

          </template>

      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
import db2 from './firebaseInit'
export default {
  name: 'dashboard',
  data () {
    return {
      posts: [],
      connected_users: []
    }
  },
  created () {

    db.collection('flutter_data').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {

        const data = {
          'id': doc.id,
          'userName': doc.data().userName,
          'title': doc.data().title,
          'like': doc.data().like,
          'url': doc.data().url,
          'type': doc.data().type,
          'userID': doc.data().userID,
          'userlikers': doc.data().userlikers
        };
        this.posts.push(data)
      })
    });

    db.collection('connected_users').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {

        const data = {
          'userID': doc.data().userID,
          'userName': doc.data().userName,
          'connected': doc.data().connected
        };
        this.connected_users.push(data)
      })
    });
    console.log(this.connected_users);
  }
}
</script>

<style lang="css">
.headmsg {
  font-style: italic;
  font-weight:lighter;
}

h4
{
  text-align: center;
  font-weight: 300;
}
</style>
