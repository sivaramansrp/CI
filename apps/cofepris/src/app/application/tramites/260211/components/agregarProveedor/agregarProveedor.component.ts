import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { Subject } from 'rxjs';
import { SanitarioService } from '../../services/sanitario.service';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-agregar-proveedor',
  standalone: true,
  imports: [CommonModule,TituloComponent,FormsModule,ReactiveFormsModule,CatalogoSelectComponent],
  templateUrl: './agregarProveedor.component.html',
  styleUrl: './agregarProveedor.component.css',
})
export class AgregarProveedorComponent {
  proveedorForm!:FormGroup;
   private destroyed$ = new Subject<void>();
   public proveedorList!: Catalogo[];
   public  localidadList !: Catalogo[];
  
  constructor(private fb: FormBuilder,private service:SanitarioService) {}
  
//   ngOnInit(): void {

//     this.proveedorForm = this.fb.group({
//       nacional: [false],
//       extranjero: [false],
//       fisica: [false],
//       moral: [false],
//       rfc: ['', Validators.required],
//       curp: ['', Validators.required],
//       denominacion: ['', Validators.required],
//       pail: ['', Validators.required],
//       localidad: ['', Validators.required],
//       municipio: ['', Validators.required],
//       nombrelocalidad: ['', Validators.required],
//       primerApellido: [''],
//       segundoApellido: [''],
//       equivalente: [''],
//       numeroCalle: ['', Validators.required],
//       experior: ['', Validators.required],
//       interior: [''],
//       lada: [''],
//       numerotelefono: [''],
//       correoElectronico: ['', [Validators.required, Validators.email]]
//     });
//     this.loadComboUnidad();
//     this.loadLocalidad();
//   }

//  loadComboUnidad(): void {
//     this.service.getProveedordata().pipe(
//       takeUntil(this.destroyed$)
//     ).subscribe((data): void => {
//       this.proveedorList = data as Catalogo[];
//     });
//   }

//   loadLocalidad(): void {
//     this.service.getLocalidaddata().pipe(
//       takeUntil(this.destroyed$)
//     ).subscribe((data): void => {
//       this.localidadList = data as Catalogo[];
//     });
//   }

//   guardarProveedor(){
//     if (this.proveedorForm.valid) {
//       console.log('Proveedor guardado:', this.proveedorForm.value);
//     } else {
//       console.log('Formulario no válido');
//     }
//   }

//   ngOnDestroy(): void {
//     this.destroyed$.next();
//     this.destroyed$.complete();
//   }
//   }
}