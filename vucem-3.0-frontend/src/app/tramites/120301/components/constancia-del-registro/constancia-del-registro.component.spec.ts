import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstanciaDelRegistroComponent } from './constancia-del-registro.component';

describe('ConstanciaDelRegistroComponent', () => {
  let component: ConstanciaDelRegistroComponent;
  let fixture: ComponentFixture<ConstanciaDelRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConstanciaDelRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConstanciaDelRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
