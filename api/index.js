
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());


app.post('/bfhl', (req, res) => {
    try {
        const { data, user_id, email, roll_number } = req.body;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: 'Invalid input format' });
        }

        
        const userId = user_id || "abhinay_manikanti";
        const userEmail = email || "abhinay.22bce9726@vitapstudent.ac.in";
        const userRoll = roll_number || "22BCE9726";

        
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let concatAlpha = '';

        data.forEach(item => {
            if (/^\d+$/.test(item)) {
               
                const num = parseInt(item, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
            } else if (/^[a-zA-Z]+$/.test(item)) {
                // Alphabetic string
                alphabets.push(item.toUpperCase());
                concatAlpha += item;
            } else {
                // Special character
                special_characters.push(item);
            }
        });

        // Build concat_string
        let reversed = concatAlpha.split('').reverse().join('');
        let concat_string = '';
        for (let i = 0; i < reversed.length; i++) {
            concat_string += i % 2 === 0 ? reversed[i].toUpperCase() : reversed[i].toLowerCase();
        }

        res.status(200).json({
            is_success: true,
            user_id: userId,
            email: userEmail,
            roll_number: userRoll,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        });
    } catch (err) {
        res.status(500).json({ is_success: false, message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
