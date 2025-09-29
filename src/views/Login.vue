<template>
  <div
    class="login uk-cover-container uk-background-secondary uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light"
    data-uk-height-viewport>
    <div class="uk-position-cover uk-overlay-primary"></div>
    <!-- /overlay -->
    <div class="uk-position-bottom-center uk-position-small uk-visible@m uk-position-z-index">
      <span class="uk-text-small uk-text-muted">© 2019 Company Name - <a href="https://github.com/zzseba78/Kick-Off">Created by KickOff</a> | Built with <a
        href="http://getuikit.com" title="Visit UIkit 3 site" target="_blank" data-uk-tooltip><span
        data-uk-icon="uikit"></span></a></span>
    </div>
    <div class="uk-width-medium uk-padding-small uk-position-z-index" uk-scrollspy="cls: uk-animation-fade">

      <div class="uk-text-center uk-margin">
        <img src="../../assets/img/login-logo.svg" alt="Logo">
      </div>

      <!-- login -->
      <form class="toggle-class" action="login-dark.html">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
              <input class="uk-input uk-border-pill" required placeholder="Username" type="text">
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
              <input class="uk-input uk-border-pill" required placeholder="Password" type="password">
            </div>
          </div>
          <div class="uk-margin-small">
            <label><input class="uk-checkbox" type="checkbox"> Keep me logged in</label>
          </div>
          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">LOG IN</button>
          </div>
        </fieldset>
      </form>
      <!-- /login -->

      <!-- recover password -->
      <form class="toggle-class" action="login-dark.html" hidden>
        <div class="uk-margin-small">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: mail"></span>
            <input class="uk-input uk-border-pill" placeholder="E-mail" required type="text">
          </div>
        </div>
        <div class="uk-margin-bottom">
          <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">SEND PASSWORD</button>
        </div>
      </form>
      <!-- /recover password -->

      <!-- action buttons -->
      <div>
        <div class="uk-text-center">
          <a class="uk-link-reset uk-text-small toggle-class"
             data-uk-toggle="target: .toggle-class ;animation: uk-animation-fade">Forgot your password?</a>
          <a class="uk-link-reset uk-text-small toggle-class"
             data-uk-toggle="target: .toggle-class ;animation: uk-animation-fade" hidden><span
            data-uk-icon="arrow-left"></span> Back to Login</a>
        </div>
      </div>
      <!-- action buttons -->
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.login {
  background-image: url('https://picsum.photos/640/700/?image=1044');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

@media screen and (min-width: 640px) {
  .login {
    background-image: url('https://picsum.photos/960/700/?image=1044');
  }
}

@media screen and (min-width: 960px) {
  .login {
    background-image: url('https://picsum.photos/1200/900/?image=1044');
  }
}

@media screen and (min-width: 1200px) {
  .login {
    background-image: url('https://picsum.photos/1600/950/?image=1044');
  }
}

@media screen and (min-width: 1600px) {
  .login {
    background-image: url('https://picsum.photos/2000/1050/?image=1044');
  }
}
</style>