import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
/**
 * @interface
 * @name Solicitud260211State
 * @description
 * Representa el estado de la solicitud en el sistema. Contiene todos los campos necesarios para gestionar los datos relacionados con la solicitud.
 */
export interface Solicitud260211State {
    /**
     * @property {string} referencia
     * @description Referencia de la solicitud.
     */
    referencia: string;
  
    /**
     * @property {string} cadenaDependencia
     * @description Cadena de dependencia asociada a la solicitud.
     */
    cadenaDependencia: string;
  
    /**
     * @property {string} banco
     * @description Información del banco relacionado.
     */
    banco: string;
  
    /**
     * @property {string} Llave
     * @description Llave única de la solicitud.
     */
    Llave: string;
  
    /**
     * @property {string} tipoFetch
     * @description Información de fetch.
     */
    tipoFetch: string;
  
    /**
     * @property {string} importe
     * @description Importe relacionado con la solicitud.
     */
    importe: string;
  
    // /**
    //  * @property {string} denominacion
    //  * @description Denominación del solicitante.
    //  */
    // denominacion: string;
  
    // /**
    //  * @property {string} equivalente
    //  * @description Valor equivalente relacionado con la solicitud.
    //  */
    // equivalente: string;
  
    // /**
    //  * @property {string} numeroCalle
    //  * @description Número de calle del solicitante.
    //  */
    // numeroCalle: string;
  
    // /**
    //  * @property {string} exterior
    //  * @description Número exterior del domicilio.
    //  */
    //  exterior: string;
  
    // /**
    //  * @property {string} interior
    //  * @description Número interior del domicilio.
    //  */
    // interior: string;
  
    // /**
    //  * @property {string} lada
    //  * @description Lada telefónica del solicitante.
    //  */
    // lada: string;
  
    // /**
    //  * @property {string} numerotelefono
    //  * @description Número de teléfono del solicitante.
    //  */
    // numerotelefono: string;
  
    // /**
    //  * @property {string} correoElectronico
    //  * @description Correo electrónico del solicitante.
    //  */
    // correoElectronico: string;
  
    // /**
    //  * @property {string} tiporfc
    //  * @description Tipo de RFC del solicitante.
    //  */
    // tiporfc: string;
  
    // /**
    //  * @property {string} tipocurp
    //  * @description CURP del solicitante.
    //  */
    // tipocurp: string;
  
    // /**
    //  * @property {string} tipodenominacion
    //  * @description Tipo de denominación del solicitante.
    //  */
    // tipodenominacion: string;
  
    // /**
    //  * @property {string} numeroEstado
    //  * @description Número del estado relacionado con la solicitud.
    //  */
    // numeroEstado: string;
  
    // /**
    //  * @property {string} nombreequivalente
    //  * @description Nombre equivalente relacionado con la solicitud.
    //  */
    // nombreequivalente: string;
  
    // /**
    //  * @property {string} numerosCalle
    //  * @description Número de calle relacionado con la solicitud.
    //  */
    // numerosCalle: string;
  
    // /**
    //  * @property {string} numbroexterior
    //  * @description Número exterior relacionado con la solicitud.
    //  */
    // numbrotexterior: string;
  
    // /**
    //  * @property {string} numbrointerior
    //  * @description Número interior relacionado con la solicitud.
    //  */
    // numbrointerior: string;
  
    // /**
    //  * @property {string} numbrolada
    //  * @description Lada telefónica relacionada con la solicitud.
    //  */
    // numbrolada: string;
  
    // /**
    //  * @property {string} numerostelefono
    //  * @description Número de teléfono relacionado con la solicitud.
    //  */
    // numerostelefono: string;
  
    // /**
    //  * @property {string} tipocorreoElectronico
    //  * @description Correo electrónico relacionado con la solicitud.
    //  */
    // tipocorreoElectronico: string;
  
    // /**
    //  * @property {string} destinatariorfc
    //  * @description RFC del destinatario.
    //  */
    // destinatariorfc: string;
  
    // /**
    //  * @property {string} destinatarionumeroCalle
    //  * @description Número de calle del destinatario.
    //  */
    // destinatarionumeroCalle: string;
  
    // /**
    //  * @property {string} destinatariodenominacion
    //  * @description Denominación del destinatario.
    //  */
    // destinatariodenominacion: string;
  
    // /**
    //  * @property {string} destinatarioexterior
    //  * @description Número exterior del destinatario.
    //  */
    // destinatarioexterior: string;
  
    // /**
    //  * @property {string} destinatariointerior
    //  * @description Número interior del destinatario.
    //  */
    // destinatariointerior: string;
  
    // /**
    //  * @property {string} destinatariolada
    //  * @description Lada telefónica del destinatario.
    //  */
    // destinatariolada: string;
  
    // /**
    //  * @property {string} destinatarionumerotelefono
    //  * @description Número de teléfono del destinatario.
    //  */
    // destinatarionumerotelefono: string;
  
    // /**
    //  * @property {string} destinatariocorreoElectronico
    //  * @description Correo electrónico del destinatario.
    //  */
    // destinatariocorreoElectronico: string;
  
    // /**
    //  * @property {string} nombres
    //  * @description Nombres relacionados con la solicitud.
    //  */
    // nombres: string;
  
    // /**
    //  * @property {string} facturatorapellido
    //  * @description Apellido del facturador.
    //  */
    // facturatorapellido: string;
  
    // /**
    //  * @property {string} facturatorsapellido
    //  * @description Segundo apellido del facturador.
    //  */
    // facturatorsapellido: string;
  
    // /**
    //  * @property {string} facturatorestado
    //  * @description Estado relacionado con el facturador.
    //  */
    // facturatorestado: string;
  
    // /**
    //  * @property {string} facturatorcp
    //  * @description Código postal del facturador.
    //  */
    // facturatorcp: string;
  
    // /**
    //  * @property {string} facturatorequivalente
    //  * @description Valor equivalente relacionado con el facturador.
    //  */
    // facturatorequivalente: string;
  
    // /**
    //  * @property {string} facturatorcalle
    //  * @description Calle del facturador.
    //  */
    // facturatorcalle: string;
  
    // /**
    //  * @property {string} facturatorexterior
    //  * @description Número exterior del facturador.
    //  */
    // facturatorexterior: string;
  
    // /**
    //  * @property {string} facturatorinterior
    //  * @description Número interior del facturador.
    //  */
    // facturatorinterior: string;
  
    // /**
    //  * @property {string} facturatorlada
    //  * @description Lada telefónica del facturador.
    //  */
    // facturatorlada: string;
  
    // /**
    //  * @property {string} facturatortelefono
    //  * @description Número de teléfono del facturador.
    //  */
    // facturatortelefono: string;
  
    // /**
    //  * @property {string} facturatorElectronico
    //  * @description Correo electrónico del facturador.
    //  */
    // facturatorElectronico: string;
    // numeropostal:string;
  }

/**
 * @function
 * @name createInitialState
 * @description
 * Crea el estado inicial de la solicitud. Esta función devuelve un objeto con todos los campos inicializados como cadenas vacías.
 * 
 * @returns {Solicitud260211State} El estado inicial de la solicitud.
 */
export function createInitialState(): Solicitud260211State {
    return {
        /**
         * @property {string} referencia
         * @description Referencia de la solicitud.
         */
        referencia: '',

        /**
         * @property {string} cadenaDependencia
         * @description Cadena de dependencia asociada a la solicitud.
         */
        cadenaDependencia: '',

        /**
         * @property {string} banco
         * @description Información del banco relacionado.
         */
        banco: '',

        /**
         * @property {string} Llave
         * @description Llave única de la solicitud.
         */
        Llave: '',

        /**
         * @property {string} tipoFetch
         * @description Información de fetch.
         */
        tipoFetch: '',

        /**
         * @property {string} importe
         * @description Importe relacionado con la solicitud.
         */
        importe: '',

        // /**
        //  * @property {string} denominacion
        //  * @description Denominación del solicitante.
        //  */
        // denominacion: '',

        // /**
        //  * @property {string} equivalente
        //  * @description Valor equivalente relacionado con la solicitud.
        //  */
        // equivalente: '',

        // /**
        //  * @property {string} numeroCalle
        //  * @description Número de calle del solicitante.
        //  */
        // numeroCalle: '',

        // /**
        //  * @property {string} exterior
        //  * @description Número exterior del domicilio.
        //  */
        // exterior: '',

        // /**
        //  * @property {string} interior
        //  * @description Número interior del domicilio.
        //  */
        // interior: '',

        // /**
        //  * @property {string} lada
        //  * @description Lada telefónica del solicitante.
        //  */
        // lada: '',

        // /**
        //  * @property {string} numerotelefono
        //  * @description Número de teléfono del solicitante.
        //  */
        // numerotelefono: '',

        // /**
        //  * @property {string} correoElectronico
        //  * @description Correo electrónico del solicitante.
        //  */
        // correoElectronico: '',

        // /**
        //  * @property {string} tiporfc
        //  * @description Tipo de RFC del solicitante.
        //  */
        // tiporfc: '',

        // /**
        //  * @property {string} tipocurp
        //  * @description CURP del solicitante.
        //  */
        // tipocurp: '',

        // /**
        //  * @property {string} tipodenominacion
        //  * @description Tipo de denominación del solicitante.
        //  */
        // tipodenominacion: '',

        // /**
        //  * @property {string} numeroEstado
        //  * @description Número del estado relacionado con la solicitud.
        //  */
        // numeroEstado: '',

        // /**
        //  * @property {string} nombreequivalente
        //  * @description Nombre equivalente relacionado con la solicitud.
        //  */
        // nombreequivalente: '',

        // /**
        //  * @property {string} numerosCalle
        //  * @description Número de calle relacionado con la solicitud.
        //  */
        // numerosCalle: '',

        // /**
        //  * @property {string} numbroexterior
        //  * @description Número exterior relacionado con la solicitud.
        //  */
        // // numbroexterior: '',

        // /**
        //  * @property {string} numbrointerior
        //  * @description Número interior relacionado con la solicitud.
        //  */
        // numbrointerior: '',

        // /**
        //  * @property {string} numbrolada
        //  * @description Lada telefónica relacionada con la solicitud.
        //  */
        // numbrolada: '',

        // /**
        //  * @property {string} numerostelefono
        //  * @description Número de teléfono relacionado con la solicitud.
        //  */
        // numerostelefono: '',

        // /**
        //  * @property {string} tipocorreoElectronico
        //  * @description Correo electrónico relacionado con la solicitud.
        //  */
        // tipocorreoElectronico: '',

        // /**
        //  * @property {string} destinatariorfc
        //  * @description RFC del destinatario.
        //  */
        // destinatariorfc: '',

        // /**
        //  * @property {string} destinatarionumeroCalle
        //  * @description Número de calle del destinatario.
        //  */
        // destinatarionumeroCalle: '',

        // /**
        //  * @property {string} destinatariodenominacion
        //  * @description Denominación del destinatario.
        //  */
        // destinatariodenominacion: '',

        // /**
        //  * @property {string} destinatarioexterior
        //  * @description Número exterior del destinatario.
        //  */
        // destinatarioexterior: '',

        // /**
        //  * @property {string} destinatariointerior
        //  * @description Número interior del destinatario.
        //  */
        // destinatariointerior: '',

        // /**
        //  * @property {string} destinatariolada
        //  * @description Lada telefónica del destinatario.
        //  */
        // destinatariolada: '',

        // /**
        //  * @property {string} destinatarionumerotelefono
        //  * @description Número de teléfono del destinatario.
        //  */
        // destinatarionumerotelefono: '',

        // /**
        //  * @property {string} destinatariocorreoElectronico
        //  * @description Correo electrónico del destinatario.
        //  */
        // destinatariocorreoElectronico: '',

        // /**
        //  * @property {string} nombres
        //  * @description Nombres relacionados con la solicitud.
        //  */
        // nombres: '',

        // /**
        //  * @property {string} facturatorapellido
        //  * @description Apellido del facturador.
        //  */
        // facturatorapellido: '',

        // /**
        //  * @property {string} facturatorsapellido
        //  * @description Segundo apellido del facturador.
        //  */
        // facturatorsapellido: '',

        // /**
        //  * @property {string} facturatorestado
        //  * @description Estado relacionado con el facturador.
        //  */
        // facturatorestado: '',

        // /**
        //  * @property {string} facturatorcp
        //  * @description Código postal del facturador.
        //  */
        // facturatorcp: '',

        // /**
        //  * @property {string} facturatorequivalente
        //  * @description Valor equivalente relacionado con el facturador.
        //  */
        // facturatorequivalente: '',

        // /**
        //  * @property {string} facturatorcalle
        //  * @description Calle del facturador.
        //  */
        // facturatorcalle: '',

        // /**
        //  * @property {string} facturatortxperior
        //  * @description Número exterior del facturador.
        //  */
        // // facturatortexerior: '',

        // /**
        //  * @property {string} facturatorinterior
        //  * @description Número interior del facturador.
        //  */
        // facturatorinterior: '',

        // /**
        //  * @property {string} facturatorlada
        //  * @description Lada telefónica del facturador.
        //  */
        // facturatorlada: '',

        // /**
        //  * @property {string} facturatortelefono
        //  * @description Número de teléfono del facturador.
        //  */
        // facturatortelefono: '',

        // /**
        //  * @property {string} facturatorElectronico
        //  * @description Correo electrónico del facturador.
        //  */
        // facturatorElectronico: '',
        // numeropostal:''
    };
}

@Injectable({
    providedIn: 'root',
})    

@StoreConfig({ name: 'sanitario260211Store', resettable: true })

export class Sanitario260211Store extends Store<Solicitud260211State>{
     constructor() {
            super(createInitialState());
        }

        public setreferencia(referencia: string) {
            this.update((state) => ({
                ...state,
                referencia,
            }));
        }
        public setcadenaDependencia(cadenaDependencia: string) {
            this.update((state) => ({
                ...state,
                cadenaDependencia,
            }));
        }
        public setbanco(banco: string) {
            this.update((state) => ({
                ...state,
                banco,
            }));
        }
        public setLlave(Llave: string) {
            this.update((state) => ({
                ...state,
                Llave,
            }));
        }
        public settipoFetch(tipoFetch: string) {
            this.update((state) => ({
                ...state,
                tipoFetch,
            }));
        }
        public setimporte(importe: string) {
            this.update((state) => ({
                ...state,
                importe,
            }));
        }
//         public setdenominacion(denominacion: string) {
//             this.update((state) => ({
//                 ...state,
//                 denominacion,
//             }));
//         }
//         public setequivalente(equivalente: string) {
//             this.update((state) => ({
//                 ...state,
//                 equivalente,
//             }));
//         }
//         public setnumeroCalle(numeroCalle: string) {
//             this.update((state) => ({
//                 ...state,
//                 numeroCalle,
//             }));
//         }
//         public setexterior(exterior: string) {
//             this.update((state) => ({
//                 ...state,
//                 exterior,
//             }));
//         }

//         public setlada(lada: string) {
//             this.update((state) => ({
//                 ...state,
//                 lada,
//             }));
//         }
        
//         public setnumerotelefono(numerotelefono: string) {
//             this.update((state) => ({
//                 ...state,
//                 numerotelefono,
//             }));
//         }

//         public setcorreoElectronico(correoElectronico: string) {
//             this.update((state) => ({
//                 ...state,
//                 correoElectronico,
//             }));
//         }

//         public setinterior(interior: string) {
//             this.update((state) => ({
//                 ...state,
//                 interior,
//             }));
//         }

//         public settiporfc(tiporfc: string) {
//             this.update((state) => ({
//                 ...state,
//                 tiporfc,
//             }));
//         }

//         public settipocurp(tipocurp: string) {
//             this.update((state) => ({
//                 ...state,
//                 tipocurp,
//             }));
//         }

//         public settipodenominacion(tipodenominacion: string) {
//             this.update((state) => ({
//                 ...state,
//                 tipodenominacion,
//             }));
//         }

//         public setnumeroEstado(numeroEstado: string) {
//             this.update((state) => ({
//                 ...state,
//                 numeroEstado,
//             }));
//         }

//         public setnombreequivalente(nombreequivalente: string) {
//             this.update((state) => ({
//                 ...state,
//                 nombreequivalente,
//             }));
//         }

//         public setnumerosCalle(numerosCalle: string) {
//             this.update((state) => ({
//                 ...state,
//                 numerosCalle,
//             }));
//         }

//         public setnumbroexterior(numbroexterior: string) {
//             this.update((state) => ({
//                 ...state,
//                 numbroexterior,
//             }));
//         }

//         public setnumbrointerior(numbrointerior: string) {
//             this.update((state) => ({
//                 ...state,
//                 numbrointerior,
//             }));
//         }

//         public setnumbrolada(numbrolada: string) {
//             this.update((state) => ({
//                 ...state,
//                 numbrolada,
//             }));
//         }

//         public setnumerostelefono(numerostelefono: string) {
//             this.update((state) => ({
//                 ...state,
//                 numerostelefono,
//             }));
//         }


//         public settipocorreoElectronico(tipocorreoElectronico: string) {
//             this.update((state) => ({
//                 ...state,
//                 tipocorreoElectronico,
//             }));
//         }
//             public setdestinatariorfc(destinatariorfc: string) {
//                 this.update((state) => ({
//                     ...state,
//                     destinatariorfc,
//                 }));
//         }

//         public setdestinatarionumeroCalle(destinatarionumeroCalle: string) {
//             this.update((state) => ({
//                 ...state,
//                 destinatarionumeroCalle,
//             }));
//     }

//     public setdestinatariodenominacion(destinatariodenominacion: string) {
//         this.update((state) => ({
//             ...state,
//             destinatariodenominacion,
//         }));
// }

// public setdestinatarioexterior(destinatarioexterior: string) {
//     this.update((state) => ({
//         ...state,
//         destinatarioexterior,
//     }));
// }

// public setdestinatariointerior(destinatariointerior: string) {
//     this.update((state) => ({
//         ...state,
//         destinatariointerior,
//     }));
// }

// public setdestinatariolada(destinatariolada: string) {
//     this.update((state) => ({
//         ...state,
//         destinatariolada,
//     }));
// }

// public setdestinatarionumerotelefono(destinatarionumerotelefono: string) {
//     this.update((state) => ({
//         ...state,
//         destinatarionumerotelefono,
//     }));
// }

// public setdestinatariocorreoElectronico(destinatariocorreoElectronico: string) {
//     this.update((state) => ({
//         ...state,
//         destinatariocorreoElectronico,
//     }));
// }

// public setnombres(nombres: string) {
//     this.update((state) => ({
//         ...state,
//         nombres,
//     }));
// }

// public setfacturatorapellido(facturatorapellido: string) {
//     this.update((state) => ({
//         ...state,
//         facturatorapellido,
//     }));
// }

// public setfacturatorsapellido(facturatorsapellido: string) {
//     this.update((state) => ({
//         ...state,
//         facturatorsapellido,
//     }));
// }

// public setfacturatorestado(facturatorestado: string) {
//     this.update((state) => ({
//         ...state,
//         facturatorestado,
//     }));
// }

// public setfacturatorcp(facturatorcp: string) {
//     this.update((state) => ({
//         ...state,
//         facturatorcp,
//     }));
// }

// public setfacturatorequivalente(facturatorequivalente: string) {
//     this.update((state) => ({
//         ...state,
//         facturatorequivalente,
//     }));
// }

// public setfacturatorcalle(facturatorcalle: string) {
//     this.update((state) => ({
//         ...state,
//         facturatorcalle,
//     }));
// }

// public setfacturatorexterior(facturatorexterior: string) {
//     this.update((state) => ({
//         ...state,
//         facturatorexterior,
//     }));
// }

// public setfacturatorinterior(facturatorinterior: string) {
//     this.update((state) => ({
//         ...state,
//         facturatorinterior,
//     }));
// }

// public setfacturatorlada(facturatorlada: string) {
//     this.update((state) => ({
//         ...state,
//         facturatorlada,
//     }));
// }

// public setfacturatortelefono(facturatortelefono: string) {
//     this.update((state) => ({
//         ...state,
//         facturatortelefono,
//     }));
// }

// public setfacturatorElectronico(facturatorElectronico: string) {
//     this.update((state) => ({
//         ...state,
//         facturatorElectronico,
//     }));
// }

// public setnumeropostal(numeropostal: string) {
//     this.update((state) => ({
//         ...state,
//         numeropostal,
//     }));
// }
        
}