import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratadosComponent } from './tratados.component';

describe('TratadosComponent', () => {
  let component: TratadosComponent;
  let fixture: ComponentFixture<TratadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TratadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TratadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
