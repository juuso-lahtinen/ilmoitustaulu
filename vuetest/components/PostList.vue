
<template>
  <div id="post-list">
    <table>
      <!-- ...thead... -->
      <tbody>
      <tr v-for="post in posts" :key="post.id">
        <td>{{ post.comment }}</td>
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
      if (post.nickName === '' || post.comment === '') return
      this.$emit('edit:post', post.id, post)
      this.editing = null
    }
  }
}
</script>

<style scoped>
</style>