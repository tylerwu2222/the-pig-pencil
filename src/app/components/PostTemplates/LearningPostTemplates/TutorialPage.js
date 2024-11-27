// import '../DataPostTemplates/DataPage.css'

import '../styles/article.css';
import '../styles/learning.css';
import { lazy, Suspense } from "react";
// import Scrollspy from '../../Modules/Scrollspy/Scrollspy';

const TutorialPage = ({ fileName = 'fileName', fileNameNoExt = 'fileNameNoExt', subFolder = '', title = 'title', author = 'author', date = 'date' }) => {
    let jsSource = fileNameNoExt + '/' + fileNameNoExt + '.js';
    if (subFolder != '') {
        jsSource = subFolder + '/' + jsSource;
    }
    console.log('jsSourceTut', jsSource);

    const PageContent = lazy(() => import('../../../posts/tutorial/' + jsSource));

    return (
        <div className='containerBottom'>
            {/* <Scrollspy id='scrollspyComponent' /> */}
            <div className='containerNarrow'>
                <div className='titleAuthorDiv'>
                    <h1>{title}</h1>
                    <i className='postByline'>By: {author}</i>
                    <i className='postByline'>Last updated: {date}</i>
                </div>
                <div className='imgCaptionDiv'>
                    <img
                        className='postMainImg'
                        src={'/img/thumbnails/tutorials_thumbnails/' + fileNameNoExt + '.png'}
                        alt={fileNameNoExt + 'Thumbnail'}>
                    </img>
                </div>

            </div>
            <Suspense>
                <PageContent page={fileNameNoExt} />
            </Suspense>
        </div>
    )
};

export default TutorialPage;