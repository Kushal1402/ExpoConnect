import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
  // console.log(alerts);
  return alerts && alerts !== null && alerts.length > 0
    ? alerts.map((alert) => (
      <div key={alert.id} className="alert-msg">
        {alert.msg}
      </div>
    ))
    : null;
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, {})(Alert);
