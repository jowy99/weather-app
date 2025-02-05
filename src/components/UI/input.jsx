import PropTypes from 'prop-types';

function Input({ name, id }){
    return (
        <input id={id} name={name} type="text" />
    );
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default Input;