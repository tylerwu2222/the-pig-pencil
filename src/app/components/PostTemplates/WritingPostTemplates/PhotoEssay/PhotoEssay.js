import { lazy, Suspense } from "react";
import { get_component_name } from "../../../NavBar/NavBar";

const PhotoEssay = ({ fileName }) => {
    const componentName = get_component_name(fileName);
    const jsSource = componentName + '/' + componentName;
    const PageContent = lazy(() => import('../../../Posts/WritingPosts/' + jsSource));
    console.log('pageContent', PageContent);

    return (
        <div id="berkeley-nature-div">
            <Suspense fallback={<div>Loading...</div>}>
                <p>{fileName}</p>
                <img className={'post-main-img'} src={'/img/thumbnails/data_thumbnails/' + fileName + '.png'} alt={componentName + '-thumbnail'}></img>
                <PageContent page={componentName} />
            </Suspense>
        </div>
    )
};

export default PhotoEssay;