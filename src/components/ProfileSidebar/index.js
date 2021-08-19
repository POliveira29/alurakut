import Box from "../Box";
import {AlurakutProfileSidebarMenuDefault} from "../../lib/AlurakutCommons";

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img
        src={`http://github.com/${props.githubUser}.png`}
        alt="Foto Usuário"
      />
      <hr />
      <p>
        <a className="boxLink" href={`http://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default ProfileSidebar;
