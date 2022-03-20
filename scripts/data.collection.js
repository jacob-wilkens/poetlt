const debug = require("debug")("dev");
const nba = require("nba");
const _ = require("underscore");
const fs = require("fs");

const Season = "2021-22";
const LeagueID = "00";
const SeasonType = "Regular Season";
const highLevelTeamInfo = ["teamCity", "teamName", "teamAbbreviation", "teamConference", "teamDivision"];

const main = async() => {
    try {
        let teamDict = {};
        //Loop to get all teams
        for (const i in nba.teams) {
            let { teamId } = nba.teams[i];

            let { teamInfoCommon } = await nba.stats.teamInfoCommon({
                LeagueID: LeagueID,
                Season: Season,
                SeasonType: SeasonType,
                TeamID: String(teamId),
            });

            let { commonTeamRoster } = await nba.stats.commonTeamRoster({ LeagueID: LeagueID, Season: Season, TeamID: String(teamId) });

            teamDict[teamId] = { teamInfo: _.pick(teamInfoCommon[0], highLevelTeamInfo), roster: commonTeamRoster };
        }

        fs.writeFileSync("../data/poetlt.json", JSON.stringify(teamDict, null, 2));
    } catch (err) {
        debug(err);
    }
};

main();