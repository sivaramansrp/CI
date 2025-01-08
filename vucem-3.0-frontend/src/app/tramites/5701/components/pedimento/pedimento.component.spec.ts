import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedimentoComponent } from './pedimento.component';

describe('PedimentoComponent', () => {
  let component: PedimentoComponent;
  let fixture: ComponentFixture<PedimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedimentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
