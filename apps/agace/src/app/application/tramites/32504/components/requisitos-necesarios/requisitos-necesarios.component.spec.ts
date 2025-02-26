import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitosNecesariosComponent } from './requisitos-necesarios.component';

describe('RequisitosNecesariosComponent', () => {
  let component: RequisitosNecesariosComponent;
  let fixture: ComponentFixture<RequisitosNecesariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequisitosNecesariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequisitosNecesariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
