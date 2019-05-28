import React from 'react'
import withChaos from '../../src/index'
import { render } from 'react-dom'
import ErrorBoundary from '../../src/components/ErrorBoundary';

function Demo() {
  return (
    <React.Fragment>
      <button onClick={() => {
        // eslint-disable-next-line
        location.reload()
      }}>Reload</button>
      <ComponentOne />
      <ErrorBoundary fallback={<Fallback />}>
        <ComponentWithChaos />
      </ErrorBoundary>
      <ComponentTwo />
      <ComponentThree />
    </React.Fragment>
  );
}

const Fallback = () => <div style={{
  height: '4rem',
  backgroundColor: 'yellow',
  color: '#333',
  fontSize: '3rem',
  fontWeight: 700
}}
>
  <span> I'm handling the error gracefully. 💅 </span>
</div>

const GenericComponent = ({ text }) => <h1>Component {text}</h1>

const NestedComponent = ({ children }) => children;

const ComponentOne = () => <GenericComponent text="One" />

const ComponentWillHaveChaos = () => <GenericComponent text="may experience chaos." />
const ComponentWillHaveChaos2 = () => (
  <NestedComponent>
    <GenericComponent text="may also experience chaos 1." />
    <GenericComponent text="may also experience chaos 2." />
    <GenericComponent text="may also experience chaos 3." />
  </NestedComponent>
);

const ComponentWithChaos = withChaos(ComponentWillHaveChaos, 1, "a custom error message, level 1");
const ComponentWithChaos2 = withChaos(ComponentWillHaveChaos2, 3, "a custom error message, level 3");

const ComponentTwo = () => <GenericComponent text="Two" />

const ComponentThree = () => (
  <NestedComponent>
    <GenericComponent text="Three" />
    <NestedComponent>
      <ErrorBoundary fallback={<Fallback />}>
        <ComponentWithChaos2 />
      </ErrorBoundary>
    </NestedComponent>
  </NestedComponent>
)

render(<Demo />, document.querySelector('#demo'))