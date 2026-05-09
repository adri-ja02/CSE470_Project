<script setup>

import { ref, onMounted } from 'vue';

import axios from 'axios';

import {
    applyInternship
}
from '../../services/applicationService';


const internships = ref([]);

const cv = ref(null);

const form = ref({

    student_name: '',
    student_email: '',
    internship_id: ''
});


// LOAD INTERNSHIPS
const loadInternships = async () => {

    const res =
        await axios.get(
            'http://localhost:5000/internships'
        );

    internships.value = res.data;
};


// FILE CHANGE
const handleFile = (e) => {

    cv.value = e.target.files[0];
};


// SUBMIT
const submitApplication = async () => {

    try {

        const formData =
            new FormData();

        formData.append(
            'student_name',
            form.value.student_name
        );

        formData.append(
            'student_email',
            form.value.student_email
        );

        formData.append(
            'internship_id',
            form.value.internship_id
        );

        formData.append(
            'cv',
            cv.value
        );

        await applyInternship(formData);

        alert('Application submitted');

    } catch (err) {

        console.log(err);
    }
};


onMounted(loadInternships);

</script>


<template>

<div
class="bg-white p-6 rounded-2xl shadow-xl"
>

    <h2
    class="text-3xl font-bold mb-6"
    >
        Apply Internship
    </h2>


    <input
        v-model="form.student_name"
        placeholder="Student Name"
        class="border p-3 rounded w-full mb-4"
    />


    <input
        v-model="form.student_email"
        placeholder="Student Email"
        class="border p-3 rounded w-full mb-4"
    />


    <select
        v-model="form.internship_id"
        class="border p-3 rounded w-full mb-4"
    >

        <option value="">
            Select Internship
        </option>

        <option
            v-for="item in internships"
            :key="item.id"
            :value="item.id"
        >
            {{ item.title }}
        </option>

    </select>


    <input
        type="file"
        @change="handleFile"
        class="mb-5"
    />


    <button
        @click="submitApplication"
        class="bg-blue-600 text-white px-5 py-3 rounded-lg"
    >
        Apply
    </button>

</div>

</template>