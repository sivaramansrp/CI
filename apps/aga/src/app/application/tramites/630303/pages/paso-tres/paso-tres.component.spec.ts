import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PasoTresComponent } from './paso-tres.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        FirmaElectronicaComponent, 
        PasoTresComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "servicios-extraordinarios/acuse" when obtieneFirma is called with a valid signature', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const mockFirma = 'valid-signature';

    component.obtieneFirma(mockFirma);

    expect(navigateSpy).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should not navigate when obtieneFirma is called with an empty signature', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const mockFirma = '';

    component.obtieneFirma(mockFirma);

    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
