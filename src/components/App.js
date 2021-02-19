import styled from 'styled-components';
import Inner from './blocks/Inner'
import Ingredients from './ingredients/index'
import CoffeMaschine from './coffeMaschine/index'
import Recipe from './recipe/index'

const Main = styled.div`
    display:flex;
    justify-content:center;
    width: 100%;
`;

function App() {
  return (
    <Main>
      <Inner justifyContent='center' maxWidth='500px'>
        <Recipe/>
        <CoffeMaschine/>
        <Ingredients/>
      </Inner>
    </Main>
  );
}

export default App;
