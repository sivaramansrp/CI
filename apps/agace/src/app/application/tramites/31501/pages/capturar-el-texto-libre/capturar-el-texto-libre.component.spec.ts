import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturarElTextoLibreComponent } from './capturar-el-texto-libre.component';

describe('CapturarElTextoLibreComponent', () => {
  let component: CapturarElTextoLibreComponent;
  let fixture: ComponentFixture<CapturarElTextoLibreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturarElTextoLibreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturarElTextoLibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
