import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignarPersonaComponent } from './asignar-persona.component';

describe('AsignarPersonaComponent', () => {
  let component: AsignarPersonaComponent;
  let fixture: ComponentFixture<AsignarPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarPersonaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsignarPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default tab index as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should change tab index when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);

    component.seleccionaTab(1);
    expect(component.indice).toBe(1);
  });
});