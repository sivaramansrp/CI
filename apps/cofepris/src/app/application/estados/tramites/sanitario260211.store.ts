import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Solicitud260211State {

    referencia: string;
    Chandenadependencia: string;
    benco: string;
    Llave: string;
    deFetch: string;
    importe: string;
    denominacion: string;
    equivalente: string;
    numeroCalle:string;
    experior: string;
    interior: string;
    lada: string;
    numerotelefono: string;
    correoElectronico:string;
    tiporfc: string;
    tipocurp: string;
    tipodenominacion: string;
    numeroEstado:string;
    nombreequivalente:string;
    numerosCalle:string;
    numbroexperior:string;
    numbrointerior:string;
    numbrolada:string;
    numerostelefono:string;
    tipocorreoElectronico:string;
    destinatariorfc:string;
    destinatarionumeroCalle:string;
    destinatariodenominacion:string;
    destinatarioexperior:string;
    destinatariointerior:string;
    destinatariolada:string;
    destinatarionumerotelefono:string;
    destinatariocorreoElectronico:string;
    nombres:string;
    facturatorapellido:string;
    facturatorsapellido:string;
    facturatorestado:string;
    facturatorcp:string;
    facturatorequivalente:string;
    facturatorcalle:string;
    facturatorexperior:string;
    facturatorinterior:string;
    facturatorlada:string;
    facturatortelefono:string;
    facturatorElectronico:string;
}

export function createInitialState(): Solicitud260211State {
    return {

        referencia: '',
        Chandenadependencia: '',
        benco: '',
        Llave: '',
        deFetch: '',
        importe: '',
        denominacion: '',
        equivalente: '',
        numeroCalle:'',
        experior: '',
        interior: '',
        lada: '',
        numerotelefono: '',
        correoElectronico:'',
        tiporfc: '',
        tipocurp: '',
        tipodenominacion: '',
        numeroEstado:'',
        nombreequivalente:'',
        numerosCalle:'',
        numbroexperior:'',
        numbrointerior:'',
        numbrolada:'',
        numerostelefono:'',
        tipocorreoElectronico:'',
        destinatariorfc:'',
        destinatarionumeroCalle:'',
        destinatariodenominacion:'',
        destinatarioexperior:'',
        destinatariointerior:'',
        destinatariolada:'',
        destinatarionumerotelefono:'',
        destinatariocorreoElectronico:'',
        nombres:'',
        facturatorapellido:'',
        facturatorsapellido:'',
        facturatorestado:'',
        facturatorcp:'',
        facturatorequivalente:'',
        facturatorcalle:'',
        facturatorexperior:'',
        facturatorinterior:'',
        facturatorlada:'',
        facturatortelefono:'',
        facturatorElectronico:''
    }
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
        public setChandenadependencia(Chandenadependencia: string) {
            this.update((state) => ({
                ...state,
                Chandenadependencia,
            }));
        }
        public setbenco(benco: string) {
            this.update((state) => ({
                ...state,
                benco,
            }));
        }
        public setLlave(Llave: string) {
            this.update((state) => ({
                ...state,
                Llave,
            }));
        }
        public setdeFetch(deFetch: string) {
            this.update((state) => ({
                ...state,
                deFetch,
            }));
        }
        public setimporte(importe: string) {
            this.update((state) => ({
                ...state,
                importe,
            }));
        }
        public setdenominacion(denominacion: string) {
            this.update((state) => ({
                ...state,
                denominacion,
            }));
        }
        public setequivalente(equivalente: string) {
            this.update((state) => ({
                ...state,
                equivalente,
            }));
        }
        public setnumeroCalle(numeroCalle: string) {
            this.update((state) => ({
                ...state,
                numeroCalle,
            }));
        }
        public setexperior(experior: string) {
            this.update((state) => ({
                ...state,
                experior,
            }));
        }

        public setlada(lada: string) {
            this.update((state) => ({
                ...state,
                lada,
            }));
        }
        
        public setnumerotelefono(numerotelefono: string) {
            this.update((state) => ({
                ...state,
                numerotelefono,
            }));
        }

        public setcorreoElectronico(correoElectronico: string) {
            this.update((state) => ({
                ...state,
                correoElectronico,
            }));
        }

        public setinterior(interior: string) {
            this.update((state) => ({
                ...state,
                interior,
            }));
        }

        public settiporfc(tiporfc: string) {
            this.update((state) => ({
                ...state,
                tiporfc,
            }));
        }

        public settipocurp(tipocurp: string) {
            this.update((state) => ({
                ...state,
                tipocurp,
            }));
        }

        public settipodenominacion(tipodenominacion: string) {
            this.update((state) => ({
                ...state,
                tipodenominacion,
            }));
        }

        public setnumeroEstado(numeroEstado: string) {
            this.update((state) => ({
                ...state,
                numeroEstado,
            }));
        }

        public setnombreequivalente(nombreequivalente: string) {
            this.update((state) => ({
                ...state,
                nombreequivalente,
            }));
        }

        public setnumerosCalle(numerosCalle: string) {
            this.update((state) => ({
                ...state,
                numerosCalle,
            }));
        }

        public setnumbroexperior(numbroexperior: string) {
            this.update((state) => ({
                ...state,
                numbroexperior,
            }));
        }

        public setnumbrointerior(numbrointerior: string) {
            this.update((state) => ({
                ...state,
                numbrointerior,
            }));
        }

        public setnumbrolada(numbrolada: string) {
            this.update((state) => ({
                ...state,
                numbrolada,
            }));
        }

        public setnumerostelefono(numerostelefono: string) {
            this.update((state) => ({
                ...state,
                numerostelefono,
            }));
        }


        public settipocorreoElectronico(tipocorreoElectronico: string) {
            this.update((state) => ({
                ...state,
                tipocorreoElectronico,
            }));
        }
            public setdestinatariorfc(destinatariorfc: string) {
                this.update((state) => ({
                    ...state,
                    destinatariorfc,
                }));
        }

        public setdestinatarionumeroCalle(destinatarionumeroCalle: string) {
            this.update((state) => ({
                ...state,
                destinatarionumeroCalle,
            }));
    }

    public setdestinatariodenominacion(destinatariodenominacion: string) {
        this.update((state) => ({
            ...state,
            destinatariodenominacion,
        }));
}

public setdestinatarioexperior(destinatarioexperior: string) {
    this.update((state) => ({
        ...state,
        destinatarioexperior,
    }));
}

public setdestinatariointerior(destinatariointerior: string) {
    this.update((state) => ({
        ...state,
        destinatariointerior,
    }));
}

public setdestinatariolada(destinatariolada: string) {
    this.update((state) => ({
        ...state,
        destinatariolada,
    }));
}

public setdestinatarionumerotelefono(destinatarionumerotelefono: string) {
    this.update((state) => ({
        ...state,
        destinatarionumerotelefono,
    }));
}

public setdestinatariocorreoElectronico(destinatariocorreoElectronico: string) {
    this.update((state) => ({
        ...state,
        destinatariocorreoElectronico,
    }));
}

public setnombres(nombres: string) {
    this.update((state) => ({
        ...state,
        nombres,
    }));
}

public setfacturatorapellido(facturatorapellido: string) {
    this.update((state) => ({
        ...state,
        facturatorapellido,
    }));
}

public setfacturatorsapellido(facturatorsapellido: string) {
    this.update((state) => ({
        ...state,
        facturatorsapellido,
    }));
}

public setfacturatorestado(facturatorestado: string) {
    this.update((state) => ({
        ...state,
        facturatorestado,
    }));
}

public setfacturatorcp(facturatorcp: string) {
    this.update((state) => ({
        ...state,
        facturatorcp,
    }));
}

public setfacturatorequivalente(facturatorequivalente: string) {
    this.update((state) => ({
        ...state,
        facturatorequivalente,
    }));
}

public setfacturatorcalle(facturatorcalle: string) {
    this.update((state) => ({
        ...state,
        facturatorcalle,
    }));
}

public setfacturatorexperior(facturatorexperior: string) {
    this.update((state) => ({
        ...state,
        facturatorexperior,
    }));
}

public setfacturatorinterior(facturatorinterior: string) {
    this.update((state) => ({
        ...state,
        facturatorinterior,
    }));
}

public setfacturatorlada(facturatorlada: string) {
    this.update((state) => ({
        ...state,
        facturatorlada,
    }));
}

public setfacturatortelefono(facturatortelefono: string) {
    this.update((state) => ({
        ...state,
        facturatortelefono,
    }));
}

public setfacturatorElectronico(facturatorElectronico: string) {
    this.update((state) => ({
        ...state,
        facturatorElectronico,
    }));
}
        
        
        
        
        

}