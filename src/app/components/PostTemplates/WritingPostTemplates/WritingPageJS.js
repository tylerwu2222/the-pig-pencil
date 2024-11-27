import '../DataPostTemplates/DataPage.css';
import './WritingPage.css'
import { lazy, Suspense } from "react";

// change to mdx article template
const WritingPage = ({ fileName = 'fileName', componentName = 'componentName', title = 'title', author = 'author', date = 'date', readingTime = 'readingTime' }) => {
    const jsSource = componentName + '/' + componentName;
    
    const PageContent = lazy(() => import('../../Posts/WritingPosts/' + jsSource));

    return (
        <div className='containerBottom'>
            <div className='container-narrow'>
                <div className='title-author-div'>
                    <h1>{title}</h1>
                    <i className='post-byline'>{author} - {date} | Reading time: {readingTime}</i>
                </div>
                <div className='img-caption-div'>
                    <img className={'post-main-img'} src={'/img/thumbnails/writing_thumbnails/' + fileName + '.png'} alt={componentName + '-thumbnail'}></img>
                    {/* <i className={'post-main-caption'}>{caption}</i> */}
                </div>
            </div>
            <Suspense>
                <PageContent page={componentName} />
            </Suspense>
        </div>
    )
};

export default WritingPage;