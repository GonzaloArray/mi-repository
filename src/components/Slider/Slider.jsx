import React, { Children, useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useSwipeable } from 'react-swipeable'

import styles from './Slider.module.scss'

import * as Icon from 'react-icons/md'
import { useThemeContext } from '../../hooks/useThemeContext'

export const SliderItem = ({ children, width }) => {
  return (
    <div className={styles.slider__item} style={{ width }}>
      {children}
    </div>
  )
}

const Slider = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const [paused, setIsPaused] = useState(false)

  const { isDark } = useThemeContext()

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0
    }

    setActiveIndex(newIndex)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  })

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1)
      }
    }, 2500)

    return () => {
      interval ? clearInterval(interval) : ''
    }
  })

  if (isMobile) {
    return (
      <div {...handlers} className={`${styles.carousel} ${isDark ? styles['dark-theme'] : styles['light-theme']}`} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className={styles.inner} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {Children.map(children, (child, index) => {
            return React.cloneElement(child, { width: '100%' })
          })}

        </div>
        <div className={styles.indicators}>
          <button className={styles.arrows} onClick={() => { updateIndex(activeIndex - 1) }}>
            <Icon.MdArrowBackIosNew />
          </button>
          <button className={styles.arrows} onClick={() => { updateIndex(activeIndex + 1) }}>
            <Icon.MdArrowForwardIos />
          </button>
        </div>
        <div className={`${styles.dots}`}>
          {React.Children.map(children, (child, index) => {
            return (
              <button className={`${styles.dot} ${isDark ? styles['dark-dot'] : styles['light-dot']} ${index !== activeIndex ? '' : isDark ? styles['dark-active'] : styles['light-active']} `} onClick={() => updateIndex(index)} />
            )
          })}
        </div>
      </div>
    )
  } else {
    return (
      <div className={`${styles.carousel} ${isDark ? styles['dark-theme'] : styles['light-theme']}`}>
        <div className={styles.inner} style={{ transform: `translateX(-${activeIndex * 33.33}%)` }}>
          {Children.map(children, (child, index) => {
            return React.cloneElement(child, { width: '33.33%' })
          })}

        </div>
        <div className={styles.indicators}>
          <button className={styles.arrows} onClick={() => { updateIndex(activeIndex - 1) }}>
            <Icon.MdArrowBackIosNew />
          </button>
          <button className={styles.arrows} onClick={() => { updateIndex(activeIndex + 1) }}>
            <Icon.MdArrowForwardIos />
          </button>
        </div>
        <div className={styles.dots}>
          {React.Children.map(children, (child, index) => {
            return (
              <button className={`${styles.dot} ${isDark ? styles['dark-dot'] : styles['light-dot']} ${index !== activeIndex ? '' : isDark ? styles['dark-active'] : styles['light-active']} `} onClick={() => updateIndex(index)} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Slider
