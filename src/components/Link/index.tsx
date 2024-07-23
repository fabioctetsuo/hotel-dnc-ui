import NextLink, { LinkProps as NextLinkProps } from "next/link";

type LinkProps = NextLinkProps & {
  children: React.ReactElement | string;
};

export const Link = (props: LinkProps) => (
  <NextLink {...props} className="text-main-brand-green-500 font-bold" />
);

export default Link;
