const collect = require('collect.js');
const {
  performance
} = require('perf_hooks');
const ProblemSolver = require('./ProblemSolver');

class PracticeSolver extends ProblemSolver{
  constructor(dataSet) {
    super(dataSet);
  }

  pizzaCnt = parseInt(this.dataSet[0][0]);
  teams = this.generateTeamsList(this.dataSet[0].slice(1));
  pizzas = this.generatePizzasList(this.dataSet.slice(1));
  sortedPizzas = collect(this.pizzas).sortByDesc('ingredientsCnt').all()
  teamsToDeliver = [];

  generateTeamsList(teams) {
    let result = [];

    const teamsCntList = [parseInt(teams[0]), parseInt(teams[1]), parseInt(teams[2])];

    teamsCntList.forEach((teamCnt, index) => {
      for (let i = 0; i < teamCnt; i++) {
        switch (index){
          case 0:
            result.push(this.generateTeamListItem(2));
            break;
          case 1:
            result.push(this.generateTeamListItem(3));
            break;
          case 2:
            result.push(this.generateTeamListItem(4));
            break;
          default:
            break;
        }
      }
    });

    result = collect(result).sortByDesc('peopleCnt').all();
    return result;
  }

  generateTeamListItem(peopleCnt) {
    return {
      peopleCnt,
    };
  }

  generatePizzasList(pizzas) {
    return pizzas.map((pizzaData) => {
      const pizza = {};
      pizza.ingredientsCnt = parseInt(pizzaData[0]);
      pizza.ingredients = pizzaData.slice(1);

      return pizza;
    });
  }

  solutionResult() {
    const tg1 = performance.now();
    this.setTeamsToDeliver();

    this.teamsToDeliver.forEach((team, index) => {
      console.log('going to set pizzas for team' + (index + 1));
      this.getPizzasForTeam(team);
    });

    // this.getPizzasForTeam(this.teamsToDeliver[0]);

    const tg2 = performance.now();

    console.log("Call to all took " + (tg2 - tg1) + " milliseconds.")

    return this.gatherResult();
  }

  setTeamsToDeliver() {
    let pizzasLeft = this.pizzaCnt;

    for (let i = 0; i < this.teams.length - 1; i++) {
      pizzasLeft = pizzasLeft - this.teams[i].peopleCnt;

      if (pizzasLeft === 0) {
        this.teamsToDeliver.push(this.teams[i]);

        return;
      }

      if (pizzasLeft > 0) {
        this.teamsToDeliver.push(this.teams[i]);

        continue;
      }

      if (pizzasLeft < 0) {
        pizzasLeft = pizzasLeft + this.teams[i].peopleCnt;

        for(let j = i + 1; j < this.teams.length - 1; j++) {
          pizzasLeft = pizzasLeft - this.teams[j].peopleCnt;

          if (pizzasLeft >= 0) {
            this.teamsToDeliver.push(this.teams[j]);

            return;
          }

          if (pizzasLeft < 0 && j !== this.teams.length) {
            continue;
          }

          if (pizzasLeft < 0 && j === this.teams.length) {
            return;
          }
        }
      }
    }
  }

  getPizzasForTeam(team) {
    const firstPizza = this.sortedPizzas.shift();
    let uniqIngredients = new Set(firstPizza.ingredients);
    team.pizzas = [this.pizzas.indexOf(firstPizza)];

    for (let i = 2; i <= team.peopleCnt; i++) {
      const pizzasLeft = this.sortedPizzas.length;

      let minUniqIngredientsCnt = uniqIngredients.size;
      let maxUniqIngredientsCnt = uniqIngredients.size + this.sortedPizzas[0].ingredients.length;

      for (let j = maxUniqIngredientsCnt; j >= minUniqIngredientsCnt; j--) {
        if (this.sortedPizzas.length !== pizzasLeft) {
          break;
        }

        if (j === minUniqIngredientsCnt) {
          const smallestPizza = this.sortedPizzas.pop();

          team.pizzas.push(this.pizzas.indexOf(smallestPizza));

          break;
        }

        for (let k = 0; k < this.sortedPizzas.length; k++) {
          const nextPizza = this.sortedPizzas[k];

          const totalIngredientsCnt = uniqIngredients.size + nextPizza.ingredients.length;

          if (totalIngredientsCnt < j) {
            break;
          }

          const allPrevIngredients = Array.from(uniqIngredients);
          const mergedIngredients = new Set([...nextPizza.ingredients, ...allPrevIngredients]);
          let uniqueIngredientsCnt = mergedIngredients.size;

          if (uniqueIngredientsCnt === j) {
            this.sortedPizzas.splice(this.sortedPizzas.indexOf(nextPizza), 1);
            uniqIngredients = mergedIngredients;
            team.pizzas.push(this.pizzas.indexOf(nextPizza));

            break;
          }
        }
      }
    }
  }

  gatherResult() {
    const result = [
      [this.teamsToDeliver.length],
    ]

    this.teamsToDeliver.forEach((team) => {
      result.push([
        team.peopleCnt,
        ...team.pizzas,
      ])
    })

    return result;
  }

  countPreliminaryScore() {
    let score = 0;

    this.teamsToDeliver.forEach((team) => {
      const ingredients = [];

      team.pizzas.forEach((pizzaIndex) => {
        const pizzaIngredients = this.pizzas[pizzaIndex].ingredients;

        pizzaIngredients.forEach((ingredient) => {
          ingredients.push(ingredient);
        })
      });

      const uniqIngredientsCnt = collect(ingredients).unique().all().length;

      score += Math.pow(uniqIngredientsCnt, 2);
    });

    return score;
  }
}

module.exports = PracticeSolver;
