// style
import './Collaborators.css'
import '../Data/Data.css'

// modules
import { filterSort } from '../../Modules/FormInput/FilterSort.js';
import { CustomTextField } from '../../Modules/FormInput/CustomTextField/CustomTextField.js';
import { CustomSelect } from '../../Modules/FormInput/SortBy/CustomSelect.js';

// react
import { useState, useEffect } from 'react'

// data
import collaborators from '../../../site_data/posts/collaborators.json';


// consts
const collab_folder = 'img/people/collaborators/'

// indiv collaborator page
const CollaboratorPage = ({ name, img_src, quote }) => {
  return (
    <div className='collab-card article-div'>
      <div>
        <a>
          <img className='collab-slug' src={collab_folder + img_src}></img>
          <br></br>
          <b>{name}</b>
        </a>
      </div>
      <p>"{quote}"</p>
    </div>
  )
};


export default function Collaborators() {
  // set title
  useEffect(() => {
    document.title = 'The Pig Pencil | Collaborators'
  }, [])

  // search keyword
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredCollaborators, setFilteredCollabs] = useState(collaborators);

  // filter collaborators
  useEffect(() => {
    setFilteredCollabs(filterSort(collaborators, searchKeyword));
  }, [searchKeyword]);

  return (<>
    <div className="container containerBottom container-top">

      <div className='blog-container'>
        <div className='posts-navigation-div'>
          <CustomTextField contentType={' people'} onChangeFn={setSearchKeyword} />
          {/* <CustomSelect sortOption={sortOption} onChangeFn={setSortOption} /> */}
        </div>
        <div className='empty-grid-div'>
        </div>
        <div className='posts-div'>
          {filteredCollaborators.map(c => {
            return <CollaboratorPage name={c['Author']} img_src={c['slug']} quote={c['quote']} />
          })}
        </div>
      </div>
    </div>
  </>
  )
}
