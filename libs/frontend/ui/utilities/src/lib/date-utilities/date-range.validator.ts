import { FormGroup, ValidatorFn, Validators } from '@angular/forms';


export function datesRangeValidator(): ValidatorFn {
    return (form: FormGroup): Validators | null => {

        const start:Date = form.get("dateStartAt").value;

        const end:Date = form.get("dateEndAt").value;

        if (start && end) {
            const isRangeValid = (end.getTime() - start.getTime() > 0);

            return isRangeValid ? null : {promoPeriod:true};
        }

        return null;
    }
}
