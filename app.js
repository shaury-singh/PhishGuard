import express from 'express';
import { spawn } from 'child_process';

const app = express();
const port = 5000;

app.use(express.json());

app.post('/', (req, res) => {
    // Spawn the Python process for prediction
    const callFile = spawn('python', ["phishing_detector_model.py"]);
    
    // Write the request body (input data) to Python script
    callFile.stdin.write(JSON.stringify(req.body));
    callFile.stdin.end();

    let output = "";
    
    // Collect the output from Python script
    callFile.stdout.on("data", (data) => {
        output += data.toString();
    });

    // Handle errors
    callFile.stderr.on("data", (err) => {
        console.error(err.toString());
        res.status(500).send("Error processing request");
    });

    // Send the response once Python script finishes
    callFile.on('close', () => {
        try {
            const result = JSON.parse(output);
            res.json(result); // Send the response back to the client
        } catch (error) {
            res.status(500).send("Error in parsing response from Python");
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
