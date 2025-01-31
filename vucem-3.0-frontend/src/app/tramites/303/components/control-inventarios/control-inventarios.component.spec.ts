import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlInventariosComponent } from './control-inventarios.component';

describe('ControlInventariosComponent', () => {
  let component: ControlInventariosComponent;
  let fixture: ComponentFixture<ControlInventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlInventariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
