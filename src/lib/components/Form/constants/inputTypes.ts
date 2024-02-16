import TextInput from '../Input/TextInput.svelte';
import Password from '../Input/Password.svelte';
import Number from '../Input/NumberInput.svelte';
import TextArea from '../Input/TextArea.svelte';
import TextBox from '../Input/TextBox.svelte';
import Select from '../Input/Select.svelte';
import Radio from '../Input/Radio.svelte';
import Toggle from '../Input/Toggle.svelte';
import Checkbox from '../Input/Checkbox.svelte';
import Multicheckbox from '../Input/Multicheckbox.svelte';
import FileUpload from '../Input/FileUpload.svelte';
import DateInput from '../Input/DateInput.svelte';
import DatePicker from '../Input/DatePicker.svelte';
import DateRangePicker from '../Input/DateRangePicker.svelte';
import DateRangePickerDual from '../Input/DateRangePickerDual.svelte';
import DateRangeInput from '../Input/DateRangeInput.svelte';

import type { InputType } from '../types/InputType.js';

//TODO: use this later(?)
enum ValidInputTypes {
	TextInput,
	Password,
	Number,
	TextArea,
	TextBox,
	Select,
	Radio,
	Toggle,
	Checkbox,
	Multicheckbox,
	FileUpload,
	DateInput,
	DatePicker,
	DateRangePicker,
	DateRangePickerDual,
	DateRangeInput
}

// TODO: find out what is going on here!?
export const inputTypes: InputType = {
	TextInput,
	Password,
	Number,
	TextArea,
	TextBox,
	Select,
	Radio,
	Toggle,
	Checkbox,
	Multicheckbox,
	FileUpload,
	DateInput,
	DatePicker,
	DateRangePicker,
	DateRangePickerDual,
	DateRangeInput
};
