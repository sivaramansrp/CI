import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      imports:[],
      providers:[]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have "indice" initialized to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should change "indice" when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);

    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });
});
