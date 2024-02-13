import { formDataFeatureTest } from './formDataFeatureTest.js';
import { fileReaderFeatureTest } from './fileReaderFeatureTest.js';
import { dragFeatureTest } from './dragFeatureTest.js';

export const advancedFileUploadTests = () => {
	return formDataFeatureTest() && fileReaderFeatureTest() && dragFeatureTest();
};
