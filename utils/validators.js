import { validateEmail, required } from './utils/validators';

const isValid = validateEmail('test@example.com'); // true
const isNotEmpty = required('   '); // false