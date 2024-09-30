import axios from "@/middleware/middleware";
interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
  cupoDisponible: number;
  tipo: boolean;
  valorBase: number;
  categoria: string;
  capacidadEvento: number;
  fechaApertura: string;
  fechaCierre: string;
}

interface EventoCreate {
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

export const getDataEventos = async () => {
  try {
    const response = await axios.get("/eventos/all");
    return response.data;
  } catch (error) {
    throw new Error(
      `API request failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export const getDataEvento = async (id: number) => {
  try {
    const response = await axios.get("/eventos/"+id);
    return response.data;
  } catch (error) {
    throw new Error(
      `API request failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};


export const updateDataEvento = async (id: number, eventoData: Evento) => {
  try {
    const response = await axios.put("/eventos/update/"+id, eventoData);
    return response.data;
  } catch (error) {
    throw new Error(
      `API request failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export const deleteDataEvento = async (id: number) => {
  try {
    const response = await axios.delete("/eventos/delete/"+id);
    return response.data;
  } catch (error) {
    throw new Error(
      `API request failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};


export const createDataEvento = async (eventoData: EventoCreate) => {
  try {
    const response = await axios.post("/eventos/save", eventoData);
    return response.data;
  } catch (error) {
    throw new Error(
      `API request failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
