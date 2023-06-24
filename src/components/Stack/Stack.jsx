import React from 'react'

import styles from './Stack.module.scss';
import List from '../List/List';
import { stack } from '/src/data.js'
import { v4 as uuidv4 } from 'uuid';
import { useThemeContext } from '../../hooks/useThemeContext';


const Stack = () => {
    const {isDark} = useThemeContext();

    return(
        <section className={`${styles.stack__wrapper} ${isDark ? styles['dark-theme'] : styles['light-theme']}`} id="stack">
            <div className={styles.stack__content}>
                <h2 className={styles.stack__title}>Stack.</h2>
                <div className={styles.front__wrapper}>
                    {
                        stack.map((list) => 
								<List name={list.name} items={list.items} key={uuidv4()}/>
						)
                    }
                    <img className={styles.list__detail} src="./list.svg" alt="List code detail" />
                    <img className={styles.background__detail} src="./fresh-water.svg" alt="Stack section background color" />

                </div>
                <div className={styles.back__wrapper}>
                </div>
            </div>
        </section>
    );
}

export default Stack;