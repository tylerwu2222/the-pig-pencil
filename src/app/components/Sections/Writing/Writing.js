// modules
import SectionTemplate from '../SectionTemplate/SectionTemplate.js';

// data
import writingPosts from '../../../post_data/writing_articles.json';


const Writing = () => {
    // render
    return (
        <SectionTemplate
            postData={writingPosts}
            section='Writing'
            contentType='articles'
        />
    )
};

export default Writing;