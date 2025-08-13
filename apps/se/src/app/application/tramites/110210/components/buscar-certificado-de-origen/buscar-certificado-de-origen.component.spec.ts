import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BuscarCertificadoDeOrigenComponent } from './buscar-certificado-de-origen.component';
import { Tramite110210Query } from '../../estados/queries/tramite110210.query';
import { Tramite110210Store } from '../../estados/store/tramite110210.store';
import { BuscarCertificadoDeOrigenService } from '../../services/buscar-certificado-de-origen/buscarCertificadoDeOrigen.service';

describe('BuscarCertificadoDeOrigenComponent', () => {
  let component: BuscarCertificadoDeOrigenComponent;
  let fixture: ComponentFixture<BuscarCertificadoDeOrigenComponent>;

  const tramite110210QueryMock = {
    selectTramite110210$: of({
      paisBloqueClave: '',
      tratadoAcuerdoClave: '',
      cveRegistroProductor: '123456789012',
      solicitud: {
        idSolicitud: null,
        idSolicitudProductor: '',
        
      }
    })
  };

  const tramite110210StoreMock = {
    setCveRegistroProductor: jest.fn(),
    setPaisBloqueClave: jest.fn(),
    setTratadoAcuerdoClave: jest.fn()
  };

  const serviceMock = {
    getPaisBloque: jest.fn().mockReturnValue(of([])),
    getTratadoAcuerdo: jest.fn().mockReturnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BuscarCertificadoDeOrigenComponent,
        ReactiveFormsModule,
        CommonModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: Tramite110210Query, useValue: tramite110210QueryMock },
        { provide: Tramite110210Store, useValue: tramite110210StoreMock },
        { provide: BuscarCertificadoDeOrigenService, useValue: serviceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarCertificadoDeOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con los valores por defecto del store', () => {
    expect(component.buscarCertificadoDeOrigenFrom).toBeDefined();
    expect(component.buscarCertificadoDeOrigenFrom.get('cveRegistroProductor')?.value).toBe('123456789012');
    expect(component.buscarCertificadoDeOrigenFrom.get('paisBloqueClave')?.value).toBe('');
    expect(component.buscarCertificadoDeOrigenFrom.get('tratadoAcuerdoClave')?.value).toBe('');
  });

  it('debe regresar true si el control es inválido', () => {
    const control = component.buscarCertificadoDeOrigenFrom.get('cveRegistroProductor');
    control?.markAsTouched();
    control?.setValue('');
    expect(component.esInvalido('cveRegistroProductor')).toBe(true);
  });

  it('debe regresar false si el control es válido', () => {
    const control = component.buscarCertificadoDeOrigenFrom.get('cveRegistroProductor');
    control?.markAsTouched();
    control?.setValue('validValue');
    expect(component.esInvalido('cveRegistroProductor')).toBe(false);
  });


  it('debe deshabilitar cveRegistroProductor si idSolicitud no es null', () => {
    component.buscarCertificadoDeOrigenFrom.get('solicitud.idSolicitud')?.setValue(999);
    component.actualizaGridComercializadoresProductos();
    expect(component.buscarCertificadoDeOrigenFrom.get('cveRegistroProductor')?.disabled).toBe(true);
  });

  it('debe llamar setValoresStore con los valores correctos', () => {
    const form = component.buscarCertificadoDeOrigenFrom;
    form.get('cveRegistroProductor')?.setValue('XYZ123');
    component.setValoresStore(form, 'cveRegistroProductor', 'setCveRegistroProductor');
    expect(tramite110210StoreMock.setCveRegistroProductor).toHaveBeenCalledWith('XYZ123');
  });

  it('debe llamar getValoresStore y actualizar el formulario', () => {
    const spy = jest.spyOn(component, 'getValoresStore');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('debe obtener datos de paisBloque y tratadoAcuerdo al inicializar', () => {
    component.ngOnInit();
    expect(serviceMock.getPaisBloque).toHaveBeenCalled();
    expect(serviceMock.getTratadoAcuerdo).toHaveBeenCalled();
  });

  it('debe desuscribirse de los observables al destruir el componente', () => {
    const destroyed$ = (component as any).destroyed$;
    const nextSpy = jest.spyOn(destroyed$, 'next');
    const completeSpy = jest.spyOn(destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
