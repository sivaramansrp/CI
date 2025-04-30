import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEnlaceOperativoComponent } from './agregar-enlace-operativo.component';

describe('AgregarEnlaceOperativoComponent', () => {
  let component: AgregarEnlaceOperativoComponent;
  let fixture: ComponentFixture<AgregarEnlaceOperativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEnlaceOperativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEnlaceOperativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
