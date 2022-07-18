import { config } from "dotenv";
import { connectToDatabase } from '../apis/mongo';
import {getCompromisedEmail} from '../apis/dehashed'

// Initiate .env variables
config();
console.log(process.env.TEST_THING);
getCompromisedEmail();


// Requirements
// Initalize db handler and connection
// Connect to database, grab all exisiting findings
// Intiate DashAPI handler
// Call DashAPI
// Compare results with stored results from db
// Store new results if new results exist
// Close database handler
// Intiate slack handler and send Slack notification