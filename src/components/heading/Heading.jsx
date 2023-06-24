import React, { useRef, useEffect } from 'react'
import randomColors from 'randomcolor'

import styles from './Heading.module.scss'
import { useThemeContext } from '../../hooks/useThemeContext'

const Heading = () => {
  const titleRef = useRef()

  const { isDark } = useThemeContext()

  const changeColorHandler = () => {
    let color
    if (isDark) {
      color = randomColors({ luminosity: 'dark', format: 'rgb' })
    } else {
      color = randomColors({ luminosity: 'light', format: 'rgb' })
    }
    titleRef.current.style.color = color
  }

  useEffect(() => {
    if (isDark) {
      titleRef.current.style.color = randomColors({ luminosity: 'dark', format: 'rgb' })
    } else {
      titleRef.current.style.color = randomColors({ luminosity: 'light', format: 'rgb' })
    }
  })

  return (
    <section className={`${styles.heading__wrapper} ${isDark ? styles['dark-theme'] : styles['light-theme']} `}>
      <div className={styles.heading__content}>
        <div className={styles.title__wrapper}>
          <div className={`${styles.title} ${isDark ? styles['dark-text'] : styles['light-text']}`}>Hi there👋, I'm<p onMouseEnter={changeColorHandler} ref={titleRef}> Gonzalo.</p></div>
          <p className={styles.title__description}>Developer, System Analyst and lifelong learner.</p>
        </div>
        <img className={`${styles.scroll__arrow} ${isDark ? styles['dark-text'] : styles['light-text']}`} src={`${isDark ? './Arrow 1 dark.svg' : './Arrow 1.svg'}`} alt='Scroll down arrow' />
        <img className={styles.height__detail} src='./height.svg' alt='Height detail' />
        <img className={styles.hover__detail} src='./hoverit.svg' alt='Hover it detail' />
        <img className={styles.background__detail} src='./background-color.svg' alt='Background color detail' />
      </div>
    </section>
  )
}

export default Heading
