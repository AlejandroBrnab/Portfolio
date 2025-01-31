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
    </div>

    <div class="technology-used">
      <h1>Technologies Used</h1>
      <div class="logos">
        <img src="../assets/images/java.png" alt="java">
        <img src="../assets/images/sql.png" alt="java">
        <img src="../assets/images/csharp.png" alt="java">
        <img src="../assets/images/javascript.png" alt="java">
      </div>
    </div>

    <div class="button-container">
      <div class="projects-button">
        <a href="#">My projects</a>
      </div>
      <div class="projects-button">
        <a href="#">My resume</a>
      </div>
    </div>
  </div>

  </div>
  
</template>

<script>
export default {
  name: 'MainCard'
}
</script>

<style scoped>
  .wrapper{
    display: flex;
    justify-content: center;
  }

  img {
    height: 20px;
  }

  .main-container {
    display: flex;
    flex-direction: row;
    background-color: #cecece;
    border-radius: 25px;
    width: 60%;
    background-color: #A04DFF;
  }

  .container-one{
    background-color: #1292EE;
    padding: 2.5%;
    width: 30%;
    border-radius: 25px;
  }

  .profile img{
    height: 5rem;
    border-radius: 50%;
  }

  .link a{
    text-decoration: none;
    color: #2c3e50;
    font-size: 10px;
  }

  .link img{
    height: 2rem;
  }

  .container-two{
    margin: 2.5%;
    width: 70%;
  }

  .about{
    text-align: left;
  }

  .logos img{
    height: 2.5rem;
  }

  .button-container{
    margin-top: 5%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .projects-button{
    background-color: #005CA4;
    border-radius: 15px;
    padding: 5px;
    margin: 5px;
  }

  .projects-button a{
    text-decoration: none;
    color:  #2c3e50;
  }

  @media only screen and (max-width: 950px) {
    .main-container{
      width: 95%;
    }
    
  }

</style>
