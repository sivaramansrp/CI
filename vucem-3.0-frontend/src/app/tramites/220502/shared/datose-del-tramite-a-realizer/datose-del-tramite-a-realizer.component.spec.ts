import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatoseDelTramiteARealizerComponent } from './datose-del-tramite-a-realizer.component';

describe('DatoseDelTramiteARealizerComponent', () => {
  let component: DatoseDelTramiteARealizerComponent;
  let fixture: ComponentFixture<DatoseDelTramiteARealizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatoseDelTramiteARealizerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatoseDelTramiteARealizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
