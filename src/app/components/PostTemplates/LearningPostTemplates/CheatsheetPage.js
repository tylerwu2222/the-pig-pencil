// import '../DataPostTemplates/DataPage.css'
import '../styles/article.css';
import '../styles/learning.css';

import { lazy, Suspense } from "react";
// import Scrollspy from '../../Modules/Scrollspy/Scrollspy';

const CheatsheetPage = ({ fileName = 'fileName', fileNameNoExt = 'fileNameNoExt', subFolder = '', title = 'title', author = 'author', date = 'date' }) => {
    let jsSource = fileNameNoExt + '/' + fileNameNoExt;
    if (subFolder != '') {
        jsSource = subFolder + '/' + jsSource;
    }
    const PageContent = lazy(() => import('../../../posts/cheatsheet/' + jsSource));

    return (
        <div className='containerBottom'>
            {/* <Scrollspy id='scrollspyComponent' /> */}
            <div className='container'>
                <div className='titleAuthorDiv'>
                    <h1>{title}</h1>
                    <i className='postByline'>By: {author}</i>
                    <i className='postByline'>Last updated: {date}</i>
                    {/* <img className={'postMainImg'} src={'/img/thumbnails/code_thumbnails/' + fileName + '.png'} alt={fileNameNoExt + 'Thumbnail''></img> */}
                </div>
            </div>
            <Suspense>
                <PageContent page={fileNameNoExt} />
            </Suspense>
        </div>
    )
};

export default CheatsheetPage;