<template>
  <div>
    <form @submit="handleSubmit()">
      Nickname: <input type = "text" name ="name" placeholder="Batman" id="name" v-model="newEvent.name"> <br>
      <textarea name="comment" id="comment" v-model="newEvent.comment">Hey... say something!</textarea> <br>
      <button type="submit">Post</button>
    </form>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
  name: "PostComponent",
  data(){
    return {
      submitting: false,
      error: false,
      success: false,
      notFound: false,
      item: {
        Name: '',
        Comment: '',
      },
      newEvent: {
        name: '',
        comment: '',
      },
    }
  },
  methods: {
    async handleSubmit() {
      //console.log('test handleSubmit')
      this.submitting = true
        let addedEvent = '{"nickName": "'+this.newEvent.name+'", "comment": "'+this.newEvent.comment+'"}'

        console.log("addedEvent="+addedEvent)
        try {
          const config = {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Authorization, Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
            },
            body: addedEvent
          }
          const response = await fetch('http://localhost:8080/api/POSTtest', config)
          //const json = await response.json()
          if (response.ok) {
            console.log('Success:', addedEvent)
            //return response
          } else {
            //
            console.log('response not ok:')
            return
          }
        } catch (error) {
          console.error('Error:', error)
          return


          /*
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          document.getElementById("formatCheck").innerHTML = xmlhttp.responseText;
        }
      };
      xmlhttp.open("POST", "http://localhost:8081/api/POSTtest", true);
      xmlhttp.setRequestHeader("Content-Type", "application/json");
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Authorization, Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

      xmlhttp.send(addedEvent);
      }*/
          /*
      fetch("/http://localhost:8080/api/POSTtest",
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Authorization, Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
            },
            method: "POST",
            body: JSON.stringify(addedEvent)
          })
          .then(function(res){ console.log(res) })
          .catch(function(res){ console.log(res) })
    }
       */
        }}}
}
</script>

<style scoped>

</style>