<script setup>
import { ref } from 'vue';
import solidbg from '../assets/bg/solid_bg.jpg'
import { useToast } from 'vue-toast-notification';
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import LoadingSpin from '../components/LoadingSpin.vue';
import router from '../routes/index'


const $toast = useToast();

const isNew = ref(false)
const hasAcc = ref(false)
const loading = ref(false)

function showNewAccScreen() {
    isNew.value = true
}

function showHasAccScreen() {
    hasAcc.value = true
}

const emailInput = ref('')
const passwordInput = ref('')
const checkPasswordInput = ref('')

async function postNewUser(email, uid) {
    await setDoc(doc(db, "users", uid), {
        EMAIL: email,
        UID: uid
    })
        .then()
        .catch((error) => {
            $toast.error(error, {
                position: 'top'
            })
        })
}

async function postNewAcc() {
    if (!emailInput.value || !passwordInput.value || !checkPasswordInput.value) {
        $toast.error('Todos os campos devem estar preenchidos.', {
            position: 'top'
        })
        return
    }

    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

    if (!regex.test(emailInput.value)) {
        $toast.error('Este não é um e-mail válido.', {
            position: 'top'
        })
        return
    }

    if (passwordInput.value != checkPasswordInput.value) {
        $toast.error('As senhas informadas não conferem.', {
            position: 'top'
        })
        return
    }

    loading.value = true

    await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then(async (userCredential) => {

            const uid = userCredential.user.uid
            const email = userCredential.user.email

            await postNewUser(email, uid)

            passwordInput.value = ""
            isNew.value = false
            hasAcc.value = true
            loading.value = false

            $toast.success(`Sua conta foi criada com sucesso!`, {
                position: 'top'
            })

        })
        .catch((error) => {
            loading.value = false
            const errorMessage = error.message;
            $toast.error(errorMessage, {
                position: 'top'
            })
        });
}

async function login() {
    loading.value = true
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then(() => {
            loading.value = false
            router.push('/')
        })
        .catch((error) => {
            loading.value = false
            const errorMessage = error.message;
            $toast.error(errorMessage, {
                position: 'top'
            })
        });
}

</script>

<template>
    <div :style="{ backgroundImage: `url(${solidbg})` }" class="bg-cover bg-center h-screen flex">
        <div class="flex w-full justify-center items-center">

            <!-- TELA INICIAL -->
            <div v-if="!isNew && !hasAcc"
                class="animate__animated animate__fadeIn flex flex-col gap-y-8 w-full items-center px-4">
                <div class="flex gap-x-2 items-center md:hidden">
                    <fa icon="dove" class="text-4xl text-amber-700" />
                    <span class="font-bold text-2xl text-slate-700">My Bird&reg;</span>
                </div>
                <button @click="showNewAccScreen"
                    class="w-full md:w-2/3 text-sm md:text-base bg-amber-700 py-2 px-4 rounded-lg text-white font-bold text-lg hover:scale-105 shadow-lg transition duration-300">Não
                    tem uma conta ainda?</button>
                <button @click="showHasAccScreen"
                    class="w-full md:w-2/3 text-sm md:text-base bg-slate-700 py-2 px-4 rounded-lg text-white font-bold text-lg hover:scale-105 shadow-lg transition duration-300">Acessar
                    com a minha conta
                    <fa icon="dove" /> My Bird&reg;
                </button>
            </div>
            <!-- TELA INICIAL -->

            <!-- CRIAÇÃO DE NOVA CONTA -->
            <form @submit.prevent="postNewAcc" v-if="isNew"
                class="animate__animated animate__fadeInLeft flex flex-col gap-y-8 w-full items-center px-4">

                <input v-model="emailInput" type="email" placeholder="E-mail"
                    class="w-full md:w-1/2 rounded-lg py-1 px-2 border-2 border-slate-700 text-center" />
                <input v-model="passwordInput" type="password" placeholder="Cadastre uma senha"
                    class="w-full md:w-1/2 rounded-lg py-1 px-2 border-2 border-slate-700 text-center" />
                <input v-model="checkPasswordInput" type="password" placeholder="Confirme a senha"
                    class="w-full md:w-1/2 rounded-lg py-1 px-2 border-2 border-slate-700 text-center" />
                <button v-if="!loading" type="submit"
                    class="w-full md:w-1/2 bg-slate-700 py-2 px-4 rounded-lg text-white font-bold text-lg hover:scale-105 shadow-lg transition duration-300">Criar
                    nova conta
                    <fa icon="dove" /> My Bird&reg;
                </button>
                <span v-if="loading" class="flex gap-x-2 items-center">
                    <LoadingSpin color="amber-700" />
                    <span class="animate-pulse font-semibold">Processando...</span>
                </span>
            </form>
            <!-- CRIAÇÃO DE NOVA CONTA -->

            <!-- LOGIN -->
            <form @submit.prevent="login" v-if="hasAcc"
                class="animate__animated animate__fadeInLeft flex flex-col gap-y-8 w-full items-center px-4">
                <input v-model="emailInput" type="email" placeholder="E-mail"
                    class="w-full md:w-1/2 rounded-lg py-1 px-2 border-2 border-slate-700 text-center" />
                <input v-model="passwordInput" type="password" placeholder="Senha"
                    class="w-full md:w-1/2 rounded-lg py-1 px-2 border-2 border-slate-700 text-center" />
                <div v-if="!loading" class="flex flex-col gap-y-2 w-full items-center">
                    <button type="submit"
                        class="w-full md:w-1/2 bg-slate-700 py-2 rounded-lg text-white font-bold text-lg hover:scale-105 shadow-lg transition duration-300">
                        Acessar
                        <fa icon="dove" /> My Bird&reg;
                    </button>
                    <button class="w-full md:w-1/2 font-bold text-sm text-white bg-amber-700 py-1 rounded-lg hover:scale-105 shadow-lg transition duration-300">Esqueci minha senha</button>
                </div>
                <span v-if="loading" class="flex gap-x-2 items-center">
                    <LoadingSpin color="amber-700" />
                    <span class="animate-pulse font-semibold">Processando...</span>
                </span>
            </form>
            <!-- LOGIN -->

        </div>
        <div class="hidden md:flex w-full justify-center items-center">
            <div class="flex gap-x-2 items-center">
                <fa icon="dove" class="text-4xl text-amber-700" />
                <span class="font-bold text-2xl text-slate-700">My Bird&reg;</span>
            </div>
        </div>
    </div>
</template>