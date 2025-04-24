import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarImmexProgramComponent } from './agregar-immex-program.component';

describe('AgregarImmexProgramComponent', () => {
  let component: AgregarImmexProgramComponent;
  let fixture: ComponentFixture<AgregarImmexProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarImmexProgramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarImmexProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
