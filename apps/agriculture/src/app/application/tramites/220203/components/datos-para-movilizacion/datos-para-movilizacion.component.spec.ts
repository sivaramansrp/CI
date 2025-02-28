import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosParaMovilizacionComponent } from './datos-para-movilizacion.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Import for HTTP testing
import { CatalogoSelectComponent, ImportacionDeAcuiculturaService, TituloComponent } from '@ng-mf/data-access-user'; // Import your service
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

describe('DatosParaMovilizacionComponent', () => {
  let component: DatosParaMovilizacionComponent;
  let fixture: ComponentFixture<DatosParaMovilizacionComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosParaMovilizacionComponent],
      imports: [HttpClientTestingModule, TituloComponent, CatalogoSelectComponent, ReactiveFormsModule, ToastrModule.forRoot(),], // Import the HttpClientTestingModule
      providers: [ImportacionDeAcuiculturaService,

      ] // Provide the service used by the component
    })
      .compileComponents();

    fixture = TestBed.createComponent(DatosParaMovilizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpTestingController = TestBed.inject(HttpTestingController); // Inject the HttpTestingController
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create formularioMovilizacion FormGroup on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formularioMovilizacion).toBeDefined();
  });

  // Add more tests if needed to check API calls or other functionalities
});
