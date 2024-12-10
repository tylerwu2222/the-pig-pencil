import type { NextConfig } from "next";

import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  /* config options here */
  // pageExtensions: ['js', 'ts', 'tsx', 'md', 'mdx'], // Include MD and MDX extensions
  pageExtensions: ['js', 'ts', 'tsx', 'md', 'mdx'], // Include MD and MDX extensions
  experimental: {
    mdxRs: true
  }
};

const withMDX = createMDX({
  // add future markdown plugins here
  // e.g. syntax highlighting code blocks, footnotes, (check remark and rehype...)
})

export default withMDX(nextConfig);
