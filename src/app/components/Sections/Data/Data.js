// modules
import SectionTemplate from '../SectionTemplate/SectionTemplate.js';

// data
// import dataPosts from '../../../site_data/posts/data_posts.json';
import dataPosts from '../../../post_data/data_articles.json';

const Data = () => {
    return (
        <SectionTemplate
            postData={dataPosts}
            section='Data'
            contentType='articles'
        />
    )
};

export default Data;