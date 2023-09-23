<template>
    <v-card>
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="list" :search="search"></v-data-table>
    </v-card>
</template>

<script>
export default {
    name: 'full',
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
        list: []
    }),
    async beforeMount() {
        try {
            const response = await fetch('/full', {
                method: 'GET'
            });
            const result = await response.json()
            if (result.data) {
                this.list = result.data.list
            }
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }
}
</script>