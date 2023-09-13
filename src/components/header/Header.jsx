import argentBankLogo from '../../assets/img/argentBankLogo.png';
import './header.scss';
import '../../assets/fontAwesome/fontawesome-free-6.4.2-web/css/all.min.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link className="main-nav-item" to="/sign-in">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>
            </div>
        </nav>
    )
}

export default Header;