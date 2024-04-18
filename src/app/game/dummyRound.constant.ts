import { GameWithRounds, Hole, Round } from "./game.models";
import { PlayerService } from "../player/player.service";
import { NEW_HOLES } from "./holes.constant";

export const dummy_game: Round[] = [
    
]

//const players: Player[] = PlayerService.get
const new_holes: Hole[] = NEW_HOLES;

// Rounds
// const round1: Round = {
//     date: "2024-04-16",
//     soloGame: false,
//     players: [this.playerService.getPlayerByName("Matthew McKnight"),
//               this.playerService.getPlayerByName("Eli Fried")
//     ],
//     scores: [],
//     numScore: [3, 3, 3, 3, 3, 3, 3, 3, 3,
//                2, 3, 3, 4, 3, 3, 2, 4, 2, 
//                2, 1
//     ],
//     holes: NEW_HOLES,
//   }
//   const round2: Round = {
//     date: "2024-04-16",
//     soloGame: false,
//     players: [this.playerService.getPlayerByName("Rachel Yao"),
//               this.playerService.getPlayerByName("Daniel Zhang")
//     ],
//     scores: [],
//     numScore: [3, 3, 3, 3, 3, 3, 3, 3, 3,
//                2, 3, 3, 4, 3, 3, 2, 4, 2, 
//                2, 1
//     ],
//     holes: NEW_HOLES,
//   }
//   const round3: Round = {
//     date: "2024-04-16",
//     soloGame: false,
//     players: [this.playerService.getPlayerByName("Abby Stevens"),
//               this.playerService.getPlayerByName("Keller Fraley"),
//               this.playerService.getPlayerByName("Andrew Fan")
//     ],
//     scores: [],
//     numScore: [3, 3, 3, 3, 3, 3, 3, 3, 3,
//                2, 3, 3, 4, 3, 3, 2, 4, 2, 
//                2, 1
//     ],
//     holes: NEW_HOLES,
//   }
//   const round4: Round = {
//     date: "2024-04-16",
//     soloGame: false,
//     players: [this.playerService.getPlayerByName("Jason Manning"),
//               this.playerService.getPlayerByName("Seth Fried")
//     ],
//     scores: [],
//     numScore: [2, 3, 3, 3, 0, 4, 3, 3, 3,
//                3, 4, 5, 2, 3, 3, 4, 3, 3, 
//                2, 4
//               ],
//     holes: NEW_HOLES,
//   }
//   const round5: Round = {
//     date: "2024-04-16",
//     soloGame: false,
//     players: [this.playerService.getPlayerByName("Min Lim"),
//               this.playerService.getPlayerByName("Arjun Deshmukh")
//     ],
//     scores: [],
//     numScore: [3, 3, 3, 3, 3, 3, 3, 3, 3,
//                2, 3, 3, 4, 3, 3, 2, 4, 2, 
//                2, 1
//               ],
//     holes: NEW_HOLES,
//   }
//   const round6: Round = {
//     date: "2024-04-16",
//     soloGame: false,
//     players: [this.playerService.getPlayerByName("Jack McCleary"),
//               this.playerService.getPlayerByName("Max Goetz")
//     ],
//     scores: [],
//     numScore: [3, 3, 3, 3, 3, 3, 3, 3, 3,
//                2, 3, 3, 4, 3, 3, 2, 4, 2, 
//                2, 1
//     ],
//     holes: NEW_HOLES,
//   }
//   export const dummyDataConstant: GameWithRounds = {
//     rounds: [round1, round2, round3, round4, round5, round6]
//   }




