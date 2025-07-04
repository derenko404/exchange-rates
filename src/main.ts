import { VueQueryPlugin } from '@tanstack/vue-query'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from '@/App.vue'

import i18n from '@/plugins/i18n'
import { router } from '@/plugins/router'
import { queryClient } from '@/plugins/vue-query'
import 'element-plus/dist/index.css'
import './style.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(i18n)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
