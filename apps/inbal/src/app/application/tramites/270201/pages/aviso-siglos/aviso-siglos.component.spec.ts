import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AvisoSiglosComponent } from './aviso-siglos.component';

describe('AvisoSiglosComponent', () => {
  let component: AvisoSiglosComponent;
  let fixture: ComponentFixture<AvisoSiglosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvisoSiglosComponent],
      imports: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
