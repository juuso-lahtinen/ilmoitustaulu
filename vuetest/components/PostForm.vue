<template>
  <div id="post-form">
    <form @submit.prevent="handleSubmit"
        class="w-full relative"
    >

      <label>Post Comment</label>
      <input
          class="shadow-lg px-3 py-7 placeholder-blueGray-300 text-black relative text-sm border border-blueGray-300 rounded outline-none focus:outline-none focus:ring-1 w-full"
          type="textarea"
          :maxlength="max"
          :class="{ 'has-error': submitting && invalidComment }"
          v-model="post.comment"
          @focus="clearStatus"
          placeholder="write here"
      >
      <div class="flex justify-end mt-2 text-sm" v-text="(max - post.comment.length)"></div>
      <p
          v-if="error && submitting"
          class="error-message"
      >❗Please fill out all required fields</p>
      <p
          v-if="success"
          class="success-message"
      >✅ Post successfully added</p>
      <div class="flex justify-center py-5">
      <button class="bg-blue-500 px-4 py-2 font-semibold tracking-wider text-white rounded-xl hover:bg-blue-600">
        Post
      </button>
      </div>
    </form>

  </div>
</template>

<script>
export default {
  name: 'post-form',
  data() {
    return {
      max: 100,
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