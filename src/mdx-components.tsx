import type { MDXComponents } from "mdx/types";
import { ScrollspyHeader } from "./app/components/Scrollspy/Scrollspy";
import { ComponentPropsWithoutRef } from "react";

// components
import Image from "next/image";
import Link from "next/link";
import ImageModal from "./app/components/modals/ImageModal/ImageModal";
import PDFIframe from "./app/components/pdf/PDFViewer/PDFIframe/PDFIframe";
import SearchInput from "./app/components/inputs/SearchInput/SearchInput";

// markdown
import LightCallout from "./app/components/markdown/callouts/LightCallout";
import HoverDefinitionText from "./app/components/markdown/hovertext/HoverDefinitionText";
import ClickDefinitionText from "./app/components/markdown/hovertext/ClickDefinitionText";
import UnderConstruction from "./app/posts/UnderConstruction";

// links
import GithubIcon from "./app/components/buttons/iconButtons/GithubIcon";
import WebsiteIcon from "./app/components/buttons/iconButtons/WebsiteIcon";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

// define topography styling tags...
const components: MDXComponents = {
  h1: (props: HeadingProps) => <h1 className="font-large fade-in" {...props} />,
  h2: (props: HeadingProps) => (
    <h2 className="mb-3 mt-8 font-medium text-gray-800" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="mb-3 mt-8 font-medium text-gray-800" {...props} />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => (
    <p className="leading-snug text-gray-800" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="list-decimal space-y-2 pl-5 text-gray-800" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="list-disc space-y-1 pl-5 text-gray-800" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = "text-blue-500 hover:text-blue-700";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  // code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
  //   const codeHTML = highlight(children as string);
  //   return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  // },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="border-l-3 ml-[0.075em] border-gray-300 pl-4 text-gray-700"
      {...props}
    />
  ),
};

// including components here will make components available to all MDX files throughout app
export function useMDXComponents(
  otherComponents: MDXComponents,
): MDXComponents {
  return {
    ...otherComponents,
    ...components,
    Image,
    ImageModal,
    PDFIframe,
    SearchInput,
    // Scrollspy, // included in individual [slug].tsx templates
    ScrollspyHeader,
    WebsiteIcon,
    GithubIcon,
    LightCallout,
    HoverDefinitionText,
    ClickDefinitionText,
    UnderConstruction
  };
}
