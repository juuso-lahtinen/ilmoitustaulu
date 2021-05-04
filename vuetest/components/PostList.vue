<template>
  <div id="post-list">
    <p
        v-if="posts.length < 1"
        class="empty-table"
    >
      No posts
    </p>
    <div
        :key="post.id"
        v-for="post in posts"
    >
      <div class="max-w-md px-12 bg-gray-200 shadow-2xl rounded-2xl my-5" >
        <h2 class="py-2 text-gray-800 text-3xl font-semibold">{{post.nickname}}</h2>
        <p class="font-sans mt-2 py-2 text-gray-600 break-words">{{post.comment}}</p>
        <p class="flex justify-end mt-4 text-black">{{post.timestamp}}</p>
        <button v-on:click="getComments(post.post_id)">asd</button>
        <p
            v-if="posts.length < 1"
            class="empty-table"
        >
          No posts
        </p>
        <div
            :key="post.id"
            v-for="post in posts"
        >
    </div>
  </div>
  </div>
  </div>
</template>


<script>


export default {
  name: 'post-list',

  props: {
    posts: Array,
  },
  data() {
    return {
      editing: null,
      comments: [],
    }
  },

  mounted() {
    this.getComments()
  },
  methods: {

    async getComments(postid) {
      console.log("klikattu postid " + postid);
      var obj = { post_id: postid };
      console.log("klikattu obj " + obj);
      try {
        const response = await fetch('http://localhost:8081/api/getcomments', {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        let data = await response.json()
        data = JSON.stringify(data);
        return data;


      } catch (error) {
        console.error(error)
      }
    },

    editMode(post) {
      this.cachedPost = Object.assign({}, post)
      this.editing = post.id
    },
    cancelEdit(post) {
      Object.assign(post, this.cachedpost)
      this.editing = null;
    },
    editPost(post) {
      if (post.nickname === '' || post.comment === '') return
      this.$emit('edit:post', post.id, post)
      this.editing = null
    }
  }
}
</script>

<style scoped>
#post-list {
  display: flex;
  flex-direction: column-reverse;
}
</style>