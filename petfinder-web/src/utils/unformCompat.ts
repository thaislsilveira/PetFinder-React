import React from 'react';
import { Form as UnformWebForm } from '@unform/web';
import { FormProps, FormHandles } from '@unform/core';

/**
 * @unform/web ships a Form.d.ts pre-compiled against an older @types/react,
 * which pins a stale prop list that no longer matches @types/react 18 and
 * makes TS treat a few phantom props (e.g. `placeholder`) as required on
 * <Form>. Re-typing the same runtime component against @unform/core's
 * FormProps (computed fresh against whatever @types/react is installed)
 * sidesteps that without touching node_modules.
 */
const Form = UnformWebForm as React.ForwardRefExoticComponent<
  FormProps & React.RefAttributes<FormHandles>
>;

export default Form;
