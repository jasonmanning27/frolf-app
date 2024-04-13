import { Injectable } from '@angular/core';
import { Player } from './player.model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private players: Player[] = [];
  private darksiders: Player[] = [];
  private pleiads: Player[] = [];

  constructor() { 
      // Predefined list of player names
      const darksiders = [
        'Thomas Harley', 'AJ Fiordalisi', 'Elijah Danley', 'Aaron Wei', 'Sam Redinbo',
        'Andrew Li', 'Dylan Hawkins', 'Eli Fried', 'Hayden Naylor', 'Hawthorne Hamm',
        'Ben Dameron', 'Luke Duan', 'Max Goetz', 'Jack McCleary', 'Bodhi Harmony',
        'Rutledge Smith', 'Grayson Trowbridge', 'Watkins Parker', 'Jake Schwartz',
        'Thomas Loch', 'Josh Singleton', 'Arjun Deshmukh', 'Daniel Zhang', 'Andrew Fan',
        'Min Lim', 'Seth Fried', 'Jason Manning', 'Frederick Huang', 'Matthew McKnight',
        'Kevin Pignone', 'Dov Bearman', 'Henry Chen', 'Noah Krumme', 'Noah Bush', 'Keller Fraley'
      ];
      const pleiads = [
        "Abby Stevens", "Alex Hecht", "Alli Reilly", "Bella Russell", "Caroline Spencer",
        "Claudia Dare", "Dawn Culton", "Dhara Buebel", "Emily Benson-tyler", "Emily Pryzkucki", "Erica Birdsong",
        "Eugenia Chow", "Izi Myers-Miller", "Jessica Wu", "Kailyn Lowder", "Katie Fradenburg", "Kika Larrick", 
        "Kiryn Paine-Heise", "Lisa Wei", "Macy Hudson", "Martha Plaehn", "Megan Buchsbaum", "Milena Jojic", 
        "Rachel Gordon", "Rachel Yao", "Ria Mandal", "Sarah Combs", "Selena Kleber", "Sonia Rao", "Theresa Yu"
      ];
      
      // Initialize players with names and default values for other attributes
      this.players = darksiders.concat(pleiads).map((name, index) => ({
        id: index + 1, // Simple ID generation, you might want a more robust approach
        name: name,
        score: 0,
        rating: 0,
        rank: 0
      }));
  }

  // Service Methods
  getPlayers(): Player[] {
    console.log(this.players);
    return this.players;
  }

  getPlayer(id: number): Player | undefined {
    return this.players.find(player => player.id === id);
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }

  // Additional methods as needed (e.g., deletePlayer, updatePlayer)
}