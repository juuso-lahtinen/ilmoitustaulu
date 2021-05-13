<template>
  <div id="post-list">
    <p
        v-if="posts.length < 1"
        class="empty-table"
    >
      No posts
    </p>
    <div :key="post.id" v-for="post in posts">
      <div class="max-w-md px-12 bg-gray-200 shadow-2xl rounded-2xl my-5" >
        <h2 class="py-2 text-gray-800 text-3xl font-semibold">{{post.nickname}}</h2>
        <p class="font-sans mt-2 py-2 text-gray-600 break-words">{{post.comment}}</p>
        <p class="flex justify-end mt-4 text-black">{{post.timestamp}}</p>

        <div  id="comment-list">
          <div :key="comment.id" v-for="comment in post.comments">
            <div class="max-w-md px-12 bg-gray-200 shadow-2xl rounded-2xl my-5" >
              <h2 class="py-2 text-gray-800 text-3xl font-semibold">{{comment.nickname}}</h2>
              <p class="font-sans mt-2 py-2 text-gray-600 break-words">{{comment.comment}}</p>
            </div>
          </div>
          <comment-form :post="post" :postid="post.post_id" @click="setPostID(post.post_id)" @add:comment="addComment"/>
        </div>
    </div>
  </div>
  </div>
</template>


<script>

import Vue from "vue"
import CommentForm from "./CommentForm";

Vue.config.productionTip = false;

export default {

  name: 'post-list',
  components: {CommentForm},
  props: {
    posts: Array,
    comments: Array,
    comment: String,

  },
  data() {
    return {
      post_id: String,
      editing: null,
    }
  },


  methods: {

    async setPostID(postid2) {
      this.postid = postid2;
    },

    async addComment(comment) {
      comment = JSON.stringify(comment);
      comment = comment.replace("postid",this.postid);
      this.$emit('add:comment2', comment)
    },
  }
}
</script>

<style scoped>
#post-list {
  display: flex;
  flex-direction: column-reverse;
}
</style>