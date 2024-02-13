// import globalStyles from './styles/global.scss';

import TestComponent from './components/TestComponent/TestComponent.svelte';
import Icon from './components/Icon/Icon.svelte';

import Accordion from './components/Accordion/Accordion.svelte';
import Step from './components/Step/Step.svelte';
import Tab from './components/Tab/Tab.svelte';

import Button from './components/Buttons/General/Button.svelte';
import IconButton from './components/Buttons/IconButton/IconButton.svelte';
import CloseButton from './components/Buttons/Special/CloseButton/CloseButton.svelte';
import ToTopButton from './components/Buttons/Special/ToTopButton/ToTopButton.svelte';
import ToggleButton from './components/Buttons/ToggleButton/ToggleButton.svelte';
import ScrollableContainer from './components/ScrollableContainer/ScrollableContainer.svelte';

import Dialog from './components/Dialog/Dialog.svelte';
import Fullscreen from './components/Fullscreen/Fullscreen.svelte';
import Popupmenu from './components/Popupmenu/Popupmenu.svelte';
import Tooltip from './components/Tooltip/Tooltip.svelte';
import Chart from './components/Chart/Chart.svelte';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu.svelte';
import LoadingPage from './components/LoadingPage/LoadingPage.svelte';
import Modal from './components/Modal/Modal.svelte';
import Resizable from './components/Resizable/Resizable.svelte';
import RollingDigits from './components/RollingDigits/RollingDigits.svelte';

/* Inputs */
import { inputTypes } from './components/Form/constants/inputTypes.js';

import { createFormHandler } from './components/Form/formHandler/formHandler.js';

import Form from './components/Form/Form.svelte';
import InputGenerator from './components/Form/InputGenerator/InputGenerator.svelte';

import Checkbox from './components/Form/Input/Checkbox.svelte';
import DateInput from './components/Form/Input/DateInput.svelte';
import DatePicker from './components/Form/Input/DatePicker.svelte';
import DateRangeInput from './components/Form/Input/DateRangeInput.svelte';
import DateRangePicker from './components/Form/Input/DateRangePicker.svelte';
import DateRangePickerDual from './components/Form/Input/DateRangePickerDual.svelte';
import FileUpload from './components/Form/Input/FileUpload.svelte';
import Multicheckbox from './components/Form/Input/Multicheckbox.svelte';
import NumberInput from './components/Form/Input/NumberInput.svelte';
import Password from './components/Form/Input/Password.svelte';
import Radio from './components/Form/Input/Radio.svelte';
import Select from './components/Form/Input/Select.svelte';
import TextArea from './components/Form/Input/TextArea.svelte';
import TextBox from './components/Form/Input/TextBox.svelte';
import TextInput from './components/Form/Input/TextInput.svelte';
import Toggle from './components/Form/Input/Toggle.svelte';

import InputError from './components/Form/Input/InputError.svelte';
import InputLabel from './components/Form/Input/InputLabel.svelte';

export {
	// globalStyles,
	Accordion,
	Chart,
	Dialog,
	Fullscreen,
	Icon,
	Step,
	Tab,
	TestComponent,
	ScrollableContainer,
	Button,
	IconButton,
	CloseButton,
	ToTopButton,
	ToggleButton,
	inputTypes,
	Form,
	createFormHandler,
	InputGenerator,
	InputError,
	InputLabel,
	Checkbox,
	DateInput,
	DatePicker,
	DateRangeInput,
	DateRangePicker,
	DateRangePickerDual,
	FileUpload,
	Multicheckbox,
	NumberInput,
	Password,
	Popupmenu,
	Radio,
	Select,
	TextArea,
	TextBox,
	TextInput,
	Toggle,
	Tooltip,
	HamburgerMenu,
	LoadingPage,
	Modal,
	Resizable,
	RollingDigits
};
