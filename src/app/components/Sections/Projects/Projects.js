// modules
import SectionTemplate from '../SectionTemplate/SectionTemplate.js';

// data
import projectsPosts from '../../../post_data/projects_articles.json';

const Projects = () => {
    // render
    return (
        <SectionTemplate
            postData={projectsPosts}
            section='Projects'
            contentType='articles'
        />
    )
};

export default Projects;