<script setup>

import ApplicationForm
from '../components/application/ApplicationForm.vue';

import ApplicationList
from '../components/application/ApplicationList.vue';

import ApplicationHistory
from '../components/application/ApplicationHistory.vue';

</script>


<template>

<div class="min-h-screen bg-gray-100 p-10">

    <ApplicationForm />

    <ApplicationList />

    <ApplicationHistory />

</div>

</template>