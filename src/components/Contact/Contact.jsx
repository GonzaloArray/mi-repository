import React from 'react'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useThemeContext } from '../../hooks/useThemeContext'

import styles from './Contact.module.scss'
import Form from './Form'

const Contact = () => {
  const { isDark } = useThemeContext()

  return (
    <section>
      <HelmetProvider>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Contact me - Gonzalo Arrayaran</title>
          <meta name='description' content='Contact me sending a e-mail o throught Linkedin' />
        </Helmet>
      </HelmetProvider>
      <div className={`${styles.contact__wrapper} ${isDark ? styles['dark-theme'] : styles['light-theme']}`} id='contact-me'>
        <div className={styles.title}>
          <span>Reach me!</span>
        </div>
        <p className={styles.contact__text}>If you reach here is because you are interested in me.
          Let’s talk and have a good time ;)
        </p>
        <img className={styles.font__detail} src='./nunito.svg' alt='Font family type' />
        <Form />
        <footer className={`${isDark ? styles['dark-text'] : styles['light-text']}`}>
          <p>Designed and coded with love by Gonzalo.</p>
          <img className={styles.love__detail} src='./love.svg' alt='With love detail' />
        </footer>
      </div>
    </section>
  )
}

export default Contact
