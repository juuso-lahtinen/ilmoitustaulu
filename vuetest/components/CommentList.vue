<template>
  <div id="comment-list">
    <p
        v-if="comments.length < 1"
        class="empty-table"
    >
      No posts
    </p>
    <div :key="comment.id" v-for="comment in comments">
      <div class="max-w-md px-12 bg-gray-200 shadow-2xl rounded-2xl my-5" >
        <h2 class="py-2 text-gray-800 text-3xl font-semibold">{{comment.nickname}}</h2>
        <p class="font-sans mt-2 py-2 text-gray-600 break-words">{{comment.comment}}</p>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'comment-list',

  props: {
    comments: Array,
  },
  data() {
    return {
      editing: null,

    }
  },

  mounted() {
    this.getComments()
  },
  methods: {


    async getComments(postid) {
      console.log("klikattu postid " + postid);
      var obj = { post_id: postid };
      try {
        const response = await fetch('http://localhost:8081/api/getcomments', {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        let data = await response.json()
        data = JSON.stringify(data);
        this.comments = data;

      } catch (error) {
        console.error(error)
      }
    },


  }
}
</script>

<style scoped>

</style>