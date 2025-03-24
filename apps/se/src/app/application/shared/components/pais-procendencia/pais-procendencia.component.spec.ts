import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaisProcendenciaComponent } from './pais-procendencia.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CrosslistComponent } from '@libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { EventEmitter } from '@angular/core';

describe('PaisProcendenciaComponent', () => {
  let component: PaisProcendenciaComponent;
  let fixture: ComponentFixture<PaisProcendenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaisProcendenciaComponent, CrosslistComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisProcendenciaComponent);
    component = fixture.componentInstance;
    component.paisForm = new FormGroup({
      country: new FormControl('')
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit bloqueCambiar event on enCambioDeBloque', () => {
    spyOn(component.bloqueCambiar, 'emit');
    const event = { target: { value: '1' } } as unknown as Event;
    component.enCambioDeBloque(event);
    expect(component.bloqueCambiar.emit).toHaveBeenCalledWith(1);
  });
  it('should emit setValoresStoreEvent on setValoresStore', () => {
    spyOn(component.setValoresStoreEvent, 'emit');
    const form = new FormGroup({
      country: new FormControl('India')
    });
    component.setValoresStore(form, 'country', 'updateCountry');
    expect(component.setValoresStoreEvent.emit).toHaveBeenCalledWith({
      form,
      campo: 'country',
      metodoNombre: 'updateCountry'
    });
  });
  it('should call agregar method of crosslistComponent on Agregar todos button click', () => {
    component.crosslistComponent = jasmine.createSpyObj('CrosslistComponent', ['agregar']);
    component.campoDeBotones[0].funcion();
    expect(component.crosslistComponent.agregar).toHaveBeenCalledWith('t');
  });
  
  it('should call agregar method of crosslistComponent on Agregar selección button click', () => {
    component.crosslistComponent = jasmine.createSpyObj('CrosslistComponent', ['agregar']);
    component.campoDeBotones[1].funcion();
    expect(component.crosslistComponent.agregar).toHaveBeenCalledWith('');
  });
  
  it('should call quitar method of crosslistComponent on Restar selección button click', () => {
    component.crosslistComponent = jasmine.createSpyObj('CrosslistComponent', ['quitar']);
    component.campoDeBotones[2].funcion();
    expect(component.crosslistComponent.quitar).toHaveBeenCalledWith('');
  });
  
  it('should call quitar method of crosslistComponent on Restar todos button click', () => {
    component.crosslistComponent = jasmine.createSpyObj('CrosslistComponent', ['quitar']);
    component.campoDeBotones[3].funcion();
    expect(component.crosslistComponent.quitar).toHaveBeenCalledWith('t');
  });
});