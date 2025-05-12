import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PasoTresComponent } from './paso-tres.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoTresComponent,RouterTestingModule,ToastrModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "servicios-extraordinarios/acuse" when FIRMA is valid', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const mockFirma = 'VALID_SIGNATURE';

    component.obtieneFirma(mockFirma);

    expect(navigateSpy).toHaveBeenCalledWith([
      'servicios-extraordinarios/acuse',
    ]);
  });

  it('should not navigate when FIRMA is empty', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const mockFirma = '';

    component.obtieneFirma(mockFirma);

    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
