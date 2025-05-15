export interface BandejaDeSolicitudes {
    id: number;
    tipoDeTramite: string;
    fecha: string;
    fechaActualizacion: string;
    diasTranscurridos: string;
    departamento: string;
    numeroDeProcedimiento: string;
  }

  export interface TieneConsultaio {
   readonly: boolean,
    create: boolean,
    update: boolean
}