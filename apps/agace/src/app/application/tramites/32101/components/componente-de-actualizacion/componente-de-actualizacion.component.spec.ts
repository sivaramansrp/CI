import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteDeActualizacionComponent } from './componente-de-actualizacion.component';

describe('ComponenteDeActualizacionComponent', () => {
  let component: ComponenteDeActualizacionComponent;
  let fixture: ComponentFixture<ComponenteDeActualizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteDeActualizacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteDeActualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
