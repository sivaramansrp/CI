import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosParaMovilizacionNacionalComponent } from './datos-para-movilizacion-nacional.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';

describe('DatosParaMovilizacionNacionalComponent', () => {
  let component: DatosParaMovilizacionNacionalComponent;
  let fixture: ComponentFixture<DatosParaMovilizacionNacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TituloComponent, CatalogoSelectComponent, ReactiveFormsModule,
        DatosParaMovilizacionNacionalComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DatosParaMovilizacionNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.forma).toBeDefined();
    expect(component.forma.get('transporte')).toBeDefined();
    expect(component.forma.get('empresaTransportista')).toBeDefined();
    expect(component.forma.get('transporte')?.disabled).toBe(component.esFormularioSoloLectura);
  });

  it('should call obtenerTodosLosDatosDeOpciones on ngOnInit', () => {
    const spy = jest.spyOn(component, 'obtenerTodosLosDatosDeOpciones');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should update store when setValoresStore is called', () => {
    const apiService = TestBed.inject<any>(component['agriculturaApiService'].constructor);
    const spy = jest.spyOn(apiService, 'updateMovilizacion');
    component.forma.setValue({
      transporte: 'test',
      medioTransporte: 'medio',
      guiaIdentificacion: 'guia',
      empresaTransportista: 'empresa'
    });
    component.setValoresStore();
    expect(spy).toHaveBeenCalledWith(component.forma.value);
  });

  it('should clean up subscriptions on destroy', () => {
    const spy = jest.spyOn(component['destroyNotifier$'], 'next');
    const spyComplete = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('should set transporteList when obtenerListaDeJustificaciones is called', () => {
    const mockCatalogo = [{ id: 1, nombre: 'Test' }];
    const apiService = TestBed.inject<any>(component['agriculturaApiService'].constructor);
    jest.spyOn(apiService, 'obtenerSelectorList').mockReturnValue({
      pipe: () => ({
        subscribe: (fn: any) => fn(mockCatalogo)
      })
    });
    component.obtenerListaDeJustificaciones();
    expect(component.transporteList).toEqual(mockCatalogo as any);
  });

  it('should set puntoList when obtenerListaDePunto is called', () => {
    const mockCatalogo = [{ id: 2, nombre: 'Punto' }];
    const apiService = TestBed.inject<any>(component['agriculturaApiService'].constructor);
    jest.spyOn(apiService, 'obtenerSelectorList').mockReturnValue({
      pipe: () => ({
        subscribe: (fn: any) => fn(mockCatalogo)
      })
    });
    component.obtenerListaDePunto();
    expect(component.puntoList).toEqual(mockCatalogo as any);
  });

  it('should update form validity in statusChanges subscription', () => {
    const apiService = TestBed.inject<any>(component['agriculturaApiService'].constructor);
    const spy = jest.spyOn(apiService, 'actualizarFormaValida');
    component.forma.get('transporte')?.setValue('test');
    component.forma.get('empresaTransportista')?.setValue('empresa');
    component.forma.updateValueAndValidity();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ movilizacionValidacion: true }));
  });
});