import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from "@angular/forms";
import { Catalogo, ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent, SharedModule, TablaDinamicaComponent, TituloComponent } from "@libs/shared/data-access-user/src";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatosDelChoferNacional } from "../../../models/registro-muestras-mercancias.model";
import { read } from "fs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Chofer40103Service } from "../../../estados/chofer40103.service";
import { map, Observable, takeUntil } from "rxjs";


@Component({
  selector: 'app-choferes-datos',
  templateUrl: './data.de.choferes.component.html',
  styleUrls: ['./data.de.choferes.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    FormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    TituloComponent
],
})
export class DatosDeChoferesComponent implements OnInit, OnDestroy {

  @Input() readonly: boolean = false;
  @Input({ required: true }) datosDeChofere!: DatosDelChoferNacional;

  // Aquí puedes definir las propiedades y métodos necesarios para tu componente
  // datosConsulta: unknown;
  formChoferes!: FormGroup;
  destroyed$: Observable<any> = new Observable();

  constructor(private fb: FormBuilder,
    private modalService: BsModalService,
    private chofer40103Service: Chofer40103Service,
  ) {
    // Inicialización del componente
  }

  ngOnInit(): void {
    this.paisListData();
    // this.onPaisChange(this.datosDeChofere?.pais);

    this.formChoferes = this.fb.group({

      curp: [{ value: this.datosDeChofere?.curp, disabled: this.readonly }, 
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(/^[A-Z]{4}\d{6}[HM]{1}[A-Z]{5}[0-9A-Z]{2}$/), // CURP regex
        ]],

      rfc: [{ value: this.datosDeChofere?.rfc, disabled: this.readonly }, Validators.required],
      nombre: [{ value: this.datosDeChofere?.nombre, disabled: true }],
      apellidoPrimer: [{ value: this.datosDeChofere?.primerApellido, disabled: true }],
      segundoApellido: [{ value: this.datosDeChofere?.segundoApellido, disabled: true }],
      numeroDeGafete: [{ value: this.datosDeChofere?.numeroDeGafete, disabled: true }],
      vigenciaGafete: [{ value: this.datosDeChofere?.vigenciaGafete, disabled: true }],

      calle: [{ value: this.datosDeChofere?.calle, disabled: this.readonly }],
      numeroExterior: [{ value: this.datosDeChofere?.numeroExterior, disabled: this.readonly }],
      numeroInterior: [{ value: this.datosDeChofere?.numeroInterior, disabled: this.readonly }],
      pais: [{ value: this.datosDeChofere?.pais, disabled: this.readonly }],
      estado: [{ value: this.datosDeChofere?.estado, disabled: this.readonly }],
      municipio: [{ value: this.datosDeChofere?.municipioAlcaldia, disabled: this.readonly }],
      colonia: [{ value: this.datosDeChofere?.colonia, disabled: this.readonly }],
      paisDeResidencia: [{ value: this.datosDeChofere?.paisDeResidencia, disabled: this.readonly }],
      ciudad: [{ value: this.datosDeChofere?.ciudad, disabled: this.readonly }],
      localidad: [{ value: this.datosDeChofere?.localidad, disabled: this.readonly }],
      codigoPostal: [{ value: this.datosDeChofere?.codigoPostal, disabled: this.readonly }],
      correoElectronico: [{ value: this.datosDeChofere?.correoElectronico, disabled: this.readonly }],
      telefono: [{ value: this.datosDeChofere?.telefono, disabled: this.readonly }],
    });
    // Lógica que se ejecuta al inicializar el componente
  }


  @Output() cancelEvent = new EventEmitter<void>();
  @Output() addModalEvent = new EventEmitter<DatosDelChoferNacional>();

  @ViewChild('datosDeChoferesModal') datosDeChoferesModal!: TemplateRef<any>;
  modalRef?: BsModalRef;

  paisList: Catalogo[] = [];
  estadoList: Catalogo[] = [];
  municipioList: Catalogo[] = [];
  coloniaList: Catalogo[] = [];


  /**
   * Obtiene la lista de países emisores desde el servicio `chofer40103Service` y la asigna a la propiedad `paisList`.
   *
   * @returns {void}
   */
  paisListData(): void {
    this.chofer40103Service
      .getPaisEmisor()
      .pipe(
        takeUntil(this.destroyed$),
        map((data) => {
          this.paisList = data;
        })
      )
      .subscribe();
  }

  onPaisChange($event: Catalogo) {
    this.chofer40103Service
      .getEstadosPorPais($event.id)
      .pipe(
        takeUntil(this.destroyed$),
        map((data) => {
          this.estadoList = data;
        })
      )
      .subscribe();
      this.formChoferes.setValue({'estado': null});
      this.formChoferes.setValue({'municipio': null});
      this.formChoferes.setValue({'colonia': null});
  }

  onEstadoChange($event: Catalogo) {
    this.chofer40103Service
      .getMunicipiosPorEstado($event.id)
      .pipe(
        takeUntil(this.destroyed$),
        map((data) => {
          this.municipioList = data;
        })
      )
      .subscribe();
      
      this.formChoferes.setValue({'municipio': null});
      this.formChoferes.setValue({'colonia': null});
  }

  onMunicipioChange($event: Catalogo) {
    this.chofer40103Service
      .getColoniasPorMunicipio($event.id)
      .pipe(
        takeUntil(this.destroyed$),
        map((data) => {
          this.coloniaList = data;
        })
      )
      .subscribe();
      
      this.formChoferes.setValue({'colonia': null});
  }


  /**
   * Obtiene los controles de formulario del formulario choferes.
   */
  get getFormValues(): { [key: string]: AbstractControl } {
    return this.formChoferes.controls;
  }


  openModal() {
    this.modalRef = this.modalService.show(this.datosDeChoferesModal, { class: 'modal-xl' });
  }

  closeModal() {
    this.modalRef?.hide();
    this.cancelEvent.emit();
  }

  /**
   * Busca un chofer por CURP.
   * @param curp La CURP a buscar.
   */
  onCurpInput() {
    const CURP_VALUE = this.formChoferes.get('curp')?.value;
    if (CURP_VALUE && CURP_VALUE.length >= 18) {
      this.buscarChoferNacional(CURP_VALUE);
    }
  }
  
  /**
   * Busca información de un chofer nacional utilizando su CURP.
   *
   * @param curp - La CURP del chofer nacional que se desea buscar.
   *               Si no se proporciona un valor, la función no realiza ninguna acción.
   *
   * @remarks
   * Esta función actualiza el formulario de choferes con los datos obtenidos.
   * Actualmente, los datos están representados por un objeto vacío.
   */
  buscarChoferNacional(curp: string) {
    if (!curp) {
      return;
    }

    const CHOFER_DATA = {};

    // Rellenar el formulario
    this.formChoferes.patchValue(CHOFER_DATA);
  }

  limpiarFormulario() {
    this.formChoferes.reset();
    this.closeModal();
    //throw new Error('Method not implemented.');
  }
  guardarFilaEditada() {
    if (this.formChoferes.valid) {
      const datosChofer = this.formChoferes.value as DatosDelChoferNacional;
      // Aquí puedes realizar la lógica para guardar los datos del chofer
      console.log('Datos del chofer guardados:', datosChofer);
      this.addModalEvent.emit(datosChofer);
      this.closeModal();
    } else {
      console.warn('Formulario inválido, no se pueden guardar los datos.');
    }
    //throw new Error('Method not implemented.');
  }

  /**
   * Verifica si el control del formulario es inválido y ha sido tocado.
   * @param controlName El nombre del control del formulario.
   * @returns {boolean | null} `true` si el control es inválido y tocado, `null` si no existe el control.
   */
  isInvalid(controlName: string): boolean | null {
    const CONTROL = this.formChoferes.get(controlName);
    return CONTROL ? CONTROL.invalid && CONTROL.touched : null;
  }

  ngOnDestroy(): void {
    // Lógica que se ejecuta al destruir el componente
  }
}