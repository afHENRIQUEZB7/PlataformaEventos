<template>
    <div class="pa-4 text-center">
        <v-dialog v-model="isDialogOpenEdit" max-width="600" persistent>
            <v-card prepend-icon="mdi-pencil" title="Editar Evento">
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field v-model="props.item.titulo" label="Titulo *" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field type="number" label="Valor Base *" v-model="props.item.valorBase" prefix="$"
                                required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field label="Lugar *" v-model="props.item.lugar" required></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4" sm="6">
                            <v-select label="Categotria *" v-model="props.item.categoria"
                                :items="['Comferencia', 'Seminario', 'Entretenimiento']"></v-select>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field type="number" label="Capacidad *" v-model="props.item.capacidadEvento"
                                required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                            <v-select label="Tipo Evento *" v-model="props.item.tipo" :items="tiposEventos"
                                item-title="label" item-value="value" required></v-select>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-date-input v-model="fechaApertura" view-mode="year" label="Selecionar Fecha Apertura" prepend-icon="" prepend-inner-icon=""></v-date-input>

                        </v-col>

                        <v-col cols="12" md="6">
                            <v-date-input v-model="fechaCierre" view-mode="year"
                             label="Seleccionar Fecha Cierre" prepend-icon="" prepend-inner-icon=""></v-date-input>
                        </v-col>

                        <v-col cols="12" md="12" sm="12">
                            <v-textarea v-model="props.item.descripcion" label="Descripción" rows="1" />
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="Cancelar" variant="plain" @click="closeDialog"></v-btn>
                    <v-btn color="success" text="Actualizar" variant="tonal" @click="update()"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { VDateInput } from 'vuetify/labs/VDateInput'
import { updateDataEvento } from '@/services/SeviceEventos'

const store = useStore();

const props = defineProps<{
    item: Evento,
}>();

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

const tiposEventos = [
    { label: 'Gratis', value: true },
    { label: 'Pago', value: false }
];

// Computed para obtener el estado del diálogo desde Vuex
const isDialogOpenEdit = computed(() => store.getters.isDialogOpenEdit);

// Métodos para manejar el cierre del diálogo
const closeDialog = () => {
    store.dispatch('closeDialogEdit');
};

const fechaApertura = ref<Date | null>(null);
const fechaCierre = ref<Date | null>(null);

// Opcional: Si deseas actualizar item cuando fechaApertura cambia
watch(fechaApertura, (newVal) => {
    if(newVal) props.item.fechaApertura = formatDateToString(newVal);
});
watch(fechaCierre, (newVal) => {
    if(newVal) props.item.fechaCierre = formatDateToString(newVal);
});
watch(isDialogOpenEdit, (newVal) => {
    fechaApertura.value = convertirADate(props.item.fechaApertura) ? convertirADate(props.item.fechaApertura) : null
    fechaCierre.value = convertirADate(props.item.fechaCierre) ? convertirADate(props.item.fechaCierre) : null
    console.log(fechaCierre.value, props.item.fechaCierre )
});


const update = async() => {
    try {
        window.scrollTo(0, 0);
        const response = await updateDataEvento(props.item.id, props.item);
        alert(response)
        closeDialog()
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const convertirADate = (fecha: string): Date | null => {
    const partes = fecha.split('/'); // Dividir la cadena
    if (partes.length !== 3) return null; // Verificar que hay 3 partes

    const dia = parseInt(partes[0]);
    const mes = parseInt(partes[1]) - 1; // Restar 1 porque los meses en Date son de 0 a 11
    const año = parseInt(partes[2]);

    const fechaObj = new Date(año, mes, dia); // Crear el objeto Date
    return isNaN(fechaObj.getTime()) ? null : fechaObj; // Verificar si es una fecha válida
};

const formatDateToString = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0'); // Día con 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos (0-11 a 1-12)
    const year = date.getFullYear(); // Año
    return `${day}/${month}/${year}`; // Retorna la cadena en formato "DD-MM-YYYY"
};



</script>

<style scoped lang="scss"></style>