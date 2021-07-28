import server from './server';

const port = 3000;

const starter = new server().start(port)
  .then(port => console.log(`SERVIDOR RODANDO NA PORTA ${port}...`))
  .catch(error => {
    console.log(error)
  });

export default starter;