// style
import './PostThumbnails.css'

// react
import { Link } from 'react-router-dom';

export const PostThumbnail1 = ({ section, title, img, author, date, subPage, comingSoon }) => {
    let clickableLink = '';
    let hoverableDiv = ' hoverable-div';
    let unclickableTN = '';
    let authorDate = author + ' ∙ ' + date;
    if (comingSoon) {
        title = title + ' (Coming Soon!)';
        clickableLink = ' unclickable-link';
        hoverableDiv = ' unhoverable-div';
        unclickableTN = ' unclickable-tn';
        authorDate = author;
    }
    return (
        <>
            <div className={"post-card-div" + hoverableDiv} title={title}>
                <Link to={"/" + section.toLowerCase() + "/" + subPage} className={"post-card-link" + clickableLink}>
                    <img className={"post-card-thumbnail" + unclickableTN} src={img} alt="thumbnail" loading="lazy" />
                    <div className='title-div'>
                        <p className="post-card-title">{title}</p>
                    </div>
                    <div className='post-card-byline'>
                        <p className="">{authorDate}</p>
                    </div>
                </Link>
            </div>
        </>
    )
};

export const PostThumbnailPeople = ({ img, author, role, date, quote, lastPost }) => {
    return (
        <>
            <div className={"post-card-div hoverable-div"}>
                {/* <Link to={"/" + section.toLowerCase() + "/" + subPage} className={"blog-link" + clickableLink}> */}
                <img className={"post-card-thumbnail"} src={img} alt="thumbnail" loading="lazy" />
                <div className='post-card-name'>
                    <b className="blog-title">{author} </b>
                </div>
                <div className='post-card-byline'>
                    <p className='.'>{role}</p>
                </div>
                <div className='post-card-quote'>
                    <p>"{quote}"</p>
                </div>
                <div className='post-card-quote'>
                    <p>Latest post: <a>{lastPost}</a></p>
                </div>
                {/* </Link> */}
            </div>
        </>
    )
};