import React, { useState, useEffect } from 'react'

import { useMediaQuery } from 'react-responsive'
import styles from './Menu.module.scss'
import * as Icon from 'react-icons/hi'
import { VscChromeClose } from 'react-icons/vsc'
import { useThemeContext } from '../../hooks/useThemeContext'

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const { changeColor, isDark } = useThemeContext()

  const [menuColor, setMenuColor] = useState({ color: isDark ? 'black' : 'white' })

  const listenScrollEvent = e => {
    if (window.scrollY > 900) {
      if (isDark) {
        setMenuColor({ color: 'white' })
      } else {
        setMenuColor({ color: 'black' })
      }
    } else {
      if (isDark) {
        setMenuColor({ color: 'black' })
      } else {
        setMenuColor({ color: 'white' })
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent)

    return () => window.removeEventListener('scroll', listenScrollEvent)
  }, [menuColor])

  const openMenuHandler = () => {
    setIsOpen(!isOpen)
  }

  const changeMenuColorHandler = () => {
    if (isDark) {
      setMenuColor({ color: 'white' })
    } else {
      setMenuColor({ color: 'black' })
    }
    changeColor()
  }

  if (isMobile) {
    return (
      <>
        <header className={styles.mobile__wrapper} style={{ color: menuColor.color }}>
          <p className={styles.logo} style={{ color: menuColor.color }}>Gonzalo.</p>
          <div>
            <button onClick={changeMenuColorHandler} className={styles.switcher} style={{ color: menuColor.color }}>{isDark ? <Icon.HiOutlineMoon /> : <Icon.HiOutlineSun />}</button>
            <button className={styles.mobileMenu} style={{ color: menuColor.color }} onClick={openMenuHandler}>
              <Icon.HiOutlineMenuAlt2 style={{ color: menuColor.color }} />
            </button>
          </div>
        </header>

        <header className={`${styles.menu__wrapper} ${isOpen ? styles.isOpen : ''}`} style={{ color: menuColor.color }}>
          <button className={styles.mobileMenu} style={{ color: menuColor.color }} onClick={openMenuHandler}>
            <VscChromeClose style={{ color: menuColor.color }} />
          </button>
          <ul className={styles.menu} style={{ color: menuColor.color }}>
            <a href='#about' onClick={() => setIsOpen(false)}><li>ABOUT</li></a>
            <a href='#stack' onClick={() => setIsOpen(false)}><li>STACK</li></a>
            <a href='#projects' onClick={() => setIsOpen(false)}><li>PROJECTS</li></a>
            <a href='#contact-me' onClick={() => setIsOpen(false)}><li>CONTACT</li></a>
          </ul>
        </header>
      </>
    )
  }

  return (
    <header className={styles.menu__wrapper} style={{ color: menuColor.color }}>
      <p className={styles.logo}>Gonzalo.</p>
      <ul className={styles.menu} style={{ color: menuColor.color }}>
        <button onClick={changeMenuColorHandler} className={styles.switcher} style={{ color: menuColor.color }}>{isDark ? <Icon.HiOutlineMoon /> : <Icon.HiOutlineSun />}</button>
        <a href='#about'><li>ABOUT</li></a>
        <a href='#stack'><li>STACK</li></a>
        <a href='#projects'><li>PROJECTS</li></a>
        <a href='#contact-me'><li>CONTACT</li></a>
      </ul>
    </header>

  )
}

export default Menu
