import React from 'react'
// import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles';
import { TPP_site_theme } from '../../../../site_data/site_styles/TPP_site_theme.ts';

// fn to get matching blog posts by title, caption, tags, or author
export const getMatchingSearchPosts = (keyword, posts, allColumns = false) => {
    // console.log('all columns:',posts, Object.keys(posts[0]));
    const lowerKeyword = keyword.toLowerCase()
    let blogPostText;
    if (allColumns == true) {
        let columns = Object.keys(posts[0])
        blogPostText = posts.map(r => {
            let text = '';
            columns.map(c => {
                text += ' ' + r[c]
            })
            return text.toLowerCase()
        })
        // console.log('allcols',blogPostText);
    }
    else {
        blogPostText = posts.map(r =>
            (r.Author + ' ' +
                r.Title + ' ' +
                r.Caption + ' ' +
                r.DataType + ' ' +
                r.Date + ' ' +
                r.Languages + ' ' +
                r.Tags).toLowerCase()
        );
    }
    let filteredBlogPosts = posts.filter((d, i) => {
        return blogPostText[i].includes(lowerKeyword);
    })
    // console.log(lowerKeyword, filteredBlogPosts);
    return filteredBlogPosts;
}

export const CustomTextField = ({ contentType = '', onChangeFn = () => { }, searchText = true }) => {
    return (
        <div>
            <ThemeProvider theme={TPP_site_theme}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                    <TextField
                        id="standard-basic"
                        label={searchText ? 'Search' + contentType : contentType}
                        variant="standard"
                        onChange={(e) => { onChangeFn(e.target.value) }}
                    />
                </FormControl>
            </ThemeProvider>
        </div>
    )
}
