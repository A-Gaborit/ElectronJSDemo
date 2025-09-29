<template>
  <div
    class="login uk-cover-container uk-background-secondary uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light"
    data-uk-height-viewport="offset-top: true">
    <div class="uk-position-cover uk-overlay-primary"></div>
    <div class="uk-width-medium uk-padding-small uk-position-z-index" uk-scrollspy="cls: uk-animation-fade">
      <div class="uk-text-center uk-margin">
        <img height="75px" width="75px" src="../../assets/img/logo.svg" alt="Logo">
      </div>

      <!-- login -->
      <form class="toggle-class" @submit.prevent="login" ref="loginFormRef">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: mail"></span>
              <input class="uk-input uk-border-pill" v-model="formLogin.email" required placeholder="Email" type="email">
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
              <input class="uk-input uk-border-pill" v-model="formLogin.password" required placeholder="Mot de passe" type="password">
            </div>
          </div>

          <p v-if="errorMessage" class="uk-text-danger uk-margin-small">{{ errorMessage }}</p>
          <p v-if="successMessage" class="uk-text-success uk-margin-small">{{ successMessage }}</p>

          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">Connexion</button>
          </div>
        </fieldset>
      </form>
      <!-- /login -->

      <!-- register -->
      <form class="toggle-class" @submit.prevent="register" hidden ref="registerFormRef">
        <div class="uk-margin-small">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
            <input class="uk-input uk-border-pill" v-model="formRegister.pseudo" placeholder="Pseudo" required type="text">
          </div>
        </div>
        <div class="uk-margin-small">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: mail"></span>
            <input class="uk-input uk-border-pill" v-model="formRegister.email" placeholder="Email" required type="email">
          </div>
        </div>
        <div class="uk-margin-small">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
            <input class="uk-input uk-border-pill" v-model="formRegister.password" placeholder="Mot de passe" required type="password">
          </div>
        </div>
        <div class="uk-margin-small">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
            <input class="uk-input uk-border-pill" v-model="formRegister.passwordConfirm" placeholder="Confirmation de mot de passe" required type="password">
          </div>
        </div>
        <div class="uk-margin-small">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: location"></span>
            <input class="uk-input uk-border-pill" v-model="formRegister.cityCode" placeholder="Code postal" type="text">
          </div>
        </div>
        <div class="uk-margin-small">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: location"></span>
            <input class="uk-input uk-border-pill" v-model="formRegister.city" placeholder="Ville" type="text">
          </div>
        </div>
        <div class="uk-margin-small">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: receiver"></span>
            <input class="uk-input uk-border-pill" v-model="formRegister.phone" placeholder="Téléphone" type="tel">
          </div>
        </div>
        <p v-if="registerError" class="uk-text-danger uk-margin-small">{{ registerError }}</p>
        <div class="uk-margin-bottom">
          <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">Inscription</button>
        </div>
      </form>
      <!-- /register -->

      <!-- action buttons -->
      <div>
        <div class="uk-text-center">
          <a class="uk-link-reset uk-text-small toggle-class"
             data-uk-toggle="target: .toggle-class ;animation: uk-animation-fade"
             data-uk-icon="arrow-right">S'inscrire </a>
          <a class="uk-link-reset uk-text-small toggle-class"
             data-uk-toggle="target: .toggle-class ;animation: uk-animation-fade" hidden><span
            data-uk-icon="arrow-left"></span> Retour à la connexion</a>
        </div>
      </div>
      <!-- action buttons -->
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {loginApi, registerApi} from '../services/auth.js';

const router = useRouter();
const formLogin = ref({email: '', password: ''});

const errorMessage = ref('');
const successMessage = ref('');

const loginFormRef = ref(null);
const registerFormRef = ref(null);

const formRegister = ref({
  pseudo: null,
  email: null,
  password: null,
  passwordConfirm: null,
  cityCode: null,
  city: null,
  phone: null
});
const registerError = ref('');

async function login() {
  errorMessage.value = '';
  try {
    await loginApi(formLogin.value);
    router.push('/articles');
  } catch (err) {
    errorMessage.value = err?.message || 'Une erreur est survenue';
  }
}

async function register() {
  registerError.value = '';
  if (formRegister.value.password !== formRegister.value.passwordConfirm) {
    registerError.value = 'Les mots de passe ne correspondent pas';
    return;
  }
  try {
    await registerApi(formRegister.value);
    successMessage.value = 'Inscription effectuée avec succès';

    if (registerFormRef?.value) registerFormRef.value.setAttribute('hidden', '');
    if (loginFormRef?.value) loginFormRef.value.removeAttribute('hidden');

  } catch (err) {
    registerError.value = err?.message || 'Une erreur est survenue';
  }
}
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