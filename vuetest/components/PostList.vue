<template>
  <div id="post-list">

    <p v-if="posts.length < 1">
      No posts
    </p>
    <div
        :key="post.id"
        v-for="post in posts"
    >

      <div class="max-w-md bg-gray-200 shadow-2xl rounded-2xl my-5">
        <h2 class="flex justify-start px-5 py-2 text-gray-800 text-3xl font-semibold mr-48">{{post.nickname}}</h2>
        <p class="flex justify-center font-sans mt-2 px-5 py-2 text-gray-600 break-words">{{post.comment}}</p>
        <p class="flex justify-end px-3 py-2 text-black">{{ post.timestamp }}</p>
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
    }
  },
  methods: {
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