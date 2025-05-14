import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoSiglosComponent } from './pantallas.component';

describe('AvisoSiglosComponent', () => {
  let component: AvisoSiglosComponent;
  let fixture: ComponentFixture<AvisoSiglosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvisoSiglosComponent],
      imports: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisoSiglosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
