import React, { useState } from 'react'
import Scene from '../scene/Scene'

import styles from './About.module.scss'

import { SiGithub, SiLinkedin } from 'react-icons/si'
import Button from '../Button/Button'
import Modal from '../Modal/Modal'
import { useThemeContext } from '../../hooks/useThemeContext'

const About = () => {
  const [modal, setModal] = useState(false)

  const { isDark } = useThemeContext()

  const openModalHandler = () => {
    setModal((prev) => !prev)
  }

  const closeModalHandler = () => {
    setModal(false)
  }

  return (
    <section
      className={`${styles.about__wrapper} ${
        isDark ? styles['light-theme'] : styles['dark-theme']
      }`}
      id='about'
    >
      <div className={styles.about__content}>
        <div className={styles.about__info}>
          <h3 className={styles.about__title}>About me.</h3>
          <p className={styles.about__description}>
            I’m from <b>Buenos Aires, Argentina. </b>
            I’m working with JS since 2022.
            My goal is to learn new technologies and become a FrontEnd Architect.
            I code in JavaScript, React, Sass, Material UI.
            I also have knowledge of Node with Express in the backend.
            I would love to learn Three js and Blender to make amazing things in
            the web.
            I'm currently practicing Nextjs :)
          </p>
          <div className={styles.download_cv}>
            <Button
              onClick={openModalHandler}
              type='cv'
              buttonText='Download CV'
            />
            <img
              className={styles.button__detail}
              src='./Button.svg'
              alt='Button detail'
            />
          </div>
        </div>
        <div className={styles.about__model}>
          <img
            className={styles.three__detail}
            src='./three.svg'
            alt='Treejs detail'
          />
          <Scene />
          <div className={styles.platforms__links}>
            <a href='https://github.com/GonzaloArray' target='_blank' rel='noreferrer'>
              <SiGithub />
            </a>
            <a
              href='https://www.linkedin.com/in/gonzalo-arrayaran-778258186/'
              target='_blank' rel='noreferrer'
            >
              <SiLinkedin />
            </a>
          </div>
        </div>
      </div>
      {modal && <Modal onConfirm={closeModalHandler} />}
    </section>
  )
}

export default About
