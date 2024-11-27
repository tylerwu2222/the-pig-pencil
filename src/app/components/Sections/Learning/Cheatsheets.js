// modules
import SectionTemplate from '../SectionTemplate/SectionTemplate.js';
// data
// import cheatsheetPosts from '../../../site_data/posts/cheatsheet_posts.json';
import cheatSheetPosts from '../../../post_data/cheatsheet_articles.json';

export default function Cheatsheets() {
    return (
        <SectionTemplate
            postData={cheatSheetPosts}
            section='Cheatsheets'
            contentType='cheatsheets'
        />
    )
}
