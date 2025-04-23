import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';
import { ToastrModule } from 'ngx-toastr';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let router: Router;
  let navigateSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent],
      imports: [
        RouterTestingModule,
        FirmaElectronicaComponent,
        ToastrModule.forRoot()
    ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = jest.spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('obtieneFirma', () => {
    it('should navigate to acuse page when firma is a non-empty string', () => {
      const testFirma = 'mock-signature';
      component.obtieneFirma(testFirma);
      expect(navigateSpy).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
    });

    it('should NOT navigate when firma is empty', () => {
      component.obtieneFirma('');
      expect(navigateSpy).not.toHaveBeenCalled();
    });

    it('should NOT navigate when firma is undefined', () => {
      component.obtieneFirma(undefined as any);
      expect(navigateSpy).not.toHaveBeenCalled();
    });

    it('should NOT navigate when firma is null', () => {
      component.obtieneFirma(null as any);
      expect(navigateSpy).not.toHaveBeenCalled();
    });
  });
});