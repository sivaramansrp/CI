import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MercanciaComponent } from './mercancia.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('MercanciaComponent', () => {
  let component: MercanciaComponent;
  let fixture: ComponentFixture<MercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule,MercanciaComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

it('should create', async () => {
  const fixture = TestBed.createComponent(MercanciaComponent);
  const component = fixture.componentInstance;
  fixture.detectChanges();
  expect(component).toBeTruthy();
});

});
