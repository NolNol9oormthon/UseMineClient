import Link from 'next/link';
import React from 'react';

const LinkWrapper = ({
  children,
  href,
  isDisabled,
  itemId,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  isDisabled: boolean;
  itemId?: number;
}) => {
  if (isDisabled) {
    return <>{children}</>;
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};
export default LinkWrapper;
