const url = "http://localhost:8080/v1/cleaning-sessions"
const method = "POST"
const moveArround = {
      "roomSize" : [5, 5],
      "coords" : [1, 1],
      "patches" : [
        [1, 0]
      ],
      "instructions" : ""
    }


export default {url, method, moveArround};