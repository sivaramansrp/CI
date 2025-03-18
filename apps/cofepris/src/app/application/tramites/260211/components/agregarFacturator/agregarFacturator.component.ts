import { Component, ElementRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PermisoModel } from '../detos.model';
import { map, Subject, takeUntil } from 'rxjs';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { SanitarioService } from '../../services/sanitario.service';

import { Solicitud260211State, } from '../../../../estados/tramites/sanitario260211.store';

import { Sanitario260211Store } from '../../../../estados/tramites/sanitario260211.store';

import { Permiso260211Query } from '../../../../estados/queries/permiso260211.query';

@Component({
  selector: 'app-agregar-facturator',
  standalone: true,
  imports: [CommonModule,TituloComponent,TableComponent,AlertComponent,TablaDinamicaComponent,CatalogoSelectComponent,ReactiveFormsModule],
  templateUrl: './agregarFacturator.component.html',
  styleUrl: './agregarFacturator.component.css',
})
export class AgregarFacturatorComponent implements OnDestroy, OnInit {
 
tercerosProd: PermisoModel [] = [];
  private destroyed$ = new Subject<void>();
  private destroyNotifier$: Subject<void> = new Subject();
  public solicitudState!: Solicitud260211State;
  facturatorForm!:FormGroup;
  public proveedorList!: Catalogo[];
  public  localidadList !: Catalogo[];
  public modal = 'modal';
  TablaSeleccion = TablaSeleccion;
  constructor(private fb: FormBuilder, private service:SanitarioService,
    private sanitario260211Store: Sanitario260211Store,
        private permiso260211Query: Permiso260211Query
  ) {
  }

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
        this.getFacturator()
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

    abrirModalfacurator(): void {
      this.modal = 'show'; // Muestra el modal
      this.getFacturator();
    }
  
    getFacturator() {
      this.facturatorForm = this.fb.group({
        facturatorfisica: ['', Validators.required],
        facturatormoral: ['', Validators.required],
        nombres: [this.solicitudState?.nombres, Validators.required],
        facturatorapellido: [this.solicitudState?.facturatorapellido, Validators.required],
        facturatorsapellido: [this.solicitudState?.facturatorsapellido],
        facturatorcpail: ['', Validators.required],
        facturatorestado: [this.solicitudState?.facturatorestado, Validators.required],
        facturatorcp: [this.solicitudState?.facturatorcp],
        facturatorequivalente: [this.solicitudState?.facturatorequivalente],
        facturatorcalle: [this.solicitudState?.facturatorcalle, Validators.required],
        facturatorexperior: [this.solicitudState?.facturatorexperior, Validators.required],
        facturatorinterior: [this.solicitudState?.facturatorinterior],
        facturatorlada: [this.solicitudState?.facturatorlada, Validators.required],
        facturatortelefono: [this.solicitudState?.facturatortelefono],
        facturatorElectronico: [this.solicitudState?.facturatorElectronico, [Validators.required, Validators.email]],
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
    this.destroyNotifier$.complete();

    }

}