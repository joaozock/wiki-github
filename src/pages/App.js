import gitLogo from '../assets/github.png'
import { Container } from './styles'
import Input from '../components/Input'
import Button from '../components/Button'
import ItemRepo from '../components/ItemRepo';
import { useState } from 'react';
import { api } from '../services/api';

function App() {

  const [currentRepo, setCurrentRepos] = useState('')
  const [repos, setRepos] = useState([])

  const handleSearchRepo = async () => {

    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id) {

      const isExist = repos.find(repo => repo.id === data.id)

      if(!isExist){
        setRepos(prev => [...prev, data])
        setCurrentRepos('')
        return
      }
    }
    alert('Repositório não encontrado ou já existente.')
  }

  const handleRemoveRepo = (id) => {
    setRepos(repos.filter(repo => repo.id !== id))
  }
  
  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="GitHub Logo"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepos(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
      
    </Container>
  );
}

export default App;
