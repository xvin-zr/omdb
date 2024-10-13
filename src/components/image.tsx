import { ComponentProps } from 'react';

export default function Image(props: ComponentProps<'img'>) {
  if (!props.src || props.src === 'N/A')
    return (
      <div>
        <p>Image not unavailable.</p>
      </div>
    );

  return <img {...props} />;
}
