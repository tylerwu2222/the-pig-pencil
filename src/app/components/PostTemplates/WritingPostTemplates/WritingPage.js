import React, { useState, useEffect } from 'react'

import { HeaderTypography, SubheaderTypography, BylineTypography } from '../../StyledComponents/StyledComponents';

import Scrollspy, { ScrollspyHeader } from '../../Modules/Scrollspy/Scrollspy';

import '../styles/article.css';

import Markdown from 'markdown-to-jsx';
import { MDXProvider } from '@mdx-js/react';

export default function WritingPage({
    section,
    postData
}) {
    const [articleMDX, setArticleMDX] = useState('');
    const [articleComponents, setArticleComponents] = useState({});
    const [articleComponentOverrides, setArticleComponentOverrides] = useState({});
    const [scrollspyIncluded, setScrollspyIncluded] = useState(false);

    // dynamically updates scrollspy headers based on section-titles
    const updateScrollspyHeaders = (articleMDX) => {
        console.log('updating ss head');
        if (articleMDX != '') {
            const headerElements = document.querySelectorAll('.presHeader');
            console.log('header elts', headerElements);
            headerElements.forEach(function (elt, i) {
                elt.innerText = postData.SectionTitles[i];
                elt.setAttribute('id', 'section' + String(i));
            });
        }
    };


    // import article
    const importArticle = async () => {
        const { FileName, Images = null, HasScrollspy = false, HasImageModal = false } = postData;

        try {
            // check if scrollspy headers need to be updated
            let articleComponentsObject = {};
            let ArticleComponentOverridesObject = {};

            if (HasScrollspy) {
                setScrollspyIncluded(true);
                articleComponentsObject['ScrollspyHeader'] = ScrollspyHeader;
                setArticleComponents(articleComponentsObject);
                ArticleComponentOverridesObject['ScrollspyHeader'] = {
                    component: ScrollspyHeader,
                };
                setArticleComponentOverrides(ArticleComponentOverridesObject)
            }
            // import article mdx
            const mdxModule = await import(`../../../posts/${section}/${postData.FileNameNoExt}/${FileName}`);
            const mdxDefault = mdxModule.default;
            // necessary to import mdx if not using mdx-js loader
            fetch(mdxDefault)
                .then(res => res.text())
                .then(text => {
                    // clean text
                    const content = text.split('---')[2];
                    setArticleMDX(content);
                });

            // setArticleMDX(mdxContent);
            // import necessary styles
            import(`../styles/${section}.css`)
            
        } catch (error) {
            console.error(`Error importing module ${FileName}:`, error);
        }
    };

    // VERY HACKY SOLUTION: remove frontmatter from DOM after loaded.
    // remove once we figure out how to preprocess away frontmatter
    // const removeFrontmatter = () => {
    //     // const withoutFrontmatter = articleMDX.replace(/^---.*?---/s, '');
    //     // console.log('MDX without frontmatter:', withoutFrontmatter);
    //     // console.log('removing frontmatter');
    //     const hrElements = document.querySelectorAll('hr');
    //     // console.log('hr elements', hrElements);
    //     // Check if there are at least two <hr> elements
    //     if (hrElements.length >= 2) {
    //         // Find the range of nodes between the first two <hr> elements
    //         // const startNode = hrElements[0].nextSibling;
    //         const startNode = hrElements[0];
    //         const endNode = hrElements[1].nextSibling;

    //         // Remove nodes between the first two <hr> elements
    //         let currentNode = startNode;
    //         while (currentNode && currentNode !== endNode) {
    //             const nextNode = currentNode.nextSibling;
    //             currentNode.parentNode.removeChild(currentNode);
    //             currentNode = nextNode;
    //         }
    //     }
    // };

    // fetch text from mdx file
    useEffect(() => {
        // console.log('importing article');
        importArticle();
    }, [postData]);

    // set scrollspy headers when scrollspy status changes OR article loaded
    useEffect(() => {
        console.log('ss included?', scrollspyIncluded);
        if (scrollspyIncluded) {
            console.log('setting scrollspy headers')
            updateScrollspyHeaders(articleMDX);
        }
    }, [postData, scrollspyIncluded, articleMDX, articleComponents]);

    // remove front matter when article MDX loads
    // useEffect(() => {
    //     removeFrontmatter();
    //   }, [articleMDX]);

    return (
        <div className='articleContainer'>
            {postData.SectionTitles ? <Scrollspy sectionTitles={postData.SectionTitles} /> : <></>}
            {/* title + byline area */}
            <div className='articleHeaderSection'>
                <div className='articleTitleContainer'>
                    <HeaderTypography>{postData.Title}</HeaderTypography>
                </div>
                <div className='articleCaptionContainer'>
                    <SubheaderTypography>{postData.Caption}</SubheaderTypography>
                </div>
                <div className='articleAuthorsContainer'>
                    {
                        postData.Author.map((author, i) => {
                            return (<span>
                                <a href={postData.AuthorURL[i]} target="_blank">
                                    <BylineTypography>{author}</BylineTypography>
                                </a>
                            </span>)
                        })
                    }
                </div>
                <div className='articleCaptionContainer'>
                    <BylineTypography>{postData.Date}</BylineTypography>
                </div>
                <div className='articleCaptionContainer'>
                    <BylineTypography>Read time: {postData.ReadingTime}</BylineTypography>
                </div>
            </div>

            {/* image area */}
            <div className='outerArticleImageContainer'>
                <div className='articleImageContainer'>
                    <img
                        src={'/img/thumbnails/' + section + '_thumbnails/' + postData.Thumbnail}
                        className='articleMainImg'
                        alt='featureImage'></img>
                    {postData.imageAttribution ? <div className='articleImageAttributionContainer'>
                        <BylineTypography>{postData.imageAttribution}</BylineTypography>
                    </div> : <></>}
                </div>
            </div>

            {/* content area */}
            <div className="articleContent">
                {/* provides imports (modules/images) to article /> */}
                <MDXProvider
                    components={articleComponents}
                >
                    {/* MDX --> JS article content */}
                    <Markdown
                        options={{
                            overrides: articleComponentOverrides,
                        }}
                    >{articleMDX}</Markdown>

                </MDXProvider>
            </div>
            {/* about area */}
            <div className="articleContent"></div>
        </div >
    )
}
