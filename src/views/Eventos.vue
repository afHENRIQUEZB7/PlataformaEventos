<template>
    <div class="d-flex justify-end px-4">
        <v-btn color="success" text="Crear" prepend-icon="mdi-plus-circle-outline" variant="tonal" @click="openDialogCreate()"></v-btn>
    </div>
    <v-data-iterator :items="items">
        <template #default="{ items }">
            <div class="container-card">
                <template v-for="(item, i) in items" :key="i">
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card class="mx-auto" color="grey-lighten-4" max-width="600" v-bind="props">
                            <v-img :aspect-ratio="16 / 9"
                                src="https://th.bing.com/th/id/OIP.kUlV1gAG5h6EiQZXHRpqsAHaEH?rs=1&pid=ImgDetMain"
                                cover>
                                <v-expand-transition>
                                    <div v-if="isHovering" @click="Evento(item.raw.id)"
                                        class="d-flex transition-fast-in-fast-out bg-orange-darken-2 v-card--reveal text-h2"
                                        style="height: 100%;">
                                        <v-icon icon="mdi-eye"></v-icon>
                                    </div>
                                </v-expand-transition>
                            </v-img>

                            <v-card-text class="pt-6">
                                <div class="font-weight-light text-grey text-h6 mb-2">
                                    {{ item.raw.titulo }}
                                </div>

                                <h3 class="text-h4 font-weight-light text-orange mb-2">
                                    <div class="d-flex justify-space-between">
                                        <label :class="item?.raw.tipo ? 'tachado' : ''">
                                            {{ "$" + item.raw.valorBase + " COP" }}
                                        </label>
                                        <div
                                            class="d-flex justify-end align-center text-caption text-medium-emphasis me-1 mb-1">
                                            <v-icon :icon="item.raw?.tipo ? 'mdi-seal' : 'mdi-cash-multiple'" start />
                                            <div class="text-truncate">
                                                <strong v-if="item.raw?.tipo" class="green">GRATIS</strong>
                                                <strong v-if="!item.raw?.tipo" class="red">PAGO</strong>
                                            </div>
                                        </div>
                                    </div>
                                </h3>

                                <div class="font-weight-light text-h6 mb-2">
                                    {{ item.raw.descripcion }}
                                </div>
                            </v-card-text>
                            <div class="d-flex justify-space-between px-4">
                                <div class="d-flex align-center text-caption text-medium-emphasis me-1 mb-1">
                                    <v-icon icon="mdi-calendar" start />
                                    <div class="text-truncate">
                                        <strong class="green">Abierto:</strong> {{ item.raw.fechaApertura }}
                                    </div>
                                </div>
                                <v-divider vertical :thickness="2" color="black"></v-divider>
                                <div class="d-flex align-center text-caption text-medium-emphasis me-1 mb-1">
                                    <v-icon icon="mdi-calendar" start />
                                    <div class="text-truncate">
                                        <strong class="red">Cierre:</strong> {{ item.raw.fechaCierre }}
                                    </div>
                                </div>
                                <!-- <v-btn border class="text-none" flat size="small" text="Ver" /> -->
                            </div>
                        </v-card>
                    </v-hover>
                </template>
            </div>
        </template>
    </v-data-iterator>
    <CraerEvento/>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDataEventos } from '@/services/SeviceEventos'
import { useRouter } from "vue-router"
import { useStore } from 'vuex';
import CraerEvento from '@/components/CrearEvento.vue';

const items = ref<Evento[]>([]);
const router = useRouter();
const store = useStore();

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
    inscripciones: any
}

const loadItems = async () => {
    try {
        window.scrollTo(0, 0);
        const response = await getDataEventos();
        items.value = [...response];
        console.log(items.value);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

onMounted(() => {
    loadItems();
})

const Evento = (id: number) => {
    router.push({ name: 'EventoDetalle', params: { id: id } });
}

const openDialogCreate = () => {
  store.dispatch('openDialogCreate');
};

</script>

<style scoped lang="scss">
.container-card {
    display: grid;
    grid-template-columns: repeat(3, 1fr); // Tres columnas de igual ancho
    gap: 16px; // Espacio entre las columnas y filas (opcional)
    padding: 16px; // Espaciado interno del contenedor (opcional)
}

.v-card {
    display: flex;
    flex-direction: column;
}

.container-info-card {
    height: 100%;
    align-items: end;
    padding-bottom: 5px;
}

.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .9;
    position: absolute;
    width: 100%;
    cursor: pointer;
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