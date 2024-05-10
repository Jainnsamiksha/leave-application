// userController.js

import connection from '../database/database.js';
import moment from 'moment/moment.js';

export const Signup = (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({
                status: false,
                error: true,
                message: 'All fields are required'
            });
        }
        connection.query('INSERT INTO signup (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, results, fields) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                return res.status(500).json({
                    status: false,
                    error: true,
                    message: 'Failed to create user'
                });
            }

            // Send success response
            res.status(200).json({
                status: true,
                error: false,
                message: 'User Signup successfully',
                data: results // Assuming your table has an auto-increment primary key
            });
        });
        
    } catch (error) {
        console.log("Error to fetch all field", error);
        res.status(500).json({
            status: false,
            error: true,
            message: 'Internal Server Error'
        });
    }
};

export const Login = (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                error: true,
                message: 'All fields are required'
            });
        }
        connection.query('SELECT * FROM signup WHERE email = ? AND password = ?', [email, password], (err, results, fields) => {
            if (err) {
                console.error("Error querying database:", err);
                return res.status(500).json({
                    status: false,
                    error: true,
                    message: 'Internal Server Error'
                });
            }

            // Check if any user matched the credentials
            if (results.length === 0) {
                return res.status(401).json({
                    status: false,
                    error: true,
                    message: 'Invalid email or password'
                });
            }

            // User authenticated successfully
            const user = results[0]; // Assuming only one user matches the credentials
            // Optionally, you can create a JWT token or session here and send it back to the client

            // Respond with success
            res.status(200).json({
                status: true,
                message: 'Login successful',
                user: user // Send user data back to the client
            });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            status: false,
            error: true,
            message: 'Internal Server Error'
        });
    }
};
export const leaveApplication = (req, res) => {
    const { fromDate, toDate, leaveType } = req.body;
    // Format dates as YYYY-MM-DD
    const formattedFromDate = moment(fromDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const formattedToDate = moment(toDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    
    const query = 'INSERT INTO leave_applications (from_date, to_date, leave_type) VALUES (?, ?, ?)';
    connection.query(query, [formattedFromDate, formattedToDate, leaveType], (err, results) => {
        if (err) {
            console.error('Error inserting leave application:', err);
            res.status(400).json({ error: 'Failed to submit leave application' });
            return;
        }
        res.status(201).json({ message: 'Leave application submitted successfully' });
    });

}
