<template>
    <div class="text-center pa-4">
        <v-dialog v-model="isDialogOpenDelete" max-width="600" persistent>
            <v-card prepend-icon="mdi-delete-forever"
                text="Esta acción no se puede deshacer. Si eliminas el evento, se perderán todos los datos asociados."
                title="¿Estás seguro de que deseas eliminar este evento?">
                <template v-slot:actions>
                    <v-spacer></v-spacer>

                    <v-btn text="Cancelar" variant="plain" @click="closeDialog"/>

                    <v-btn text="Eliminar" color="red" variant="tonal" @click="deleteEvento"/>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { deleteDataEvento } from '@/services/SeviceEventos'
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const props = defineProps<{
    id: number,
}>();

// Computed para obtener el estado del diálogo desde Vuex
const isDialogOpenDelete = computed(() => store.getters.isDialogOpenDelete);

// Métodos para manejar el cierre del diálogo
const closeDialog = () => {
    store.dispatch('closeDialogDelete');
};

const deleteEvento = async() => {
    try {
        window.scrollTo(0, 0);
        const response = await deleteDataEvento(props.id);
        alert(response)
        closeDialog()
        router.back();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
</script>

<style scoped></style>