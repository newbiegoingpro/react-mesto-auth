import menuPic from '../images/white-menu-icon-12.png';
import Menu from './Menu';
import add from '../images/add-button.svg';
function Hamburger(props) {
    return (
        <>
            
            
            
            
            <Menu email={props.email} onSignOut={props.onSignOut} isOpen={props.isOpen}/>
        </>
        
    )
}
export default Hamburger;