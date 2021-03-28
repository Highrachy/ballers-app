import React from 'react';

export const Spacing = () => <>&nbsp;&nbsp;</>;
export const TextSeparator = () => (
  <>
    <Spacing /> | <Spacing />
  </>
);
export const LinkSeparator = () => (
  <span className="text-secondary">
    <TextSeparator />
  </span>
);
