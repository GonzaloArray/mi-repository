import React, {Memo} from 'react'
import { useThemeContext } from '../../hooks/useThemeContext';

import styles from './Button.module.scss';

const Button = props => {

    const {isDark} = useThemeContext();
    
    return(
        <button className={`${styles.button} ${isDark ? styles['dark-button'] : styles['light-button']}`} type={props.type || 'button'} onClick={props.onClick}>
            {props.buttonText}
        </button>
    );
}

export default Button