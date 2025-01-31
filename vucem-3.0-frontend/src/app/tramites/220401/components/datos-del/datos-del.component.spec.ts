import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDelComponent } from './datos-del.component';

describe('DatosDelComponent', () => {
  let component: DatosDelComponent;
  let fixture: ComponentFixture<DatosDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosDelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
