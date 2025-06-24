import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;

 beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [PasoTresComponent],
    providers: [
      { provide: Router, useValue: { navigate: jest.fn() } }
    ]
  }).compileComponents();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to acuse page if FIRMA is provided', () => {
  const routerMock = { navigate: jest.fn() } as any;
  const component = new PasoTresComponent(routerMock);
  component.obtieneFirma('firma-valida');
  expect(routerMock.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
});

it('should not navigate if FIRMA is falsy', () => {
  const routerMock = { navigate: jest.fn() } as any;
  const component = new PasoTresComponent(routerMock);
  component.obtieneFirma('');
  expect(routerMock.navigate).not.toHaveBeenCalled();
});
});
