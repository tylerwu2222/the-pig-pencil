// modules
import SectionTemplate from '../SectionTemplate/SectionTemplate.js';

// data
// import tutorialPosts from '../../../site_data/posts/tutorial_posts.json';
import tutorialPosts from '../../../post_data/tutorial_articles.json';


export default function Tutorials() {
    return (
        <SectionTemplate
            postData={tutorialPosts}
            section='Tutorials'
            contentType='tutorials'
        />
    )
}
