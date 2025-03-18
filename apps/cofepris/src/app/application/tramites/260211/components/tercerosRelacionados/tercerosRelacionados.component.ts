import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, ConfiguracionColumna, TableComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { MENSAJEDEALERTA, TituloComponent } from '@ng-mf/data-access-user';
// import terceros from 'libs/shared/theme/assets/json/260211/terceros.json';
import { SanitarioService } from '../../services/sanitario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { PermisoModel } from '../detos.model';
import { AgregarProveedorComponent } from '../agregarProveedor/agregarProveedor.component';
import { AgregarFacturatorComponent } from '../agregarFacturator/agregarFacturator.component';
import { AgregarRequeridaComponent } from '../agregarRequerida/agregarRequerida.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarDestinatarioComponent } from '../agregar-destinatario/agregar-destinatario.component';
import { Solicitud260211State, } from '../../../../estados/tramites/sanitario260211.store';

import { Sanitario260211Store } from '../../../../estados/tramites/sanitario260211.store';

import { Permiso260211Query } from '../../../../estados/queries/permiso260211.query';

@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule,TituloComponent,TableComponent,AlertComponent,TablaDinamicaComponent,AgregarProveedorComponent,AgregarFacturatorComponent,AgregarRequeridaComponent,CatalogoSelectComponent,ReactiveFormsModule,AgregarDestinatarioComponent],
  templateUrl: './tercerosRelacionados.component.html',
  styleUrl: './tercerosRelacionados.component.css',
})
export class TercerosRelacionadosComponent implements OnInit {
 proveedorForm!:FormGroup;
 requeridaForm!:FormGroup;
   private destroyed$ = new Subject<void>();
   private destroyNotifier$: Subject<void> = new Subject();
   public proveedorList!: Catalogo[];
   public  localidadList !: Catalogo[];
   public modal = 'modal';
   public hideCurp = true;
   public solicitudState!: Solicitud260211State;
tableHeaderData: string[] = [  'Nombre/denominacion o razon social', 'RFC', 'CURP','Telefono','corro electronica','calle'];

  TablaSeleccion = TablaSeleccion;
  tercerosProd: PermisoModel [] = [];
  tableBodyData: { tbodyData: string[] }[] = [];
  public TEXTOS = MENSAJEDEALERTA;
  public infoAlert = 'alert-info';
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
    this.getRegistroForm();
  }
  
 
  loadMercancias(): void {
    this.service.getTable()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((resp) => {
      this.tercerosProd = resp;
    });
  }


  

//  public destinatario(destinatario:string) {
//     if(destinatario === 'destinatario'){
//       this.hasdestinatario = true;
//     }
//   }

//  public proveedor(proveedor:string) {
//     if(proveedor === 'proveedor'){
//       this.hasproveedor = true;
//     }
//   }
 
//  public requerida(requerida:string) {
//     if(requerida === 'requerida'){
//       this.hasrequerida = true;
//     }
//   }

  public abrirModal() {
    this.modal = 'show'; // Muestra el modal
    this.getRegistroForm(); // Carga los datos en el formulario
  }

  abrirModalrequerida(){
    this.modal = 'show'; // Muestra el modal
    this.getFormrequerida();
  }

  getRegistroForm() {

     this.proveedorForm = this.fb.group({
          nacional: ["nacional", Validators.required],
          extranjero: [false],
          fisica: [false],
          moral: ["moral", Validators.required],
          rfc: [{ value: '', disabled: true }, Validators.required],
          // curp: ['', Validators.required],
          denominacion: [this.solicitudState?.denominacion, Validators.required],
          pail: ['', Validators.required ],
          localidad: ['', Validators.required],
          municipio: ['', Validators.required],
          nombrelocalidad: ['', Validators.required],
          primerApellido: [''],
          segundoApellido: [''],
          equivalente: [this.solicitudState?.denominacion,{ value: '', disabled: true }],
          numeroCalle: [this.solicitudState?.numeroCalle, Validators.required],
          experior: [this.solicitudState?.experior ,Validators.required],
          interior: [this.solicitudState?.interior ],
          lada: [this.solicitudState?.lada],
          numerotelefono: [this.solicitudState?.numerotelefono],
          correoElectronico: [this.solicitudState?.correoElectronico, [Validators.required, Validators.email]]
        });
        this.proveedorForm.get('pail')?.disable();
        this.loadComboUnidad();
        this.loadLocalidad();
      
      }

      getFormrequerida(){

        this.requeridaForm = this.fb.group({
             profisica: ["", Validators.required],
             moral: ["", Validators.required],
             tiporfc: [this.solicitudState?.tiporfc, Validators.required],
             tipocurp: [this.solicitudState?.tipocurp, Validators.required],
             tipodenominacion: [this.solicitudState?.tipodenominacion, Validators.required],
             tipopail: [{ value: '', disabled: true }, Validators.required],
             numeroEstado: [this.solicitudState?.numeroEstado, Validators.required],
            numerosCalle: [this.solicitudState?.numerosCalle,{ value: '', disabled: true }, Validators.required],
             numbroexperior: [this.solicitudState?.numbroexperior,{ value: '', disabled: true }, Validators.required],
             numbrointerior: [this.solicitudState?.numbrointerior],
             numbrolada: [this.solicitudState?.numbrolada],
             numerostelefono: [this.solicitudState?.numerostelefono,{ value: '', disabled: true }],
             tipocorreoElectronico: [this.solicitudState?.tipocorreoElectronico,{ value: '', disabled: true }, [Validators.required, Validators.email]]
           });
          
      }

      

      loadComboUnidad(): void {
        this.service.getProveedordata().pipe(
          takeUntil(this.destroyed$)
        ).subscribe((data): void => {
          this.proveedorList = data as Catalogo[];
        });
      }
    
      loadLocalidad(): void {
        this.service.getLocalidaddata().pipe(
          takeUntil(this.destroyed$)
        ).subscribe((data): void => {
          this.localidadList = data as Catalogo[];
        });
      }

      guardarProveedor(){
        if (this.proveedorForm.valid) {
          console.log('Proveedor guardado:', this.proveedorForm.value);
        } else {
          console.log('Formulario no válido');
        }
        
      }
      isValid(form: FormGroup, field: string): boolean {
        return form.controls[field].invalid && (form.controls[field].dirty || form.controls[field].touched);
      }
      setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Sanitario260211Store): void {
        const valor = form.get(campo)?.value;
        (this.sanitario260211Store[metodoNombre] as (value: any) => void)(valor);
      }
// eslint-disable-next-line @angular-eslint/use-lifecycle-interface
ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
      }
  }

