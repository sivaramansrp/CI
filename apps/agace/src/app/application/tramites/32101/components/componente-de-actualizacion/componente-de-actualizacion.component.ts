import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaAvisoAcreditacionService } from '../../services/consulta-aviso-acreditacion.service';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { TramiteList } from '../../models/datos-tramite.model';
import { Catalogo } from '../../../../estados/tramites/tramite32101.store';

@Component({
  selector: 'app-componente-de-actualizacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
  templateUrl: './componente-de-actualizacion.component.html',
  styleUrl: './componente-de-actualizacion.component.css',
})
export class ComponenteDeActualizacionComponent {
  modificarFormulario!: FormGroup;

  tramiteList: {
    catalogos: TramiteList[];
    labelNombre: string;
    primerOpcion: string;
  };

  aduana: {
    catalogos: Catalogo[];
    labelNombre: string;
    primerOpcion: string;
  };

  constructor(private fb: FormBuilder,
  private consultaAvisoAcreditacionService: ConsultaAvisoAcreditacionService,) {
    this.tramiteList = {
      catalogos: [], // Replace with actual catalog data
      labelNombre: 'Tipo de inversión',
      primerOpcion: 'Seleccione un valor',
    };

    this.aduana = {
      catalogos: [], // Replace with actual catalog data
      labelNombre: 'Forma de adquisición',
      primerOpcion: 'Seleccione un valor',
    };
  }

  ngOnInit() {

    // Fetch catalog data
  // this.consultaAvisoAcreditacionService.getListaDeDocumentos('listaDeInversion').subscribe((data) => {
  //   this.tramiteList.catalogos = data.data;
  //   console.log("@@@",this.tramiteList.catalogos);
  // });

  // this.consultaAvisoAcreditacionService.getListaDeDocumentos('listaDeDocumentos').subscribe((data) => {
  //   this.aduana.catalogos = data.data;
  //   console.log("###",this.aduana.catalogos);
  // });
    
    this.consultaAvisoAcreditacionService.formData$.subscribe((row) => {
      if (row) {
      this.modificarFormulario.patchValue({
        tipoDeInversion: row.tipoDeInversion,
        descripcionGeneral: row.descripcionGeneral,
        valorEnPesos: row.valorEnPesos,
        formaAdquisicion: row.formaAdquisicion,
      });
      console.log('Modify form populated with data:', row);
    } else {
      console.log('No data received in ComponenteDeActualizacionComponent');
    }
  });
    this.modificarFormulario = this.fb.group({
      tipoDeInversion: [''],
      descripcionGeneral: [''],
      valorEnPesos: [''],
      formaAdquisicion: [''],
    });
  }
}
