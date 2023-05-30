import {url, method, moveArround} from "../../mock-data/cleaning-seasions-data"

describe('Robotic hoover tests', () => {
  it('can clean all room and patches response should be 2 ', () => {
    const body = {
      "roomSize" : [2, 2],
      "coords" : [0, 0],
      "patches" : [
        [1, 0],
        [0, 1]
      ],
      "instructions" : "NES"
    }
    cy.request(method, url, body).then((response) => {
      expect(response.body.patches).to.eq(2)
    })
  })

  it('can clean only the dirty spaces and patches should be 3', () => {
    const body = {
      "roomSize" : [5, 5],
      "coords" : [0, 0],
      "patches" : [
        [1, 0],
        [1, 1],
        [2, 1]
      ],
      "instructions" : "ENE"
    }
    cy.request(method, url, body).then((response) => {
      expect(response.body.patches).to.eq(3)
    })
  })

  it('can clean only one dirty space and patches should be 1', () => {
    const body = {
      "roomSize" : [5, 5],
      "coords" : [1, 2],
      "patches" : [
        [1, 0],
        [2, 2],
        [2, 3]
      ],
      "instructions" : "NNESEESWNWW"
    }
    cy.request(method, url, body).then((response) => {
      expect(response.body.patches).to.eq(1)
    })
  })

  it('can move to north and return coords like [1, 2]', () => {
    let body = moveArround
    body.instructions = "N"
    cy.request(method, url, body).then((response) => {
      expect(response.body.coords[0]).to.eq(1)
      expect(response.body.coords[1]).to.eq(2)
    })
  })

  it('can move to east and return coords like [2, 1]', () => {
    let body = moveArround
    body.instructions = "E"
    cy.request(method, url, body).then((response) => {
      expect(response.body.coords[0]).to.eq(2)
      expect(response.body.coords[1]).to.eq(1)
    })
  })

  it('can move to west and return coords like [0, 1]', () => {
    let body = moveArround
    body.instructions = "W"
    cy.request(method, url, body).then((response) => {
      expect(response.body.coords[0]).to.eq(0)
      expect(response.body.coords[1]).to.eq(1)
    })
  })

  it('can move to south and return coords like [1, 0]', () => {
    let body = moveArround
    body.instructions = "S"
    cy.request(method, url, body).then((response) => {
      expect(response.body.coords[0]).to.eq(1)
      expect(response.body.coords[1]).to.eq(0)
    })
  })

  it('can move over dirty space and return the spaces cleaned, patches should be 2', () => {
    const body = {
      "roomSize" : [5, 5],
      "coords" : [1, 1],
      "patches" : [
        [2, 1],
        [3, 1]
      ],
      "instructions" : "EEE"
    }
    cy.request(method, url, body).then((response) => {
      expect(response.body.patches).to.eq(2)
    })
  })

  it('can move over not dirty space and the spaces cleaned should not be updated, patches should be 0', () => {
    const body = {
      "roomSize" : [5, 5],
      "coords" : [1, 1],
      "patches" : [
        [3, 3],
        [4, 4]
      ],
      "instructions" : "EEE"
    }
    cy.request(method, url, body).then((response) => {
      expect(response.body.patches).to.eq(0)
    })
  })

  it('should return error when coords is outside of roomSize', () => {
    const body = {
      "roomSize" : [5, 5],
      "coords" : [6, 1],
      "patches" : [
        [3, 3]
      ],
      "instructions" : "EEE"
    }
    cy.request(method, url, body).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('should return error when instructions move outside of the room', () => {
    const body = {
      "roomSize" : [5, 5],
      "coords" : [0, 0],
      "patches" : [
        [3, 3]
      ],
      "instructions" : "SSSSSSWWWWW"
    }
    cy.request(method, url, body).then((response) => {
      expect(response.status).to.eq(400)
    })
  })
})
