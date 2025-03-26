import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RequisitosNecesariosComponent } from './requisitos-necesarios.component';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { Tramite260303Store } from '../../../../estados/tramites/260303/tramite260303.store';
import { Tramite260303Query } from '../../../../estados/queries/260303/tramite260303.query';

describe('RequisitosNecesariosComponent', () => {
  let component: RequisitosNecesariosComponent;
  let fixture: ComponentFixture<RequisitosNecesariosComponent>;
  let certificadosLicenciasSvcMock: any;
  let tramite260303StoreMock: any;
  let tramite260303QueryMock: any;

  beforeEach(async () => {
    certificadosLicenciasSvcMock = {
      getTipoDeDocumentoDatos: jest.fn().mockReturnValue(of({ data: [{ id: 1, name: 'Documento 1' }] })),
    };

    tramite260303StoreMock = {
      setTipoDocumento: jest.fn(),
    };

    tramite260303QueryMock = {
      selectSolicitud$: of({ tipoDocumento: 'Documento 1' }),
    };

    await TestBed.configureTestingModule({
      imports: [RequisitosNecesariosComponent, ReactiveFormsModule],
      providers: [
        { provide: CertificadosLicenciasPermisosService, useValue: certificadosLicenciasSvcMock },
        { provide: Tramite260303Store, useValue: tramite260303StoreMock },
        { provide: Tramite260303Query, useValue: tramite260303QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RequisitosNecesariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tipoDeDocumentoForm with the correct value', () => {
    expect(component.tipoDeDocumentoForm.value).toEqual({ tipoDocumento: 'Documento 1' });
  });

  it('should call getTipoDeDocumentoCatalog on init and set tipoDocumentoCatalogo', () => {
    expect(certificadosLicenciasSvcMock.getTipoDeDocumentoDatos).toHaveBeenCalled();
    expect(component.tipoDocumentoCatalogo).toEqual([{ id: 1, name: 'Documento 1' }]);
  });

  it('should call setValoresStore and update the store', () => {
    const form = component.tipoDeDocumentoForm;
    form.get('tipoDocumento')?.setValue('Documento 2');
    //component.setValoresStore(form, 'tipoDocumento', 'setTipoDocumento');
    expect(tramite260303StoreMock.setTipoDocumento).toHaveBeenCalledWith('Documento 2');
  });

  it('should unsubscribe from observables on destroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    //component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
