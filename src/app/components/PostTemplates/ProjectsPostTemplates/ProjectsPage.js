// import '../DataPostTemplates/DataPage.css';

// import dataStyles from '../DataPostTemplates/DataPage.module.scss';
import '../styles/article.css';
// import './ProjectsPage.css'
import { lazy, Suspense } from "react";

// change to mdx article template
const ProjectsPage = ({ fileName = 'fileName', componentName = 'componentName', title = 'title', author = 'author', date = 'date', readingTime = 'readingTime' }) => {
    const jsSource = componentName + '/' + componentName;
    
    const PageContent = lazy(() => import('../../../posts/projects/' + jsSource));

    return (
        <div className='containerBottom'>
            <div className='containerNarrow'>
                <div className='titleAuthorDiv'>
                    <h1>{title}</h1>
                    <i className='postByline'>{author} - {date} | Reading time: {readingTime}</i>
                </div>
                <div className='imgCaptionDiv'>
                    <img className={'postMainImg'} src={'/img/thumbnails/projects_thumbnails/' + fileName + '.png'} alt={componentName + 'Thumbnail'}></img>
                    {/* <i className={'postMainCaption''>{caption}</i> */}
                </div>
            </div>
            <Suspense>
                <PageContent page={componentName} />
            </Suspense>
        </div>
    )
};

export default ProjectsPage;