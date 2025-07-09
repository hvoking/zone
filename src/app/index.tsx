// App imports
import { Left } from './left';
import { Maps } from './maps';
import { Right } from './right';
import { Header } from './header';
import './styles.scss';

// Context imports
import { ContextProvider } from 'context';

export const App = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
  
  return (
    <ContextProvider>
      <div className="App">
        <Header/>
        <div className="main">
          <Left/>
          <Maps/>
          <Right/>
        </div>
      </div>
    </ContextProvider>
  )
}

App.displayName="App";