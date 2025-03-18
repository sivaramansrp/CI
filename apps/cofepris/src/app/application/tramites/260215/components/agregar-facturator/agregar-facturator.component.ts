import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { PermisoModel } from '../../models/permiso-sanitario.model';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';

@Component({
  selector: 'app-agregar-facturator',
  standalone: true,
  imports: [CommonModule,TituloComponent,TableComponent,AlertComponent,TablaDinamicaComponent,CatalogoSelectComponent,ReactiveFormsModule],
  templateUrl: './agregar-facturator.component.html',
  styleUrl: './agregar-facturator.component.css',
})
export class AgregarFacturatorComponent {
 
tercerosProd: PermisoModel [] = [];
  private destroyed$ = new Subject<void>();
  facturatorForm!:FormGroup;
  public proveedorList!: Catalogo[];
  public  localidadList !: Catalogo[];
  public modal = 'modal';
  TablaSeleccion = TablaSeleccion;
  constructor(private fb: FormBuilder, private service:ServiciosPermisoSanitarioService) {
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
        nombres: ['', Validators.required],
        facturatorapellido: ['', Validators.required],
        facturatorsapellido: [''],
        facturatorcpail: ['', Validators.required],
        facturatorestado: ['', Validators.required],
        facturatorcp: [''],
        facturatorequivalente: [''],
        facturatorcalle: ['', Validators.required],
        facturatorexperior: ['', Validators.required],
        facturatorinterior: [''],
        facturatorlada: ['', Validators.required],
        facturatortelefono: [''],
        facturatorElectronico: ['', [Validators.required, Validators.email]],
      });
    }
    isValid(form: FormGroup, field: string): boolean {
      return form.controls[field].invalid && (form.controls[field].dirty || form.controls[field].touched);
    }

    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }

}