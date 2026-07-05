import { ComponentType } from 'react';
import { IconBaseProps, IconType } from 'react-icons';

/**
 * react-icons v5 types every icon as `(props) => ReactNode`, which React 18's
 * types don't accept as a JSX component. The icons themselves are unchanged
 * at runtime, so this narrows the type back to what React 18 expects.
 */
const asIcon = (Icon: IconType): ComponentType<IconBaseProps> =>
  Icon as ComponentType<IconBaseProps>;

export default asIcon;
