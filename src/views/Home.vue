<script setup>
import { ref } from 'vue';
import solidbg from '../assets/bg/solid_bg.jpg'
import {useToast} from 'vue-toast-notification';

const $toast = useToast();

const isNew = ref(false)

function showNewAccScreen() {
    isNew.value = true
}

const email = ref('')
const password = ref('')
const checkPassword = ref('')

async function postNewAcc(){

    if(!email.value || !password.value || !checkPassword.value) {
        $toast.error('Todos os campos devem estar preenchidos.', {
            position: 'top'
        })
        return
    }

    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

    if (!regex.test(email.value)) {
        $toast.error('Este não é um e-mail válido.', {
            position: 'top'
        })
        return
    }

    if (password.value != checkPassword.value) {
        $toast.error('As senhas informadas não conferem.', {
            position: 'top'
        })
        return
    }


}

</script>

<template>
    <div :style="{ backgroundImage: `url(${solidbg})` }" class="bg-cover bg-center h-screen flex">
        <div class="flex w-full justify-center items-center">

            <!-- TELA INICIAL -->
            <div v-if="!isNew" class="flex flex-col gap-y-8 w-full items-center px-4">
                <div class="flex gap-x-2 items-center md:hidden">
                    <fa icon="dove" class="text-4xl text-amber-700" />
                    <span class="font-bold text-2xl text-slate-700">My Bird&reg;</span>
                </div>
                <button @click="showNewAccScreen"
                    class="w-full md:w-1/2 bg-amber-700 py-2 px-4 rounded-lg text-white font-bold text-lg hover:scale-105 shadow-lg transition duration-300">Não
                    tem uma conta ainda?</button>
                <button
                    class="w-full md:w-1/2 bg-slate-700 py-2 px-4 rounded-lg text-white font-bold text-lg hover:scale-105 shadow-lg transition duration-300">Acessar
                    com a minha conta
                    <fa icon="dove" /> My Bird&reg;
                </button>
            </div>
            <!-- TELA INICIAL -->

            <div v-if="isNew" class="flex flex-col gap-y-8 w-full items-center px-4">
                
                    <input v-model="email" type="email" placeholder="E-mail" class="w-full md:w-1/2 rounded-lg py-1 px-2 border-2 border-slate-700 text-center"/>
                    <input v-model="password" type="password" placeholder="Cadastre uma senha" class="w-full md:w-1/2 rounded-lg py-1 px-2 border-2 border-slate-700 text-center"/>
                    <input v-model="checkPassword" type="password" placeholder="Confirme a senha" class="w-full md:w-1/2 rounded-lg py-1 px-2 border-2 border-slate-700 text-center"/>
                    <button @click="postNewAcc"
                    class="w-full md:w-1/2 bg-slate-700 py-2 px-4 rounded-lg text-white font-bold text-lg hover:scale-105 shadow-lg transition duration-300">Criar nova conta
                    <fa icon="dove" /> My Bird&reg;
                </button>
                

            </div>

        </div>
        <div class="hidden md:flex w-full justify-center items-center">
            <div class="flex gap-x-2 items-center">
                <fa icon="dove" class="text-4xl text-amber-700" />
                <span class="font-bold text-2xl text-slate-700">My Bird&reg;</span>
            </div>
        </div>
    </div>
</template>