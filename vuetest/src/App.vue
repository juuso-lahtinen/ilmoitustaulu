<template>
  <div id="app">
    <h1>Submit Form Data to API</h1>
    <post-list v-bind:posts="posts" />
    <post-form @add:post="addPost" />
  </div>
</template>
<script>
import PostList from "../components/PostList";
import PostForm from "../components/PostForm"

export default {
  name: 'App',
  components: {
    PostList,
    PostForm
  },
  data() {
    return {
      posts: [],
    }
  },

  mounted() { //tekee vasta kun komponentti DOMissa
    this.getPosts()
  },

  methods: {
    /*
    addPost(post) {   //väliaikainen id:n generointi, pitää oikeasti hakea tietokannasta
      const lastId =
          this.posts.length > 0
              ? this.posts[this.posts.length - 1].id
              : 0;
      const id = lastId + 1;
      const newPost = { ...post, id };

      this.posts = [...this.posts, newPost]
    },
     */
    async getPosts() {
      try {
        const response = await fetch('http://localhost:8081/api/getallposts')
        this.posts = await response.json()
      } catch (error) {
        console.error(error)
      }
    },
    async addPost(post) {
      try {
        const response = await fetch('http://localhost:8081/api/POST', {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            'Access-Control-Allow-Origin' : '*'
          }
        })
        const data = await response.json()
        this.posts = [...this.posts, data]
      } catch (error) {
        console.error(error)
      }
    }
  },
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
