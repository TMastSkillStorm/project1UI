import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseManagerComponent } from './warehouse-manager.component';

describe('WarehouseManagerComponent', () => {
  let component: WarehouseManagerComponent;
  let fixture: ComponentFixture<WarehouseManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseManagerComponent]
    });
    fixture = TestBed.createComponent(WarehouseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
