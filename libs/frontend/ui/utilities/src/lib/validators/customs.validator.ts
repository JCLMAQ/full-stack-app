import { HttpClient } from '@angular/common/http';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, map } from 'rxjs';

/*

From: https://itnext.io/empowering-angular-forms-40-handcrafted-custom-validators-for-precision-2023-0951cc0a1180
Below are 40 custom validators:

1. **Email Domain Validator:** This validator checks if an email address belongs to a specific domain. It ensures that the part after the “@” symbol in the email address matches a predetermined domain, often used for domain-specific registration or login requirements.
2. **Password Strength Validator:** This validator checks for strong password criteria, which typically includes a combination of uppercase and lowercase letters, numbers, special characters, and a minimum length. It helps ensure that users create secure passwords.
3. **Phone Number Validator:** Phone number validation verifies that a given input follows a specific phone number format, including country codes, area codes, and a defined number of digits. It helps maintain consistent phone number data.
4. **URL Validator:** This validator ensures that a field contains a valid URL. It checks if the input follows the correct URL format, including the scheme (http, https), domain, and optional path.
5. **Date Format Validator:** This validator verifies if a date is in a specific format, such as MM/DD/YYYY or YYYY-MM-DD. It ensures that date inputs conform to a consistent format.
6. **Credit Card Validator:** Credit card validation checks if a credit card number is potentially valid by applying the Luhn algorithm and verifying its length. It’s used to prevent incorrect card numbers from being entered.
7. **Numeric Validator:** Numeric validation ensures that the input contains only numbers. It’s commonly used to validate fields like age or quantity.
8. **Alphanumeric Validator:** This validator checks if the input contains only alphanumeric characters (letters and numbers) and no special symbols.
9. **Regular Expression Validator:** Regular expression-based validation allows you to create custom validation rules using regular expressions. It’s highly flexible and can be used for various purposes, from email format validation to complex data patterns.
10. **Equality Validator:** This validator compares two fields for equality. It’s used to ensure that two inputs match each other, which is often used for password confirmation fields.
11. **Unique Value Validator:** The unique value validator checks if a value is unique within a specific context or database. It’s often used to prevent duplicate entries in a dataset, such as usernames or email addresses.
12. **Custom Error Message Validator:** This validator provides custom error messages to users based on specific validation rules. It’s useful for displaying user-friendly error messages that explain why their input is not valid.
13. **API-based Validator:** API-based validation involves making a request to an external API to validate input data. It can be used for various purposes, such as checking if an email address exists or verifying user information.
14. **Range Validator:** Range validation ensures that a value falls within a specific range, such as verifying that a user’s age is within a minimum and maximum acceptable limit.
15. **Conditional Validator:** Conditional validation applies rules based on specific conditions. For instance, it can require certain input only if other criteria are met.
16. **File Type Validator:** File type validation checks the format of uploaded files to ensure they match accepted file types (e.g., image files, documents, etc.).
17. **File Size Validator:** This validator ensures that the file size of an upload is within a specified limit, preventing the submission of excessively large files.
18. **Forbidden Words Validator:** Forbidden words validation checks for specific words that are not allowed in the input, often used to prevent offensive or inappropriate content.
19. **Custom Character Set Validator:** Custom character set validation allows you to specify a set of allowed characters and ensures that the input adheres to this custom character set.
20. **CAPTCHA Validator**: CAPTCHA-like validation involves solving challenges, such as image recognition or puzzles, to confirm that the input is from a human user and not a bot.
21. **IBAN Validator:** International Bank Account Number (IBAN) validation checks if a given IBAN conforms to the international standard for bank account numbers.
22. **VIN Validator:** Vehicle Identification Number (VIN) validation verifies the format and structure of a VIN, ensuring it matches the standard for vehicle identification.
23. **Color Code Validator:** Color code validation ensures that input matches valid color representations, such as HEX, RGB, or HSL formats.
24. **ISBN Validator:** International Standard Book Number (ISBN) validation checks if a given ISBN conforms to the international standard for book identification.
25. **Geolocation Validator:** Geolocation validation verifies latitude and longitude coordinates to ensure they are within the valid range and format.
26. **Slug Validator:** URL slug validation checks if a URL-friendly version of text (often used for article titles) conforms to URL slug standards and is unique within a context.
27. **Currency Validator:** Currency format validation ensures that monetary amounts are expressed in the correct format with proper symbols and decimal places.
28. **IPv4 Validator:** IPv4 address validation checks if an input is a valid IPv4 address, verifying the four numerical segments and their ranges.
29. **IPv6 Validator:** IPv6 address validation ensures that an input is a valid IPv6 address, including its hexadecimal format and grouping.
30. **Time Format Validator:** Time format validation verifies if a time input adheres to a specific format, like 24-hour or 12-hour time.
31. **Age Validator:** Age validation checks if the input is a valid age (a positive integer), often used to ensure users meet age requirements for specific services or content.
32. **Gender Validator:** Gender input validation ensures that the provided gender conforms to specified options (e.g., male, female, non-binary) and prevents invalid entries.
33. **Username Validator:** Username validation checks if a username adheres to predefined rules, such as character limits or allowable characters.
34. **Address Validator:** Address validation verifies that an address follows a specific format and structure, helping to maintain accurate location data.
35. **Country Code Validator:** Country code validation ensures that an input conforms to recognized international country codes, like ISO 3166–1 alpha-2 codes.
36. **Passport Number Validator:** Passport number validation checks if a passport number adheres to a specific format and structure, often required for identification or travel purposes.
37. **Custom Pattern Validator:** Custom pattern validation allows you to define and apply unique validation patterns specific to your application’s needs.
38. **Postal Code Validator:** Postal code validation checks if a postal code matches the format and structure of a specific country’s postal code system.
39. **Username Availability Validator:** This validator checks the availability of a username during user registration to ensure it’s not already in use, helping prevent duplicate usernames.
40. **URL Slug Uniqueness Validator:** URL slug uniqueness validation ensures that URL slugs are unique within your application, preventing multiple pieces of content from having the same URL slug.
*/

// 1. Email Domain Validator: Checks if an email address belongs to a specific domain

function emailDomainValidator(domain: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value as string;
    if (email.endsWith(`@${domain}`)) {
      return null; // Validation passed; email has the expected domain.
    } else {
      return { 'emailDomain': true }; // Validation failed; email does not have the expected domain.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email, emailDomainValidator('example.com')]),
});
*/

// 2. Password Strength Validator: Check for strong password criteria

function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value as string;
    // Define your password strength criteria here.
    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (strongPasswordPattern.test(password)) {
      return null; // Validation passed; password meets the criteria.
    } else {
      return { 'passwordStrength': true }; // Validation failed; password is not strong enough.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  password: new FormControl('', [Validators.required, passwordStrengthValidator()]),
});
*/

// 3. Phone Number Validator: Validate phone numbers

function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneNumber = control.value as string;
    // Define your phone number validation criteria here.
    const phonePattern = /^[0-9]{10}$/;

    if (phonePattern.test(phoneNumber)) {
      return null; // Validation passed; phone number format is valid.
    } else {
      return { 'phoneNumber': true }; // Validation failed; phone number format is invalid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  phoneNumber: new FormControl('', [Validators.required, phoneNumberValidator()]),
});
*/

// 4. URL Validator: Ensure that a field contains a valid URL

function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const url = control.value as string;
    // Define your URL validation criteria here.
    const urlPattern = /^((http|https|ftp):\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;

    if (urlPattern.test(url)) {
      return null; // Validation passed; URL format is valid.
    } else {
      return { 'url': true }; // Validation failed; URL format is invalid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  website: new FormControl('', [Validators.required, urlValidator()]),
});
*/

// 5. Date Format Validator: Verify if a date is in a specific format

function dateFormatValidator(format: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = control.value as string;
    // Define your date format validation criteria here.
    const datePattern = /^\d{4}-\d{2}-\d{2}$/; // Example: YYYY-MM-DD

    if (datePattern.test(date)) {
      return null; // Validation passed; date format is valid.
    } else {
      return { 'dateFormat': true }; // Validation failed; date format is invalid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  birthDate: new FormControl('', [Validators.required, dateFormatValidator('YYYY-MM-DD')]),
});
*/

// 6. Credit Card Validator: Validate credit card numbers

function creditCardValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cardNumber = control.value as string;
    // Define your credit card validation criteria here.
    const cardPattern = /^4[0-9]{12}(?:[0-9]{3})?$/; // Example: Visa card

    if (cardPattern.test(cardNumber)) {
      return null; // Validation passed; credit card format is valid.
    } else {
      return { 'creditCard': true }; // Validation failed; credit card format is invalid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  cardNumber: new FormControl('', [Validators.required, creditCardValidator()]),
});
*/

// 7. Numeric Validator: Ensure that the input contains only numbers

function numericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    // Define your numeric validation criteria here.
    const numericPattern = /^\d+$/;

    if (numericPattern.test(value)) {
      return null; // Validation passed; the input contains only numbers.
    } else {
      return { 'numeric': true }; // Validation failed; the input contains non-numeric characters.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  quantity: new FormControl('', [Validators.required, numericValidator()]),
});
*/

// 8. Alphanumeric Validator: Validate alphanumeric characters

function alphanumericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    // Define your alphanumeric validation criteria here.
    const alphanumericPattern = /^[a-zA-Z0-9]+$/;

    if (alphanumericPattern.test(value)) {
      return null; // Validation passed; the input contains only alphanumeric characters.
    } else {
      return { 'alphanumeric': true }; // Validation failed; the input contains non-alphanumeric characters.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  username: new FormControl('', [Validators.required, alphanumericValidator()]),
});
*/

// 9. Regular Expression Validator: Create custom regex-based validation

function customRegexValidator(pattern: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (pattern.test(value)) {
      return null; // Validation passed; the input matches the custom regex pattern.
    } else {
      return { 'customRegex': true }; // Validation failed; the input does not match the pattern.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  customField: new FormControl('', [Validators.required, customRegexValidator(/^ABC\d{3}$/)]),
});
*/

// 10. Equality Validator: Compare two fields for equality

function equalityValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const otherControl = control.parent?.get(controlName);

    if (otherControl && value !== otherControl.value) {
      return { 'equality': true }; // Validation failed; the two fields are not equal.
    } else {
      return null; // Validation passed; the two fields are equal.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  password: new FormControl('', [Validators.required]),
  confirmPassword: new FormControl('', [Validators.required, equalityValidator('password')]),
});
*/

// 11. Unique Value Validator: Check if a value is unique

function uniqueValueValidator(existingValues: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (existingValues.includes(value)) {
      return { 'uniqueValue': true }; // Validation failed; the value is not unique.
    } else {
      return null; // Validation passed; the value is unique.
    }
  };
}

/* Usage in a FormGroup
const existingValues = ['john.doe', 'jane.smith', 'admin'];
const form = new FormGroup({
  username: new FormControl('', [Validators.required, uniqueValueValidator(existingValues)]),
});
*/

// 12. Custom Error Message Validator: Provide custom error messages

function customErrorMessageValidator(errorMessage: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return { 'customErrorMessage': errorMessage }; // Always returns the specified custom error message.
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  customField: new FormControl('', [Validators.required, customErrorMessageValidator('This field is required.')]),
});
*/

// 13. API-based Validator: Validate against an API endpoint

function apiValidator(http: HttpClient, endpoint: string): ValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const value = control.value as string;

    return http.get<boolean>(`${endpoint}/${value}`).pipe(map((response) => {
      if (response) {
        return null; // Validation passed; the value is valid according to the API.
      } else {
        return { 'apiValidation': true }; // Validation failed; the value is not valid according to the API.
      }
    }));
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  customField: new FormControl('', [Validators.required, apiValidator(http, '/api/validation-endpoint')]),
});
*/

// 14. Range Validator: Ensure a value is within a specific range

function rangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = +control.value; // Convert to a number.

    if (value >= min && value <= max) {
      return null; // Validation passed; the value is within the specified range.
    } else {
      return { 'rangeValidation': true }; // Validation failed; the value is outside the range.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  age: new FormControl('', [Validators.required, rangeValidator(18, 100)]),
});
*/

// 15. Conditional Validator: Apply validation conditionally

function conditionalValidator(dependentControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const dependentControl = control.parent?.get(dependentControlName);

    if (dependentControl && dependentControl.value === 'specificValue' && !value) {
      return { 'conditionalValidation': true }; // Validation failed based on the condition.
    } else {
      return null; // Validation passed based on the condition.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  status: new FormControl('specificValue'),
  additionalInfo: new FormControl('', [conditionalValidator('status')]),
});
*/

// 16. File Type Validator: Validate file types for file uploads

function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File;
    if (file) {
      const fileType = file.type;
      if (allowedTypes.includes(fileType)) {
        return null; // Validation passed; the file type is allowed.
      }
    }
    return { 'fileTypeValidation': true }; // Validation failed; the file type is not allowed.
  };
}

/* Usage in a FormGroup (for file input)
const form = new FormGroup({
  file: new FormControl(null, [Validators.required, fileTypeValidator(['image/jpeg', 'image/png'])]),
});
*/

// 17. File Size Validator: Ensure file size is within a specified limit

function fileSizeValidator(maxSizeInBytes: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File;
    if (file && file.size <= maxSizeInBytes) {
      return null; // Validation passed; file size is within the specified limit.
    } else {
      return { 'fileSizeValidation': true }; // Validation failed; file size exceeds the limit.
    }
  };
}

/* Usage in a FormGroup (for file input)
const maxSize = 1024 * 1024; // 1 MB
const form = new FormGroup({
  file: new FormControl(null, [Validators.required, fileSizeValidator(maxSize)]),
});
*/

// 18. Forbidden Words Validator: Check for specific words

function forbiddenWordsValidator(forbiddenWords: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const foundForbiddenWords = forbiddenWords.filter(word => value.includes(word));

    if (foundForbiddenWords.length === 0) {
      return null; // Validation passed; no forbidden words found.
    } else {
      return { 'forbiddenWords': foundForbiddenWords }; // Validation failed; forbidden words found.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  description: new FormControl('', [Validators.required, forbiddenWordsValidator(['spam', 'inappropriate'])]),
});
*/

// 19. Custom Character Set Validator: Validate against a custom character set

function customCharacterSetValidator(characterSet: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (characterSet.test(value)) {
      return null; // Validation passed; input matches the custom character set.
    } else {
      return { 'customCharacterSet': true }; // Validation failed; input does not match the character set.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  customField: new FormControl('', [Validators.required, customCharacterSetValidator(/^[\w\-]+$/)]),
});
*/

// 20. CAPTCHA Validator: Implement CAPTCHA-like validation

function captchaValidator(captchaInput: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const userInput = control.value as string;

    if (userInput === captchaInput) {
      return null; // Validation passed; the user's input matches the expected CAPTCHA input.
    } else {
      return { 'captchaValidation': true }; // Validation failed; user input does not match the expected CAPTCHA input.
    }
  };
}

/* Usage in a FormGroup
const expectedCaptcha = generateRandomCaptcha(); // You would generate the CAPTCHA value.
const form = new FormGroup({
  captcha: new FormControl('', [Validators.required, captchaValidator(expectedCaptcha)]),
});
*/

// 21. IBAN Validator: Validate International Bank Account Numbers

// import IBAN from 'iban';

// function ibanValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const iban = control.value as string;

//     if (IBAN.isValid(iban)) {
//       return null; // Validation passed; the IBAN is valid.
//     } else {
//       return { 'ibanValidation': true }; // Validation failed; the IBAN is not valid.
//     }
//   };
// }

/* Usage in a FormGroup
const form = new FormGroup({
  iban: new FormControl('', [Validators.required, ibanValidator()]),
});
*/

// 22. VIN Validator: Validate Vehicle Identification Numbers

function vinValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const vin = control.value as string;
    // Define your VIN validation criteria here.
    const vinPattern = /^[A-HJ-NPR-Z0-9]{17}$/;

    if (vinPattern.test(vin)) {
      return null; // Validation passed; the VIN is valid.
    } else {
      return { 'vinValidation': true }; // Validation failed; the VIN is not valid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  vin: new FormControl('', [Validators.required, vinValidator()]),
});
*/

// 23. **Color Code Validator:** Validate color codes (HEX, RGB, etc.)

function isbnValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isbn = control.value as string;
    // Define your ISBN validation criteria here.
    const isbnPattern = /^(?:\d{10}|\d{13})$/;

    if (isbnPattern.test(isbn)) {
      return null; // Validation passed; the ISBN is valid.
    } else {
      return { 'isbnValidation': true }; // Validation failed; the ISBN is not valid.
    }
  };
}

/*Usage in a FormGroup
const form = new FormGroup({
  isbn: new FormControl('', [Validators.required, isbnValidator()]),
});
*/

// 25. Geolocation Validator: Validate latitude and longitude coordinates

function geolocationValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    // Define your geolocation validation criteria here.
    const geolocationPattern = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/;

    if (geolocationPattern.test(value)) {
      return null; // Validation passed; the geolocation coordinates are valid.
    } else {
      return { 'geolocationValidation': true }; // Validation failed; the coordinates are not valid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  coordinates: new FormControl('', [Validators.required, geolocationValidator()]),
});
*/

// 26. Slug Validator: Validate URL slugs

function slugValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const slug = control.value as string;
    // Define your slug validation criteria here.
    const slugPattern = /^[a-z0-9-]+$/;

    if (slugPattern.test(slug)) {
      return null; // Validation passed; the slug is valid.
    } else {
      return { 'slugValidation': true }; // Validation failed; the slug is not valid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  slug: new FormControl('', [Validators.required, slugValidator()]),
});
*/

// 27. Currency Validator: Validate currency format

function currencyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currency = control.value as string;
    // Define your currency validation criteria here.
    const currencyPattern = /^\d+(\.\d{1,2})?$/;

    if (currencyPattern.test(currency)) {
      return null; // Validation passed; the currency format is valid.
    } else {
      return { 'currencyValidation': true }; // Validation failed; the currency format is not valid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  amount: new FormControl('', [Validators.required, currencyValidator()]),
});
*/

// 28. IPv4 Validator: Validate IPv4 addresses

function ipv4Validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const ipAddress = control.value as string;
    // Define your IPv4 validation criteria here.
    const ipv4Pattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

    if (ipv4Pattern.test(ipAddress)) {
      return null; // Validation passed; the IPv4 address is valid.
    } else {
      return { 'ipv4Validation': true }; // Validation failed; the IPv4 address is not valid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  ipAddress: new FormControl('', [Validators.required, ipv4Validator()]),
});
*/

// 29. IPv6 Validator: Validate IPv6 addresses

function ipv6Validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const ipAddress = control.value as string;
    // Define your IPv6 validation criteria here.
    const ipv6Pattern = /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/;

    if (ipv6Pattern.test(ipAddress)) {
      return null; // Validation passed; the IPv6 address is valid.
    } else {
      return { 'ipv6Validation': true }; // Validation failed; the IPv6 address is not valid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  ipAddress: new FormControl('', [Validators.required, ipv6Validator()]),
});
*/

// 30. Time Format Validator: Verify if a time is in a specific format

function timeFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const time = control.value as string;
    // Define your time format validation criteria here.
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (timePattern.test(time)) {
      return null; // Validation passed; the time format is valid.
    } else {
      return { 'timeFormatValidation': true }; // Validation failed; the time format is not valid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  appointmentTime: new FormControl('', [Validators.required, timeFormatValidator()]),
});
*/

// 31. Age Validator: Check if the input is a valid age

function ageValidator(minAge: number, maxAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const age = control.value as number;

    if (age >= minAge && age <= maxAge) {
      return null; // Validation passed; the age is within the specified range.
    } else {
      return { 'ageValidation': true }; // Validation failed; the age is outside the range.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  userAge: new FormControl('', [Validators.required, ageValidator(18, 100)]),
});
*/

// 32. Gender Validator: Validate gender input

function genderValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const gender = control.value as string;
    // Define your gender validation criteria here.
    const validGenders = ['male', 'female', 'other'];

    if (validGenders.includes(gender.toLowerCase())) {
      return null; // Validation passed; the gender input is valid.
    } else {
      return { 'genderValidation': true }; // Validation failed; the gender input is not valid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  userGender: new FormControl('', [Validators.required, genderValidator()]),
});
*/

// 33. Username Validator: Validate usernames

function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const username = control.value as string;
    // Define your username validation criteria here.
    const usernamePattern = /^[a-zA-Z0-9_]+$/;

    if (usernamePattern.test(username)) {
      return null; // Validation passed; the username is valid.
    } else {
      return { 'usernameValidation': true }; // Validation failed; the username is not valid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  username: new FormControl('', [Validators.required, usernameValidator()]),
});
*/

// 34. Address Validator: Validate addresses

function addressValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const address = control.value as string;
    // Define your address validation criteria here.
    const addressPattern = /^[a-zA-Z0-9\s,.-]+$/;

    if (addressPattern.test(address)) {
      return null; // Validation passed; the address is valid.
    } else {
      return { 'addressValidation': true }; // Validation failed; the address is not valid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  userAddress: new FormControl('', [Validators.required, addressValidator()]),
});
*/

// 35. Country Code Validator: Validate country codes

function countryCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const countryCode = control.value as string;
    // Define your country code validation criteria here.
    const validCountryCodes = ['US', 'CA', 'UK', 'DE', 'FR']; // Example valid country codes

    if (validCountryCodes.includes(countryCode.toUpperCase())) {
      return null; // Validation passed; the country code is valid.
    } else {
      return { 'countryCodeValidation': true }; // Validation failed; the country code is not valid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  userCountryCode: new FormControl('', [Validators.required, countryCodeValidator()]),
});
*/

// 36. Passport Number Validator: Validate passport numbers

function passportNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passportNumber = control.value as string;
    // Define your passport number validation criteria here.
    const passportPattern = /^[A-Z0-9<]{9}$/;

    if (passportPattern.test(passportNumber)) {
      return null; // Validation passed; the passport number is valid.
    } else {
      return { 'passportNumberValidation': true }; // Validation failed; the passport number is not valid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  userPassport: new FormControl('', [Validators.required, passportNumberValidator()]),
});
*/

// 37. Custom Pattern Validator: Implement any custom pattern validation

function customPatternValidator(pattern: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (pattern.test(value)) {
      return null; // Validation passed; the input matches the custom pattern.
    } else {
      return { 'customPatternValidation': true }; // Validation failed; the input does not match the pattern.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  customField: new FormControl('', [Validators.required, customPatternValidator(/your-custom-regex-pattern/)]),
});
*/

// 38. Postal Code Validator: Validate postal codes based on specific country formats, ensuring they adhere to the correct structure and patterns

function postalCodeValidator(countryCode: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const postalCode = control.value as string;
    // Define your postal code validation criteria based on the country code here.
    // Example: You can have different patterns for different countries.
    const postalCodePatterns: { [key: string]: RegExp } = {
      'US': /^\d{5}(-\d{4})?$/,
      'CA': /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
    };

    if (postalCodePatterns[countryCode] && postalCodePatterns[countryCode].test(postalCode)) {
      return null; // Validation passed; the postal code is valid for the specified country.
    } else {
      return { 'postalCodeValidation': true }; // Validation failed; the postal code is not valid.
    }
  };
}

/* Usage in a FormGroup
const form = new FormGroup({
  countryCode: new FormControl('US'), // You would set the country code dynamically.
  postalCode: new FormControl('', [Validators.required, postalCodeValidator(form.get('countryCode').value)]),
});
*/

// 39. Username Availability Validator: Check the availability of a username during user registration to ensure it’s not already in use

// import { UserService } from './user.service'; // Import your user service to check availability.

// function usernameAvailabilityValidator(userService: UserService): ValidatorFn {
//   return (control: AbstractControl): Promise<ValidationErrors | null> | null => {
//     const username = control.value as string;

//     return userService.checkUsernameAvailability(username).toPromise()
//       .then((isAvailable) => {
//         if (isAvailable) {
//           return null; // Validation passed; the username is available.
//         } else {
//           return { 'usernameAvailability': true }; // Validation failed; the username is not available.
//         }
//       });
//   };
// }

/* Usage in a FormGroup
const form = new FormGroup({
  username: new FormControl('', [Validators.required], usernameAvailabilityValidator(userService)),
});
*/

// 40. URL Slug Uniqueness Validator: Validate URL slugs to ensure they are unique within your application, preventing duplicate slugs for different content

// import { ContentService } from './content.service'; // Import your content service to check slug uniqueness.

// function slugUniquenessValidator(contentService: ContentService): ValidatorFn {
//   return (control: AbstractControl): Promise<ValidationErrors | null> | null => {
//     const slug = control.value as string;

//     return contentService.checkSlugUniqueness(slug).toPromise()
//       .then((isUnique) => {
//         if (isUnique) {
//           return null; // Validation passed; the slug is unique.
//         } else {
//           return { 'slugUniqueness': true }; // Validation failed; the slug is not unique.
//         }
//       });
//   };
// }

/*Usage in a FormGroup
const form = new FormGroup({
  slug: new FormControl('', [Validators.required], slugUniquenessValidator(contentService)),
});
*/
