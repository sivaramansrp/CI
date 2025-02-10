import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsoEspicificoComponent } from './uso-espicifico.component';

describe('UsoEspicificoComponent', () => {
  let component: UsoEspicificoComponent;
  let fixture: ComponentFixture<UsoEspicificoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsoEspicificoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsoEspicificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
