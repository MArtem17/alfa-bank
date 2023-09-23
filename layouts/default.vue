<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-list class="menu">
        <v-list-item class="menu__item" v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<style>
.menu {
  display: flex;
  margin: auto;
  padding: 0px;
}

.menu__item {
  width: 300px;
  margin: 0px 25px;
  text-align: center;
}
</style>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Начало',
          to: '/home'
        },
        {
          // icon: 'mdi-format-list-numbered',
          icon: 'mdi-podium-gold',
          title: 'Топ 5',
          to: '/top'
        },
        {
          icon: 'mdi-podium',
          title: 'Весь список',
          to: '/full'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
