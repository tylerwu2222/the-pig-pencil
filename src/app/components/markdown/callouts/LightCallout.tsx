import React from 'react';
import { PropsWithChildren } from 'react';

export default function LightCallout({children}:PropsWithChildren) {
  return (
    <div className='px-5 py-1 bg-zinc-200 text-sm italic rounded-sm'>{children}</div>
  )
}
