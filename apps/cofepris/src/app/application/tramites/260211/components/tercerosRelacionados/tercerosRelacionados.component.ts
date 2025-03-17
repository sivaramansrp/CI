import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, ConfiguracionColumna, TableComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { MENSAJEDEALERTA, TituloComponent } from '@ng-mf/data-access-user';
// import terceros from 'libs/shared/theme/assets/json/260211/terceros.json';
import { SanitarioService } from '../../services/sanitario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { PermisoModel } from '../detos.model';
import { AgregarProveedorComponent } from '../agregarProveedor/agregarProveedor.component';
import { AgregarFacturatorComponent } from '../agregarFacturator/agregarFacturator.component';
import { AgregarRequeridaComponent } from '../agregarRequerida/agregarRequerida.component';
import { AgregarDestinatarioComponent } from '../agregar-destinatario/agregar-destinatario.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule,TituloComponent,TableComponent,AlertComponent,TablaDinamicaComponent,AgregarProveedorComponent,AgregarFacturatorComponent,AgregarRequeridaComponent,AgregarDestinatarioComponent,CatalogoSelectComponent,ReactiveFormsModule],
  templateUrl: './tercerosRelacionados.component.html',
  styleUrl: './tercerosRelacionados.component.css',
})
export class TercerosRelacionadosComponent {
 proveedorForm!:FormGroup;
 requeridaForm!:FormGroup;
   private destroyed$ = new Subject<void>();
   public proveedorList!: Catalogo[];
   public  localidadList !: Catalogo[];
   public modal = 'modal';
   
   public hideCurp = true;

  // private destroyed$ = new Subject<void>();
  tableHeaderData: string[] = [  'Nombre/denominacion o razon social', 'RFC', 'CURP','Telefono','corro electronica','calle'];
  // public derechosList!: tableHeaderData[];
  TablaSeleccion = TablaSeleccion;
  tercerosProd: PermisoModel [] = [];
  tableBodyData: { tbodyData: string[] }[] = [];
  public TEXTOS = MENSAJEDEALERTA;
  public infoAlert = 'alert-info';
  public hasAgregar = false;
  public hasdestinatario = false;
  public hasproveedor = false;
  public hasrequerida = false;

  // public getEstablecimientoTableData = tercerostable;
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
    this.getRegistroForm();
  }
  JustificacionSeleccion():void{
    this.hasAgregar = false;
  }
 
  loadMercancias(): void {
    this.service.getTable()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((resp) => {
      this.tercerosProd = resp;
    });
  }


  public agregar(agregar:string) {
    if(agregar === 'Agregar'){
      this.hasAgregar = true;
    }
  }

 public destinatario(destinatario:string) {
    if(destinatario === 'destinatario'){
      this.hasdestinatario = true;
    }
  }

 public proveedor(proveedor:string) {
    if(proveedor === 'proveedor'){
      this.hasproveedor = true;
    }
  }
 
 public requerida(requerida:string) {
    if(requerida === 'requerida'){
      this.hasrequerida = true;
    }
  }

  public abrirModal() {
    this.modal = 'show'; // Muestra el modal
    this.getRegistroForm(); // Carga los datos en el formulario
  }

  // abrirModalrequerida(){
  //   this.modal = 'show'; // Muestra el modal
  //   this.getFormrequerida();
  // }

  getRegistroForm() {

     this.proveedorForm = this.fb.group({
          nacional: ["nacional", Validators.required],
          extranjero: [false],
          fisica: [false],
          moral: ["moral", Validators.required],
          rfc: ['', Validators.required],
          curp: ['', Validators.required],
          denominacion: ['', Validators.required],
          pail: [{value:'',disabled:true}, Validators.required ],
          localidad: ['', Validators.required],
          municipio: ['', Validators.required],
          nombrelocalidad: ['', Validators.required],
          primerApellido: [''],
          segundoApellido: [''],
          equivalente: [''],
          numeroCalle: ['', Validators.required],
          experior: ['', Validators.required],
          interior: [''],
          lada: [''],
          numerotelefono: [''],
          correoElectronico: ['', [Validators.required, Validators.email]]
        });
        this.loadComboUnidad();
        this.loadLocalidad();
      
      }


      // getFormrequerida(){

      //   this.requeridaForm = this.fb.group({
      //        profisica: ["", Validators.required],
      //        promoral: ["", Validators.required],
      //        tiporfc: ['', Validators.required],
      //        tipocurp: ['', Validators.required],
      //        tipodenominacion: ['', Validators.required],
      //        tipopail: ['', Validators.required],
      //        numeroEstado: ['', Validators.required],
      //       numeroCalle: ['', Validators.required],
      //        numbroexperior: ['', Validators.required],
      //        numbrointerior: [''],
      //        numbrolada: [''],
      //        numerotelefono: [''],
      //        tipocorreoElectronico: ['', [Validators.required, Validators.email]]
      //      });
          
      // }

      // setupCurpVisibilityListener(): void {
      //   this.proveedorForm.get('nacional')?.valueChanges.subscribe(() => {
      //     this.updateCurpVisibility();
      //   });
      //   this.proveedorForm.get('moral')?.valueChanges.subscribe(() => {
      //     this.updateCurpVisibility();
      //   });
      // }
    
      // updateCurpVisibility(): void {
      //   const nacional = this.proveedorForm.get('nacional')?.value;
      //   const moral = this.proveedorForm.get('moral')?.value;
    
      //   this.hideCurp = nacional && moral;
    
      //   if (this.hideCurp) {
      //     this.proveedorForm.get('curp')?.setValidators(null); // Remove validation
      //     this.proveedorForm.get('curp')?.setValue(''); // Clear the field
      //   } else {
      //     this.proveedorForm.get('curp')?.setValidators(Validators.required);
      //   }
      //   this.proveedorForm.get('curp')?.updateValueAndValidity();
      // }
    

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
    
      















      ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
      }
  }

