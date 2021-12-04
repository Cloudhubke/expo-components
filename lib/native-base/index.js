import { keys } from 'lodash';
import { Root } from './basic/Root';
import { ToastContainer } from './basic/ToastContainer';

// Theme
export { ToastContainer as Toast, Root };

const mapPropsToStyleNames = (styleNames, props) => keys(props);

export { mapPropsToStyleNames };
