<template>
  <div class="wrapper">
    <div class="main-container">
      <div class="container-one">
        <div class="profile">
          <img src="../assets/images/github_border.png" alt="pfp">
          <h1>Hello, I'm Alejandro Bernabé</h1>
          <p>Web Developer</p>
        </div>
        <div class="social-links">
          <div class="link">
            <a href="https://github.com/AlejandroBrnab">
              <img src="../assets/images/github_borderless.png" alt="github">
              <h2>Github</h2>
            </a>
          </div>
          <div class="link">
            <a href="https://www.linkedin.com/in/alejandro-bernab%C3%A9-rodr%C3%ADguez-97984a32a/">
              <img src="../assets/images/linkedin.png" alt="linkedin">
              <h2>LinkedIn</h2>
            </a>
          </div>
        </div>
      </div>

      <div class="container-two">
        <div class="about">
          <h2>About Me</h2>
          <p>
            I'm a passionate web developer with a focus on building clean and user-friendly experiences.
          </p>
        </div>
        <div class="technology-used">
          <h1>Technologies Used</h1>
          <div class="logos">
            <img src="../assets/images/java.png" alt="java">
            <img src="../assets/images/sql.png" alt="sql">
            <img src="../assets/images/csharp.png" alt="csharp">
            <img src="../assets/images/javascript.png" alt="javascript">
          </div>
        </div>
        <!-- <div class="button-container">
          <div class="projects-button">
            <a href="#">My Projects</a>
          </div>
          <div class="projects-button">
            <a href="#">My Resume</a>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MainCard'
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  margin: 2rem auto;
}

.main-container {
  display: flex;
  flex-direction: row;
  background: linear-gradient(135deg, #8EA4D2, #6279B8);
  border-radius: 25px;
  width: 80%;
  padding: 2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.container-one {
  background-color: #4C9F70;
  color: #FFF;
  padding: 2rem;
  width: 30%;
  border-radius: 25px;
  text-align: center;
}

.container-one .profile img {
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.container-one .link {
  margin-top: 1rem;
}

.container-one .link img {
  height: 32px;
  margin-bottom: 0.5rem;
}

.container-one .link h2 {
  font-size: 1rem;
}

.container-two {
  margin-left: 2rem;
  width: 70%;
  color: #49516F;
}

.container-two .about h2 {
  color: #4C9F70;
}

.logos img {
  height: 40px;
  margin: 0.5rem;
}

.button-container {
  display: flex;
  justify-content: flex-start;
  margin-top: 2rem;
  gap: 1rem;
}

.projects-button {
  background-color: #496F5D;
  color: #FFF;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  text-align: center;
  transition: background-color 0.2s;
}

.projects-button a {
  text-decoration: none;
  color: inherit;
}

.projects-button:hover {
  background-color: #4C9F70;
}

@media only screen and (max-width: 950px) {
  .main-container {
    flex-direction: column;
    width: 90%;
  }

  .container-two {
    margin-left: 0;
  }
}
</style>
