# I hope to be more descriptive than you were with your README, you have many areas for improvement


## Requirements 
- You should have node installed, I use v18.15, sorry I just install node so I install the last version
- You should have running the docker service described in this [url](https://bitbucket.org/platformscience/pltsci-sdet-assignment/src/main/)

### Steps to run
1. Clone the project
2. Go inside the project with ` cd ITJChallenge `
3. Install dependencies `npm install `
4. Run the tests ` npx cypress run `

### Bugs and things to improve
1. There is one bug that increase the `patches` in the response, here is the most basic way to replicate the bug: 
- Put this body
```json
{
  "roomSize" : [5, 5],
  "coords" : [0, 0],
  "patches" : [
  ],
  "instructions" : "NESW"
}
```
- The response return 4 patches

2. There is not and error message when coords is outside the room, I mean the roomSize is [4, 4], if I set the coords or patches with [6, 1] it should be an error, is not prevent that the input will be inside the room
3. There is not and error message when the instructions move out the room the robotic hoover, if the roomSize is [4, 4] and I set the coords like [1, 1] and instructions like "NNNNNNN" the robot will be outside the room and accident happens and robots are expensive, I hope you have a insurance for robots

