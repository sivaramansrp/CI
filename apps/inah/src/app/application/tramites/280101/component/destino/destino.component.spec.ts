import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite280101Store } from '../../../../estados/tramite/tramite280101.store';
import { Tramite280101Query } from '../../../../estados/queries/tramite280101.query';
import { DestinoComponent } from './destino.component';

describe('DestinoComponent', () => {
  let component: DestinoComponent;
  let fixture: ComponentFixture<DestinoComponent>;
  let storeMock: any;
  let queryMock: any;

  beforeEach(async () => {
    storeMock = {
      setPais: jest.fn(),
      setCodigoPostal: jest.fn(),
    };

    queryMock = {
      selectSolicitud$: of({
        pais: [{ id: 1, descripcion: 'México' }],
        codigoPostal: 12345,
        estado: 1,
        municipioOAlcadia: 'Municipio',
        localidad: 'Localidad',
        colonia: 1,
        numeroExterior: 100,
        numeroInterior: 200,
        calle: 'Calle Principal',
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,DestinoComponent, TituloComponent],
      providers: [
        { provide: Tramite280101Store, useValue: storeMock },
        { provide: Tramite280101Query, useValue: queryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with values from the query', () => {
    expect(component.DestinoForm.value).toEqual({
      pais: [{ id: 1, descripcion: 'México' }],
      codigoPostal: 12345,
      estado: 1,
      municipioOAlcadia: 'Municipio',
      localidad: 'Localidad',
      colonia: 1,
      numeroExterior: 100,
      numeroInterior: 200,
      calle: 'Calle Principal',
    });
  });

  it('should call the correct store method when setValoresStore is invoked', () => {
    const form = component.DestinoForm;
    component.setValoresStore(form, 'pais', 'setPais');
    expect(storeMock.setPais).toHaveBeenCalledWith([{ id: 1, descripcion: 'México' }]);

    component.setValoresStore(form, 'codigoPostal', 'setCodigoPostal');
    expect(storeMock.setCodigoPostal).toHaveBeenCalledWith(12345);
  });

  it('should clean up subscriptions on destroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});
