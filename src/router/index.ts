import DasboardLayaout from '@/layouts/DasboardLayout.vue'
import Asistentes from '@/views/Asistentes.vue'
import Dasboard from '@/views/Dasboard.vue'
import EventoDetalle from '@/views/EventoDetalle.vue'
import Eventos from '@/views/Eventos.vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/App',
    name: 'App',
    component: DasboardLayaout,
    children: [{
      path: '/',
      name: 'Dasboard',
      component: Dasboard,
    },
    {
      path: '/eventos',
      name: 'Eventos',
      component: Eventos,
    },
    {
      path: '/asistentes',
      name: 'Asistentes',
      component: Asistentes,
    },
    {
      path: '/evento-detalle/:id',
      name: 'EventoDetalle',
      component: EventoDetalle,
      props: true,
    },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
