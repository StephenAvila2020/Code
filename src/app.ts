import { config } from "dotenv";
import { exit } from "process";
import { BreachDetail, DehashedResponse, getCompromised } from "../apis/dehashed";
import { getAll, insert } from "../apis/mongo";

// Initiate .env variables
config();

// Check environment
const environmentErrors: EnvironmentError[] = checkEnvironment();
if (environmentErrors.length > 0) {
    console.log("\x1b[31m\x1b[1m", "Environment issues found: ", "\x1b[0m");
    environmentErrors.map((error: EnvironmentError) => {
        console.log("\x1b[31m", error.error, '\x1b[0m');
    })
    exit();
};

// Initialize in-memory storage
const compromisedHashes: string[] = [];
const compromisedPasswords: string[] = [];
const newCompromises: BreachDetail[] = [];

// Load all current breaches into memory
getAll().then((results: BreachDetail[]) => {
    results.map(({ password, hashed_password } : { password?: string, hashed_password?: string}) => {
        if (hashed_password) {
            compromisedHashes.push(hashed_password);
        }
        if (password) {
            compromisedPasswords.push(password);
        }
    });

    // Get breaches from Dehashed and compare with in-memory storage
    getCompromised(({ entries, balance } : DehashedResponse) => {
        entries.map((entry: BreachDetail) => {
            const { password, hashed_password } : { password?: string, hashed_password?: string  } = entry;
            if (hashed_password && !compromisedHashes.includes(hashed_password)) {
                insert(entry);
                newCompromises.push(entry);
            }
            if (password && !compromisedPasswords.includes(password)) {
                insert(entry);
                newCompromises.push(entry);
            }
        });

        // TODO: Send Slack a formatted list of `newCompromises`

        if (balance <= 5) {
            // TODO: Send slack a balance report when low
            console.log("send slack alert about low balance ", balance)
        }
    })
});

function checkEnvironment(): EnvironmentError[] {
    let errors: EnvironmentError[] = [];
    if (!process.env.DEHASHED_USER) {
        errors.push({ error: "DEHASHED_USER not set" });
    }
    if (!process.env.DEHASHED_KEY) {
        errors.push({ error: "DEHASHED_KEY not set" });
    }
    if (!process.env.DOMAIN) {
        errors.push({ error: "DOMAIN not set" });
    }
    if (!process.env.DB_NAME) {
        errors.push({ error: "DB_NAME not set" });
    }
    if (!process.env.DB_CONN_STRING) {
        errors.push({ error: "DB_CONN_STRING string not set" });
    }
    if (!process.env.COLLECTION_NAME) {
        errors.push({ error: "COLLECTION_NAME not set" });
    }
    return errors;
}

interface EnvironmentError {
    error: string
}