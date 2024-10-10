import { ComponentProps } from 'react';
import { navigate } from '../hooks/use-location';

type LinkProps = ComponentProps<'a'> & {
  to: string;
};
function Link({ to, className, ...props }: LinkProps) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    navigate(to);
    props.onClick?.(event);
  }

  return <a href={to} className={className} onClick={handleClick} {...props} />;
}

export default Link;
