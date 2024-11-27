// import './DataPage.css'
import { lazy, Suspense } from "react";

const DataPageJS = (
    {
        postData,
        eject = true
    }
    // { fileName = 'fileName', fileNameNoExt = 'fileNameNoExt', title = 'title', author = 'author', date = 'date', caption = 'caption' }
) => {
    const jsSource = postData.FileNameNoExt + '/' + postData.FileNameNoExt + '.js';

    const PageContent = lazy(() => import('../../../posts/data/' + jsSource));

    let dataPage;
    // default wrapper + style
    if (eject == false) {
        dataPage = <div className='containerBottom'>
            <div className='container-narrow'>
                <div className='title-author-div'>
                    <h1>{postData.Title}</h1>
                    <i className='post-byline'>{postData.Author} - {postData.Date}</i>
                </div>
                <div className='img-caption-div'>
                    <img className={'post-main-img'} src={'/img/thumbnails/data_thumbnails/' + postData.FileNameNoExt + '.png'} alt={postData.FileNameNoExt + '-thumbnail'}></img>
                    <i className={'post-main-caption'}>{postData.Caption}</i>
                </div>
            </div>
            <Suspense>
                <PageContent page={postData.FileNameNoExt} />
            </Suspense>
        </div>
    }
    // leave full styling to page css
    else {
        dataPage = <Suspense>
            <PageContent
                postData={postData}
            />
        </Suspense>
    }

    return dataPage;
};

export default DataPageJS;