import React, { useState, useEffect, Suspense } from 'react'

import { HeaderTypography, SubheaderTypography, BylineTypography } from '../../StyledComponents/StyledComponents';

import Scrollspy, { ScrollspyHeader } from '../../Modules/Scrollspy/Scrollspy';

import ImageModal from '../../Modules/ImageModal/ImageModal.js';

// import Markdown from 'reactMarkdown';
import Markdown from 'markdown-to-jsx';
import { MDXProvider } from '@mdx-js/react';

import '../styles/data.css';
import '../styles/article.css';

export default function DataPage({
    section,
    postData
}) {
    const [articleMDX, setArticleMDX] = useState('');
    const [articleComponents, setArticleComponents] = useState({});
    const [articleComponentOverrides, setArticleComponentOverrides] = useState({});
    const [scrollspyIncluded, setScrollspyIncluded] = useState(false);

    // dynamically updates scrollspy headers based on sectionTitles
    const updateScrollspyHeaders = (articleMDX) => {
        console.log('in update SS function, articleMDX:', articleMDX);
        if (articleMDX != '') {
            const headerElements = document.querySelectorAll('.presHeader');
            // console.log('header elts', headerElements);
            headerElements.forEach(function (elt, i) {
                elt.innerText = postData.SectionTitles[i];
                elt.setAttribute('id', 'section' + String(i));
            });
        }
    };


    // import article components
    const articleImports = async () => {
        const { FileName, Images = null, Visuals = null, Styles = null, HasScrollspy = false, HasImageModal = false } = postData;

        try {
            // containers for article components
            let ArticleComponentObject = {};
            let ArticleComponentOverridesObject = {};

            // console.log('hasScrollspy', HasScrollspy);
            // check if scrollspy headers need to be updated
            if (HasScrollspy) {
                setScrollspyIncluded(true);
                ArticleComponentObject['ScrollspyHeader'] = ScrollspyHeader;
                ArticleComponentOverridesObject['ScrollspyHeader'] = {
                    component: ScrollspyHeader,
                };
            }

            // check if image modal included
            if (HasImageModal) {
                ArticleComponentObject['ImageModal'] = ImageModal;
                ArticleComponentOverridesObject['ImageModal'] = {
                    component: ImageModal,
                };
            }

            // import article mdx
            const mdxModule = await import(`../../../posts/${section}/${postData.FileNameNoExt}/${FileName}`);
            const mdxDefault = mdxModule.default;

            // necessary to import mdx if not using mdxJs loader
            fetch(mdxDefault)
                .then(res => res.text())
                .then(text => {
                    // clean text
                    const content = text.split('---')[2];
                    setArticleMDX(content);
                });

            // import visuals
            if (Visuals) {
                for (const v of Visuals) {
                    // console.log('v', v)
                    try {
                        const visual_import = await import(`../../../posts/data/${postData.FileNameNoExt}/visuals/${v}`);
                        const visual = visual_import.default;
                        if (!(Array.isArray(visual)) && !(typeof visual === 'object') && (visual !== null)) {
                            // const static_article = visual_import.default;

                            // filename standard for vis: UPPERCASE SVG
                            let visFileName;
                            if (v.startsWith('svg')) {
                                visFileName = v.split('.js')[0].toUpperCase()
                            }
                            else {
                                visFileName = v.split('.js')[0]
                            }
                            ArticleComponentObject[visFileName] = visual;
                            ArticleComponentOverridesObject[visFileName] = {
                                component: visual,
                            };
                            // console.log('visual import', visual);
                        }
                    }
                    catch (error) {
                        console.error(`Error with visual ${v}:`, error);
                    }
                };
            }

            // import dataStyles
            if (Styles) {
                for (const s of Styles) {
                    try {
                        await import(`../../../posts/data/${postData.FileNameNoExt}/${s}`);
                    }
                    catch (error) {
                        console.error(`Error with style ${s}:`, error);
                    }
                }
            }

            // console.log('ACO after vis', ArticleComponentObject);
            // update states
            setArticleComponents(ArticleComponentObject);
            setArticleComponentOverrides(ArticleComponentOverridesObject);
            // setArticleMDX(mdxContent);

            // import necessary styles
            import(`../styles/${section}.css`)

            // return objects
            return [ArticleComponentObject, ArticleComponentOverridesObject]
        } catch (error) {
            console.error(`Error importing module ${FileName}:`, error);
        }
    };

    // fetch text from mdx file
    useEffect(() => {
        // console.log('importing article');
        articleImports();
    }, [postData]);

    // set scrollspy headers when scrollspy status changes or article components updated
    useEffect(() => {
        console.log('update ss headers?')
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
            {postData.SectionTitles ? <div className='articleContent'>
                {/* provides imports (modules/images) to article /> */}
                {/* <Suspense fallback={<div>Loading...</div>}> */}
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
                {/* </Suspense> */}
            </div> :
                <></>
            }
            {/* about area */}
            <div className='articleContent'></div>
        </div >
    )
}
