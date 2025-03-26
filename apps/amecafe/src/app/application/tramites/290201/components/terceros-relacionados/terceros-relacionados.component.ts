import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogosSelect, TableComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { RegistrarSolicitudService } from '../../services/registrar-solicitud.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule,TableComponent,TituloComponent,ReactiveFormsModule,CatalogoSelectComponent],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit{
  destinatarioForm!: FormGroup;
  selectedRow: any = null;
  isFormVisible = true;
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
  newDestinatarioData: any = [];
    constructor(
      private registrarsolicitud: RegistrarSolicitudService,
      private fb: FormBuilder,
      private changeDetectorRef: ChangeDetectorRef
    ){
      this.destinatarioForm = this.fb.group({
        tipoPersona: ['', Validators.required],
        denominacion:['',Validators.required],
        domicilio:['',Validators.required],
        pais:['',Validators.required],
        codigopostal:['',Validators.required],
        telefono:['',Validators.required],
        correoelectronica:['',Validators.required]

      })
    }

    ngOnInit(): void {
      this.getPaisData();
 }
  get selectedTipoPersona() {
    return this.destinatarioForm.get('tipoPersona')?.value;
  }

  getPaisData(){
     this.registrarsolicitud.getPaisData().subscribe((data) => {
     this.paisData.catalogos = data as Catalogo[];
     })
  }
  onSubmit(){
  //     this.newDestinatarioData.push(this.destinatarioForm.value);
  // console.log(this.newDestinatarioData);
  // console.log('Form submitted:', this.destinatarioForm.value);
  //   this.isFormVisible = false;
  const formData = this.destinatarioForm.value;
      

        console.log('Catalogos:', this.paisData.catalogos);
        console.log('Form pais ID:', formData.pais);
        // Map the ID to its corresponding value
        const paisDataValue = this.paisData.catalogos.find(
          (item: Catalogo) => String(item.id) === String(formData.pais)
        )?.descripcion; // Replace 'id' with the correct property from Catalogo

        // Replace the ID with the value
        formData.pais = paisDataValue;
      
        console.log('Form Data:', formData);
  if (this.selectedRow) {
    // Update the selected row with the modified form data
    const index = this.newDestinatarioData.indexOf(this.selectedRow);
    if (index !== -1) {
      this.newDestinatarioData[index] = { ...formData }; 
    }
    console.log('Row updated:', this.newDestinatarioData[index]);
  } else {
    // Add a new row if no row is selected
    this.newDestinatarioData.push({ ...formData });
    console.log('New row added:', { ...formData });
  }
   this.destinatarioForm.reset();
  this.isFormVisible = false;
  this.selectedRow = null;

  
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
        this.newDestinatarioData.splice(index, 1); // Remove the selected row from the array
        console.log('Row deleted:', this.selectedRow);
      }
      this.selectedRow = null; // Clear the selection
    }
  }
  
  
}
