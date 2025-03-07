import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogosSelect, TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component";
import { RegistroService } from '../../services/registro.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-certificado-de-origen',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './certificado-de-origen.component.html',
  styleUrl: './certificado-de-origen.component.css',
})
export class CertificadoDeOrigenComponent implements OnInit {
  fileUploadForm !: FormGroup;

  pais!: CatalogosSelect;
  tratado! : CatalogosSelect;
  
  constructor(private registroService : RegistroService, private fb:FormBuilder){}

  ngOnInit(): void {
    this.fileUploadForm = this.fb.group({
      archivo: ['', Validators.required],
      idTratadoAcuerdo: [''],
      clavePais: [''],
      hiddenDiscriminatorValue: [''],
      blnTercerOperadorHidden: ['']
    });

    this.getTratado();
    this.getPais();
    
  }

  getTratado(): void {
    this.registroService.getPais().subscribe((resp) => {
      if (resp.code === 200) {
        const response = resp.data;

        this.pais = {
          labelNombre: 'País / Bloque',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: response,
        };
      }
    });
  }

  getPais(): void {
    this.registroService.getTratado().subscribe((resp) => {
      if (resp.code === 200) {
        const response = resp.data;

        this.tratado = {
          labelNombre: 'Tratado/Acuerdo',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: response,
        };
      }
    });
  }
// rakhi
  cerrarAdjuntarArchivoMercancias(): void {
    // Implement the logic to close the form or navigate away
  }

  onSubmit(): void {
    if (this.fileUploadForm.valid) {
      
    }
  }

}
