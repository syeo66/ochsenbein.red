import { faGithub, faItunes, faLinkedin, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SocialIcons = () => {
  return (
    <>
      <a href="https://github.com/syeo66">
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a href="https://www.linkedin.com/in/red-ochsenbein/">
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      {/* <a href="https://keybase.io/redochsenbein">
        <FontAwesomeIcon icon={faKeybase} />
      </a> */}
      <a href="https://geo.itunes.apple.com/us/artist/red-ochsenbein/id780186176?mt=1&app=music">
        <FontAwesomeIcon icon={faItunes} />
      </a>
      <a href="https://youtube.com/redochsenbein">
        <FontAwesomeIcon icon={faYoutube} />
      </a>
      <a href="https://open.spotify.com/artist/1i3V7aj2JTmWCztusF22qC">
        <FontAwesomeIcon icon={faSpotify} />
      </a>
      {/* <a href="https://www.hackerrank.com/redochsenbein">
        <FontAwesomeIcon icon={faHackerrank} />
      </a> */}
    </>
  )
}

export default SocialIcons
