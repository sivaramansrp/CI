import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, ConfiguracionColumna, TableComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { SanitarioService } from '../../services/sanitario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { PermisoModel } from '../detos.model';
import { Solicitud260211State, } from '../../../../estados/tramites/sanitario260211.store';

import { Sanitario260211Store } from '../../../../estados/tramites/sanitario260211.store';

import { Permiso260211Query } from '../../../../estados/queries/permiso260211.query';

@Component({
  selector: 'app-agregar-destinatario',
  standalone: true,
   imports: [CommonModule,TituloComponent,TableComponent,AlertComponent,TablaDinamicaComponent,CatalogoSelectComponent,ReactiveFormsModule],
  templateUrl: './agregar-destinatario.component.html',
  styleUrl: './agregar-destinatario.component.css',
})
export class AgregarDestinatarioComponent implements OnInit, OnDestroy {
  tercerosProd: PermisoModel [] = [];
  private destroyed$ = new Subject<void>();
  private destroyNotifier$: Subject<void> = new Subject();
  public solicitudState!: Solicitud260211State;
  destinatarioForm!:FormGroup;
  public proveedorList!: Catalogo[];
  public  localidadList !: Catalogo[];
  public modal = 'modal';
  TablaSeleccion = TablaSeleccion;
constructor(private fb: FormBuilder,private service:SanitarioService,
  private sanitario260211Store: Sanitario260211Store,
        private permiso260211Query: Permiso260211Query
){}

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
    this.permiso260211Query.selectSolicitud$
              .pipe(
                takeUntil(this.destroyNotifier$),
                map((seccionState) => {
                  this.solicitudState = seccionState;
                })
              )
              .subscribe();
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
          destinatariorfc: [this.solicitudState?.destinatariorfc, Validators.required],
          destinatariodenominacion: [this.solicitudState?.destinatariodenominacion, Validators.required],
          destinatariopail: ['', Validators.required],
          destinatariomunicipio: ['', Validators.required],
          destinatariolocalidad: ['', Validators.required],
          destinatarioApellido: ['', Validators.required],
         
          destinatarioequivalente: ['', Validators.required],
          destinatario: [''],
          destinatarionumeroCalle: [this.solicitudState?.destinatarionumeroCalle, Validators.required],
       
        destinatarioexperior: [this.solicitudState?.destinatarioexperior, Validators.required],
        destinatariointerior: [this.solicitudState?.destinatariointerior, Validators.required],
        destinatariolada: [this.solicitudState?.destinatariolada],
        destinatarionumerotelefono: [this.solicitudState?.destinatarionumerotelefono],
        destinatariocorreoElectronico: [this.solicitudState?.destinatariocorreoElectronico, [Validators.required, Validators.email]]
        });

  }
  isValid(form: FormGroup, field: string): boolean {
    return form.controls[field].invalid && (form.controls[field].dirty || form.controls[field].touched);
  }
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Sanitario260211Store): void {
    const valor = form.get(campo)?.value;
    (this.sanitario260211Store[metodoNombre] as (value: any) => void)(valor);
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}

