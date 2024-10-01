<template>
  <RouterView />
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import axios from 'axios'

const id = 1

export default {
  data() {
    return {
      user: {}
    }
  },

  watch: {
    '$route.params.id': 'fetchUser'
  },

  mounted() {
    this.fetchUser()
  },

  methods: {
    fetchUser() {
      const id = this.$route.params.id;
      axios.get('http://localhost:3000/api/realtors/' + id)
      .then(response => {
        this.user = response.data
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
  
}
</script>


