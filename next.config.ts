import type { NextConfig } from "next";

import createMDX from '@next/mdx';
// import { withMDX } from '@next/mdx';

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'ts', 'tsx', 'md', 'mdx'], // Include MD and MDX extensions
  experimental: {
    mdxRs: true
  }
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig);
