import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaveScianComponent } from './clave-scian.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';


import { SolicitudService } from '../../services/solicitud.service';
import { Tramite260212Store } from '../../estados/tramite260212.store';
import { Tramite260212Query } from '../../estados/tramite260212.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';


class SolicitudServiceMock {
  getClave = jest.fn().mockReturnValue(of([{ id: 1, nombre: 'clave1' }]));
}
class Tramite260212StoreMock {
  setClave = jest.fn();
}
class Tramite260212QueryMock {
  selectedClave$ = of('clave1');
  selectedDescripcion$ = of('desc1');
}
class ConsultaioQueryMock {
  selectConsultaioState$ = of({ readonly: false });
}

describe('ClaveScianComponent', () => {
  let component: ClaveScianComponent;
  let fixture: ComponentFixture<ClaveScianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ClaveScianComponent 
      ],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useClass: SolicitudServiceMock },
        { provide: Tramite260212Store, useClass: Tramite260212StoreMock },
        { provide: Tramite260212Query, useClass: Tramite260212QueryMock },
        { provide: ConsultaioQuery, useClass: ConsultaioQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClaveScianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.claveForm).toBeDefined();
    expect(component.claveForm.get('clave')).toBeDefined();
    expect(component.claveForm.get('descripcion')).toBeDefined();
  });

  it('should call getClave and set clave array in actualizarEstado', () => {
    component.actualizarEstado();
    expect(component.clave.length).toBeGreaterThan(0);
  });

  it('should set form values from selectedClave$ and selectedDescripcion$', () => {
    component.actualizarEstado();
    expect(component.claveForm.get('clave')?.value).toBe('clave1');
    expect(component.claveForm.get('descripcion')?.value).toBe('desc1');
  });

  it('should emit cancel event when cancelar is called', () => {
    const spy = jest.spyOn(component.cancel, 'emit');
    component.cancelar();
    expect(spy).toHaveBeenCalled();
  });

  it('should call setClave on store when getMunicipios is called', () => {
    component.claveForm.get('clave')?.setValue('claveX');
    const store = (component as any).tramite260212Store as Tramite260212StoreMock;
    component.getMunicipios();
    expect(store.setClave).toHaveBeenCalledWith('claveX');
  });

  it('should clean up destroy$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destroy$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});

