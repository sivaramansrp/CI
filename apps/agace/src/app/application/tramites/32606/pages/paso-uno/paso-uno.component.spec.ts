import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [provideHttpClient(),
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('seleccionaTab should update indice', () => {
    component.indice = 1;
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #seleccionaTab()', async () => {
    component.seleccionaTab(1);
  });

  it('should run ngOnInit without errors', () => {
    expect(() => component.ngOnInit()).not.toThrow();
  });

});