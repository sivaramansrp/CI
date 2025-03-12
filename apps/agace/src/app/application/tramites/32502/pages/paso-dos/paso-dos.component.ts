import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitud32502State, Tramite32502Store } from '../../../../estados/tramites/tramite32502.store';
import { Subject, map, takeUntil } from 'rxjs';
import { AvisoService } from '../../services/aviso.service';
import { Catalogo } from '@ng-mf/data-access-user';
import { DocumentoService } from '@ng-mf/data-access-user';
import { DocumentosCargados } from '@ng-mf/data-access-user';
import { PDF } from '@ng-mf/data-access-user';
import { TEXTOS } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { Tramite32502Query } from '../../../../estados/queries/tramite3250.query';
/**
 * Este componente se muestra en PasaDos
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit{
  /**
   * Obtener el valor de la instrucción e inicializar la variable
   */
  TEXTOS = TEXTOS;
  /**
   * Lista de documentos cargados.
   */
  documentosCargados: DocumentosCargados[] = [];
  /**
   * Documento seleccionado por el usuario.
   */
  /**
   * Documento seleccionado por el usuario.
   */
  documentoSeleccionado!: Catalogo;

  /**
   * Tipo de documento.
   */
  tipodocumento: { catalogos: Catalogo[], labelNombre: string, primerOpcion: string };

  /**
   * Token de autenticación.
   */
  token!: string;

  /**
   * Formato PDF.
   */
  PDF = PDF;

  /**
   * Lista de documentos.
   */
  // documentList: string[] = [
  //   'Escrito libre a la aduana',
  //   'Manifesto',
  //   'ID Official',
  //   'Actas',
  //   'Poderes',
  //   'Otros'
  // ];

  documentList = [
    { id: 1, name: 'Escrito libre a la aduana', checked: false },
    { id: 2, name: 'Manifesto', checked: true },
    { id: 3, name: 'ID Official', checked: false },
    { id: 4, name: 'Actas', checked: false },
    { id: 5, name: 'Poderes', checked: false },
    { id: 6, name: 'Otros', checked: false }
  ]
  

  /**
   * Estado de los checkboxes seleccionados.
   */
  selectedCheckboxes: boolean[] = new Array(this.documentList.length).fill(false);

  /**
   * Estado del checkbox "Seleccionar todo".
   */
  selectAll: boolean = false;

    /**
     * Formulario principal de la solicitud.
     */
    checkboxForm!: FormGroup;

  /**
   * Constructor del componente
   * @param DocumentoService Servicio para manejar documentos
   * @param toastr Servicio para mostrar notificaciones
   */
  
    /**
     * Estado de la solicitud.
     */
    public solicitudState!: Solicitud32502State;
    @Input() catalogoDocumentos: Catalogo[] = [];

  constructor(
    private fb: FormBuilder,
    private DocumentoService: DocumentoService,
    private toastr: ToastrService,
    public tramite32502Store: Tramite32502Store,
    private tramite32502Query: Tramite32502Query,
    private avisoService: AvisoService // Inject the AvisoService
  ) {
    this.tipodocumento = {
      catalogos: [],
      labelNombre: 'Tipo de Documento',
      primerOpcion: 'Seleccione una tipo de documento'
    };
    // Inicializar el formulario principal
 
  }

  ngOnInit(): void {
    this.tramite32502Query.selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState;
      })
    )
    .subscribe();
    this.crearCheckboxForm();
    console.log();
    this.fetchCatalogoDocumentos(); // Fetch the catalogo documentos
  }

  private destroyNotifier$: Subject<void> = new Subject();

  crearCheckboxForm(){
    this.checkboxForm = this.fb.group({
      dropdown: [this.solicitudState?.dropdown, Validators.required],
      commonCheckbox: [this.solicitudState?.commonCheckbox],
      individualCheckbox: this.fb.array(this.solicitudState?.individualCheckbox)
    });
  }
  
  get individualCheckbox() {
    return this.checkboxForm.get('individualCheckbox') as FormArray;
  }

  onCheckboxChange(event: Event, index: number): void {
    const TARGET = event.target as HTMLInputElement;
    if (TARGET) {
      this.individualCheckbox.controls[index].setValue(TARGET.checked);
    }
    this.setValoresStore(this.checkboxForm,'individualCheckbox', 'setIndividualCheckbox');
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite32502Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite32502Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Toggle all checkboxes based on "Tipo de documento" checkbox state.
   */
  toggleAllCheckboxes(event: Event): void {
    const CHECKED = (event.target as HTMLInputElement).checked;
    this.individualCheckbox.controls.forEach(control => control.setValue(CHECKED));
    this.setValoresStore(this.checkboxForm, 'commonCheckbox', 'setCommonCheckbox');
    this.setValoresStore(this.checkboxForm, 'individualCheckbox', 'setIndividualCheckbox');
  }

  /**
   * Maneja la carga de documentos
   * @param event Evento de cambio del input de archivo
   */
  cargarDoc(event: Event): void {
    const ARCHIVO = event.target as HTMLInputElement;
    const INFORMACION_ARCHIVO = (ARCHIVO.files as FileList)[0];

    if (INFORMACION_ARCHIVO) {
      const EXT_ARCHIVO = INFORMACION_ARCHIVO.name
        .split('.')
        .pop()
        ?.toLowerCase();

      if (EXT_ARCHIVO !== this.PDF.toLowerCase()) {
        this.toastr.error('Solo se aceptan archivos pdf');
        return;
      }

      const TAMANIO_REQUERIDO = this.documentoSeleccionado.tam
        ? PasoDosComponent.convertirKilobytesABytes(
            parseInt(this.documentoSeleccionado.tam, 10)
          )
        : 0;
      const TAMANIO_ARCHIVO = INFORMACION_ARCHIVO.size;

      if (TAMANIO_ARCHIVO > TAMANIO_REQUERIDO) {
        this.toastr.error(
          'El tamaño del documento que intenta cargar excede el tamaño permitido'
        );
        return;
      }

      this.DocumentoService.subirDocumento(
        this.token,
        INFORMACION_ARCHIVO
      ).subscribe({
        next: (): void => {
          this.toastr.success('Documento subido');
        },
        error: (_error): void => {
          //
        },
      });

      this.documentosCargados.push({
        tipoDocumento: this.documentoSeleccionado,
        nombreArchivo: INFORMACION_ARCHIVO.name,
      });
    }
  }

  /**
   * Convierte kilobytes a bytes.
   * @param {number} kilobytes - El tamaño en kilobytes.
   * @returns {number} El tamaño en bytes.
   */
  static convertirKilobytesABytes(kilobytes: number): number {
    return kilobytes * 1024;
  }


  /**
   * Verifica si el botón está desactivado
   * @returns {boolean} Verdadero si el botón está desactivado, falso en caso contrario
   */
  get btnDesactivado(): boolean {
    return (this.documentoSeleccionado && this.documentoSeleccionado.id !== 0);
  }

  private fetchCatalogoDocumentos(): void {
    this.avisoService.getTipoDocumento('tipoDocumento').subscribe(response => {
      this.catalogoDocumentos = response.data;
      console.log(this.catalogoDocumentos);
    });
  }
}
