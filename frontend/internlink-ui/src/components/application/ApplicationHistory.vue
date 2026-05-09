<script setup>

import {
    ref
}
from 'vue';

import {
    getHistory
}
from '../../services/applicationService';


const email = ref('');

const history = ref([]);


const loadHistory = async () => {

    const res =
        await getHistory(email.value);

    history.value = res.data;
};

</script>


<template>

<div class="mt-10">

    <h2
    class="text-3xl font-bold mb-4"
    >
        Application History
    </h2>


    <input

        v-model="email"

        placeholder="Enter Student Email"

        class="border p-3 rounded w-full mb-4"
    />


    <button

        @click="loadHistory"

        class="bg-green-600 text-white px-4 py-2 rounded"
    >
        View History
    </button>


    <div
        v-for="item in history"
        :key="item.id"

        class="bg-white p-4 rounded shadow mt-4"
    >

        <h3 class="font-bold">
            {{ item.title }}
        </h3>

        <p>
            Status:
            {{ item.status }}
        </p>

    </div>

</div>

</template>