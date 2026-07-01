import logo from '../logo.svg';
import NavComp from './NavComp';

export function Navbar (){
    return (
        <div>
            <div id="leftside">
                <div>
                    <img src={logo} />
                </div>
                <div>
                    <input type='text'>Search</input>
                </div>
            </div>
            <div id="rightside">
                <NavComp />
                <NavComp />
                <NavComp />
                <NavComp />
            </div>
        </div>
    );
}


export default Navbar;