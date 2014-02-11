landing-page
============
[![Build Status](https://travis-ci.org/linguagil/landing-page.png)](https://travis-ci.org/linguagil/landing-page)


Landing Page do LinguÁgil.

## Setup

Estamos usando ferramentas javascript. É preciso ter o node.js maior que 0.8.0 instalado.

### Grunt

Instale o grunt globalmente:

```
npm -g install grunt-cli
```


### Bower

Instale o bower globalmente e as definições do bower.json

```
npm -g install bower
bower install
```

### Outros pacotes

Instale o resto que está descrito no package.json. 

```
npm install
```

## Desenvolvimento

Para ver as modificações acontecendo quando os arquivos forem salvos:

```
grunt server
```

Para executar os testes.

```
grunt
```

## Implantação

Enquanto o travis ainda não faz o deploy, para fazer digite.

```
grunt rsync:prod
```
