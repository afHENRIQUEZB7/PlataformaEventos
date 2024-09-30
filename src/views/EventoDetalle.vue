<template>
    <v-card class="container">
        <v-toolbar>
            <v-toolbar-title>
                {{ item?.titulo }}
            </v-toolbar-title>

            <v-spacer />

            <v-btn v-tooltip="'Close'" icon="mdi-close" @click="closeEvento"/>
        </v-toolbar>
        <div class="row">
            <div class="col">
                <v-card elevation="12">
                    <v-carousel class="carousel" cycle hide-delimiter-background show-arrows="hover">
                        <v-carousel-item v-for="(image, i) in images" :key="i" cover rounded :src="image" />
                    </v-carousel>
                </v-card>
            </div>
            <div class="col">
                <v-card variant="text">
                    <v-card-item>
                        <v-card-title>
                            <div class="d-flex justify-space-between">
                                <strong>{{ item?.titulo }}</strong>
                                <div class="d-flex align-center text-caption text-medium-emphasis me-1 mb-1">
                                    <v-icon icon="mdi-calendar" start />
                                    <div class="text-truncate">
                                        <strong>Creación:</strong> {{ item?.fecha }}
                                    </div>
                                </div>
                            </div>
                        </v-card-title>

                        <v-card-subtitle>
                            <div class="d-flex justify-space-between">
                                <label :class="tipoEvento">{{ "$" + item?.valorBase + " COP" }}</label>
                                <div class="d-flex align-center text-caption text-medium-emphasis me-1 mb-1">
                                    <v-icon icon="mdi-clock" start />
                                    <div class="text-truncate">
                                        <strong>Hora:</strong> {{ item?.hora }}
                                    </div>
                                </div>
                            </div>
                        </v-card-subtitle>
                    </v-card-item>
                    <v-card-text>
                        {{ item?.descripcion }}
                        <br>
                        <br>
                        <div class="d-flex justify-space-between">
                            <div class="d-flex align-center text-caption text-medium-emphasis me-1 mb-1">
                                <v-icon icon="mdi-map-marker" start />
                                <div class="text-truncate">
                                    <strong>Lugar:</strong> {{ item?.lugar }}
                                </div>
                            </div>
                            <div class="d-flex align-center text-caption text-medium-emphasis me-1 mb-1">
                                <v-icon icon="mdi-ticket-account" start />
                                <div class="text-truncate">
                                    <strong>Cupos Disponibles:</strong> {{ item?.cupoDisponible }}
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="d-flex justify-space-between">
                            <div class="d-flex align-center text-caption text-medium-emphasis me-1 mb-1">
                                <v-icon icon="mdi-label" start />
                                <div class="text-truncate">
                                    <strong>Categoria:</strong> {{ item?.categoria }}
                                </div>
                            </div>
                            <div class="d-flex align-center text-caption text-medium-emphasis me-1 mb-1">
                                <v-icon icon="mdi-account-switch" start />
                                <div class="text-truncate">
                                    <strong>Capacidad:</strong> {{ item?.capacidadEvento }}
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="d-flex justify-end align-center text-caption text-medium-emphasis me-1 mb-1">
                            <v-icon :icon="item?.tipo ? 'mdi-seal' : 'mdi-cash-multiple'" start />
                            <div class="text-truncate">
                                <strong v-if="item?.tipo" class="green">GRATIS</strong>
                                <strong v-if="!item?.tipo" class="red">PAGO</strong>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
                <div class="d-flex justify-space-between px-4">
                    <div class="d-flex align-center text-caption text-medium-emphasis me-1 mb-1">
                        <v-icon icon="mdi-calendar" start />
                        <div class="text-truncate">
                            <strong class="green">Abierto:</strong> {{ item?.fechaApertura }}
                        </div>
                    </div>
                    <v-divider vertical :thickness="2" color="black"></v-divider>
                    <div class="d-flex align-center text-caption text-medium-emphasis me-1 mb-1">
                        <v-icon icon="mdi-calendar" start />
                        <div class="text-truncate">
                            <strong class="red">Cierre:</strong> {{ item?.fechaCierre }}
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-space-between px-4 accion">
                    <div class="d-flex align-center text-caption text-medium-emphasis me-1 mb-1">
                        <v-btn prepend-icon="mdi-pencil" variant="tonal" color="success" :elevation="4" @click="openDialogEdit">
                            Editar
                        </v-btn>
                    </div>
                    <div class="d-flex align-center text-caption text-medium-emphasis me-1 mb-1">
                        <v-btn prepend-icon="mdi-delete-forever" variant="tonal" color="red" :elevation="4" @click="openDialogDelete">
                            Eliminar
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
        <v-divider />
    </v-card>
    <EditarEvento :item="item"/>
    <EliminarEvento :id="item?.id"/>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDataEvento } from '@/services/SeviceEventos'
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
import EditarEvento from '@/components/EditarEvento.vue';
import EliminarEvento from '@/components/EliminarEvento.vue';


const store = useStore();

const item = ref<Evento>();
const tipoEvento = ref('');
const router = useRouter();

const props = defineProps({
    id: Number,
});

const images = ref(['https://th.bing.com/th/id/OIP.kUlV1gAG5h6EiQZXHRpqsAHaEH?rs=1&pid=ImgDetMain', 'https://cdn0.casamentos.com.br/vendor/4713/3_2/960/png/organizaco-de-eventos.jpeg', 'https://guia-static.gazetadopovo.com.br/fichas/25/25-e717eef932316988d154097714ebcb29.jpg'])

interface Evento {
    id: number;
    titulo: string,
    descripcion: string,
    fecha: string,
    hora: string,
    lugar: string,
    cupoDisponible: number,
    tipo: boolean,
    valorBase: number,
    categoria: string,
    capacidadEvento: number,
    fechaApertura: string,
    fechaCierre: string
}

const loadEvento = async (id: number) => {
    try {
        window.scrollTo(0, 0);
        const response = await getDataEvento(id);
        item.value = response;
        tipoEvento.value = item.value?.tipo ? 'tachado' : '';
        console.log(item.value);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

onMounted(() => {
    if (props.id) {
        loadEvento(props.id)
    }
})

const closeEvento = () => {
  router.back();
};

const openDialogEdit = () => {
  store.dispatch('openDialogEdit');
};

const openDialogDelete = () => {
  store.dispatch('openDialogDelete');
};

</script>

<style scoped lang="scss">
.container {
    margin: 0 3rem 0 0;
}

.row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 12px;
    grid-auto-rows: minmax(100px, auto);
    padding: 2rem;
}

.info-skeleton {
    width: 100%;
    padding: 2rem;
}

.title-skeleton {
    width: 100%;
    background-color: transparent;
}

.accion {
    margin-top: 2rem;
}

.green {
    color: green;
}

.red {
    color: red;
}

.tachado {
    text-decoration: line-through;
}
</style>