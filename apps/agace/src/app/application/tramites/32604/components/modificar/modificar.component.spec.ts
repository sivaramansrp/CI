import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarComponent } from './modificar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { EmpresasComercializadorasService } from '../../services/empresas-comercializadoras.service';
import { Solicitud32604Store } from '../../estados/solicitud32604.store';
import { Solicitud32604Query } from '../../estados/solicitud32604.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('ModificarComponent', () => {
  let component: ModificarComponent;
  let fixture: ComponentFixture<ModificarComponent>;
  let empresasComercializadorasServiceMock: any;
  let solicitud32604StoreMock: any;
  let solicitud32604QueryMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    empresasComercializadorasServiceMock = {
      conseguirOpcionDeRadio: jest.fn(() => of({ requisitos: { radioOptions: [] } })),
      obtenerTipoInstalacion: jest.fn(() => of({ data: [] })),
    };
    solicitud32604StoreMock = {};
    solicitud32604QueryMock = {
      selectSolicitud$: of({})
    };
    consultaioQueryMock = {};

    await TestBed.configureTestingModule({
      imports: [ModificarComponent, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: EmpresasComercializadorasService, useValue: empresasComercializadorasServiceMock },
        { provide: Solicitud32604Store, useValue: solicitud32604StoreMock },
        { provide: Solicitud32604Query, useValue: solicitud32604QueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarComponent);
    component = fixture.componentInstance;
      component.form = (component as any).fb.group({
        instalacionPrincipal: [''],
        municipioDelegacion: [''],
        tipoInstalacion: [''],
        entidadFederativa: [''],
        registroSESAT: [''],
        direccion: [''],
        codigoPostal: [''],
        procesoProductivo: [''],
        acreditaInmueble: ['']
      });
      component.contenedores = { catalogos: [], labelNombre: '', primerOpcion: '' };
      component.sinoOpcion = { radioOptions: [], isRequired: false };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn((component as any)['destroy$'], 'next');
    const completeSpy = jest.spyOn((component as any)['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
