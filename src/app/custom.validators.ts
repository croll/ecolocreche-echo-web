import {FormControl} from '@angular/forms';

export class CustomValidators {

    static frenchDate(control: FormControl): any {
      let frenchDatePattern = /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}$/;

      if (!control.value.match(frenchDatePattern))
        return { "frenchDate": true };

        return null;
    }
}
