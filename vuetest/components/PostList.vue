<template>
  <div id="post-list">
    <p
        v-if="posts.length < 1"
        class="empty-table"
    >
      No posts
    </p>
    <table>
      <tbody>
      <tr
          :key="post.id"
          v-for="post in posts"
      >
        <td>{{post.nickname}}</td>
        <td>{{post.comment}}</td>
      </tr>
      </tbody>
    </table>
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