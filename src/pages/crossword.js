import React from "react"
import Crossword from "@jaredreisinger/react-crossword"
import styled from "styled-components"

const clue = ""

const data = {
  across: {
    1: { clue: "Dim Sum", answer: "CHASIUBAO", row: 0, col: 0 },
    2: { clue: "Mandalorian's favorite drink", answer: "BOBA", row: 4, col: 5 },
    3: {
      clue: "College students' best friend",
      answer: "RAMEN",
      row: 6,
      col: 0,
    },
    7: { clue: "Thicc", answer: "UDON", row: 7, col: 0 },
    8: { clue: "Grill", answer: "HIBACHI", row: 9, col: 2 },
  },
  down: {
    1: { clue: "French", answer: "CREMEBRULEE", row: 0, col: 0 },
    4: { clue: "Japanese", answer: "SUSHI", row: 0, col: 3 },
    5: { clue: "Korean", answer: "BULGOGI", row: 0, col: 6 },
    6: { clue: "Dessert", answer: "CAKE", row: 3, col: 7 },
    9: { clue: "Japanese dessert", answer: "MOCHI", row: 6, col: 2 },
    10: { clue: "Indian", answer: "NAAN", row: 7, col: 5 },
    11: { clue: "Mediterranean", answer: "SHAWARMA", row: 0, col: 10 },
  },
}

const Page = styled.div`
  padding: 2em;
`

const Header = styled.h1`
  margin-bottom: 3em;
`

const Wrapper = styled.div`
  max-width: 50em;
`

function App() {
  return (
    <Page>
      <Header>GraphQL Crossword</Header>
      <h2>Foods I Miss</h2>
      <Wrapper>
        <div style={{ width: "100%" }}>
          <Crossword data={data} useStorage={false} />
        </div>
      </Wrapper>
      <p>@jaredreisinger/react-crossword</p>
    </Page>
  )
}

export default App
