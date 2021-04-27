<template>
  <div id="post-form">
    <form @submit.prevent="handleSubmit">
      <label>nickname</label>
      <input v-model="post.nickName" type="text" />
      <label>comment</label>
      <input v-model="post.comment" type="text" />
      <button>Add post</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'post-form',
  data() {
    return {
      post: {
       comment: '',
        nickName : '',
        date: new Date().toISOString().split('T')[0],
        timeStamp: new Date().toTimeString().slice(0,8)
      },
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('add:post', this.post)
    },
  },
}
</script>

<style scoped>
form {
  margin-bottom: 2rem;
}
</style>