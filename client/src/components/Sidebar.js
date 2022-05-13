import React from 'react'
import './Sidebar.css'
import SidebarOptions from './SidebarOptions'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useDataLayerValue } from '../DataLayer';

function Sidebar() {

const[playlist, dispatch] = useDataLayerValue();

console.log('This is the playlist object: ', playlist)

  return (
    <div className='sidebar'>
        <img className='sidebar__logo' src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="" />

        <SidebarOptions Icon={HomeIcon} title='Home' />
        <SidebarOptions Icon={SearchIcon} title='Search' />
        <SidebarOptions Icon={LibraryMusicIcon} title='Your Library' />

        <br/>
        <strong className='sidebar__title'>PLAYLIST</strong>
        <hr/>

        {playlist?.items?.map(playlist=>(
          <SidebarOptions title={playlist.name} />
        ))} 

    </div>
  )
}

export default Sidebar