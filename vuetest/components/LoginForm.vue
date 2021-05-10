<template>

  <div id="login-form">

    <form @submit.prevent="handleSubmit">

      <label class="px-2">Username</label>
      <input
          class="flex justify-start px-2 py-1 placeholder-blueGray-300 text-black text-sm border border-blueGray-300 rounded outline-none focus:outline-none focus:ring-1"

          ref="first"
          type="text"
          :class="{ 'has-error': submitting && invalidName }"
          v-model="user.nickname"
          @focus="clearStatus"
          @keypress="clearStatus"
          placeholder="username"
      >
      <label class="px-2">Password</label>
      <input

          class="flex justify-start px-2 py-1 placeholder-blueGray-300 text-black text-sm border border-blueGray-300 rounded outline-none focus:outline-none focus:ring-1"

          type="password"
          :class="{ 'has-error': submitting && invalidPassword }"
          v-model="user.password"
          @focus="clearStatus"
          placeholder="password"
      >
      <p
          v-if="error && submitting"
          class="error-message"
      >❗ Please fill out all required fields</p>
      <p
          v-if="success"
          class="success-message"
      >✅ Logged in</p>
      <button
          class="my-2 flex justify-start bg-blue-500 px-4 py-2 text-sm font-semibold text-white rounded-xl hover:bg-blue-600">
        Login
      </button>
    </form>
  </div>

</template>

<script>
export default {
  name: 'login-form',
  data() {
    return {
      error: false,
      submitting: false,
      success: false,
      user: {
        nickname: '',
        password: '',
      }
    }
  },
  computed: {
    invalidName() {
      return this.user.nickname === ''
    },
    invalidPassword() {
      return this.user.password === ''
    },
  },
  methods: {
    handleSubmit() {
      this.clearStatus()
      this.submitting = true
      if (this.invalidName || this.invalidPassword) {
        this.error = true
        return
      }
      this.$emit('login:user', this.user)
      this.$refs.first.focus()
      this.post = {
        nickname: '',
        password: '',
      }
      this.success = true
      this.error = false
      this.submitting = false
    },
    clearStatus() {
      this.success = false
      this.error = false
    }
  }
}
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