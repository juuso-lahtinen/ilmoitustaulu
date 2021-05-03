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
      <div class="max-w-md px-12 bg-white shadow-lg rounded-lg my-20">
        <h2 class="py-2 text-gray-800 text-3xl font-semibold">{{post.nickname}}</h2>
        <p class="mt-2 py-2 text-gray-600 break-words">{{post.comment}}</p>
        <p class="flex justify-end mt-4">{{post.timestamp}}</p>
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
</style>