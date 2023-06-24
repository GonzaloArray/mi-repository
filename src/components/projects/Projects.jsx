import React from 'react'

import styles from './Projects.module.scss'
import { SiGithub } from 'react-icons/si'
import { MdOutlineOpenInNew } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'
import Slider, { SliderItem } from '../Slider/Slider'
import { useThemeContext } from '../../hooks/useThemeContext'
import { projects } from '../../data'

const Projects = () => {
  const { isDark } = useThemeContext()

  return (
    <section
      className={`${styles.project__wrapper} ${
        isDark ? styles['dark-theme'] : styles['light-theme']
      }`}
      id='projects'
    >
      <div className={styles.project__content}>
        <h2 className={styles.project__title}>Projects.</h2>
        <img
          className={styles.font__detail}
          src='./font.svg'
          alt='Font family type'
        />
        <Slider>
          {projects.map((project) => {
            return (
              <SliderItem key={uuidv4()}>
                <article
                  className={`${styles.project} ${
                    isDark ? styles['dark-project'] : styles['light-project']
                  }`}
                >
                  <div className={styles.header}>
                    <h3
                      className={`${styles.title} ${
                        isDark ? styles['dark-text'] : styles['light-text']
                      }`}
                    >
                      {project.name}
                    </h3>
                    {project.github !== null
                      ? (
                        <a
                          href={project.github}
                          target='_blank'
                          className={styles.project__repo} rel='noreferrer'
                        >
                          <SiGithub
                            className={`${
                            isDark ? styles['dark-text'] : styles['light-text']
                          }`}
                          />
                        </a>
                        )
                      : (
                          ''
                        )}
                  </div>
                  <p
                    className={`${styles.project__description} ${
                      isDark ? styles['dark-text'] : styles['light-text']
                    }`}
                  >
                    {project.description}
                  </p>
                  <div className={styles.project_link_wrapper}>
                    {project.livePage !== null
                      ? (
                        <a
                          href={project.livePage}
                          target='_blank'
                          className={`${styles.project__link} ${
                          isDark ? styles['dark-text'] : styles['light-text']
                        }`} rel='noreferrer'
                        >
                          View Project <MdOutlineOpenInNew />
                        </a>
                        )
                      : (
                          ''
                        )}
                  </div>
                </article>
              </SliderItem>
            )
          })}
        </Slider>
      </div>
    </section>
  )
}

export default Projects
