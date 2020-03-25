/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ValendourComponent } from './Valendour.component';

describe('ValendourComponent', () => {
  let component: ValendourComponent;
  let fixture: ComponentFixture<ValendourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValendourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValendourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
