import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarDictamenComponent } from './verificar-dictamen.component';

describe('VerificarDictamenComponent', () => {
  let component: VerificarDictamenComponent;
  let fixture: ComponentFixture<VerificarDictamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificarDictamenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificarDictamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
