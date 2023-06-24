import React, { useState, useEffect, useReducer, useRef } from 'react'

import party from 'party-js'
import emailjs from '@emailjs/browser'

import styles from './Form.module.scss'
import { useThemeContext } from '../../hooks/useThemeContext'

const mailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: mailRegex.test(action.val) }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: mailRegex.test(state.value) }
  }
  return { value: '', isValid: false }
}

const nameReducer = (state, action) => {
  if (action.type === 'USER_NAME') {
    return { value: action.val, isValid: action.val.length > 0 }
  }
  if (action.type === 'NAME_BLUR') {
    return { value: state.value, isValid: state.value.length > 0 }
  }
  return { value: '', isValid: false }
}

const messageReducer = (state, action) => {
  if (action.type === 'USER_MESSAGE') {
    return { value: action.val, isValid: action.val.length > 0 }
  }
  if (action.type === 'MESSAGE_BLUR') {
    return { value: state.value, isValid: state.value.length > 0 }
  }
  return { value: '', isValid: false }
}

const Form = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  const contactFormRef = useRef(null)
  const sendButton = useRef(null)

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: true
  })
  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: '',
    isValid: true
  })
  const [messageState, dispatchMessage] = useReducer(messageReducer, {
    value: '',
    isValid: true
  })

  const { isValid: emailIsValid } = emailState
  const { isValid: nameIsValid } = nameState
  const { isValid: messageIsValid } = messageState

  const { isDark } = useThemeContext()

  const submitHandler = (e) => {
    e.preventDefault()
    if (formIsValid) {
      const envs = {
        service: import.meta.env.VITE_SERVICE_ID,
        template: import.meta.env.VITE_TEMPLATE_ID,
        public_key: import.meta.env.VITE_PUBLIC_KEY
      }

      emailjs.init(envs.public_key)

      const templateParams = {
        to_name: 'Gonzalo Arrayaran',
        from_name: nameState.value,
        reply_to: emailState.value,
        message: messageState.value
      }

      setIsLoading(true)
      emailjs.send(envs.service, envs.template, templateParams).then(
        (result) => {
          if (result.text === 'OK') {
            sendButton.current.innerHTML = 'Thank you!'
            party.confetti(sendButton.current)
            setTimeout(() => {
              sendButton.current.innerHTML = 'Send'
              setIsLoading(false)
            }, 5000)
            contactFormRef.current.reset()
          }
        },
        (error) => {
          console.error(error)
          setErrorMessage(
            'An error has ocurred please contact me via Mail: gonzalo.arrayaran@gmail.com'
          )
          setTimeout(() => {
            setErrorMessage('')
          }, 3000)
        }
      )
    }
  }

  const emailChangeHandler = (e) => {
    dispatchEmail({ type: 'USER_INPUT', val: e.target.value })
    setFormIsValid(
      mailRegex.test(e.target.value) &&
        nameState.isValid &&
        messageState.isValid
    )
  }

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  }

  const nameChangeHandler = (e) => {
    dispatchName({ type: 'USER_NAME', val: e.target.value })

    setFormIsValid(
      e.target.value.trim().length > 0 &&
        emailState.isValid &&
        messageState.isValid
    )
  }

  const validateNameHandler = () => {
    dispatchName({ type: 'NAME_BLUR' })
  }

  const messageChangeHandler = (e) => {
    dispatchMessage({ type: 'USER_MESSAGE', val: e.target.value })

    setFormIsValid(
      e.target.value.trim().length > 0 &&
        emailState.isValid &&
        nameState.isValid
    )
  }

  const validateMessageHandler = () => {
    dispatchMessage({ type: 'MESSAGE_BLUR' })
  }

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && nameIsValid && messageIsValid)
    }, 500)

    return () => {
      clearTimeout(identifier)
    }
  }, [emailIsValid, nameIsValid, messageIsValid])

  return (
    <form
      action=''
      className={styles.form_container}
      onSubmit={submitHandler}
      ref={contactFormRef}
    >
      <label htmlFor='name'>Name*</label>
      <input
        type='text'
        name='user_name'
        className={`${styles.contact_input} ${
          isDark ? styles['dark-border'] : styles['light-border']
        } ${nameState.isValid === false ? styles.invalid : ''}`}
        placeholder='Your name :)'
        required
        value={nameState.value}
        onChange={nameChangeHandler}
        onBlur={validateNameHandler}
      />
      <label htmlFor='mail'>Mail*</label>
      <input
        type='mail'
        className={`${styles.contact_input} ${
          isDark ? styles['dark-border'] : styles['light-border']
        } ${emailState.isValid === false ? styles.invalid : ''}`}
        name='user_mail'
        placeholder='example@123.com'
        required
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
      />
      <label htmlFor='message'>Message*</label>
      <textarea
        name='message'
        className={`${styles.contact__textarea} ${
          isDark ? styles['dark-border'] : styles['light-border']
        } ${messageState.isValid === false ? styles.invalid : ''}`}
        cols='30'
        rows='7'
        placeholder='You first...'
        required
        value={messageState.value}
        onChange={messageChangeHandler}
        onBlur={validateMessageHandler}
      />
      <button
        type='submit'
        className={`${styles.submit__button} ${
          isDark ? styles['dark-button'] : styles['light-button']
        }`}
        disabled={!formIsValid}
        ref={sendButton}
      >
        {!isLoading ? 'Send' : 'Sending...'}
      </button>
      <div id='confettiParticle' />
      <div>{errorMessage}</div>
      <div
        className={`${styles.or_linkedin} ${
          isDark ? styles['dark-text'] : styles['light-text']
        }`}
      >
        <p>Or</p>
        <p>gonzalo.arrayaran@gmail.com</p>
      </div>
      <img
        className={styles.email__detail}
        src='./emailjs.svg'
        alt='Email js detail'
      />
    </form>
  )
}

export default Form
