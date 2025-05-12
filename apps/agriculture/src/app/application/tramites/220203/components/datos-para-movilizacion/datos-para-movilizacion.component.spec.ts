import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosParaMovilizacionComponent } from './datos-para-movilizacion.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Import for HTTP testing
import { CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user'; // Import your service
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';

describe('DatosParaMovilizacionComponent', () => {
  let component: DatosParaMovilizacionComponent;
  let fixture: ComponentFixture<DatosParaMovilizacionComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosParaMovilizacionComponent],
      imports: [HttpClientTestingModule, TituloComponent, CatalogoSelectComponent, ReactiveFormsModule, ToastrModule.forRoot()],
      providers: [ImportacionDeAcuiculturaService]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosParaMovilizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpTestingController = TestBed.inject(HttpTestingController); // Inject the HttpTestingController
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should create formularioMovilizacion FormGroup on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formularioMovilizacion).toBeDefined();
  });

  // More tests can be skipped if needed
});
