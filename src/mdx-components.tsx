import type { MDXComponents } from 'mdx/types'
import { ScrollspyHeader } from './app/components/Scrollspy/Scrollspy'


export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Scrollspy,
    ScrollspyHeader
  }
}