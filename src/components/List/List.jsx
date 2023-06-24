import React from 'react'

import Icon from '../Icon/Icon'
import { v4 as uuidv4 } from 'uuid'
import styles from './List.module.scss'
import { useThemeContext } from '../../hooks/useThemeContext'

const List = React.memo(({ name, items }) => {
  const { isDark } = useThemeContext()

  return (
    <div className={styles.list}>
      <h3 className={styles.List_name}>{name}</h3>
      <ul className={styles.List_items}>
        {items.map((i) => (
          <li
            className={`${styles.List_item} ${
                isDark ? styles['dark-theme'] : styles['light-theme']
              }`}
            key={uuidv4()}
          >
            <span className={styles.List_tooltip}>{i.name}</span>
            <Icon icon={i.icon} />
          </li>
        ))}
      </ul>
    </div>
  )
})

export default List
