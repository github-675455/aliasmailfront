import { FormGroup } from '@angular/forms';

export default class Utils {
  static setErrorsInFormGroup(form: FormGroup, errors: any) {
    if (errors instanceof Array) {
      if (typeof errors[0] === 'object') {
        errors.forEach(error => {
          const formControl = form.get(error.field);
          if (formControl) {
            formControl.setErrors(
              {
                serverError: error.description
              }
            );
          }
        });
      }
    }
  }
}
