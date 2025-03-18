import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// import {  ElementRef, ViewChild } from '@angular/core';

import { Catalogo, ConfiguracionColumna, TableComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { MENSAJEDEALERTA, TituloComponent } from '@ng-mf/data-access-user';
// import terceros from 'libs/shared/theme/assets/json/260211/terceros.json';
import { SanitarioService } from '../../services/sanitario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { PermisoModel } from '../detos.model';

@Component({
  selector: 'app-agregar-destinatario',
  standalone: true,
   imports: [CommonModule,TituloComponent,TableComponent,AlertComponent,TablaDinamicaComponent,CatalogoSelectComponent,ReactiveFormsModule],
  templateUrl: './agregar-destinatario.component.html',
  styleUrl: './agregar-destinatario.component.css',
})
export class AgregarDestinatarioComponent {
  tercerosProd: PermisoModel [] = [];
  private destroyed$ = new Subject<void>();
  destinatarioForm!:FormGroup;
  public proveedorList!: Catalogo[];
  public  localidadList !: Catalogo[];
  public modal = 'modal';
  TablaSeleccion = TablaSeleccion;
constructor(private fb: FormBuilder,private service:SanitarioService){}

 @ViewChild('closeModal') closeModal!: ElementRef;
  configuracionTabla: ConfiguracionColumna<PermisoModel >[] = [
    {
      encabezado: 'Nombre/denominacion o razon social',
      clave: (item: PermisoModel ) => item.Nombre,
      orden: 1,
    },
    {
      encabezado: 'RFC',
      clave: (item: PermisoModel ) => item.RFC,
      orden: 2,
    },
    {
      encabezado: 'CURP',
      clave: (item: PermisoModel ) => item.CURP,
      orden: 3,
    },
    {
      encabezado: 'Telefono',
      clave: (item: PermisoModel ) => item.Teléfono,
      orden: 3,
    },
    {
      encabezado: 'Correo electronico',
      clave: (item: PermisoModel ) => item.CorreoElectrónico,
      orden: 4,
    },{
      encabezado: 'Calle',
      clave: (item: PermisoModel ) => item.calle,
      orden: 5,
    }
  ];

  ngOnInit():void {
    this.loadMercancias();
    this.getDestinatario();
    this.loadLocalidad();
  }

  loadMercancias(): void {
    this.service.getTable()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((resp) => {
      this.tercerosProd = resp;
    });
  }

  loadLocalidad(): void {
    this.service.getLocalidaddata().pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data): void => {
      this.localidadList = data as Catalogo[];
    });
  }
  
  abrirModaldestinatario(): void {
   
    this.modal = 'show'; // Muestra el modal
    this.getDestinatario();
  
}

  getDestinatario(){
this.destinatarioForm = this.fb.group({
          rediofisica: ["", Validators.required],
          rediomoral: ["", Validators.required],
          destinatariorfc: ['', Validators.required],
          destinatariodenominacion: ['', Validators.required],
          destinatariopail: ['', Validators.required],
          destinatariomunicipio: ['', Validators.required],
          destinatariolocalidad: ['', Validators.required],
          destinatarioApellido: ['', Validators.required],
         
          destinatarioequivalente: [''],
          destinatario: ['', Validators.required],
          destinatarionumeroCalle: ['', Validators.required],
       
        destinatarioexperior: ['', Validators.required],
        destinatariointerior: [''],
        destinatariolada: ['', Validators.required],
        destinatarionumerotelefono: [''],
        destinatariocorreoElectronico: ['', [Validators.required, Validators.email]]
        });

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

