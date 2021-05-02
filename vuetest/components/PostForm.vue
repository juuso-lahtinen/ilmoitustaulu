<template>
  <div id="post-form">
    <form @submit.prevent="handleSubmit">

      <label>Post Comment</label>
      <input
          type="text"
          :class="{ 'has-error': submitting && invalidComment }"
          v-model="post.comment"
          @focus="clearStatus"
      >
      <p
          v-if="error && submitting"
          class="error-message"
      >❗Please fill out all required fields</p>
      <p
          v-if="success"
          class="success-message"
      >✅ Post successfully added</p>
      <button>Add Post</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'post-form',
  data() {
    return {
      error: false,
      submitting: false,
      success: false,
      post: {
        nickname: 'tyhja',
        comment: '',
        date: new Date().toISOString().split('T')[0],
        timeStamp: new Date().toTimeString().slice(0,8),
      }
    }
  },
  computed: {
    invalidComment() {
      return this.post.comment === ''
    },
  },
  methods: {
    handleSubmit() {
      this.clearStatus()
      this.submitting = true
      if (this.invalidComment) {
        this.error = true
        return
      }
      this.$emit('add:post', this.post)
      this.post = {
        nickname: 'tyhja',
        comment: '',
        date: new Date().toISOString().split('T')[0],
        timeStamp: new Date().toTimeString().slice(0,8),
      }
      this.success = true
      this.error = false
      this.submitting = false
    },
    clearStatus() {
      this.success = false
      this.error = false
    }


  }}
</script>

<style scoped>
form {
  margin-bottom: 2rem;
}
[class*="-message"] {
  font-weight: 500;
}
.error-message {
  color: #d33c40;
}
.success-message {
  color: #32a95d;
}
</style>