/* eslint-disable react/prop-types */
import './account.scss';
import Button from '../button/Button';

function Account (props){
    return (
        <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">{props.title}</h3>
                        <p className="account-amount">{props.amount}</p>
                        <p className="account-amount-description">{props.description}</p>
                    </div>
                    <div className="account-content-wrapper cta">
                       <Button className="transaction-button" text="View transactions"/>
                    </div>
                </section>
    )
}

export default Account;