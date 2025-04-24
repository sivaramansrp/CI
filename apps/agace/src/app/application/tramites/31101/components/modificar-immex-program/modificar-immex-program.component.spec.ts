import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarImmexProgramComponent } from './modificar-immex-program.component';

describe('ModificarImmexProgramComponent', () => {
  let component: ModificarImmexProgramComponent;
  let fixture: ComponentFixture<ModificarImmexProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarImmexProgramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarImmexProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
