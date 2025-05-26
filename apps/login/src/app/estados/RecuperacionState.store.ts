import { Store, StoreConfig } from '@datorama/akita';

export interface RecuperacionState {
  activeTab: 'nacional' | 'extranjero';
  formData: {
    nacionalidad: boolean | null;
    tipoDocumento: 'RFC' | 'CURP' | null;
    tipoPersona: 'fisica' | 'moral' | null;
    usuario: string;
    nombre?: string;
    primerApellido?: string;
    segundoApellido?: string;
    razonSocial?: string;
    codigoPostal?: string;
    estado?: string;
    pais?: string;
  };
}

@StoreConfig({ name: 'recuperacion' })
export class RecuperacionStore extends Store<RecuperacionState> {
  constructor() {
    super({
      activeTab: 'nacional',
      formData: {
        nacionalidad: null,
        tipoDocumento: null,
        tipoPersona: null,
        usuario: ''
      }
    });
  }
}