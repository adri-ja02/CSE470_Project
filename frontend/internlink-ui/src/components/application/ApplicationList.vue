<script setup>

import {
    ref,
    onMounted
}
from 'vue';

import {

    getApplications,
    withdrawApplication

}
from '../../services/applicationService';


const applications = ref([]);


// LOAD
const loadApplications = async () => {

    const res =
        await getApplications();

    applications.value =
        res.data;
};


// WITHDRAW
const withdraw = async (id) => {

    await withdrawApplication(id);

    loadApplications();
};


onMounted(loadApplications);

</script>


<template>

<div class="mt-10">

    <h2
    class="text-3xl font-bold mb-6"
    >
        Applications
    </h2>


    <div

        v-for="app in applications"
        :key="app.id"

        class="bg-white p-5 rounded-2xl shadow-lg mb-5"
    >

        <h3 class="text-xl font-bold">
            {{ app.student_name }}
        </h3>

        <p class="mt-1">
            Internship:
            {{ app.title }}
        </p>

        <p class="mt-1">
            Status:
            {{ app.status }}
        </p>


        <a

            :href="
                `http://localhost:5000/uploads/${app.cv}`
            "

            target="_blank"

            class="text-blue-600 underline"
        >
            View CV
        </a>


        <button

            @click="withdraw(app.id)"

            class="bg-red-500 text-white px-4 py-2 rounded ml-4"
        >
            Withdraw
        </button>

    </div>

</div>

</template>