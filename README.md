# mini_pipe-filter

Membres : Axel Ollivier / Clément Pageaux
Création d'un mini framework Javascript implémentant une architecture de type modulaire PIPE/FILTER

# Introduction

Le framework **ppft** est outil permettant le traitement de données via une architecture PIPE/FILTER. Les données transitent étape par étape, en fonction de la configuration définie.

# Getting Started

//TODO

# API

## Configuration

La configuration des filtres passe par le fichier **config-filters.json**.
Ce fichier de configuration doit contenir un object **steps**, dans lequel sont placées les différentes étapes du pipe.

```json
{
  "steps": {
    "1": {
      "filter": "filter1",
      "params": ["parameter1", "parameter2"],
      "next": "2"
    },
    "2": {
      "filter": "filter2",
      "params": []
    }
  }
}
```

Une étape (**step**) peut disposer de 3 propriétés :

- **filter** : le nom du filter à utiliser
- **params** (optionnel) : les paramêtres supplémentaires\* à passer au filtre
- **next** (optionnel) : l'étape suivante

\* le premier paramêtre d'un filtre étant le resultat de l'étape précedente, dans le cas où il y en a eu une.

## Filters

Pour ajouter un filtre, il faut créer un fichier \<nomDufiltre>.js dans le répertoire **./filters**. Les filtres se présentent sous la forme de **fonctions asynchrones** exportées. (exemple ci-dessous)

```js
module.exports = async function nomDuFiltre(parameter1, parameter2...) {
  // Do Something
};
```

# Errors

Pas de documentation nécessaire.

# Tools

//TODO