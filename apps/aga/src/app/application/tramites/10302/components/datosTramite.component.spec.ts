import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosTramiteComponent } from './datosTramite.component';
import { Validators } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('DatosTramiteComponent', () => {
  let component: DatosTramiteComponent;
  let fixture: ComponentFixture<DatosTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosTramiteComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should initialize tramiteForm and agregarMercanciasForm on donanteDomicilio()', () => {
  //   component.solicitudState = {
  //     aduana: 'aduanaValue',
  //     organismoPublico: 'organismoValue',
  //     usoEspecifico: 'usoValue',
  //     pais: 'paisValue',
  //     rfc: 'rfcValue',
  //     numeroProgramaImmex: 'programaValue',
  //     razonSocial: 'razonValue',
  //     correoElectronicoOpcional: 'emailValue',
  //     telefonoOpcional: 'phoneValue',
  //     calle: 'calleValue',
  //     numeroExterior: 'exteriorValue',
  //     numeroInterior: 'interiorValue',
  //     telefono: 'telefonoValue',
  //     correoElectronico: 'correoValue',
  //     codigoPostal: 'postalValue',
  //     estado: 'estadoValue',
  //     colonia: 'coloniaValue',
  //     tipoDeMercancia: 'tipoValue',
  //     condicionMercancia: 'condicionValue',
  //     unidadMedida: 'unidadValue',
  //     ano: 'anoValue',
  //   } as any;

  //   component.donanteDomicilio();

  //   expect(component.tramiteForm).toBeDefined();
  //   expect(component.agregarMercanciasForm).toBeDefined();
  //   expect(component.tramiteForm.get('exencionImpuestos.aduana')?.value).toBe('aduanaValue');
  //   expect(component.agregarMercanciasForm.get('datosMercancia.tipoDeMercancia')?.value).toBe('tipoValue');
  // });

  // it('should call setAduana on aduanaSeleccion()', () => {
  //   const setAduanaSpy = jest.spyOn(component['store'], 'setAduana');
  //   component.tramiteForm = component.fb.group({
  //     exencionImpuestos: component.fb.group({
  //       aduana: ['aduanaValue'],
  //     }),
  //   });

  //   component.aduanaSeleccion();

  //   expect(setAduanaSpy).toHaveBeenCalledWith('aduanaValue');
  // });

  // it('should call setTipoDeMercancia on tipoDeMercanciaSeleccion()', () => {
  //   const setTipoDeMercanciaSpy = jest.spyOn(component['store'], 'setTipoDeMercancia');
  //   component.agregarMercanciasForm = component.fb.group({
  //     datosMercancia: component.fb.group({
  //       tipoDeMercancia: ['tipoValue'],
  //     }),
  //   });

  //   component.tipoDeMercanciaSeleccion();

  //   expect(setTipoDeMercanciaSpy).toHaveBeenCalledWith('tipoValue');
  // });

  // it('should call setCondicionMercancia on condicionMercanciaSeleccion()', () => {
  //   const setCondicionMercanciaSpy = jest.spyOn(component['store'], 'setCondicionMercancia');
  //   component.agregarMercanciasForm = component.fb.group({
  //     datosMercancia: component.fb.group({
  //       condicionMercancia: ['condicionValue'],
  //     }),
  //   });

  //   component.condicionMercanciaSeleccion();

  //   expect(setCondicionMercanciaSpy).toHaveBeenCalledWith('condicionValue');
  // });

  // it('should call setUnidadMedida on unidadMedidaSeleccion()', () => {
  //   const setUnidadMedidaSpy = jest.spyOn(component['store'], 'setUnidadMedida');
  //   component.agregarMercanciasForm = component.fb.group({
  //     datosMercancia: component.fb.group({
  //       unidadMedida: ['unidadValue'],
  //     }),
  //   });

  //   component.unidadMedidaSeleccion();

  //   expect(setUnidadMedidaSpy).toHaveBeenCalledWith('unidadValue');
  // });

  // it('should call setAno on anoSeleccion()', () => {
  //   const setAnoSpy = jest.spyOn(component['store'], 'setAno');
  //   component.agregarMercanciasForm = component.fb.group({
  //     datosMercancia: component.fb.group({
  //       ano: ['anoValue'],
  //     }),
  //   });

  //   component.anoSeleccion();

  //   expect(setAnoSpy).toHaveBeenCalledWith('anoValue');
  // });

  // it('should call setPais on paisSeleccion()', () => {
  //   const setPaisSpy = jest.spyOn(component['store'], 'setPais');
  //   component.tramiteForm = component.fb.group({
  //     exencionImpuestos: component.fb.group({
  //       pais: ['paisValue'],
  //     }),
  //   });

  //   component.paisSeleccion();

  //   expect(setPaisSpy).toHaveBeenCalledWith('paisValue');
  // });

  // it('should mark tramiteForm as touched if invalid on validarDestinatarioFormulario()', () => {
  //   component.tramiteForm = component.fb.group({
  //     exencionImpuestos: component.fb.group({
  //       aduana: ['', Validators.required],
  //     }),
  //   });

  //   component.validarDestinatarioFormulario();

  //   expect(component.tramiteForm.touched).toBeTruthy();
  // });

  // it('should set values in store on setValoresStore()', () => {
  //   const setAduanaSpy = jest.spyOn(component['store'], 'setAduana');
  //   component.tramiteForm = component.fb.group({
  //     exencionImpuestos: component.fb.group({
  //       aduana: ['aduanaValue'],
  //     }),
  //   });

  //   component.setValoresStore(component.tramiteForm, 'exencionImpuestos.aduana', 'setAduana');

  //   expect(setAduanaSpy).toHaveBeenCalledWith('aduanaValue');
  // });

  // it('should open modal on abrirDialogoMercancias()', () => {
  //   const modalElementMock = {
  //     nativeElement: {
  //       show: jest.fn(),
  //     },
  //   };
  //   component.modalElement = modalElementMock as any;

  //   component.abrirDialogoMercancias();

  //   expect(modalElementMock.nativeElement.show).toHaveBeenCalled();
  // });

  // it('should close modal on cerrarModal()', () => {
  //   const closeModalMock = {
  //     nativeElement: {
  //       click: jest.fn(),
  //     },
  //   };
  //   component.closeModal = closeModalMock as any;

  //   component.cerrarModal();

  //   expect(closeModalMock.nativeElement.click).toHaveBeenCalled();
  // });

  // it('should initialize mercanciaHeaderData and mercanciaBodyData on obtenerMercancia()', () => {
  //   component.obtenerMercancia();

  //   expect(component.mercanciaHeaderData).toEqual(component.getMercanciaTableData.mercanciaTable.tableHeader);
  //   expect(component.mercanciaBodyData).toEqual(component.getMercanciaTableData.mercanciaTable.tableBody);
  // });

  // it('should complete destroyNotifier$ on ngOnDestroy()', () => {
  //   const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

  //   component.ngOnDestroy();

  //   expect(destroyNotifierSpy).toHaveBeenCalled();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
