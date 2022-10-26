<script setup>
import { computed, ref } from 'vue';

defineProps({
  message: String,
})

const total = 10;
const current = ref(5)

const difference = computed(() => total - current.value)

function increase() {
  if (current.value < 10) {
    current.value++
  }
}

function decrease() {
  if (current.value > 0) {
    current.value--
  }
}


</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center overflow-hidden gap-y-8">
    <div class="flex flex-col md:flex-row justify-center items-center md:gap-x-4 gap-y-4 text-center select-none">
      <h1 class="animate__animated animate__backInLeft text-sky-600 text-4xl font-bold"> Este é o início do seu projeto
      </h1>
      <h1 class="animate__animated animate__backInRight text-sky-400 text-4xl font-semibold"> {{ message }} </h1>
    </div>
    <div class="animate__animated animate__fadeIn animate__delay-2s flex justify-between items-center gap-x-2 ">

      <fa @click="decrease" icon="face-frown" class="text-4xl text-purple-400 hover:scale-125" />


      <template v-for="item in current" class="flex gap-x-1">
        <fa v-if="current == 5" icon="face-meh" class="text-sky-600" />
        <fa v-if="current < 5" icon="face-frown" class="text-purple-300" />
        <fa v-if="current > 5" icon="face-smile" class="text-yellow-300" />
      </template>
      <template v-for="item in difference" class="flex gap-x-1">
        <fa icon="circle" class="text-sky-400" />
      </template>

      <fa @click="increase" icon="face-smile" class="text-4xl text-yellow-400 hover:scale-125" />

    </div>
  </div>
</template>
