import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, RespuestaCatalogos, TituloComponent } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-domicillo-del-destinatario',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './domicillo-del-destinatario.component.html',
  styleUrl: './domicillo-del-destinatario.component.css',
})
export class DomicilloDelDestinatarioComponent implements OnInit {

  domicilioDestinatario!:FormGroup

  constructor(
    private fb: FormBuilder,
    private readonly httpServicios: HttpClient,
  ) {
    // Dependencia inyectada para uso posterior
  }

  
   /**
   * Lista de catálogos de estados.
   */
   estado: Catalogo[] = [];

  ngOnInit(): void {
    this.domicilioDestinatario = this.fb.group({
      ciudad:['',Validators.required],
      calle:['',Validators.required],
      numeroLetra:['',Validators.required],
      lada:[],
      telefono:[],
      fax:[],
      correoElectronico:['',Validators.required],
      paisDestino:[]
    })
    this.obtenerEstadoList()
  }

    /**
 * Obtiene la lista de estados desde un archivo JSON.
 */
    obtenerEstadoList(): void {
      this.httpServicios
        .get<RespuestaCatalogos>('../../../../../assets/json/110208/seleccion.json')
        .subscribe((data): void => {
          const DATOS = data?.data;
          this.estado = DATOS;
        });
    }
}
