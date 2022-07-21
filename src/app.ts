import { config } from "dotenv";
import { BreachDetail, getCompromisedEmail } from '../apis/dehashed'
import { getAll, insert } from "../apis/mongo";
// Initiate .env variables
config();
// const response =  getAll(results => {
//     results.forEach((breachDetail: BreachDetail) => {
//         console.log(breachDetail.email)
//     });
// });
// const bd: BreachDetail = {
//     email: "email.@email.com"
// }
// insert(bd);



// Requirements
// Compare results with stored results from db
// Store new results if new results exist
// Intiate slack handler and send Slack notification