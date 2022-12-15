import Link from 'next/link';
import React from 'react';

const LinkWrapper = ({
  children,
  href,
  isDisabled,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  isDisabled: boolean;
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
