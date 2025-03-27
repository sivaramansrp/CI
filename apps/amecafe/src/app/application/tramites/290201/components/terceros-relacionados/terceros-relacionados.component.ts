import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogosSelect, TableComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { RegistrarSolicitudService } from '../../services/registrar-solicitud.service';
import { ChangeDetectorRef } from '@angular/core';
import { Solicitud290201State,Solicitud290201Store } from '../../../../estados/tramites/tramites290201.store';
import { Solicitud290201Query } from '../../../../estados/queries/tramites290201.query';
import { map, ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule,TableComponent,TituloComponent,ReactiveFormsModule,CatalogoSelectComponent],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.css',
})
export class TercerosRelacionadosComponent implements OnInit{
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private destroyNotifier$: Subject<void> = new Subject();

  destinatarioForm!: FormGroup;
  selectedRow: any = null;
  isFormVisible = true;
  public destinatarioState!: Solicitud290201State;
  tableData = {
    tableBody: [],
    tableHeader: [],
  };

 public paisData: CatalogosSelect = {
      labelNombre: 'Pais',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
  tipoPersona: any;
  newDestinatarioData: Array<any> = [];
    constructor(
      private registrarsolicitud: RegistrarSolicitudService,
      private fb: FormBuilder,
      private changeDetectorRef: ChangeDetectorRef,
      private solicitud290201Store: Solicitud290201Store,
      private solicitud290201Query: Solicitud290201Query,
    ){
      this.getPaisData();
    }


    ngOnInit(): void {
      this.solicitud290201Query.selectSolicitud$.pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          console.log('seccionState:', seccionState); // Debug log
          this.destinatarioState = seccionState
        })
      )
      .subscribe();
     
      this.createForm();
 }
 
 createForm(){
  this.destinatarioForm = this.fb.group({
    datosDelTramiteRealizar: this.fb.group({
    tipoPersona: [this.destinatarioState?.tipoPersona,[Validators.required]],
    denominacion:[this.destinatarioState?.denominacion,[Validators.required]],
    domicilio:[this.destinatarioState?.domicilio,[Validators.required]],
    pais:[this.destinatarioState?.pais,[Validators.required]],
    codigopostal:[this.destinatarioState?.codigopostal,[Validators.required]],
    telefono:[this.destinatarioState?.telefono,[Validators.required]],
    correoelectronica:[this.destinatarioState?.correoelectronica,[Validators.required]]
    })
  })
  console.log('destinatarioState:', this.destinatarioState); // Debug log

}
  get selectedTipoPersona() {
    return this.destinatarioForm.get('tipoPersona')?.value;
  }
  isPaisDataLoaded = false;
  getPaisData(){
     this.registrarsolicitud.getPaisData()
     .pipe(takeUntil(this.destroyed$))
     .subscribe((data) => {
     this.paisData.catalogos = data as Catalogo[];
     this.isPaisDataLoaded = true;
     })
  }
  onSubmit(){
  //     this.newDestinatarioData.push(this.destinatarioForm.value);
  // console.log(this.newDestinatarioData);
  // console.log('Form submitted:', this.destinatarioForm.value);
  //   this.isFormVisible = false;
  const formData = this.destinatarioForm.value;
  console.log('Form Data:', formData); // Debug log

  if (!formData || Object.keys(formData).length === 0) {
    console.error('Form data is null or empty');
    return;
  }

        const paisDataValue = this.paisData.catalogos.find(
          (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.pais)
        )?.descripcion; // Replace 'id' with the correct property from Catalogo

        // Replace the ID with the value
        formData.datosDelTramiteRealizar.pais = paisDataValue;
      
  if (this.selectedRow) {
    // Update the selected row with the modified form data
    const index = this.newDestinatarioData.indexOf(this.selectedRow);
    if (index !== -1) {
      this.newDestinatarioData[index] = { ...formData }; 
    }
  } else {
    // Add a new row if no row is selected
    this.newDestinatarioData.push({ ...formData });
  }
  this.changeDetectorRef.markForCheck(); // Trigger change detection

   this.destinatarioForm.reset();
  this.isFormVisible = false;
  this.selectedRow = null;
  console.log('Updated table data:', this.newDestinatarioData); // Debug log
  
  }
  onLimpiar(){
    this.destinatarioForm.reset();
  }
  onSelectRow(item: any, event: any) {
    if (event.target.checked) {
      this.selectedRow = item;
    } else {
      this.selectedRow = null;
    }
  }
  onModify() {
    if (!this.isPaisDataLoaded) {
      console.warn('Pais data not loaded yet');
      return;
    }
  if (this.selectedRow) {
    // Find the ID corresponding to the description in the selected row
    const paisId = this.paisData.catalogos.find(
      (item: Catalogo) => item.descripcion === this.selectedRow.pais
    )?.id;

    // Patch the form with the selected row data, including the mapped pais ID
    this.destinatarioForm.patchValue({
      ...this.selectedRow,
      pais: paisId, // Set the ID for the pais field
    });

    this.isFormVisible = true;
  }
}
  onDelete() {
    if (this.selectedRow) {
      const index = this.newDestinatarioData.indexOf(this.selectedRow);
      if (index !== -1) {
        this.newDestinatarioData.splice(index, 1); 
        console.log('Row deleted:', this.selectedRow);
      }
      this.selectedRow = null; 
    }
  }

  get datosDelTramiteRealizar(): FormGroup {
    return this.destinatarioForm.get('datosDelTramiteRealizar') as FormGroup;
  }
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud290201Store): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud290201Store[metodoNombre] as (value: any) => void)(VALOR);
  }
  
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
