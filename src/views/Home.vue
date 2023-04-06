<script setup>
import { auth } from '../firebase'
import { signOut } from "firebase/auth";
import router from '../routes/index'

async function logout() {
    await signOut(auth).then(() => {
       router.push('/login')
    }).catch((error) => {
        // An error happened.
    });
}

</script>

<template>
    <button @click="logout" class="text-white font-bold px-4 py-2 bg-amber-700 rounded-lg" >Deslogar</button>
</template>