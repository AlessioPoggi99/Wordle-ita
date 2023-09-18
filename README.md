# Wordle-ita 🇮🇹

Unofficial Italian fan-made version of <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank">Wordle</a>

You have six attempts to guess a five-letter word, with feedback given for each guess in the form of colored tiles indicating when letters match or occupy the correct position.


## Stack
- <a href="https://vitejs.dev" target="_blank">Vite.js</a> - A local development server and used by default by Vue and for React project templates
- <a href="https://react.dev" target="_blank">React.js</a> - A front-end JavaScript library
- <a href="https://zustand-demo.pmnd.rs" target="_blank">Zustand</a> - A small, fast and scalable bearbones state-management solution


## Project structure

```sh
$PROJECT_ROOT
│   # Front-end files
├── src
│   │   # Images and other assets
│   ├── assets
│   │   # Json files (italian dictionary)
│   ├── dict
│   │   # React custom hooks
│   ├── hooks
│   │   # React components used as modals
│   ├── modals
│   │   # Utility functions
│   ├── utils
│   │   # App.tsx and main components
│   └── *
│
│   # Static files
└── public
```


## How to try it

You can try this unofficial version of Wordle on the website:
- <a href="https://alessiopoggi99.github.io/Wordle-ita/" target="_blank">Wordle-ita 🇮🇹</a>

Otherwise you can clone the <a href="https://github.com/AlessioPoggi99/Wordle-ita" target="_blank">Github repository</a> and run it on your pc
```sh
yarn
yarn dev
```


## Screenshots

![](/public/screenshots/d-home.png?raw=true "Home screen") ![](/screenshots/d-gameover.png?raw=true "Game over")
![](/screenshots/d-info.png?raw=true "Info screen") ![](/screenshots/d-settings.png?raw=true "Settings screen")

![](/screenshots/m-home.png?raw=true "Home screen") ![](/screenshots/m-gameover.png?raw=true "Game over") ![](/screenshots/m-info.png?raw=true "Info screen") ![](/screenshots/m-settings.png?raw=true "Settings screen")