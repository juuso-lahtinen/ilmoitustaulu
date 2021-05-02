<template>
  <div
      id="app"
      class="small-container"
  >
    <login-form @login:user="loginUser" />
    <register-form @register:user="registerUser" />
    <h1>Posts</h1>

    <post-form @add:post="addPost" />
    <post-list
        :posts="posts"
        @delete:post="deletePost"
        @edit:post="editPost"
    />
  </div>
</template>

<script>
import PostList from '../components/PostList.vue'
import PostForm from '../components/PostForm.vue'
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from "../components/RegisterForm";
let nickname = "test";

export default {
  name: "app",
  components: {
    PostList,
    PostForm,
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      nickname: nickname,
      posts: [],
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    async registerUser(user) {
      try {
        await fetch('http://localhost:8081/api/register', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        nickname = user.nickname;

      } catch (error) {
        console.error(error)
      }
    },


    async loginUser(user) {
      try {
        await fetch('http://localhost:8081/api/login', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        nickname = "haa";
        nickname = user.nickname;

      } catch (error) {
        console.error(error)
      }
    },


    async getPosts() {
      try {
        const response = await fetch('http://localhost:8081/api/getallposts')
        const data = await response.json()
        this.posts = data
        console.log("kaikki " + data)
      } catch (error) {
        console.error(error)
      }
    },
    async addPost(post) {
      console.log("kirjautunut: " + nickname)
      post = JSON.stringify(post);
      post.nickname = nickname;
      try {
        const response = await fetch('http://localhost:8081/api/POST', {
          method: 'POST',
          body: post,
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })

        const data = await response.json()
        this.posts = [...this.posts, data]


      } catch (error) {
        console.error(error)
      }
    },
    async editPost(id, updatedPost) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'PUT',
          body: updatedPost,
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        const data = await response.json()
        this.posts = this.posts.map(post => post.id === id ? data : post)
      } catch (error) {
        console.error(error)
      }
    },
    async deletePost(id) {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'DELETE'
        })
        this.posts = this.posts.filter(post => post.id !== id)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style>
button {
  background: #009435;
  border: 1px solid #009435;
}
button:hover,
button:active,
button:focus {
  background: #32a95d;
  border: 1px solid #32a95d;
}
.small-container {
  max-width: 680px;
}
</style>