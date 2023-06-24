import * as icon from 'react-icons/si'

const stack = [
  {
    name: 'Front End',
    items: [
      { icon: icon.SiHtml5, name: 'HTML' },
      { icon: icon.SiCss3, name: 'CSS' },
      { icon: icon.SiTailwindcss, name: 'Tailwind' },
      { icon: icon.SiSass, name: 'Sass' },
      { icon: icon.SiJavascript, name: 'Javascript' },
      { icon: icon.SiTypescript, name: 'Typescript' },
      { icon: icon.SiReact, name: 'React' },
      { icon: icon.SiWordpress, name: 'Wordpress' },
      { icon: icon.SiRedux, name: 'Redux Toolkit' },
      { icon: icon.SiNextdotjs, name: 'NextJS' }
    ]
  },
  {
    name: 'Back End',
    items: [
      { icon: icon.SiNodedotjs, name: 'NodeJS' },
      { icon: icon.SiExpress, name: 'Express' },
      { icon: icon.SiMongodb, name: 'MongoDB' },
      { icon: icon.SiMysql, name: 'SQL' }
    ]
  }
]

const projects = [
  {
    name: 'Ecommerce BA',
    description:
      'Ecommerce for Bootcamp BA.',
    github: 'https://github.com/GonzaloArray/tienda.git',
    livePage: null
  },
  {
    name: 'Calculator',
    description:
      'The TypeScript calculator project is a web application that allows users to perform various mathematical calculations. It provides a user-friendly interface where users can input numbers.',
    github: 'https://github.com/GonzaloArray/calculator.git',
    livePage: 'https://calculator-ts-ga.netlify.app'
  },
  {
    name: 'Front end ecommerce',
    description:
      "First project using React, made a app connected to a API in the backend that consumes data from an store and it's available throught the search bar.",
    github: 'https://github.com/GonzaloArray/ecommerce-frontend.git',
    livePage: null
  },
  {
    name: 'Frontend Collection',
    description:
      'Challenge Collection from Frontend Mentor.',
    github: 'https://github.com/GonzaloArray/front-end-collection-react.git',
    livePage: null
  },
  {
    name: 'Pet Shop Midhub',
    description:
      'Frontend Vue from ecommerce website',
    github: 'https://github.com/GonzaloArray/PetShop_accenture.git',
    livePage: null
  },
  {
    name: 'Todo App.',
    description: 'A webapp to take notes that saves its on Local Storage.',
    github: 'https://github.com/GonzaloArray/todo-typescript-sass.git',
    livePage: null
  },
  {
    name: 'Bonpland.',
    description: 'The TypeScript real estate management system project is a web application designed to facilitate the management and tracking of real estate properties. ',
    github: 'https://github.com/Inmobiliaria-Bonpland/frontend.git',
    livePage: null
  },
  {
    name: 'Rednodo website',
    description: 'Private project for company rednodo website',
    github: 'https://github.com/GonzaloArray/redNodo-WEB.git',
    livePage: null
  }
]

export { stack, projects }
