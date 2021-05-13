<template>
  <div id="app" class="bg-gray-700 flex w-full text-white min-h-screen">

    <div class="w-1/3 w-full border-r border-gray-500 px-2">

      <!-- Login -->

      <button class="my-1 flex justify-start bg-blue-500 px-4 py-2 text-sm font-semibold text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:bg-green-500" @click="showLogin = true">Login</button>
      <transition name="fade" appear>
        <div class="modal-overlay" v-if="showLogin" @click="showLogin = false"></div>
      </transition>
      <transition name="slide" appear>
        <div class="modal text-black" v-if="showLogin">
          <label class="text-2xl flex justify-center">Login</label>
          <login-form id="login" @login:user="loginUser"  />

        </div>
      </transition>

      <!-- Register -->
      <button class="my-1 flex justify-start bg-blue-500 px-4 py-2 text-sm font-semibold text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:bg-green-500" @click="showRegister = true">Register</button>
      <transition name="fade" appear>
        <div class="modal-overlay" v-if="showRegister" @click="showRegister = false"></div>
      </transition>
      <transition name="slide" appear>
        <div class="modal text-black" v-if="showRegister">
          <label class="text-2xl flex justify-center">Register</label>
          <register-form id="register" @register:user="registerUser"  />

        </div>
      </transition>

    </div>
    <div class="w-full w-1/3 bg-gray-700">
      <!-- Post Form -->
      <div class="flex justify-center text-5xl py-5">
        <h1>Posts</h1></div>

      <div class="flex justify-center py-2">

        <post-form @add:post="getPostID"/>
      </div>

      <!-- Post list -->
      <div class="flex justify-center">
        <post-list
            :posts="posts"
            @add:comment2="addComment"
        />
      </div>

    </div>
    <div class="border-l border-gray-500 w-1/3 w-full"></div>
  </div>

</template>

<script>
import PostList from '../components/PostList.vue'
import PostForm from '../components/PostForm.vue'
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from "../components/RegisterForm";
let nickname = "test";
let userid = "userid";
let postid = "postid";
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
      user_id: userid,
      post_id: postid,
      posts: [],
      comments: [],
      showLogin: false,
      showRegister: false,
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {

    /**
     * Asettaa kirjautuneen käyttäjän user.id:n
     */
    async getUserID() {
      try {
        const response = await fetch('http://localhost:8081/api/getloggeduser', {
          method: 'POST',
          body: JSON.stringify(this.user),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })

        let data = await response.json()
        this.user_id = data;

      } catch (error) {
        console.error(error)
      }
    },

    /**
     * Lisää kommentin tietokantaan
     * @oaram{comment} Lisättävä kommentti
     */
    async addComment(comment) {
      await this.getUserID(this.user);
      comment = comment.replace("userid", this.user_id);
      try {
        await fetch('http://localhost:8081/api/POSTcomment', {
          method: 'POST',
          body: comment,
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        await this.getPosts()

      } catch (error) {
        console.error(error)
      }
    },

    /**
     * Lisää käyttäjän tietokantaan
     * @oaram{Object} Lisättävä käyttäjä-olio
     */
    async registerUser(user) {
      try {
        const response = await fetch('http://localhost:8081/api/register', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        let data = await response.json();
        data = JSON.stringify(data);
        if(data.includes("registersuccess"))  {
          nickname = user.nickname;
          userid = user.user_id;
          this.user = user;
        } else  {
          window.alert("Registration failed! Username already in use");
        }
      } catch (error) {
        console.error(error)
      }
    },

    /**
     * Tarkastaa, onko käyttäjää olemassa
     * @oaram{user} Lisättävä käyttäjä-olio
     */
    async loginUser(user) {
      try {
        const response = await fetch('http://localhost:8081/api/login', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        let data = await response.json();
        data = JSON.stringify(data);
        if(data.includes("loginsuccess"))  {
          nickname = user.nickname;
          this.user = user;
        } else  {
          window.alert("Login failed! User doesn't exist");
        }
      } catch (error) {
        console.error(error)
      }
    },

    /**
     * Yhdistää comment- ja post-JSON-oliot
     * @oaram posts
     * @oaram comments
     */
    nestComments(posts, comments) {
      const mergedPosts = [...posts];
      return mergedPosts.reduce((posts, post) => {
        const commentsOnPost = comments.filter(({ post_id }) => post_id === post.post_id);
        post.comments = commentsOnPost;
        posts.push(post);
        return posts;
      }, []);
    },


    /**
     * Hakee viestit
     */
    async getPosts() {
        try {
          await this.getComments();
          const response = await fetch('http://localhost:8081/api/getallposts')
          const data = await response.json()
          this.posts = data
          this.posts = this.nestComments(this.posts, this.comments)

      } catch (error) {
        console.error(error)
      }
    },

    /**
     * Hakee viestien kommentit
     */
    async getComments() {
      try {
        const response = await fetch('http://localhost:8081/api/getallcomments')
        const data = await response.json()
        this.comments = data
      } catch (error) {
        console.error(error)
      }
    },

    /**
     * Lisää viestin tietokantaan
     */
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
        return data
      } catch (error) {
        console.error(error)
      }
    },


    /**
     * Kutsuu addpost-funktiota ja asettaa post-oliolle tietokannasta haetun ID:n
     * @param post lisättävä post-olio
     */
    async getPostID(post) {
      try {
        let addedPost = await this.addPost(post)
        const response = await fetch('http://localhost:8081/api/getpostid')
        let data = await response.json()
        this.postid = data;
        addedPost.post_id = data;
        this.posts = [...this.posts, addedPost]
      } catch (error) {
        console.error(error)
      }
    },
  },
}

</script>

<style>
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 350px;
  max-height: 240px;
  background-color: #FFF;
  border-radius: 16px;
  padding: 25px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform .5s;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
</style>