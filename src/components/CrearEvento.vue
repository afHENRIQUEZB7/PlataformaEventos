<template>
    <div class="pa-4 text-center">
        <v-dialog v-model="isDialogOpenCreate" max-width="600" persistent>
            <v-card prepend-icon="mdi-plus-circle-outline" title="Craer Evento">
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field v-model="item.titulo" label="Titulo *" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field type="number" label="Valor Base *" v-model="item.valorBase" prefix="$"
                                required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field label="Lugar *" v-model="item.lugar" required></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4" sm="6">
                            <v-select label="Categotria *" v-model="item.categoria"
                                :items="['Comferencia', 'Seminario', 'Entretenimiento']"></v-select>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field type="number" label="Capacidad *" v-model="item.capacidadEvento"
                                required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                            <v-select label="Tipo Evento *" v-model="item.tipo" :items="tiposEventos"
                                item-title="label" item-value="value" required></v-select>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-date-input v-model="fechaApertura" view-mode="year" label="Selecionar Fecha Apertura"
                                prepend-icon="" prepend-inner-icon=""></v-date-input>

                        </v-col>

                        <v-col cols="12" md="6">
                            <v-date-input v-model="fechaCierre" view-mode="year" label="Seleccionar Fecha Cierre"
                                prepend-icon="" prepend-inner-icon=""></v-date-input>
                        </v-col>

                        <v-col cols="12" md="12" sm="12">
                            <v-textarea v-model="item.descripcion" label="Descripción" rows="1" />
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="Cancelar" variant="plain" @click="closeDialog"></v-btn>
                    <v-btn color="success" text="Crear" variant="tonal" @click="create()"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { VDateInput } from 'vuetify/labs/VDateInput'
import { createDataEvento } from '@/services/SeviceEventos'
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const item = ref<Evento>({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    lugar: '',
    cupoDisponible: 0,
    tipo: false,
    valorBase: 0,
    categoria: '',
    capacidadEvento: 0,
    fechaApertura: '',
    fechaCierre: ''
});

interface Evento {
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

const tiposEventos = [
    { label: 'Gratis', value: true },
    { label: 'Pago', value: false }
];

// Computed para obtener el estado del diálogo desde Vuex
const isDialogOpenCreate = computed(() => store.getters.isDialogOpenCreate);

// Métodos para manejar el cierre del diálogo
const closeDialog = () => {
    store.dispatch('closeDialogCreate');
};

const fechaApertura = ref<Date | null>(null);
const fechaCierre = ref<Date | null>(null);

// Opcional: Si deseas actualizar item cuando fechaApertura cambia
watch(fechaApertura, (newVal) => {
    if (newVal && item.value) item.value.fechaApertura = formatDateToString(newVal);
});
watch(fechaCierre, (newVal) => {
    if (newVal && item.value) item.value.fechaCierre = formatDateToString(newVal);
});


const create = async () => {
    if (item.value ) {
        try {
            window.scrollTo(0, 0);
            item.value.fecha = formatDateToString(new Date());
            item.value.hora = getCurrentTime24Hour();
            const response = await createDataEvento(item.value);
            const res = response.split(' id: ')
            alert(res[0])
            closeDialog()
            router.push({ name: 'EventoDetalle', params: { id: parseInt(res[1]) } })
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
}

const formatDateToString = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0'); // Día con 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos (0-11 a 1-12)
    const year = date.getFullYear(); // Año
    return `${day}/${month}/${year}`; // Retorna la cadena en formato "DD-MM-YYYY"
};

const getCurrentTime24Hour = (): string => {
    const date = new Date(); // Obtener la fecha y hora actual
    const hours = String(date.getHours()).padStart(2, '0'); // Horas con 2 dígitos
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutos con 2 dígitos
    return `${hours}:${minutes}`; // Retornar la hora en formato "HH:MM"
};

</script>

<style scoped lang="scss"></style>