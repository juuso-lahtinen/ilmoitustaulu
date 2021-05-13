<template>
  <div id="comment-form">
    <form @submit.prevent="handleSubmit"
          class="w-full relative"
    >

      <label>Post Comment</label>
      <input
          class="shadow-lg px-3 py-7 placeholder-blueGray-300 text-black relative text-sm border border-blueGray-300 rounded outline-none focus:outline-none focus:ring-1 w-full"
          type="textarea"
          :maxlength="max"
          v-model="comment.comment"
          @focus="clearStatus"
          placeholder="write here"
      >
      <div class="flex justify-end mt-2 text-sm" v-text="(max - comment.comment.length)"></div>
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
  name: 'comment-form',
  props: ['post', 'postid'],
  data() {
    return {
      max: 100,
      error: false,
      submitting: false,
      success: false,
      comment: {
        post: this.post,
        post_id: this.postid,
        user_id: 'userid',
        comment: '',
      }
    }
  },

  methods: {

    /**
     * Kutsutaan kun käyttäjä painaa kommentin lähetysnappulaa. Lähettää kommentti-olion Postlist.vueen.
     */
    handleSubmit() {
      this.clearStatus()
      this.submitting = true

      this.$emit('click');
      this.$emit('add:comment', this.comment)

      this.comment = {
        user_id: 'userid',
        post_id: this.postid,
        comment: '',
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