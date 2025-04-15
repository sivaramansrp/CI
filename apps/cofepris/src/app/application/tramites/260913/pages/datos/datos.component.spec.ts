import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default index value of 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update the index when seleccionaTab is called', () => {
    const newIndex = 3;
    component.seleccionaTab(newIndex);
    expect(component.indice).toBe(newIndex);
  });
});
