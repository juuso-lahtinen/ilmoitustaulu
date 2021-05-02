<template>
  <div>

    <!-- Login, Register -->
    <div class="flex justify-end py-1 mr-5">
    <login-form id="login" @login:user="loginUser" />
    </div>

    <div class="flex justify-end mr-5">
    <register-form id="register" @register:user="registerUser" />
    </div>

    <!-- Post Form -->
   <div class="flex justify-center text-5xl py-3"><h1>Posts</h1></div>

    <div class="flex justify-center py-8">

    <post-form @add:post="addPost"/>
    </div>

    <!-- Post list -->
    <div class="flex justify-center">
      <post-list
          :posts="posts"
          @delete:post="deletePost"
          @edit:post="editPost"
      />
    </div>
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
        const response = await fetch('http://localhost:8081/api/register', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        let data = await response.json();
        data = JSON.stringify(data);

        console.log("response: " + data);
        if(data.includes("registersuccess"))  {
          nickname = user.nickname;
          toggleElement("login");
          toggleElement("register");
        } else  {
          window.alert("Registration failed! Username already in use");
        }


      } catch (error) {
        console.error(error)
      }
    },


    async loginUser(user) {
      try {
        const response = await fetch('http://localhost:8081/api/login', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        let data = await response.json();
        data = JSON.stringify(data);

        console.log("response: " + data);
        if(data.includes("loginsuccess"))  {
          nickname = user.nickname;
          toggleElement("login");
          toggleElement("register");
        } else  {
          window.alert("Login failed! User doesn't exist");
        }


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
      post = JSON.stringify(post);
      post = post.replace("tyhja", nickname);

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

function toggleElement(element) {
  let x = document.getElementById(element);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
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