/* eslint-disable dot-notation */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AduaneroComponent } from './aduanero.component';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';

fdescribe('AduaneroComponent', () => {
  let component: AduaneroComponent;
  let fixture: ComponentFixture<AduaneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,AduaneroComponent],
      providers: [FormBuilder],
      declarations: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AduaneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.preOperativeForm).toBeDefined();
    expect(component.preOperativeForm.controls['authorizationIVAIEPS']).toBeDefined();
  });

  it('should open and close the modify modal', () => {
    component.modifyModal = new ElementRef(document.createElement('div'));
    component.modalInstance = new Modal(component.modifyModal.nativeElement);
    spyOn(component.modalInstance, 'show');
    spyOn(component.modalInstance, 'hide');

    component.openModifyModal();
    expect(component.modalInstance.show).toHaveBeenCalled();

    component.closeModifyModal();
    expect(component.modalInstance.hide).toHaveBeenCalled();
  });

  it('should open and close the instalaciones modal', () => {
    component.instalacionesModal = new ElementRef(document.createElement('div'));
    component.modalInstanceInstaciones = new Modal(component.instalacionesModal.nativeElement);
    spyOn(component.modalInstanceInstaciones, 'show');
    spyOn(component.modalInstanceInstaciones, 'hide');

    component.openInstacionesModal();
    expect(component.modalInstanceInstaciones.show).toHaveBeenCalled();
  });

  it('should update pagination correctly', () => {
    component.fullEstablecimientoBodyData = Array(10).fill({}); // Mock data
    component.itemsPerPage = 5;
    component.currentPage = 1;
    component.updatePagination();
    expect(component.establecimientoBodyData.length).toBe(5);
  });

  it('should change the page correctly', () => {
    component.fullEstablecimientoBodyData = Array(10).fill({});
    component.itemsPerPage = 5;
    component.onPageChange(2);
    expect(component.currentPage).toBe(2);
  });

  it('should update items per page correctly', () => {
    component.onItemsPerPageChange(10);
    expect(component.itemsPerPage).toBe(10);
    expect(component.currentPage).toBe(1);
  });
});
