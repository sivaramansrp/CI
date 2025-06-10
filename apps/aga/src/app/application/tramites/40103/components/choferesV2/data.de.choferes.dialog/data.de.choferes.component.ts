import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from "@angular/forms";
import { CatalogoSelectComponent, SharedModule, TablaDinamicaComponent } from "@libs/shared/data-access-user/src";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatosDelChoferNacional } from "../../../models/registro-muestras-mercancias.model";
import { read } from "fs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";


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
  ],
})
export class DatosDeChoferesComponent implements OnInit, OnDestroy {
onCurpInput() {
throw new Error('Method not implemented.');
}
buscarChoferNacional(arg0: any) {
throw new Error('Method not implemented.');
}
limpiarFormulario() {
throw new Error('Method not implemented.');
}
guardarFilaEditada() {
throw new Error('Method not implemented.');
}
  
  @Input() readonly: boolean = false;
  @Input({required: true}) datosDeChofere!: DatosDelChoferNacional;

  // Aquí puedes definir las propiedades y métodos necesarios para tu componente
  datosConsulta: unknown;
  formChoferes!: FormGroup;

  constructor(private fb: FormBuilder,
    private modalService: BsModalService,
  ) {
    // Inicialización del componente
  }

  ngOnInit(): void {

    this.formChoferes = this.fb.group({

      curp: [{ value: this.datosDeChofere?.curp, disabled: this.readonly }, 
        Validators.required, 
        Validators.pattern(/^[A-Z]{4}[0-9]{6}[A-Z0-9]{2}$/), 
        Validators.minLength(18)],
        
      rfc: [{ value: this.datosDeChofere?.rfc, disabled: this.readonly }],
      nombre: [{ value: this.datosDeChofere?.nombre, disabled: true }],
      apellidoPaterno: [{ value: this.datosDeChofere?.primerApellido, disabled: true }],
      segundoApellido: [{ value: this.datosDeChofere?.segundoApellido, disabled: this.readonly }],
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

  ngOnDestroy(): void {
    // Lógica que se ejecuta al destruir el componente
  }


  @Output() closeModalEvent = new EventEmitter<void>();


  @ViewChild('datosDeChoferesModal') datosDeChoferesModal!: TemplateRef<any>;
  modalRef?: BsModalRef;

  /**
   * Obtiene los controles de formulario del formulario choferes.
   */
  get getFormValues(): { [key: string]: AbstractControl } {
    return this.formChoferes.controls;
  }
  
  
  openModal() {
    this.modalRef = this.modalService.show(this.datosDeChoferesModal, { class: 'modal-fullscreen' });
  }

  closeModal() {
    this.modalRef?.hide();
    this.closeModalEvent.emit();
  }
}