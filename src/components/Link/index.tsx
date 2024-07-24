import NextLink, { LinkProps as NextLinkProps } from "next/link";

type LinkProps = NextLinkProps & {
  children: React.ReactElement | string;
  className?: string;
};

export const Link = ({ className, ...props }: LinkProps) => (
  <NextLink
    {...props}
    className={`text-main-brand-green-500 font-medium ${className}`}
  />
);

export default Link;
