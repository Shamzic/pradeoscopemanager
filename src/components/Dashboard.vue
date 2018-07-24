<style lang="css">
.headmsg {
    font-style: italic;
    font-weight: lighter;
}
h4 {
    text-align: center;
    font-weight: 300;
}
html {
  background-color: #C0C0C0;
}
</style>

<template>

<div id="dashboard">
    <div class="row">
        <div class="col s4">
            <ul class="collection with-header">
                <li class="collection-header" value="">
                    <h4> Users connected</h4>
                </li>
                <li v-for="user in connected_users" v-bind:key="connected_users.userID" class="collection-item">
                    <p class="headmsg">
                      <img :src='user.photoURL' style="width:30px;height:30px;border-radius: 50%;">
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
            <ul class="collection with-header">
                <li class="collection-header" value="">
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
                                    <i class="fa fa-eye" style="color: black; font-size: 18px;"></i>
                                </router-link>
                            </template>
                        </p>
                    </template>
                    <template v-if="post.type == 'image' ">
                          <router-link class="secondary-content" v-bind:to="{name: 'view-post-image', params: {url: post.url}}">
                              <i class="fa fa-eye" style="color: black; font-size: 18px;"></i>
                          </router-link>
                    </template>

                     <p style="font-size: 18px;"><i class="fa fa-heart text-red" style="color: red"></i> {{post.like}}</p>
                </li>
            </ul>

            <!-- Ici je commente car nous n'avons finalement pas besoin
                 de pouvoir ajouter des nouveaux posts depuis l'interface web.
                Tous les ajouts de textes/images se feront depuis les applications
                android et ios -->

            <!--
            <div class="fixed-action-btn">
                <router-link to="/new" class="btn-floating btn-large red">
                    <i class="fa fa-plus"></i>
                </router-link>
            </div>
          -->

        </div>
    </div>
</div>

</template>

<script>




import db from './firebaseInit'
export default {
    name: 'dashboard',
    data() {
        return {
            posts: [],
            connected_users: []
        }
    },
    created() {
        var initDone = false;
        db.collection('connected_users').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const data = {
                    'userID': doc.data().userID,
                    'userName': doc.data().userName,
                    'connected': doc.data().connected,
                    'photoURL': doc.data().photoURL
                };
                this.connected_users.push(data)
            })
        });

        var vueInstance = this;

        db.collection('connected_users').onSnapshot(function(snapshot) {
                vueInstance.connected_users=[];
                snapshot.docChanges().forEach(function(change) {

                  const newdata = {
                    'userID': change.doc.data().userID,
                    'userName': change.doc.data().userName,
                    'connected': change.doc.data().connected,
                    'photoURL': change.doc.data().photoURL
                  };

                  if(change.type == "added") {
                      if(!initDone) {
                        vueInstance.connected_users.push(newdata)
                      }
                      else {
                        db.collection('connected_users').get().then(querySnapshot => {
                            querySnapshot.forEach(doc => {

                                const data = {
                                  'userID': doc.data().userID,
                                  'userName': doc.data().userName,
                                  'connected': doc.data().connected,
                                  'photoURL': doc.data().photoURL
                                };
                                if(data!=newdata)
                                  vueInstance.connected_users.push(data)
                            })
                        });
                      }
                  }

                  if (change.type === "modified") {
                    db.collection('connected_users').get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                            const data = {
                              'userID': doc.data().userID,
                              'userName': doc.data().userName,
                              'connected': doc.data().connected,
                              'photoURL': doc.data().photoURL
                            };
                            if(data!=newdata)
                              vueInstance.connected_users.push(data)
                        })
                    });
                    //vueInstance.posts.push(newdata)
                    console.log("Modified user connexion: ", change.doc.data());
                  }

                })
              });


        db.collection('flutter_data').onSnapshot(function(snapshot) {
                vueInstance.posts=[];
                snapshot.docChanges().forEach(function(change) {

                    const newdata = {
                        'id': change.id,
                        'userName': change.doc.data().userName,
                        'title': change.doc.data().title,
                        'like': change.doc.data().like,
                        'url': change.doc.data().url,
                        'type': change.doc.data().type,
                        'userID': change.doc.data().userID,
                        'userlikers': change.doc.data().userlikers
                    };

                    if(change.type == "added") {
                        if(!initDone) {
                          vueInstance.posts.push(newdata)
                        }
                        else {
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
                                  if(data!=newdata)
                                    vueInstance.posts.push(data)
                              })
                          });
                        }
                    }

                    if (change.type === "modified") {
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
                              if(data!=newdata)
                                vueInstance.posts.push(data)
                          })
                      });
                      //vueInstance.posts.push(newdata)
                      console.log("Modified post: ", change.doc.data());
                    }

                      if (change.type === "removed") {
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
                                if(data!=newdata)
                                  vueInstance.posts.push(data)
                            })
                        });
                      }
                });
                initDone = true;
            });
    }
}

</script>
