// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ToastrModule, ToastrService } from 'ngx-toastr';
// import { VehiculosComponent } from './vehiculos.component';
// import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

// describe('VehiculosComponent', () => {
//   let component: VehiculosComponent;
//   let fixture: ComponentFixture<VehiculosComponent>;
//   let toastrService: ToastrService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule,
//         ToastrModule.forRoot(),
//         ReactiveFormsModule,
//         FormsModule
//       ],
//       declarations: [VehiculosComponent],
//       providers: [FormBuilder, ToastrService]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(VehiculosComponent);
//     component = fixture.componentInstance;
//     toastrService = TestBed.inject(ToastrService);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize the form on ngOnInit', () => {
//     component.ngOnInit();
//     expect(component.formVehiculo).toBeDefined();
//   });

//   it('should call onSubmit and show success toastr', () => {
//     spyOn(toastrService, 'success');
//     component.formVehiculo.setValue({
//       solicitudVehiculoVin2: '123',
//       solicitudVehiculoTipoVehiculo: 'Car',
//       solicitudVehiculoNumeroEconomico: '456',
//       solicitudVehiculoNumeroPlacas: '789',
//       solicitudVehiculoPaisEmisor: 'USA',
//       solicitudDomicilioEstado: 'California',
//       solicitudVehiculoIdDeVehiculo: '1',
//       solicitudVehiculoMarca: 'Toyota',
//       solicitudVehiculoModelo: '2022',
//       anioVehiculoVEH: '2022',
//       solicitudVehiculoTransponder: '123456',
//       solicitudVehiculoColor: 'Red',
//       solicitudVehiculoNumero2daPlaca: 'ABC123', 
//       solicitudVehiculoEmisor2daPlaca: 'USA' 
//     });
//     component.onSubmit();
//     expect(toastrService.success).toHaveBeenCalledWith('Vehículo agregado correctamente');
//   });

//   it('should call onSubmit and show error toastr if form is invalid', () => {
//     spyOn(toastrService, 'error');
//     component.formVehiculo.setValue({
//       solicitudVehiculoVin2: '',
//       solicitudVehiculoTipoVehiculo: '',
//       solicitudVehiculoNumeroEconomico: '',
//       solicitudVehiculoNumeroPlacas: '',
//       solicitudVehiculoPaisEmisor: '',
//       solicitudDomicilioEstado: '',
//       solicitudVehiculoIdDeVehiculo: '',
//       solicitudVehiculoMarca: '',
//       solicitudVehiculoModelo: '',
//       anioVehiculoVEH: '',
//       solicitudVehiculoTransponder: '',
//       solicitudVehiculoColor: '',
//       solicitudVehiculoNumero2daPlaca: '', // Added missing field
//       solicitudVehiculoEmisor2daPlaca: '' // Added missing field
//     });
//     component.onSubmit();
//     expect(toastrService.error).toHaveBeenCalledWith('Por favor complete todos los campos requeridos');
//   });

//   it('should call eliminarRegistroSelec and remove the selected record', () => {
//     component.nacional = [{ solicitudVehiculoVin2: '123' }];
//     component.eliminarRegistroSelec('123');
//     expect(component.nacional.length).toBe(0);
//   });

//   it('should call closeModal and hide the modal', () => {
//     component['modalInstance'] = { 
//       hide: jasmine.createSpy('hide'),
//       toggle: jasmine.createSpy('toggle'),
//       show: jasmine.createSpy('show'),
//       handleUpdate: jasmine.createSpy('handleUpdate'),
//       dispose: jasmine.createSpy('dispose')
//     };
//     component.closeModal();
//     expect((component as any).modalInstance.hide).toHaveBeenCalled();
//   });

//   it('should call openDialogCapturaSPFisicaValidacion and show the modal', () => {
//     component['modalInstance'] = { 
//       show: jasmine.createSpy('show'),
//       hide: jasmine.createSpy('hide'),
//       toggle: jasmine.createSpy('toggle'),
//       handleUpdate: jasmine.createSpy('handleUpdate'),
//       dispose: jasmine.createSpy('dispose')
//     };
//     component.openDialogCapturaSPFisicaValidacion();
//     expect((component as any).modalInstance.show).toHaveBeenCalled();
//   });

//   it('should call openDialogCapturaSPMoralValidacion and show the modal', () => {
//     (component as any).modalInstance = { 
//       show: jasmine.createSpy('show'),
//       hide: jasmine.createSpy('hide'),
//       toggle: jasmine.createSpy('toggle'),
//       handleUpdate: jasmine.createSpy('handleUpdate'),
//       dispose: jasmine.createSpy('dispose')
//     };
//     component.openDialogCapturaSPMoralValidacion();
//     expect((component as any).modalInstance.show).toHaveBeenCalled();
//   });

//   it('should call limpiarDatosVEHARR and reset the form', () => {
//     spyOn(component.formVehiculo, 'reset');
//     component.limpiarDatosVEHARR();
//     expect(component.formVehiculo.reset).toHaveBeenCalled();
//   });
// });