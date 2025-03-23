import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReprestantanteComponent } from './represtantante.component';
import { Tramite260605Store } from '../../../../estados/tramites/tramite260605.store';
import { Tramite260605Query } from '../../../../estados/queries/tramite260605.query';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { of } from 'rxjs';

describe('ReprestantanteComponent', () => {
  let component: ReprestantanteComponent;
  let fixture: ComponentFixture<ReprestantanteComponent>;
  let store: Tramite260605Store;
  let query: Tramite260605Query;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, FormsModule],
      declarations: [ReprestantanteComponent, TituloComponent, AlertComponent],
      providers: [
        Tramite260605Store,
        {
          provide: Tramite260605Query,
          useValue: {
            selectSolicitud$: of({
              rfc: 'RFC123',
              nombre: 'John',
              apellidoPaterno: 'Doe',
              apellidoMaterno: 'Smith'
            }),
            getValue: () => ({
              rfc: 'RFC123',
              nombre: 'John',
              apellidoPaterno: 'Doe',
              apellidoMaterno: 'Smith'
            })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprestantanteComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Tramite260605Store);
    query = TestBed.inject(Tramite260605Query);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with store data', () => {
    expect(component.represtantante).toBeDefined();
    expect(component.represtantante.get('rfc')?.value).toBe('RFC123');
    expect(component.represtantante.get('nombre')?.value).toBe('John');
    expect(component.represtantante.get('apellidoPaterno')?.value).toBe('Doe');
    expect(component.represtantante.get('apellidoMaterno')?.value).toBe('Smith');
  });

  it('should call setValoresStore with correct arguments', () => {
    spyOn(store, 'setRfc');
    spyOn(store, 'setNombre');
    spyOn(store, 'setApellidoPaterno');
    spyOn(store, 'setApellidoMaterno');

    component.setValoresStore(component.represtantante, 'rfc', 'setRfc');
    component.setValoresStore(component.represtantante, 'nombre', 'setNombre');
    component.setValoresStore(component.represtantante, 'apellidoPaterno', 'setApellidoPaterno');
    component.setValoresStore(component.represtantante, 'apellidoMaterno', 'setApellidoMaterno');

    expect(store.setRfc).toHaveBeenCalledWith('RFC123');
    expect(store.setNombre).toHaveBeenCalledWith('John');
    expect(store.setApellidoPaterno).toHaveBeenCalledWith('Doe');
    expect(store.setApellidoMaterno).toHaveBeenCalledWith('Smith');
  });

  it('should destroy notifier on ngOnDestroy', () => {
    spyOn(component['destroyNotifier$'], 'next');
    spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroyNotifier$'].next).toHaveBeenCalled();
    expect(component['destroyNotifier$'].complete).toHaveBeenCalled();
  });
});