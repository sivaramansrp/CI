import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImporticonMercanciaSanitarioComponent } from './importicon-mercancia-sanitario.component';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Tramite260103Query } from '../../estados/tramite260103Query.query';
import { Tramite260103Store } from '../../estados/tramite260103Store.store';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('ImporticonMercanciaSanitarioComponent', () => {
  let component: ImporticonMercanciaSanitarioComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,ImporticonMercanciaSanitarioComponent,HttpClientModule],
      declarations: [],
      providers: [
        { provide: DatosSolicitudService, useValue: { obtenerRespuestaPorUrl: jest.fn() } },
        { provide: Tramite260103Query, useValue: { selectTramiteState$: of({ mercanciaForm: {} }) } },
        { provide: Tramite260103Store, useValue: { update: jest.fn() } },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ImporticonMercanciaSanitarioComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the reactive form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.mercanciaForm).toBeDefined();
    expect(component.mercanciaForm.controls['clasificacionProducto']).toBeDefined();
  });

});