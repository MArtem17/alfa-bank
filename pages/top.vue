<template>
    <v-card>
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="topList" :search="search"></v-data-table>
    </v-card>
</template>

<script>
export default {
    name: 'top',
    data: () => ({
        search: '',
        headers: [
            {
                text: 'Место',
                align: 'start',
                filterable: false,
                value: 'position',
            },
            { text: 'ФИО', value: 'fio' },
            { text: 'Статус', value: 'status' },
            { text: 'Опыт', value: 'rate' },
            { text: 'Монеты', value: 'money' }
        ],
        topList: [],
    }),
    async beforeMount() {
        try {
            const response = await fetch('/top', {
                method: 'GET'
            });
            const result = await response.json()
            if (result.data) {
                this.topList = result.data.list
            }
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }
}
</script>