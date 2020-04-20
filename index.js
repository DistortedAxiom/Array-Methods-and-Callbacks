import { fifaData } from './fifa.js';
console.log(fifaData);


// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */


/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {

    var final_list = [];

    for (var x = 0; x < data.length; x++) {
        if (data[x].Stage === "Final") {
            final_list.push(data[x]);
        }
    }
    return final_list;
};

console.log(getFinals(fifaData));

/* Task 3: Impliment a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(callback) {
    var cb = callback(fifaData);
    const final_years = cb.map((item) => {
        return { 'Year': item.Year }
    })
    return final_years;
}

console.log(getYears(getFinals));

/* Task 5: Impliment a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */

function getWinners(callback) {
    var cb = callback(fifaData);
    var winners = [];
    for (var x = 0; x < cb.length; x++) {
        if (cb[x]["Home Team Goals"] > cb[x]["Away Team Goals"]) {
            winners.push(cb[x]["Home Team Name"]);
        }
        else {
            winners.push(cb[x]["Away Team Name"]);
        }
    }
    return winners;
};

console.log(getWinners(getFinals));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!"

Parameters:
 * callback function getWinners
 * callback function getYears
 */

function getAllWinners(callback1, callback2) {
    var year = callback1(getFinals);
    var winner = callback2(getFinals);
    var winner_list = []

    for (var x = 0; x < year.length; x++) {
        var result = `In ${year[x].Year}, ${winner[x]} won the world cup!`
        winner_list.push(result);
    }

    console.log(winner_list);

};

getAllWinners(getYears, getWinners);

/* Task 7: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had.

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, country_code) {

    var winners = []

    for (var x = 0; x < data.length; x++) {
        if (data[x]["Home Team Goals"] > data[x]["Away Team Goals"]) {
            winners.push(data[x]["Home Team Initials"]);
        }
        else {
            winners.push(data[x]["Away Team Initials"]);
        }
    }

    const how_many = winners.reduce((wins, country) => {
        return wins + (country == country_code);
    }, 0)

    console.log(how_many)
    return how_many;
};

getCountryWins(getFinals(fifaData), "ITA");


/* Task 8: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {

    const teams = data.map((item) => {
        return {
            "Team": item["Home Team Name"],
            "Goals": item["Home Team Goals"],
            "awayTeam": item["Away Team Name"],
            "awayGoals": item["Away Team Goals"]
        }
    })

    let homeGoals = teams.reduce((count, item) => {
        let home = count.get(item.Team) || 0;
        count.set(item.Team, item.Goals + home);
        return count;
    }, new Map());

    var reducedHome = [...homeGoals].map(([team, goals]) => {
        return {team, goals};
    })

    let awayGoals = teams.reduce((count, item) => {
        let away = count.get(item.awayTeam) || 0;
        count.set(item.awayTeam, item.awayGoals + away);
        return count;
    }, new Map());

    var reducedAway = [...awayGoals].map(([team, goals]) => {
        return {team, goals};
    })

    var mergedTeam = reducedHome.concat(reducedAway);

    var list = mergedTeam.reduce(function(result, current) {
        result[current.team] = result[current.team] || 0;
        result[current.team] += current.goals;
        return result;
    }, {});

    var final_list = Object.keys(list).map(function(current) {
        return {
            Team: current,
            Goals: list[current],
        }
    })

    console.log(final_list);


}

getGoals(getFinals(fifaData));


/* Task 9: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();


/* Task 10: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(/* code here */) {

    /* code here */

};

getAverageGoals();


/// STRETCH 🥅 //

/* Use the space below to work on any stretch goals of your chosing as listed in the README file. */
