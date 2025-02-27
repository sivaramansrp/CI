import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PasoCuatroComponent } from './paso-cuatro.component';

describe('PasoCuatroComponent', () => {
  let component: PasoCuatroComponent;
  let fixture: ComponentFixture<PasoCuatroComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerSpy = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [PasoCuatroComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoCuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "servicios-extraordinarios/acuse" when firma is obtained', () => {
    const firma = 'testFirma';
    component.obtieneFirma(firma);
    expect(router.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should not navigate when firma is not obtained', () => {
    const firma = '';
    component.obtieneFirma(firma);
    expect(router.navigate).not.toHaveBeenCalled();
  });
});