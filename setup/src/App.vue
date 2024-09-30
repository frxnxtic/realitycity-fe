<template>
  <header>
    <div class="header-text">
      <h1>Realicity</h1>
      <h2>Reality & Financie</h2>
    </div>
    <div class="header-img">
      <img src="https://i.ibb.co/HpfK1fG/1724682873955.jpg" alt="1724682873955" border="0">
    </div>
  </header>

  <div class="container">
    <div class="user">
      <h2>{{ user.first_name }} {{ user.last_name }} </h2>
      <p class="position">{{ user.position }}</p>
      <!-- мне нужно создать 4 кнопки полукругом с разными иконками -->
      <div class="social">
        <a href="#"><i class="fab fa-facebook-f"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-linkedin-in"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
      </div>
      <ul class="custom-list">
        <li><i class="fas fa-envelope special"></i>{{ user.email }}</li>
        <li><i class="fas fa-phone special"></i> {{ user.phone }}</li>
        <li><i class="fas fa-map special"</i> {{ user.address }}</li>
      </ul>
    </div>
  </div>
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

  mounted() {
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
</script>


