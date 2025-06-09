import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignciontabComponent } from '../asigncionTab/asigncion-tab.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite120404Store } from '../../estados/store/tramite120404.store';
import { Tramite120404Query } from '../../estados/queries/tramite120404.query';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('AsignciontabComponent', () => {
  let component: AsignciontabComponent;
  let fixture: ComponentFixture<AsignciontabComponent>;
  let tramiteStore: Tramite120404Store;
  let tramiteQuery: Tramite120404Query;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,AsignciontabComponent, CatalogoSelectComponent, InputRadioComponent,HttpClientModule],
      providers: [
        FormBuilder,
        Tramite120404Store,
        {
          provide: Tramite120404Query,
          useValue: {
            selectTramite120404$: of({ asignacionRadio: false, asignacionsolitud: '', numTramite: '' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsignciontabComponent);
    component = fixture.componentInstance;
    tramiteStore = TestBed.inject(Tramite120404Store);
    tramiteQuery = TestBed.inject(Tramite120404Query);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form correctly', () => {
    expect(component.asignacionForm).toBeDefined();
    expect(component.asignacionForm).toBeTruthy();
  });

  it('should update store when setValoresStore is called', () => {
    const spy = jest.spyOn(tramiteStore, 'establecerDatos');
    component.setValoresStore(component.asignacionForm, 'asignacionRadio');
    expect(spy).toHaveBeenCalled();
  });


  it('should disable form if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.asignacionForm.disabled).toBeTruthy();
  });

  it('should enable form if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.asignacionForm.enabled).toBeTruthy();
  });

  it('should destroy observable subscriptions on component destroy', () => {
    const spy = jest.spyOn(component.destroyed$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
