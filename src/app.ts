import { config } from "dotenv";
import { BreachDetail, getCompromised } from "../apis/dehashed";
import { getAll, insert } from "../apis/mongo";

// Initiate .env variables
config();

const compromisedHashes: string[] = [];
const compromisedPasswords: string[] = [];

getAll().then((results) => {
  results.map(({ password, hashed_password }) => {
    if (hashed_password) {
        compromisedHashes.push(hashed_password);
    }
    if (password) {
        compromisedPasswords.push(password);
    }
  });

  getCompromised(({entries, balance}) => {
    entries.map((entry: BreachDetail) => {
        const {password, hashed_password} = entry;
        if (hashed_password && !compromisedHashes.includes(hashed_password)) {
           insert(entry);
        }
        if (password && !compromisedPasswords.includes(password)) {
            insert(entry)
        }
    });
    if (balance <= 5) {
        console.log("send slack alert about low balance ", balance)
    }
  })
});

// Intiate slack handler and send Slack notification
