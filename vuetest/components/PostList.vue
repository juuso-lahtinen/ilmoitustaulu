<template>
  <div id="post-list">
    <table>
      <!-- ...thead... -->
      <tbody>
      <tr v-for="post in posts" :key="post.id">
        <td>{{ post.comment }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'post-list',
  props: {
    posts: Object,
  },
}
</script>

<style scoped></style>