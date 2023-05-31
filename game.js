const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")

/* initialize the state with an empty object */
let state = {}

/* Beginning of the game, start with the firt text */
function startGame() {
  state = {}
  showTextNode(1)
}

/* Select the text with the id attribute */
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  /* create choice btn */
  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button")
      button.innerText = option.text
      button.classList.add("btn")
      button.addEventListener("click", () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

/* Choice Select */
function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

/* History */
const textNodes = [
  {
    id: 1,
    text: "Vous vous reveillez dans un endroit étrange qui vous est inconnu, à côté de vous se trouve une bourse de pièce d'argent.",
    options: [
      {
        text: "Vous prenez l'argent",
        setState: { blueGoo: true },
        nextText: 2,
      },
      {
        text: "Vous laissez la bourse",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text: "Vous partez à la recherche d'informations sur ce fameux lieu lorsque vous apercevez un marchand.",
    options: [
      {
        text: "Echanger l'argent contre une épee",
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3,
      },
      {
        text: "Echanger l'argent contre un bouclier",
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3,
      },
      {
        text: "Ignorer le marchand",
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text: "Après avoir discuter avec le marchand, vous commencez à vous sentir très fatigué. A l'horizon, vous apercevez une ville et sur votre gauche un chateau à l'air sinistre",
    options: [
      {
        text: "Explorer le chateau",
        nextText: 4,
      },
      {
        text: "S'infiltrer dans une auberge pour passer la nuit",
        nextText: 5,
      },
      {
        text: "Trouver une grange afin de pouvoir vous reposer",
        nextText: 6,
      },
    ],
  },
  {
    id: 4,
    text: "La fatigue vous ratrappe lors de l'exploration. Vos sens moins aiguisés ne vous permettent pas de réagir face au sol qui se dérobe sous vos piedss. Vous ssuccombez à la chute.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 5,
    text: "Durant la nuit le gérant de l'auberge s'apercoit de votre présence. Il fait alors appel à la garde qui vous arrête. Vous finissez vos jour en prison.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 6,
    text: "Vous vous reveillez plein d'énergie, prêt pour partir à l'aventure !",
    options: [
      {
        text: "Explorer le chateau ",
        nextText: 7,
      },
    ],
  },
  {
    id: 7,
    text: "Durant l'exploration vous rencontrer un vampire archer",
    options: [
      {
        text: "S'enfuir",
        nextText: 8,
      },
      {
        text: "L'attaquer avec votre épée",
        requiredState: (currentState) => currentState.sword,
        nextText: 9,
      },
      {
        text: "Vous protéger à l'aide de votre bouclier",
        requiredState: (currentState) => currentState.shield,
        nextText: 10,
      },
      {
        text: "Jeter les pièces d'argent en guise de shuriken",
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11,
      },
    ],
  },
  {
    id: 8,
    text: "Vous prenez une flèche dans le dos lors de votre tentative d'évasion",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 9,
    text: "Vous pensiez vraiment terrasser le monstre avec une simple épée ?",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 10,
    text: "Le monstre se moque de vous, il vous attrape aisément et vous tue",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 11,
    text: "L'argent a bel et bien l'effet escompté sur les vampire ! Le monstre se désintègre. Vous décidez de rebatir ce chateau et de développer votre royaume. Félicitations !",
    options: [
      {
        text: "Congratulations. Play Again.",
        nextText: -1,
      },
    ],
  },
]

startGame()
