import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

@Component({
  selector: 'app-represtantante',
  templateUrl: './represtantante.component.html',
  styleUrl: './represtantante.component.scss',
  standalone: true,
  imports:[CommonModule, TituloComponent, ReactiveFormsModule, FormsModule]
})
export class ReprestantanteComponent implements OnInit {

  represtantante!: FormGroup;
  representativeData = {
    resigtro: "HEUE780514BVA",
    RFC: "LEQI8101314S7",
    Nombre: " ERNESTO",
    ApellidoPaterno: "HERNANDEZ",
    ApellidoMaterno: "URIBE",
    Telefono: "56457970",
    Correo: "VUCEMcbp@vuem2_5@hotmail.com.com"
  };
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
 
    this.represtantante = this.fb.group({
      datosImportadorExportador: this.fb.group({
        resigtro: ['', Validators.required],
        RFC: ['', Validators.required],
        Nombre: ['', Validators.required],
        ApellidoPaterno: ['', Validators.required],
        ApellidoMaterno: ['', Validators.required],
        Telefono: ['', Validators.required],
        Correo : ['', Validators.required],
       
      }),
    });
    this.represtantante.get('datosImportadorExportador.RFC').disable();
    this.represtantante.get('datosImportadorExportador.Nombre').disable();
    this.represtantante.get('datosImportadorExportador.ApellidoPaterno').disable();
    this.represtantante.get('datosImportadorExportador.ApellidoMaterno').disable();

   // Patching the data into the form
this.represtantante.patchValue({
  datosImportadorExportador: {
    resigtro: this.representativeData.resigtro,
    RFC: this.representativeData.RFC,
    Nombre: this.representativeData.Nombre,
    ApellidoPaterno: this.representativeData.ApellidoPaterno,
    ApellidoMaterno: this.representativeData.ApellidoMaterno,
    Telefono: this.representativeData.Telefono,
    Correo: this.representativeData.Correo
  }
});
    
}
validarFormulario(){
  
}
}
