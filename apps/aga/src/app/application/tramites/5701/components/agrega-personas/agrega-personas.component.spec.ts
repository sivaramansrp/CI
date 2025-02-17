import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaPersonasComponent } from './agrega-personas.component';

describe('AgregaPersonasComponent', () => {
  let component: AgregaPersonasComponent;
  let fixture: ComponentFixture<AgregaPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaPersonasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregaPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
