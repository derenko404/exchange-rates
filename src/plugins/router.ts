/* eslint-disable ts/promise-function-async */

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/pages/Home.vue') },
  {
    path: '/custom-exchange-rates',
    component: () => import('@/pages/CustomExchangeRates.vue'),
  },
  { path: '/history', component: () => import('@/pages/History.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
