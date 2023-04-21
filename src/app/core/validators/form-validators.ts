import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidators {

  constructor() { }

  percentage(field:string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {

      const getField: AbstractControl<any, any> | null = formGroup.get(field);

      if(!getField?.value) return null;

      const value = getField.value as number;
      
      if(value < 0) getField.setValue(0);
      if(value > 100) getField.setValue(100);

      return null;
    };
  }

}
