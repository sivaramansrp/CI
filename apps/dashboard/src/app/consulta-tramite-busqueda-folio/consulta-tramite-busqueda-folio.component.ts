import { Component, OnInit } from "@angular/core";
import { ConsultaioStore, REG_X, TramiteQuery, TramiteStore } from "@libs/shared/data-access-user/src";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ConsultaTramiteService } from "../services/consulta-tramite.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Component({
    selector: 'consulta-tramite-busqueda',
    standalone: true,
    styleUrl: "./consulta-tramite-busqueda-folio.component.scss",
    templateUrl: "./consulta-tramite-busqueda-folio.component.html",
    imports: [ReactiveFormsModule]
})
export class ConsultaTramiteBusquedaFolioComponent implements OnInit {
    /*
     * Subject utilizado para emitir un valor y completar las suscripciones activas 
     * cuando el componente se destruye, evitando fugas de memoria.
     */
    private destroyNotifier$: Subject<void> = new Subject();
    /** 
     * Formulario de búsqueda 
    */
    public FormBuscaTramite!: FormGroup;
    /* URL a la que se navega al seleccionar un trámite */
    public procedureUrl!: string;
    /* Indica si el formulario es válido */
    public hasValidForm: boolean = false;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private tramiteStates: TramiteStore,
        private solicitudtramiteQuery: TramiteQuery,
        private consultaioStore: ConsultaioStore,
        public consultaTramiteService: ConsultaTramiteService
    ) {
        /**
         * Constructor de la clase ConsultaTramiteComponent.
         * @param router - Router para la navegación.
         * @param fb - FormBuilder para crear formularios reactivos.
         * @param tramiteStates - Store para manejar el estado del trámite.
         * @param solicitudtramiteQuery - Query para obtener el estado de la solicitud del trámite.
         */
    }
    /** 
     * Método para inicializar el formulario de búsqueda 
     */
    inicializaFormConsulta(): void {
        this.FormBuscaTramite = this.fb.group({
            folioDelTramite: ['', [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS), Validators.minLength(25)]],
        });
    }

    ngOnInit(): void {
        this.inicializaFormConsulta()
    }

    buscarTramite(): void {
        // if(this.FormBuscaTramite.invalid){
        //     return;
        // }
        const FOLIO = this.FormBuscaTramite.get('folioDelTramite')?.value.toString();
        this.consultaTramiteService.getDetallesDelTramite({
            roles_usuario: ["AdministradorDependencia", "Dictaminador"],
            user_name: "MAVL621207C95",
            folio: FOLIO
        }).subscribe({
            next: (res) => {
                debugger;
                const { datos: ROW_OBJETO } = res;
                const DEPARTMENTO = ROW_OBJETO.acronimo.toLocaleLowerCase()
                this.consultaioStore.establecerConsultaio(
                    FOLIO,
                    "consulta-tramite",
                    ROW_OBJETO.acronimo.toLocaleLowerCase(),
                    ROW_OBJETO.num_folio_tramite,
                    ROW_OBJETO.tipo_solicitud,
                    "",
                    true,
                    false,
                    true
                );
                this.router.navigate([`${DEPARTMENTO}/datos-generales-tramite`])
            }
        })
    }

    /**
   * Maneja la selección de un trámite actualizando el store con los valores del formulario proporcionado.
   *
   * @param {FormGroup} form - El FormGroup que contiene los datos del formulario relacionados con el trámite.
   * @param {string} campo - El nombre del campo asociado con la selección del trámite.
   * @param {string} metodoNombre - El nombre del método que se utilizará para procesar la selección del trámite.
   * @returns {void}
   */

    tramiteSeleccionado(form: FormGroup, campo: string, metodoNombre: string): void {
        this.setValoresStore(form, campo, metodoNombre);
    }
    setValoresStore(form: FormGroup, campo: string, metodoNombre: string): void {
        const VALOR = form.get(campo)?.value;
        /**
         *  Suponiendo que TramiteStore tiene un método 'update' o similar para actualizar el estado
         *  Reemplaza 'update' por el método correcto si es diferente
         */
        this.tramiteStates.update({ [metodoNombre]: VALOR });
    }

    /**
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param nombreControl - Nombre del control a verificar.
   * @returns True si el control es inválido, de lo contrario false.
   */
    public esInvalido(nombreControl: string): boolean {
        const CONTROL = this.FormBuscaTramite.get(nombreControl);
        return CONTROL
            ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
            : false;
    }

}