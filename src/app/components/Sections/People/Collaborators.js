// style
import SectionTemplate from '../SectionTemplate/SectionTemplate';
// data
import collaborators from '../../../site_data/collaborators.json';


// consts
const collab_folder = 'img/people/collaborators/'

// indiv collaborator page
// const CollaboratorPage = ({ name, img_src, quote }) => {
//   return (
//     <div className='collab-card article-div'>
//       <div>
//         <a>
//           <img className='collab-slug' src={collab_folder + img_src}></img>
//           <br></br>
//           <b>{name}</b>
//         </a>
//       </div>
//       <p>"{quote}"</p>
//     </div>
//   )
// };


export default function Collaborators() {
  return (
    <SectionTemplate
      postData={collaborators}
      section='Collaborators'
      contentType='people'
      author='Name'
      role='Role'
      date='LastPost'
      tagBoxIncluded={false}
      postTemplateType={2}
    />
  )
}
