import PropTypes from "prop-types";
import './alert.scss'

function Alert({alert}) {
    return <div className="alert-msg">
                {alert}
            </div>
}
  
export default Alert;

Alert.propTypes = {
    alert: PropTypes.object,
};